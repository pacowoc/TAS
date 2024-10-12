using namespace std;
#include <iostream>
#include <cmath>
#include <vector>
#include <fstream>
int stepwise[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 78, 86, 94, 102, 110, 118, 126, 134, 142, 150, 166, 182, 198, 214, 230, 246, 262, 278, 294, 310, 342, 374, 406, 438, 470, 502, 534, 566, 598, 630, 694, 758, 822, 886, 950, 1014, 1078, 1142, 1206, 1270, 1398, 1526, 1654, 1782, 1910, 2038, 2166, 2294, 2422, 2550, 2806, 3062, 3318, 3574, 3830, 4086, 4342, 4598, 4854, 5110, 5622, 6134, 6646, 7158, 7670, 8182, 8694, 9206, 9718};

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
      c3v = pow(2,c3L)-1;
      while(c1L>1){
         price+=10*pow(1.5,c1L-2);
         c1L--;
      }
      while(c2L>0){
         price+=30*pow(3,c2L-1);
         c2L--;
      }
      while(c3L>0){
         price+=100*pow(3,c3L-1);
         c3L--;
      }
   }
   double getValue(double q){
      return c1v*(c2v*(sin(q)+0.5)+c3v);
   }
};
int lastdistro[3]={0,0,0};
int main(){
   vector<UpgradeDistribution> V;
   ofstream output;
   output.open("outnew.txt");
   output<<"["<<endl;
   for(int i=0;i<=55;i++){
      for(int j=0;j<=25;j++){
         for(int k=0;k<=25;k++){
            V.push_back(UpgradeDistribution(i,j,k));
         }
      }
   }
   double q=0;
   double totalrho=0;
   while(totalrho<1e10){
      q+=0.1;
      UpgradeDistribution M = V[0];
      for(UpgradeDistribution U:V){
         if(U.price>totalrho*0.999) continue;
         if(U.getValue(q)>M.getValue(q)){
            M = U;
         }
      }
      output<<"["<<M.c1-lastdistro[0]<<","<<M.c2-lastdistro[1]<<","<<M.c3-lastdistro[2]<<"],"<<endl;
      lastdistro[0] = M.c1;
      lastdistro[1] = M.c2;
      lastdistro[2] = M.c3;
      totalrho+=M.getValue(q)*0.1;
   }
   output<<"]"<<endl;
   output.close();
   return 0;
}


