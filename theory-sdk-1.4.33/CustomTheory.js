
var permissions = Permissions.PERFORM_GAME_ACTIONS;
var stepwise= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 78, 86, 94, 102, 110, 118, 126, 134, 142, 150, 166, 182, 198, 214, 230, 246, 262, 278, 294, 310, 342, 374, 406, 438, 470, 502, 534, 566, 598, 630, 694, 758, 822, 886, 950, 1014, 1078, 1142, 1206, 1270, 1398, 1526, 1654, 1782, 1910, 2038, 2166, 2294, 2422, 2550, 2806, 3062, 3318, 3574, 3830, 4086, 4342, 4598, 4854, 5110, 5622, 6134, 6646, 7158, 7670, 8182, 8694, 9206, 9718];    
class L1UpgradeDistribution{
    constructor(c1,c2,c3){
        this.c1=c1;
        this.c2=c2;
        this.c3=c3;
        this.cost=0;
        while(c1>1){
            this.cost+=10*Math.pow(1.5,c1-2);
            c1--;
        }
        while(c2>0){
            this.cost+=30*Math.pow(3,c1-1);
            c2--;
        }
        while(c3>0){
            this.cost+=100*Math.pow(3,c1-1);
            c3--;
        }
    }
    getValue(q){
        return stepwise[this.c1]*(Math.pow(2,this.c2)*(sin(q)+0.5)+(Math.pow(2,this.c3)-1))
    }
}    
    

var id = "TAS";
var name = "Lemma TAS CT";
var description = "TA for speedruns";
var authors = "pacowoc & My beloved c++ code";
var version = 1;
var displaytime=0;
var L1;
var mode=0;
var V = [];
var init = () => {
    
    currency = theory.createCurrency();
    ///////////////////
    // Regular Upgrades
    {
        L1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        L1.getDescription = (_) => "L1";
        L1.getInfo = (amount) => "Start L1 TAS";
        L1.bought = (amount) => {
            mode=1;
            for(i=0;i<55;i++){
                for(j=0;j<25;j++){
                    for(k=0;k<25;k++){
                        V.push(new L1UpgradeDistribution(i,j,k))
                    }
                }
            }
        }
    }
}

var tick = (elapsedTime, multiplier) => {
    if(game.activeTheory.id===8 && mode==1){
        let c1L = game.activeTheory.upgrades[0].level;
        let c2L = game.activeTheory.upgrades[1].level;
        let c3L = game.activeTheory.upgrades[2].level;
        let cash = game.activeTheory.currency.value;
        q=parseBigNumber(game.activeTheory.tertiaryEquation.substring(2))+0.1;
        while(c1L>1){
            cash+=10*Math.pow(1.5,c1L-2)
            c1L--;
        }
        while(c2L>0){
            cash+=30*Math.pow(3,c2L-1)
            c2L--;
        }
        while(c3L>0){
            cash+=100*Math.pow(3,c3L-1)
            c3L--;
        }
        if(cash>=1e10){
            game.activeTheory.upgrades[0].refund(-1);
            game.activeTheory.upgrades[1].refund(-1);
            game.activeTheory.upgrades[2].refund(-1);
            displaytime=q;
            game.activeTheory.lemma.buy();
            mode=0;
            L1.level=0;
        }
        let M = V[0];
        V.forEach(U => {
            if(U.cost<=cash){
                if(U.getValue(q)>M.getValue(q)){
                    M=U;
                }
            } 
        });
        c1L = game.activeTheory.upgrades[0].level;
        c2L = game.activeTheory.upgrades[1].level;
        c3L = game.activeTheory.upgrades[2].level;
        if(M.c1<c1L){
            game.activeTheory.c11.refund(c1L-M.c1)
        }
        if(M.c1>c1L){
            game.activeTheory.c11.buy(M.c1-c1L)
        }
        if(M.c2<c2L){
            game.activeTheory.c12.refund(c2L-M.c2)
        }
        if(M.c2>c2L){
            game.activeTheory.c12.buy(M.c2-c2L)
        }
        if(M.c3<c3L){
            game.activeTheory.c13.refund(c3L-M.c3)
        }
        if(M.c3>c3L){
            game.activeTheory.c13.buy(M.c3-c3L)
        }
        
        offset++;
        
    }
    theory.invalidatePrimaryEquation();
}

var getPrimaryEquation = () => {

    return mode.toString()+"/"+offset.toString()+"/"+q.toString();
}
var getPublicationMultiplier = (tau) => 1;
var getPublicationMultiplierFormula = (symbol) => 1;

init();
