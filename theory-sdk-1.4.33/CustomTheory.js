﻿
var permissions = Permissions.PERFORM_GAME_ACTIONS;
var stepwise= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 78, 86, 94, 102, 110, 118, 126, 134, 142, 150, 166, 182, 198, 214, 230, 246, 262, 278, 294, 310, 342, 374, 406, 438, 470, 502, 534, 566, 598, 630, 694, 758, 822, 886, 950, 1014, 1078, 1142, 1206, 1270, 1398, 1526, 1654, 1782, 1910, 2038, 2166, 2294, 2422, 2550, 2806, 3062, 3318, 3574, 3830, 4086, 4342, 4598, 4854, 5110, 5622, 6134, 6646, 7158, 7670, 8182, 8694, 9206, 9718];    
var L1C1cost = [0,0,10.0, 25.0, 47.5, 81.25, 131.875, 207.8125, 321.71875, 492.578125, 748.8671875, 1133.30078125, 1709.951171875, 2574.9267578125, 3872.39013671875, 5818.585205078125, 8737.877807617188, 13116.816711425781, 19685.225067138672, 29537.837600708008, 44316.75640106201, 66485.13460159302, 99737.70190238953, 149616.5528535843, 224434.82928037643, 336662.24392056465, 505003.365880847, 757515.0488212705, 1136282.5732319057, 1704433.8598478585, 2556660.789771788, 3835001.1846576817, 5752511.776986523, 8628777.665479783, 12943176.498219674, 19414774.74732951, 29122172.12099427, 43683268.181491405, 65524912.27223711, 98287378.40835565, 147431077.61253348, 221146626.41880023, 331719949.62820035, 497579934.44230056, 746369911.6634508, 1119554877.4951763, 1679332326.2427645, 2518998499.3641467, 3778497759.04622, 5667746648.56933, 8501619982.853995, 12752429984.280993, 19128644986.421486, 28692967489.63223, 43039451244.44834, 64559176876.672516, 96838765325.00877, 145258147997.51315, 217887222006.26974, 326830833019.40466, 490246249539.107, 735369374318.6605, 1103054061487.9907, 1654581092241.986, 2481871638372.979, 3722807457569.4688, 5584211186364.203, 8376316779556.305, 12564475169344.457, 18846712754026.684, 28270069131050.023, 42405103696585.03, 63607655544887.55, 95411483317341.33, 143117224976022.0, 214675837464043.0, 322013756196074.5, 483020634294121.75, 724530951441192.6, 1086796427161799.0, 1630194640742708.5, 2445291961114073.0, 3667937941671119.5, 5501906912506689.0, 8252860368760044.0, 1.2379290553140076e+16, 1.8568935829710124e+16, 2.7853403744565196e+16, 4.17801056168478e+16, 6.267015842527171e+16, 9.400523763790758e+16, 1.4100785645686138e+17, 2.1151178468529206e+17, 3.172676770279381e+17, 4.759015155419072e+17, 7.138522733128608e+17, 1.0707784099692913e+18, 1.606167614953937e+18, 2.4092514224309053e+18, 3.6138771336463575e+18]
var L1C2cost = [0,30, 120, 390, 1200, 3630, 10920, 32790, 98400, 295230, 885720, 2657190, 7971600, 23914830, 71744520, 215233590, 645700800, 1937102430, 5811307320, 17433921990, 52301766000, 156905298030, 470715894120, 1412147682390, 4236443047200, 12709329141630, 38127987424920, 114383962274790, 343151886824400, 1029455660473230, 3088366981419720, 9265100944259190, 27795302832777600, 83385908498332830, 250157725494998520, 750473176484995590, 2251419529454986800, 6754258588364960430, 20262775765094881320, 60788327295284643990, 182364981885853932000, 547094945657561796030, 1641284836972685388120, 4923854510918056164390, 14771563532754168493200, 44314690598262505479630, 132944071794787516438920, 398832215384362549316790, 1196496646153087647950400, 3589489938459262943851230, 10768469815377788831553720, 32305409446133366494661190, 96916228338400099483983600, 290748685015200298451950830, 872246055045600895355852520, 2616738165136802686067557590, 7850214495410408058202672800, 23550643486231224174608018430, 70651930458693672523824055320, 211955791376081017571472165990, 635867374128243052714416498000, 1907602122384729158143249494030, 5722806367154187474429748482120, 17168419101462562423289245446390, 51505257304387687269867736339200, 154515771913163061809603209017630, 463547315739489185428809627052920, 1390641947218467556286428881158790, 4171925841655402668859286643476400, 12515777524966208006577859930429230, 37547332574898624019733579791287720, 112641997724695872059200739373863190, 337925993174087616177602218121589600, 1013777979522262848532806654364768830, 3041333938566788545598419963094306520, 9124001815700365636795259889282919590, 27372005447101096910385779667848758800, 82116016341303290731157339003546276430, 246348049023909872193472017010638829320, 739044147071729616580416051031916487990, 2217132441215188849741248153095749464000, 6651397323645566549223744459287248392030, 19954191970936699647671233377861745176120, 59862575912810098943013700133585235528390, 179587727738430296829041100400755706585200, 538763183215290890487123301202267119755630, 1616289549645872671461369903606801359266920, 4848868648937618014384109710820404077800790, 14546605946812854043152329132461212233402400, 43639817840438562129456987397383636700207230, 130919453521315686388370962192150910100621720, 392758360563947059165112886576452730301865190, 1178275081691841177495338659729358190905595600, 3534825245075523532486015979188074572716786830, 10604475735226570597458047937564223718150360520, 31813427205679711792374143812692671154451081590, 95440281617039135377122431438078013463353244800, 286320844851117406131367294314234040390059734430, 858962534553352218394101882942702121170179203320, 2576887603660056655182305648828106363510537609990]
var L1C3cost = [0,100, 400, 1300, 4000, 12100, 36400, 109300, 328000, 984100, 2952400, 8857300, 26572000, 79716100, 239148400, 717445300, 2152336000, 6457008100, 19371024400, 58113073300, 174339220000, 523017660100, 1569052980400, 4707158941300, 14121476824000, 42364430472100, 127093291416400, 381279874249300, 1143839622748000, 3431518868244100, 10294556604732400, 30883669814197300, 92651009442592000, 277953028327776100, 833859084983328400, 2501577254949985300, 7504731764849956000, 22514195294549868100, 67542585883649604400, 202627757650948813300, 607883272952846440000, 1823649818858539320100, 5470949456575617960400, 16412848369726853881300, 49238545109180561644000, 147715635327541684932100, 443146905982625054796400, 1329440717947875164389300, 3988322153843625493168000, 11964966461530876479504100, 35894899384592629438512400, 107684698153777888315537300, 323054094461333664946612000, 969162283384000994839836100, 2907486850152002984519508400, 8722460550456008953558525300, 26167381651368026860675576000, 78502144954104080582026728100, 235506434862312241746080184400, 706519304586936725238240553300, 2119557913760810175714721660000, 6358673741282430527144164980100, 19076021223847291581432494940400, 57228063671541874744297484821300, 171684191014625624232892454464000, 515052573043876872698677363392100, 1545157719131630618096032090176400, 4635473157394891854288096270529300, 13906419472184675562864288811588000, 41719258416554026688592866434764100, 125157775249662080065778599304292400, 375473325748986240197335797912877300, 1126419977246958720592007393738632000, 3379259931740876161776022181215896100, 10137779795222628485328066543647688400, 30413339385667885455984199630943065300, 91240018157003656367952598892829196000, 273720054471010969103857796678487588100, 821160163413032907311573390035462764400, 2463480490239098721934720170106388293300, 7390441470717296165804160510319164880000, 22171324412151888497412481530957494640100, 66513973236455665492237444592872483920400, 199541919709366996476712333778617451761300, 598625759128100989430137001335852355284000, 1795877277384302968290411004007557065852100, 5387631832152908904871233012022671197556400, 16162895496458726714613699036068013592669300, 48488686489376180143841097108204040778008000, 145466059468128540431523291324612122334024100, 436398178404385621294569873973836367002072400, 1309194535213156863883709621921509101006217300, 3927583605639470591651128865764527303018652000, 11782750816918411774953386597293581909055956100, 35348252450755235324860159791880745727167868400, 106044757352265705974580479375642237181503605300, 318134272056797117923741438126926711544510816000, 954402816170391353771224314380780134633532448100, 2863208448511174061313672943142340403900597344400, 8589625345533522183941018829427021211701792033300]
function value(c1,c2,c3,q){
    return stepwise[c1]*(Math.pow(2,c2)*(Math.sin(q)+0.5)+(Math.pow(2,c3)-1))
}
var id = "TAS";
var name = "Lemma TAS CT";
var description = "TA for speedruns";
var authors = "pacowoc & My beloved c++ code";
var version = 1;
var displaytime=0;
var L1;
var mode=0;
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
        }
    }
}

var tick = (elapsedTime, multiplier) => {
    q=0;
    if(game.activeTheory.id===8 && mode==1){
        let c1L = game.activeTheory.upgrades[0].level;
        let c2L = game.activeTheory.upgrades[1].level;
        let c3L = game.activeTheory.upgrades[2].level;
        let cash = game.activeTheory.currencies[0].value;
        q=parseBigNumber(game.activeTheory.tertiaryEquation.substring(2))+0.1;
        cash+=L1C1cost[c1L]
        cash+=L1C2cost[c2L]
        cash+=L1C3cost[c3L]
        if(cash>=1e10){
            game.activeTheory.upgrades[0].refund(-1);
            game.activeTheory.upgrades[1].refund(-1);
            game.activeTheory.upgrades[2].refund(-1);
            displaytime=q;
            game.activeTheory.lemma.buy();
            mode=0;
            L1.level=0;
        }
        c1L = game.activeTheory.upgrades[0].level;
        c2L = game.activeTheory.upgrades[1].level;
        c3L = game.activeTheory.upgrades[2].level;
        maxc1L = c1L;
        maxc2L = c2L;
        maxc3L = c3L;
        maxval=value(c1L,c2L,c3L,q)
        for(i=Math.max(0,c1L-10);i<=c1L+10;i++){
            for(j=0;j<=23;j++){
                for(k=Math.max(0,c3L-5);k<=c3L+5;k++){
                    if(L1C1cost[i]+L1C2cost[j]+L1C3cost[k]<=cash&&value(i,j,k,q)>=maxval){
                        maxc1L = i;
                        maxc2L = j;
                        maxc3L = k; 
                        maxval=value(i,j,k,q)
                    }
                }
            }
        }
        if(maxc1L<c1L){
            game.activeTheory.upgrades[0].refund(c1L-maxc1L)
        }
        if(maxc1L>c1L){
            game.activeTheory.upgrades[0].buy(maxc1L-c1L)
        }
        if(maxc2L<c2L){
            game.activeTheory.upgrades[1].refund(c2L-maxc2L)
        }
        if(maxc2L>c2L){
            game.activeTheory.upgrades[1].buy(maxc2L-c2L)
        }
        if(maxc3L<c3L){
            game.activeTheory.upgrades[2].refund(c3L-maxc3L)
        }
        if(maxc3L>c3L){
            game.activeTheory.upgrades[2].buy(maxc3L-c3L)
        }
        
    }
    theory.invalidatePrimaryEquation();
}

var getPrimaryEquation = () => {

    return mode.toString()
}
var getPublicationMultiplier = (tau) => 1;
var getPublicationMultiplierFormula = (symbol) => 1;

init();
