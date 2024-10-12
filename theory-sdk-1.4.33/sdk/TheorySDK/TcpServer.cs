﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace TheorySDK
{
    public class TcpServer : IDisposable
    {
        public Action ClientConnected;
        public Action ClientDisconnected;
        public Action<string> MessageReceived;
        public bool HasClient { get { lock (_clientMutex) return _client != null; } }

        private readonly Logger _logger;
        private readonly IPAddress _ipAddress;
        private readonly int _port;
        private readonly Thread _serverThread;
        private Socket _server = null;
        private Socket _client = null;
        private bool _isDisposing = false;
        private BlockingCollection<string> _messageQueue = new BlockingCollection<string>();

        private object _serverMutex = new object();
        private object _clientMutex = new object();
        private object _messageQueueMutex = new object();

        public TcpServer(Logger logger, string ipAddress, int port)
        {
            _logger = logger;
            _ipAddress = string.IsNullOrEmpty(ipAddress) ? IPAddress.Any : IPAddress.Parse(ipAddress);
            _port = port;

            _serverThread = new Thread(new ThreadStart(ServerThread));
            _serverThread.Start();
        }

        public void SendMessage(string message)
        {
            lock (_messageQueueMutex)
            {
                if (_messageQueue != null && !_messageQueue.IsAddingCompleted)
                    _messageQueue.Add(message);
            }
        }

        public void Dispose()
        {
            lock (_clientMutex)
            {
                if (_client != null)
                    _client.Close();
            }

            lock (_serverMutex)
            {
                _isDisposing = true;
                if (_server != null)
                    _server.Close();
            }

            _serverThread.Join();
        }

        public void ServerThread()
        {
            _logger.Log("Starting server...");

            IPEndPoint localEndPoint = new IPEndPoint(_ipAddress, _port);

            try
            {
                lock (_serverMutex)
                {
                    if (!_isDisposing)
                        _server = new Socket(_ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                }

                if (_server != null)
                {
                    _server.Bind(localEndPoint);
                    _server.Listen(1);

                    while (true)
                    {
                        _logger.Log("Waiting for client...");
                        var client = _server.Accept();
                        lock (_clientMutex)
                            _client = client;
                        SetKeepAlive(_client, 5000, 5000, 16);
                        _logger.Log("Client connected.");
                        lock (_messageQueueMutex)
                            _messageQueue = new BlockingCollection<string>();
                        ClientConnected?.Invoke();
                        var stream = new NetworkStream(_client);

                        var sendThread = new Thread(new ThreadStart(() =>
                        {
                            var writer = new StreamWriter(stream);
                            foreach (var message in _messageQueue.GetConsumingEnumerable())
                            {
                                try
                                {
                                    writer.WriteLine(message);
                                    writer.Flush();
                                }
                                catch (Exception) { }
                            }
                        }));

                        var receiveThread = new Thread(new ThreadStart(() =>
                        {
                            var reader = new StreamReader(stream);
                            try
                            {
                                while (true)
                                {
                                    string message = reader.ReadLine();
                                    if (string.IsNullOrEmpty(message))
                                        break;
                                    //_logger.Log("Message received.");
                                    MessageReceived?.Invoke(message);
                                }
                            }
                            catch (Exception) { }
                        }));

                        sendThread.Start();
                        receiveThread.Start();
                        receiveThread.Join();
                        _messageQueue.CompleteAdding();
                        sendThread.Join();

                        _client.Shutdown(SocketShutdown.Both);
                        _client.Close();
                        lock (_clientMutex)
                            _client = null;
                        lock (_messageQueueMutex)
                            _messageQueue = null;
                        _logger.Log("Client disconnected.");
                        ClientDisconnected?.Invoke();
                    }
                }
            }
            catch (SocketException e)
            {
                if (e.SocketErrorCode != SocketError.Interrupted)
                    Console.WriteLine(e.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            lock (_clientMutex)
                _client = null;
            lock (_messageQueueMutex)
                _messageQueue = null;

            _logger.Log("Stopping server.");
        }

        public static List<string> GetIPAddressList()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            return host.AddressList.Select(ip => ip.ToString()).ToList();
        }

        private static void SetKeepAlive(Socket socket, int interval, int time, int retryCount)
        {
            socket.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.KeepAlive, 1);
            socket.SetSocketOption(SocketOptionLevel.Tcp, SocketOptionName.TcpKeepAliveInterval, interval);
            socket.SetSocketOption(SocketOptionLevel.Tcp, SocketOptionName.TcpKeepAliveTime, time);
            socket.SetSocketOption(SocketOptionLevel.Tcp, SocketOptionName.TcpKeepAliveRetryCount, retryCount);
        }
    }
}
