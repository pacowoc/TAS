using namespace std;
#include <iostream>
#include <cmath>
#include <vector>
#include <fstream>
int stepwise[] = {0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,34,38,42,46,50,54,58,62,66,70,78,86,94,102,110,118,126,134,142,150};

struct UpgradeDistribution{
   int c1=0;
   int c2=0;
   int c3=0;
   double c1v=0;
   double c2v=0;
   double c3v=0;
   double price=0;
   UpgradeDistribution(int c1L,int c2L,int c3L){
      c1=c1L;
      c2=c2L;
      c3=c3L;
      c1v = stepwise[c1L];
      c2v = pow(2,c2L);
      c3v = pow(c3L+1,2);
      while(c1L>1){
         price+=pow(2.87,c1L-2);
         c1L--;
      }
      while(c2L>0){
         price+=5000*pow(10,c2L-1);
         c2L--;
      }
      while(c3L>0){
         price+=pow(10,c3L-1);
         c3L--;
      }
   }
   double getValue(double q){
      return c1v*c2v*(c3v*q-q*q/5);
   }
};


int main(){
   vector<UpgradeDistribution> V;
   ofstream output;
   output.open("out.txt");
   for(int i=0;i<=41;i++){
      for(int j=0;j<=12;j++){
         for(int k=0;k<=15;k++){
            V.push_back(UpgradeDistribution(i,j,k));
         }
      }
   }
   double q=0;
   double totalrho=0;
   while(q<1000){
      q+=0.1;
      UpgradeDistribution M = V[0];
      for(UpgradeDistribution U:V){
         if(U.price>totalrho) continue;
         if(U.getValue(q)>M.getValue(q)){
            M = U;
         }
      }
      totalrho+=M.getValue(q)*0.1;
      output<<"q="<<q<<": Best Distro="<<M.c1<<", "<<M.c2<<", "<<M.c3<<", Which Yields "<<M.getValue(q)*0.1<<"rhodot, TOTAL:"<<totalrho<<endl;
   }
   output.close();
   return 0;
}


