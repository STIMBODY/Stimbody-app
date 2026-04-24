import { useState, useEffect, useRef } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const C = { bg:"#EEF1FA", navy:"#0D1B4B", navyL:"#1A2B6B", yellow:"#F5C200", white:"#FFFFFF", text:"#0D1B4B", soft:"#4A5A8A", muted:"#8A9ABB", border:"#DDE3F5", green:"#1A9050", greenBg:"#E8FFF2", greenBdr:"#A0DDB8", red:"#E53935", orange:"#E65100", orangeBg:"#FFF3E0" };
const DB = { patesBlanches:{p:5,f:1,c:27,cal:131}, semoule:{p:3.8,f:0.6,c:23,cal:112}, epeautre:{p:5.5,f:1,c:25,cal:127}, seigle:{p:3,f:0.5,c:22,cal:104}, avoine:{p:13,f:7,c:67,cal:389}, sarrasin:{p:3.4,f:0.6,c:20,cal:92}, amarante:{p:4,f:1.5,c:22,cal:102}, polenta:{p:2,f:0.3,c:18,cal:80}, manioc:{p:1.4,f:0.3,c:38,cal:160}, igname:{p:1.5,f:0.2,c:28,cal:116}, haricotNoir:{p:8.9,f:0.5,c:23,cal:132}, flageolets:{p:7,f:0.5,c:18,cal:95}, poisVerts:{p:5,f:0.4,c:14,cal:81}, gnocchis:{p:2,f:1,c:30,cal:130}, couscous:{p:3.8,f:0.6,c:23,cal:112}, boulgour:{p:3.1,f:0.2,c:19,cal:83}, orge:{p:2.3,f:0.4,c:22,cal:100}, millet:{p:3.5,f:1.3,c:23,cal:119}, riz:{p:2.7,f:0.3,c:28,cal:130}, rizComplet:{p:2.5,f:1,c:23,cal:112}, patesCompletes:{p:5,f:1,c:31,cal:157}, patates:{p:2,f:0.1,c:17,cal:77}, patateDouce:{p:1.6,f:0.1,c:20,cal:86}, poisCasses:{p:8,f:0.4,c:17,cal:100}, feves:{p:8,f:0.6,c:13,cal:88}, edamame:{p:11,f:5,c:8,cal:121}, sojaHaricot:{p:13,f:5,c:11,cal:141}, lentilles:{p:9,f:0.4,c:20,cal:116}, poisChiches:{p:9,f:2.6,c:27,cal:164}, haricotsBlancs:{p:8,f:0.5,c:17,cal:105}, haricotRouges:{p:8.7,f:0.5,c:22,cal:127}, nutella:{p:6,f:31,c:58,cal:530}, carreFrais:{p:8,f:11,c:3,cal:140}, emmental:{p:28,f:30,c:0,cal:380}, jambon:{p:18,f:4,c:1,cal:110}, celeri:{p:0.7,f:0.2,c:3,cal:16}, betterave:{p:1.6,f:0.1,c:10,cal:43}, chouRouge:{p:1.4,f:0.2,c:7,cal:31}, avocat:{p:2,f:15,c:9,cal:160}, fenouil:{p:1.2,f:0.2,c:7,cal:31}, maiz:{p:3.3,f:1.4,c:19,cal:97}, banane:{p:1.1,f:0.3,c:23,cal:95}, pomme:{p:0.3,f:0.2,c:14,cal:55}, fraises:{p:0.8,f:0.3,c:8,cal:35}, fruitsRouges:{p:1,f:0.5,c:12,cal:55}, kiwi:{p:1.1,f:0.5,c:15,cal:65}, orange:{p:1,f:0.2,c:12,cal:50}, mangue:{p:0.8,f:0.4,c:17,cal:70}, pain:{p:8,f:1,c:50,cal:250}, painComplet:{p:9,f:2,c:45,cal:235}, biscottes:{p:10,f:3,c:70,cal:350}, galetteRiz:{p:7,f:1,c:80,cal:380}, beurre:{p:1,f:81,c:0,cal:740}, beurreCacahuete:{p:25,f:50,c:20,cal:600}, pureAmande:{p:21,f:55,c:10,cal:600}, confiture:{p:0,f:0,c:65,cal:260}, miel:{p:0,f:0,c:80,cal:310}, muesli:{p:10,f:7,c:65,cal:370}, lait:{p:3.5,f:3.5,c:5,cal:65}, jusOrange:{p:0.7,f:0,c:10,cal:45}, poulet:{p:23,f:1.5,c:0,cal:110}, steak5:{p:19,f:5,c:0,cal:125}, veau:{p:21,f:3,c:0,cal:115}, cabillaud:{p:18,f:0.7,c:0,cal:82}, saumon:{p:20,f:13,c:0,cal:200}, maquereau:{p:19,f:14,c:0,cal:205}, daurade:{p:19,f:2,c:0,cal:97}, crevettes:{p:18,f:1,c:0,cal:85}, thon:{p:26,f:0.5,c:0,cal:110}, moules:{p:12,f:2,c:3,cal:80}, stJacques:{p:15,f:1,c:3,cal:82}, oeuf:{p:13,f:11,c:0.6,cal:155}, jambonDinde:{p:19,f:2,c:1,cal:100}, fromageBlanc0:{p:8,f:0.1,c:4,cal:48}, blancsOeuf:{p:11,f:0,c:0.7,cal:52}, saumonFume:{p:21,f:12,c:0,cal:185}, entremets:{p:69,f:4,c:13,cal:372}, barreHP:{p:24,f:12,c:41,cal:380}, legumes:{p:2.5,f:0,c:5,cal:30}, huileOlive:{p:0,f:100,c:0,cal:900}, skyr:{p:10,f:0,c:3.5,cal:54}, yaourtGrec:{p:10,f:0,c:4,cal:56}, cottageCheese:{p:11,f:1,c:3,cal:65}, konjac:{p:0.2,f:0,c:0,cal:7} };
const FORMULES = {
  sucre: { label:"Sans Sucre", emoji:"🚫🍬", desc:"Programme strict zéro sucre. Protéines + légumes uniquement.", prefs:{ breakfast:["oeuf","jambonDinde","saumonFume","cottageCheese","skyr","fromageBlanc0"], proteins:["poulet","steak5","saumon","cabillaud","daurade","crevettes","thon","jambonDinde","oeuf","fromageBlanc0"], nutella:["nutella","pate a tartiner"], carreFrais:["carre frais"], emmental:["emmental"], jambon:["jambon"], banane:["banane"], pomme:["pomme"], fraises:["fraises"], fruitsRouges:["fruits rouges","myrtilles","framboises"], kiwi:["kiwi"], orange:["orange"], mangue:["mangue"], pain:["pain blanc","baguette","pain de mie"], painComplet:["pain complet","cereales"], biscottes:["biscottes"], galetteRiz:["galette riz"], beurre:["beurre"], beurreCacahuete:["beurre cacahuete"], pureAmande:["puree amande","noisette"], confiture:["confiture"], miel:["miel"], muesli:["muesli","granola","corn flakes"], lait:["lait"], jusOrange:["jus orange"], legumes:["salade","tomate","concombre","radis","brocoli","epinard","champignon","courgette","haricotVert","poivron","aubergine","chouFleur","konjac"], condiments:["huileOlive","vinaigre","citron","moutarde","herbes","curcuma"] } },
  equilibre: { label:"Rééquilibrage Alimentaire", emoji:"⚖️", desc:"Programme progressif d'équilibre global. Variété, plaisir, durabilité.", prefs:{ breakfast:["entremets","barreHP","oeuf","jambonDinde","skyr","fromageBlanc0","yaourtGrec"], proteins:["poulet","steak5","saumon","cabillaud","daurade","crevettes","thon","jambonDinde","oeuf","fromageBlanc0","maquereau","moules"], legumes:["salade","tomate","concombre","radis","brocoli","epinard","champignon","courgette","haricotVert","poivron","aubergine","chouFleur","chou","konjac"], condiments:["huileOlive","huileColza","vinaigre","citron","moutarde","herbes","curcuma","epices"] } }
};
const PDJ_LIST = [    {k:"banane",label:"Banane",emoji:"🍌",g:120,cat:"fruits"},
  {k:"pomme",label:"Pomme",emoji:"🍎",g:150,cat:"fruits"},
  {k:"fraises",label:"Fraises",emoji:"🍓",g:150,cat:"fruits"},
  {k:"fruitsRouges",label:"Fruits rouges",emoji:"🫐",g:100,cat:"fruits"},
  {k:"kiwi",label:"Kiwi",emoji:"🥝",g:100,cat:"fruits"},
  {k:"orange",label:"Orange",emoji:"🍊",g:150,cat:"fruits"},
  {k:"mangue",label:"Mangue",emoji:"🥭",g:100,cat:"fruits"},
  {k:"painComplet",label:"Pain complet / aux céréales",emoji:"🍞",g:50,cat:"cereales"},
  {k:"pain",label:"Pain blanc / baguette",emoji:"🥖",g:50,cat:"cereales"},
  {k:"biscottes",label:"Biscottes",emoji:"🫓",g:20,cat:"cereales"},
  {k:"galetteRiz",label:"Galettes de riz",emoji:"🍘",g:20,cat:"cereales"},
  {k:"beurre",label:"Beurre",emoji:"🧈",g:10,cat:"matieres"},
  {k:"beurreCacahuete",label:"Beurre de cacahuète",emoji:"🥜",g:20,cat:"matieres"},
  {k:"pureAmande",label:"Purée d'amande / noisette",emoji:"🌰",g:20,cat:"matieres"},
  {k:"confiture",label:"Confiture",emoji:"🍓",g:20,cat:"sucres"},
  {k:"miel",label:"Miel",emoji:"🍯",g:15,cat:"sucres"},
  {k:"muesli",label:"Muesli / granola",emoji:"🥣",g:50,cat:"cereales"},
  {k:"lait",label:"Lait (demi-écrémé)",emoji:"🥛",g:200,cat:"cereales"},
  {k:"jusOrange",label:"Jus d'orange pressé",emoji:"🍊",g:200,cat:"cereales"},
  {k:"entremets",label:"Entremets HP Levovia",emoji:"🍮",g:25,cat:"proteines"},{k:"barreHP",label:"Barre HP Choco Cacahuète",emoji:"🍫",g:35,cat:"proteines"},{k:"oeuf",label:"Oeufs (2 entiers)",emoji:"🥚",g:120,cat:"proteines"},{k:"blancsOeuf",label:"Blancs d'oeufs (150ml)",emoji:"🥛",g:150,cat:"proteines"},{k:"skyr",label:"Skyr nature",emoji:"🫙",g:150,cat:"proteines"},{k:"siggis",label:"Siggi's 0%",emoji:"🫙",g:150,cat:"proteines"},{k:"yaourtGrec",label:"Yaourt grec 0%",emoji:"🍶",g:150,cat:"proteines"},{k:"fromageBlanc0",label:"Fromage blanc 0%",emoji:"🥛",g:200,cat:"proteines"},  {k:"nutella",label:"Nutella / pâte à tartiner",emoji:"🍫",g:20,cat:"sucres"},
  {k:"carreFrais",label:"Carré frais",emoji:"🧀",g:60,cat:"proteines"},
  {k:"emmental",label:"Emmental",emoji:"🧀",g:30,cat:"proteines"},
  {k:"jambon",label:"Jambon",emoji:"🥓",g:60,cat:"proteines"},
{k:"cottageCheese",label:"Cottage cheese",emoji:"🥛",g:150,cat:"proteines"},{k:"jambonDinde",label:"Jambon de dinde",emoji:"🥓",g:60,cat:"proteines"},{k:"saumonFume",label:"Saumon fumé",emoji:"🐟",g:60,cat:"proteines"},{k:"thon",label:"Thon naturel",emoji:"🥫",g:100,cat:"proteines"}];
const PROTO_LIST = [{k:"poulet",label:"Blanc de poulet",emoji:"🍗",g:150,cat:"viande"},{k:"steak5",label:"Steak haché 5%",emoji:"🥩",g:150,cat:"viande"},{k:"veau",label:"Veau escalope",emoji:"🥩",g:150,cat:"viande"},{k:"saumon",label:"Saumon",emoji:"🐟",g:150,cat:"poisson"},{k:"cabillaud",label:"Cabillaud",emoji:"🐟",g:150,cat:"poisson"},{k:"daurade",label:"Daurade",emoji:"🐟",g:150,cat:"poisson"},{k:"maquereau",label:"Maquereau",emoji:"🐟",g:150,cat:"poisson"},{k:"crevettes",label:"Crevettes",emoji:"🦐",g:150,cat:"fruitsmer"},{k:"moules",label:"Moules",emoji:"🦪",g:200,cat:"fruitsmer"},{k:"stJacques",label:"Saint-Jacques",emoji:"🐚",g:150,cat:"fruitsmer"},{k:"thon",label:"Thon naturel",emoji:"🥫",g:100,cat:"leger"},{k:"jambonDinde",label:"Jambon de dinde",emoji:"🥓",g:60,cat:"leger"},{k:"saumonFume",label:"Saumon fumé",emoji:"🐟",g:60,cat:"leger"},{k:"oeuf",label:"Oeufs (2)",emoji:"🥚",g:120,cat:"laitage"},{k:"fromageBlanc0",label:"Fromage blanc 0%",emoji:"🥛",g:150,cat:"laitage"},{k:"skyr",label:"Skyr nature",emoji:"🫙",g:150,cat:"laitage"}];
const LEG_LIST = [{k:"salade",label:"Salade / mesclun",emoji:"🥬",tag:"cru"},{k:"tomate",label:"Tomate",emoji:"🍅",tag:"cru"},{k:"concombre",label:"Concombre",emoji:"🥒",tag:"cru"},{k:"radis",label:"Radis rouges",emoji:"🔴",tag:"cru"},{k:"endive",label:"Endives",emoji:"🥬",tag:"cru"},{k:"carotte",label:"Carotte râpée",emoji:"🥕",tag:"cru"},
  {k:"celeri",label:"Céleri branche",emoji:"🥬",tag:"cru"},
  {k:"betterave",label:"Betterave crue",emoji:"🟣",tag:"cru"},
  {k:"chouRouge",label:"Chou rouge cru",emoji:"🥬",tag:"cru"},
  {k:"avocat",label:"Avocat",emoji:"🥑",tag:"cru"},
  {k:"fenouil",label:"Fenouil cru",emoji:"🌿",tag:"cru"},
  {k:"maiz",label:"Maïs (modération)",emoji:"🌽",tag:"cru"},{k:"brocoli",label:"Brocolis",emoji:"🥦",tag:"cuit"},{k:"epinard",label:"Épinards",emoji:"🌿",tag:"cuit"},{k:"champignon",label:"Champignons",emoji:"🍄",tag:"cuit"},{k:"courgette",label:"Courgettes",emoji:"🟢",tag:"cuit"},{k:"haricotVert",label:"Haricots verts",emoji:"🫘",tag:"cuit"},{k:"poivron",label:"Poivrons",emoji:"🫑",tag:"cuit"},{k:"aubergine",label:"Aubergines",emoji:"🍆",tag:"cuit"},{k:"chouFleur",label:"Chou-fleur",emoji:"⚪",tag:"cuit"},{k:"chou",label:"Chou vert",emoji:"🥬",tag:"cuit"},{k:"potiron",label:"Potiron",emoji:"🎃",tag:"cuit"},{k:"konjac",label:"Riz/spaghetti konjac",emoji:"🍜",tag:"cuit"},{k:"riz",label:"Riz blanc",emoji:"🍚",tag:"feculent"},{k:"rizComplet",label:"Riz complet",emoji:"🍚",tag:"feculent"},{k:"patesCompletes",label:"Pâtes complètes",emoji:"🍝",tag:"feculent"},{k:"patates",label:"Pomme de terre",emoji:"🥔",tag:"feculent"},{k:"patateDouce",label:"Patate douce",emoji:"🍠",tag:"feculent"},
  {k:"couscous",label:"Couscous",emoji:"🍚",tag:"feculent"},
  {k:"boulgour",label:"Boulgour",emoji:"🌾",tag:"feculent"},
  {k:"orge",label:"Orge perlé",emoji:"🌾",tag:"feculent"},
  {k:"millet",label:"Millet",emoji:"🌾",tag:"feculent"},{k:"lentilles",label:"Lentilles",emoji:"🫘",tag:"legumineuse"},{k:"poisChiches",label:"Pois chiches",emoji:"🫘",tag:"legumineuse"},{k:"haricotsBlancs",label:"Haricots blancs",emoji:"🫘",tag:"legumineuse"},{k:"haricotRouges",label:"Haricots rouges",emoji:"🔴",tag:"legumineuse"},
  {k:"poisCasses",label:"Pois cassés",emoji:"🫘",tag:"legumineuse"},
  {k:"feves",label:"Fèves",emoji:"🫘",tag:"legumineuse"},
  {k:"edamame",label:"Edamame",emoji:"🫘",tag:"legumineuse"},
  {k:"sojaHaricot",label:"Haricots de soja",emoji:"🫘",tag:"legumineuse"}];
const COND_LIST = [{k:"huileOlive",label:"Huile d'olive",emoji:"🫒"},{k:"huileColza",label:"Huile de colza",emoji:"🌻"},{k:"vinaigre",label:"Vinaigre de cidre",emoji:"🍶"},{k:"citron",label:"Citron",emoji:"🍋"},{k:"moutarde",label:"Moutarde",emoji:"🟡"},{k:"ail",label:"Ail",emoji:"🧄"},{k:"echalote",label:"Échalote",emoji:"🧅"},{k:"herbes",label:"Herbes de Provence",emoji:"🌿"},{k:"curcuma",label:"Curcuma",emoji:"🟡"},{k:"epices",label:"Épices variées",emoji:"🌶️"},{k:"cremeLight",label:"Crème liquide 4%",emoji:"🥛"}];
const MV = {super:5,bien:4,moyen:3,fatigue:2,frustre:1};
const FV = {rassasie:1,moyen:2,faim:3};
const MOODS = [{v:"super",e:"😄",l:"Super"},{v:"bien",e:"😊",l:"Bien"},{v:"moyen",e:"😐",l:"Moyen"},{v:"fatigue",e:"😔",l:"Fatigué"},{v:"frustre",e:"😤",l:"Frustré"}];
const FAIM = [{v:"rassasie",e:"🙂",l:"Rassasié"},{v:"moyen",e:"😑",l:"Moyen"},{v:"faim",e:"😩",l:"Faim"}];

// === MÉTHODE COACH DOMINIQUE STIMBODY ===
// BMR mesuré à l'impédancemètre (pas de formule théorique)
// Pesée mensuelle au studio STIMBODY

// Objectifs coach (basés sur le BMR mesuré)
const OBJECTIFS_COACH = [
  {v:"gras",l:"Perte de gras",desc:"BMR − 400 kcal · Déficit agressif",deficit:400,e:"🔥"},
  {v:"douce",l:"Perte en douceur",desc:"BMR − 200 kcal · Rythme soutenable",deficit:200,e:"🌱"},
  {v:"maintien",l:"Maintien",desc:"= BMR · Stabilisation",deficit:0,e:"⚖️"}
];

// Ratios protéines (ajustables par la cliente ou coach)
const RATIOS_PROTEINES = [
  {v:"1",l:"1g / kg",desc:"Standard",mult:1.0},
  {v:"12",l:"1.2g / kg",desc:"Renforcé",mult:1.2},
  {v:"15",l:"1.5g / kg",desc:"Très protéiné",mult:1.5}
];

// Calcul objectif kcal selon BMR mesuré
function calcObjectifKcal(bmr, objectifKey) {
  const o = OBJECTIFS_COACH.find(x => x.v === objectifKey);
  const deficit = o ? o.deficit : 0;
  return Math.max(1000, bmr - deficit); // Min 1000 kcal (sécurité)
}

// Calcul objectif protéines selon poids
function calcObjectifProteines(poids, ratioKey) {
  const r = RATIOS_PROTEINES.find(x => x.v === ratioKey);
  return Math.round(poids * (r ? r.mult : 1.0));
}
// === BASE D'ALIMENTS STIMBODY (Session 2) ===
// Valeurs nutritionnelles pour 100g - Basé sur Ciqual ANSES (simplifié)
// Curée pour la méthode Coach Dominique : protéines, légumes, crudités prioritaires
const ALIMENTS_DB = [
  // ========== VIANDES (20) ==========
  {id:"a001",n:"Blanc de poulet cru",c:"viande",e:"🍗",p:23,l:1.5,g:0,cal:110},
  {id:"a002",n:"Blanc de poulet grillé",c:"viande",e:"🍗",p:31,l:3.5,g:0,cal:165},
  {id:"a003",n:"Cuisse de poulet sans peau",c:"viande",e:"🍗",p:22,l:7,g:0,cal:150},
  {id:"a004",n:"Escalope de dinde",c:"viande",e:"🦃",p:24,l:1,g:0,cal:110},
  {id:"a005",n:"Jambon blanc dégraissé",c:"viande",e:"🥓",p:20,l:2,g:1,cal:105},
  {id:"a006",n:"Jambon de dinde",c:"viande",e:"🥓",p:19,l:2,g:1,cal:100},
  {id:"a007",n:"Jambon cru (type Parme)",c:"viande",e:"🥓",p:27,l:12,g:0,cal:220},
  {id:"a008",n:"Steak haché 5% MG",c:"viande",e:"🥩",p:21,l:5,g:0,cal:130},
  {id:"a009",n:"Steak haché 15% MG",c:"viande",e:"🥩",p:20,l:15,g:0,cal:215},
  {id:"a010",n:"Bavette de bœuf",c:"viande",e:"🥩",p:28,l:10,g:0,cal:210},
  {id:"a011",n:"Filet de bœuf",c:"viande",e:"🥩",p:25,l:12,g:0,cal:215},
  {id:"a012",n:"Escalope de veau",c:"viande",e:"🥩",p:22,l:3,g:0,cal:120},
  {id:"a013",n:"Côte d'agneau",c:"viande",e:"🍖",p:25,l:22,g:0,cal:295},
  {id:"a014",n:"Magret de canard",c:"viande",e:"🦆",p:22,l:13,g:0,cal:210},
  {id:"a015",n:"Lapin rôti",c:"viande",e:"🐰",p:28,l:5,g:0,cal:160},
  {id:"a016",n:"Foie de veau",c:"viande",e:"🫀",p:21,l:5,g:4,cal:140},
  {id:"a017",n:"Côte de porc maigre",c:"viande",e:"🥩",p:26,l:10,g:0,cal:195},
  {id:"a018",n:"Rôti de porc",c:"viande",e:"🍖",p:27,l:8,g:0,cal:180},
  {id:"a019",n:"Saucisse de volaille",c:"viande",e:"🌭",p:17,l:12,g:2,cal:180},
  {id:"a020",n:"Boudin noir",c:"viande",e:"🥓",p:15,l:30,g:3,cal:350},

  // ========== POISSONS & FRUITS DE MER (25) ==========
  {id:"a100",n:"Saumon frais",c:"poisson",e:"🐟",p:20,l:13,g:0,cal:200},
  {id:"a101",n:"Saumon fumé",c:"poisson",e:"🐟",p:23,l:12,g:0,cal:200},
  {id:"a102",n:"Truite",c:"poisson",e:"🐟",p:20,l:7,g:0,cal:140},
  {id:"a103",n:"Cabillaud",c:"poisson",e:"🐟",p:18,l:0.7,g:0,cal:82},
  {id:"a104",n:"Colin / Lieu noir",c:"poisson",e:"🐟",p:17,l:1,g:0,cal:80},
  {id:"a105",n:"Daurade",c:"poisson",e:"🐟",p:19,l:2,g:0,cal:100},
  {id:"a106",n:"Bar / Loup",c:"poisson",e:"🐟",p:20,l:4,g:0,cal:120},
  {id:"a107",n:"Sole",c:"poisson",e:"🐟",p:17,l:1.5,g:0,cal:90},
  {id:"a108",n:"Merlu",c:"poisson",e:"🐟",p:17,l:1,g:0,cal:80},
  {id:"a109",n:"Maquereau",c:"poisson",e:"🐟",p:19,l:14,g:0,cal:205},
  {id:"a110",n:"Sardines fraîches",c:"poisson",e:"🐟",p:20,l:10,g:0,cal:175},
  {id:"a111",n:"Sardines à l'huile (égoutées)",c:"poisson",e:"🥫",p:24,l:10,g:0,cal:195},
  {id:"a112",n:"Thon frais",c:"poisson",e:"🐟",p:24,l:4,g:0,cal:140},
  {id:"a113",n:"Thon au naturel (boîte)",c:"poisson",e:"🥫",p:26,l:0.5,g:0,cal:110},
  {id:"a114",n:"Thon à l'huile (égouté)",c:"poisson",e:"🥫",p:25,l:8,g:0,cal:185},
  {id:"a115",n:"Hareng fumé",c:"poisson",e:"🐟",p:20,l:13,g:0,cal:200},
  {id:"a116",n:"Anchois",c:"poisson",e:"🐟",p:21,l:10,g:0,cal:175},
  {id:"a117",n:"Crevettes cuites",c:"fruitsmer",e:"🦐",p:20,l:1,g:0,cal:90},
  {id:"a118",n:"Gambas",c:"fruitsmer",e:"🦐",p:22,l:1.5,g:0,cal:105},
  {id:"a119",n:"Moules marinière",c:"fruitsmer",e:"🦪",p:12,l:2,g:3,cal:85},
  {id:"a120",n:"Saint-Jacques",c:"fruitsmer",e:"🐚",p:18,l:1,g:3,cal:90},
  {id:"a121",n:"Calamar",c:"fruitsmer",e:"🦑",p:18,l:2,g:1,cal:95},
  {id:"a122",n:"Poulpe",c:"fruitsmer",e:"🐙",p:16,l:1,g:2,cal:85},
  {id:"a123",n:"Crabe en boîte",c:"fruitsmer",e:"🦀",p:19,l:1,g:0,cal:90},
  {id:"a124",n:"Surimi",c:"fruitsmer",e:"🍥",p:11,l:1,g:12,cal:95},

  // ========== OEUFS & LAITAGES PROTÉINÉS (20) ==========
  {id:"a200",n:"Oeuf entier (1 = 60g)",c:"oeuf",e:"🥚",p:13,l:11,g:0.6,cal:155},
  {id:"a201",n:"Oeuf dur",c:"oeuf",e:"🥚",p:13,l:11,g:0.6,cal:155},
  {id:"a202",n:"Blanc d'oeuf",c:"oeuf",e:"🥚",p:11,l:0,g:0.7,cal:52},
  {id:"a203",n:"Jaune d'oeuf",c:"oeuf",e:"🥚",p:16,l:28,g:0.6,cal:325},
  {id:"a204",n:"Omelette 2 oeufs",c:"oeuf",e:"🍳",p:13,l:12,g:1,cal:165},
  {id:"a205",n:"Skyr nature",c:"laitage",e:"🫙",p:10,l:0.2,g:3.5,cal:55},
  {id:"a206",n:"Siggi's 0%",c:"laitage",e:"🫙",p:11,l:0.2,g:4,cal:60},
  {id:"a207",n:"Fromage blanc 0%",c:"laitage",e:"🥛",p:8,l:0.1,g:4,cal:50},
  {id:"a208",n:"Fromage blanc 3% MG",c:"laitage",e:"🥛",p:8,l:3,g:4,cal:75},
  {id:"a209",n:"Yaourt grec 0%",c:"laitage",e:"🍶",p:10,l:0.2,g:4,cal:60},
  {id:"a210",n:"Yaourt grec entier",c:"laitage",e:"🍶",p:6,l:9,g:4,cal:115},
  {id:"a211",n:"Yaourt nature",c:"laitage",e:"🍶",p:4,l:1,g:5,cal:50},
  {id:"a212",n:"Cottage cheese",c:"laitage",e:"🥛",p:11,l:1,g:3,cal:70},
  {id:"a213",n:"Petits-suisses 0%",c:"laitage",e:"🧀",p:10,l:0.2,g:3,cal:55},
  {id:"a214",n:"Ricotta",c:"fromage",e:"🧀",p:9,l:13,g:3,cal:175},
  {id:"a215",n:"Feta",c:"fromage",e:"🧀",p:14,l:21,g:4,cal:260},
  {id:"a216",n:"Mozzarella",c:"fromage",e:"🧀",p:18,l:17,g:1,cal:240},
  {id:"a217",n:"Chèvre frais",c:"fromage",e:"🧀",p:15,l:22,g:1,cal:265},
  {id:"a218",n:"Emmental",c:"fromage",e:"🧀",p:28,l:30,g:0,cal:380},
  {id:"a219",n:"Comté",c:"fromage",e:"🧀",p:27,l:34,g:0,cal:410},

  // ========== LÉGUMES CUITS (30) ==========
  {id:"a300",n:"Brocolis cuits",c:"legume",e:"🥦",p:3,l:0.4,g:5,cal:35},
  {id:"a301",n:"Chou-fleur cuit",c:"legume",e:"🥬",p:2,l:0.3,g:4,cal:25},
  {id:"a302",n:"Chou romanesco",c:"legume",e:"🥦",p:3,l:0.3,g:4,cal:30},
  {id:"a303",n:"Courgettes cuites",c:"legume",e:"🟢",p:1,l:0.2,g:3,cal:18},
  {id:"a304",n:"Aubergines cuites",c:"legume",e:"🍆",p:1,l:0.2,g:6,cal:30},
  {id:"a305",n:"Poivrons cuits",c:"legume",e:"🫑",p:1,l:0.3,g:6,cal:30},
  {id:"a306",n:"Haricots verts cuits",c:"legume",e:"🫘",p:2,l:0.3,g:7,cal:35},
  {id:"a307",n:"Haricots plats",c:"legume",e:"🫘",p:2,l:0.2,g:6,cal:32},
  {id:"a308",n:"Épinards cuits",c:"legume",e:"🌿",p:3,l:0.3,g:2,cal:25},
  {id:"a309",n:"Blettes cuites",c:"legume",e:"🌿",p:2,l:0.2,g:3,cal:25},
  {id:"a310",n:"Champignons de Paris cuits",c:"legume",e:"🍄",p:3,l:0.3,g:3,cal:28},
  {id:"a311",n:"Champignons shiitake",c:"legume",e:"🍄",p:2,l:0.5,g:7,cal:40},
  {id:"a312",n:"Asperges vertes cuites",c:"legume",e:"🌱",p:2,l:0.1,g:4,cal:22},
  {id:"a313",n:"Poireaux cuits",c:"legume",e:"🥬",p:1,l:0.3,g:6,cal:30},
  {id:"a314",n:"Chou vert cuit",c:"legume",e:"🥬",p:2,l:0.5,g:5,cal:30},
  {id:"a315",n:"Chou de Bruxelles",c:"legume",e:"🥬",p:3,l:0.5,g:7,cal:45},
  {id:"a316",n:"Choucroute crue",c:"legume",e:"🥬",p:1,l:0,g:4,cal:20},
  {id:"a317",n:"Artichaut cuit",c:"legume",e:"🌿",p:3,l:0.3,g:8,cal:50},
  {id:"a318",n:"Fenouil cuit",c:"legume",e:"🌿",p:1,l:0.2,g:6,cal:30},
  {id:"a319",n:"Endives cuites",c:"legume",e:"🥬",p:1,l:0.2,g:4,cal:22},
  {id:"a320",n:"Pak-choï cuit",c:"legume",e:"🥬",p:2,l:0.2,g:3,cal:18},
  {id:"a321",n:"Bette cuite",c:"legume",e:"🌿",p:2,l:0.2,g:3,cal:25},
  {id:"a322",n:"Courge butternut cuite",c:"legume",e:"🎃",p:1,l:0.1,g:10,cal:45},
  {id:"a323",n:"Potiron cuit",c:"legume",e:"🎃",p:1,l:0.1,g:7,cal:30},
  {id:"a324",n:"Oignon cuit",c:"legume",e:"🧅",p:1,l:0.1,g:8,cal:40},
  {id:"a325",n:"Céleri rave cuit",c:"legume",e:"🥬",p:2,l:0.3,g:6,cal:35},
  {id:"a326",n:"Topinambour cuit",c:"legume",e:"🥔",p:2,l:0,g:17,cal:75},
  {id:"a327",n:"Panais cuit",c:"legume",e:"🥕",p:1,l:0.3,g:15,cal:70},
  {id:"a328",n:"Ratatouille maison",c:"legume",e:"🍲",p:1.5,l:2,g:6,cal:55},
  {id:"a329",n:"Konjac (nouilles)",c:"legume",e:"🍜",p:0.2,l:0,g:0,cal:7},

  // ========== CRUDITÉS (20) ==========
  {id:"a400",n:"Salade verte / mesclun",c:"crudite",e:"🥬",p:1.4,l:0.2,g:3,cal:18},
  {id:"a401",n:"Laitue",c:"crudite",e:"🥬",p:1,l:0.2,g:2,cal:15},
  {id:"a402",n:"Roquette",c:"crudite",e:"🌿",p:2.6,l:0.7,g:4,cal:25},
  {id:"a403",n:"Mâche",c:"crudite",e:"🌿",p:2,l:0.4,g:4,cal:20},
  {id:"a404",n:"Épinards crus",c:"crudite",e:"🌿",p:3,l:0.4,g:4,cal:25},
  {id:"a405",n:"Tomate",c:"crudite",e:"🍅",p:0.9,l:0.2,g:4,cal:20},
  {id:"a406",n:"Tomates cerises",c:"crudite",e:"🍅",p:1,l:0.2,g:4,cal:22},
  {id:"a407",n:"Concombre",c:"crudite",e:"🥒",p:0.7,l:0.1,g:2.4,cal:14},
  {id:"a408",n:"Radis rouge",c:"crudite",e:"🔴",p:0.7,l:0.1,g:3,cal:16},
  {id:"a409",n:"Carotte râpée",c:"crudite",e:"🥕",p:0.9,l:0.2,g:7,cal:33},
  {id:"a410",n:"Céleri branche cru",c:"crudite",e:"🥬",p:0.7,l:0.2,g:3,cal:16},
  {id:"a411",n:"Betterave cuite",c:"crudite",e:"🟣",p:1.6,l:0.1,g:10,cal:43},
  {id:"a412",n:"Chou rouge cru",c:"crudite",e:"🥬",p:1.4,l:0.2,g:7,cal:31},
  {id:"a413",n:"Chou blanc cru",c:"crudite",e:"🥬",p:1.3,l:0.1,g:5,cal:25},
  {id:"a414",n:"Avocat",c:"crudite",e:"🥑",p:2,l:15,g:2,cal:160},
  {id:"a415",n:"Fenouil cru",c:"crudite",e:"🌿",p:1.2,l:0.2,g:7,cal:31},
  {id:"a416",n:"Endive crue",c:"crudite",e:"🥬",p:0.9,l:0.1,g:4,cal:17},
  {id:"a417",n:"Poivron cru",c:"crudite",e:"🫑",p:1,l:0.3,g:6,cal:26},
  {id:"a418",n:"Champignon de Paris cru",c:"crudite",e:"🍄",p:3,l:0.3,g:3,cal:22},
  {id:"a419",n:"Germes de soja",c:"crudite",e:"🌱",p:3,l:0.2,g:6,cal:30},

  // ========== FÉCULENTS (25) ==========
  {id:"a500",n:"Riz blanc cuit",c:"feculent",e:"🍚",p:2.7,l:0.3,g:28,cal:130},
  {id:"a501",n:"Riz complet cuit",c:"feculent",e:"🍚",p:2.5,l:1,g:23,cal:112},
  {id:"a502",n:"Riz basmati cuit",c:"feculent",e:"🍚",p:2.7,l:0.3,g:28,cal:130},
  {id:"a503",n:"Pâtes blanches cuites",c:"feculent",e:"🍝",p:5,l:1,g:27,cal:131},
  {id:"a504",n:"Pâtes complètes cuites",c:"feculent",e:"🍝",p:5,l:1,g:31,cal:157},
  {id:"a505",n:"Quinoa cuit",c:"feculent",e:"🌾",p:4,l:2,g:22,cal:120},
  {id:"a506",n:"Boulgour cuit",c:"feculent",e:"🌾",p:3,l:0.2,g:19,cal:83},
  {id:"a507",n:"Couscous cuit",c:"feculent",e:"🌾",p:3.8,l:0.6,g:23,cal:112},
  {id:"a508",n:"Semoule cuite",c:"feculent",e:"🌾",p:3.8,l:0.6,g:23,cal:112},
  {id:"a509",n:"Millet cuit",c:"feculent",e:"🌾",p:3.5,l:1.3,g:23,cal:119},
  {id:"a510",n:"Sarrasin cuit",c:"feculent",e:"🌾",p:3.4,l:0.6,g:20,cal:92},
  {id:"a511",n:"Orge perlé cuit",c:"feculent",e:"🌾",p:2.3,l:0.4,g:22,cal:100},
  {id:"a512",n:"Avoine (flocons)",c:"feculent",e:"🌾",p:13,l:7,g:59,cal:370},
  {id:"a513",n:"Pomme de terre cuite",c:"feculent",e:"🥔",p:2,l:0.1,g:17,cal:77},
  {id:"a514",n:"Pomme de terre vapeur",c:"feculent",e:"🥔",p:2,l:0.1,g:17,cal:77},
  {id:"a515",n:"Patate douce cuite",c:"feculent",e:"🍠",p:1.6,l:0.1,g:20,cal:86},
  {id:"a516",n:"Lentilles vertes cuites",c:"legumineuse",e:"🫘",p:9,l:0.4,g:20,cal:116},
  {id:"a517",n:"Lentilles corail cuites",c:"legumineuse",e:"🫘",p:9,l:0.4,g:20,cal:115},
  {id:"a518",n:"Pois chiches cuits",c:"legumineuse",e:"🫘",p:9,l:3,g:27,cal:165},
  {id:"a519",n:"Haricots blancs cuits",c:"legumineuse",e:"🫘",p:8,l:0.5,g:17,cal:105},
  {id:"a520",n:"Haricots rouges cuits",c:"legumineuse",e:"🔴",p:9,l:0.5,g:22,cal:127},
  {id:"a521",n:"Pois cassés cuits",c:"legumineuse",e:"🫘",p:8,l:0.4,g:17,cal:100},
  {id:"a522",n:"Fèves cuites",c:"legumineuse",e:"🫘",p:8,l:0.6,g:13,cal:88},
  {id:"a523",n:"Edamame cuits",c:"legumineuse",e:"🫘",p:11,l:5,g:8,cal:121},
  {id:"a524",n:"Tofu nature",c:"legumineuse",e:"⬜",p:8,l:5,g:2,cal:80},

  // ========== FRUITS (20) ==========
  {id:"a600",n:"Pomme",c:"fruit",e:"🍎",p:0.3,l:0.2,g:14,cal:55},
  {id:"a601",n:"Poire",c:"fruit",e:"🍐",p:0.4,l:0.1,g:15,cal:58},
  {id:"a602",n:"Banane",c:"fruit",e:"🍌",p:1.1,l:0.3,g:23,cal:95},
  {id:"a603",n:"Orange",c:"fruit",e:"🍊",p:1,l:0.2,g:12,cal:50},
  {id:"a604",n:"Clémentine",c:"fruit",e:"🍊",p:0.9,l:0.2,g:12,cal:50},
  {id:"a605",n:"Pamplemousse",c:"fruit",e:"🍊",p:0.7,l:0.1,g:9,cal:40},
  {id:"a606",n:"Citron",c:"fruit",e:"🍋",p:1,l:0.3,g:3,cal:20},
  {id:"a607",n:"Kiwi",c:"fruit",e:"🥝",p:1.1,l:0.5,g:15,cal:65},
  {id:"a608",n:"Fraises",c:"fruit",e:"🍓",p:0.8,l:0.3,g:8,cal:35},
  {id:"a609",n:"Framboises",c:"fruit",e:"🍓",p:1.1,l:0.7,g:10,cal:50},
  {id:"a610",n:"Myrtilles",c:"fruit",e:"🫐",p:0.7,l:0.3,g:12,cal:55},
  {id:"a611",n:"Mûres",c:"fruit",e:"🫐",p:1.4,l:0.5,g:9,cal:45},
  {id:"a612",n:"Cerises",c:"fruit",e:"🍒",p:1,l:0.3,g:15,cal:65},
  {id:"a613",n:"Abricot",c:"fruit",e:"🍑",p:1.4,l:0.4,g:10,cal:45},
  {id:"a614",n:"Pêche",c:"fruit",e:"🍑",p:0.9,l:0.3,g:9,cal:40},
  {id:"a615",n:"Prune",c:"fruit",e:"🍑",p:0.8,l:0.3,g:11,cal:48},
  {id:"a616",n:"Mangue",c:"fruit",e:"🥭",p:0.8,l:0.4,g:17,cal:70},
  {id:"a617",n:"Ananas",c:"fruit",e:"🍍",p:0.5,l:0.1,g:12,cal:50},
  {id:"a618",n:"Melon",c:"fruit",e:"🍈",p:0.8,l:0.2,g:8,cal:35},
  {id:"a619",n:"Pastèque",c:"fruit",e:"🍉",p:0.6,l:0.2,g:8,cal:32},

  // ========== PAINS & CÉRÉALES PDJ (15) ==========
  {id:"a700",n:"Pain complet",c:"pain",e:"🍞",p:9,l:2,g:45,cal:235},
  {id:"a701",n:"Pain blanc / baguette",c:"pain",e:"🥖",p:8,l:1,g:50,cal:250},
  {id:"a702",n:"Pain aux céréales",c:"pain",e:"🍞",p:9,l:3,g:44,cal:245},
  {id:"a703",n:"Pain de mie",c:"pain",e:"🍞",p:8,l:4,g:48,cal:265},
  {id:"a704",n:"Biscottes",c:"pain",e:"🫓",p:10,l:3,g:70,cal:350},
  {id:"a705",n:"Galettes de riz",c:"pain",e:"🍘",p:7,l:1,g:80,cal:380},
  {id:"a706",n:"Pain Wasa",c:"pain",e:"🍘",p:10,l:2,g:70,cal:340},
  {id:"a707",n:"Muesli nature",c:"cereale",e:"🥣",p:10,l:6,g:65,cal:350},
  {id:"a708",n:"Granola",c:"cereale",e:"🥣",p:9,l:12,g:60,cal:400},
  {id:"a709",n:"Flocons d'avoine",c:"cereale",e:"🌾",p:13,l:7,g:59,cal:370},
  {id:"a710",n:"Son d'avoine",c:"cereale",e:"🌾",p:17,l:7,g:50,cal:345},
  {id:"a711",n:"Corn flakes nature",c:"cereale",e:"🥣",p:7,l:1,g:84,cal:375},
  {id:"a712",n:"Croissant",c:"cereale",e:"🥐",p:7,l:22,g:43,cal:400},
  {id:"a713",n:"Pain au chocolat",c:"cereale",e:"🥐",p:8,l:22,g:48,cal:420},
  {id:"a714",n:"Brioche",c:"cereale",e:"🥐",p:9,l:15,g:50,cal:365},

  // ========== MATIÈRES GRASSES & ASSAISONNEMENT (15) ==========
  {id:"a800",n:"Huile d'olive",c:"huile",e:"🫒",p:0,l:100,g:0,cal:900},
  {id:"a801",n:"Huile de colza",c:"huile",e:"🌻",p:0,l:100,g:0,cal:900},
  {id:"a802",n:"Huile de tournesol",c:"huile",e:"🌻",p:0,l:100,g:0,cal:900},
  {id:"a803",n:"Huile de lin",c:"huile",e:"🌻",p:0,l:100,g:0,cal:900},
  {id:"a804",n:"Huile de noix",c:"huile",e:"🌰",p:0,l:100,g:0,cal:900},
  {id:"a805",n:"Beurre",c:"huile",e:"🧈",p:1,l:81,g:0.5,cal:735},
  {id:"a806",n:"Beurre allégé 40%",c:"huile",e:"🧈",p:5,l:40,g:2,cal:390},
  {id:"a807",n:"Margarine",c:"huile",e:"🧈",p:0.2,l:80,g:0,cal:720},
  {id:"a808",n:"Crème fraîche 30% MG",c:"huile",e:"🥛",p:2,l:30,g:3,cal:290},
  {id:"a809",n:"Crème liquide 4% MG",c:"huile",e:"🥛",p:3,l:4,g:4,cal:65},
  {id:"a810",n:"Crème soja",c:"huile",e:"🥛",p:2.5,l:15,g:2,cal:150},
  {id:"a811",n:"Amandes",c:"oleagineux",e:"🌰",p:21,l:51,g:10,cal:580},
  {id:"a812",n:"Noix",c:"oleagineux",e:"🌰",p:15,l:65,g:7,cal:650},
  {id:"a813",n:"Noisettes",c:"oleagineux",e:"🌰",p:15,l:61,g:7,cal:630},
  {id:"a814",n:"Graines de chia",c:"oleagineux",e:"🌱",p:17,l:31,g:42,cal:485},

  // ========== COLLATIONS PROTÉINÉES (10) ==========
  {id:"a900",n:"Entremets HP Levovia",c:"collation",e:"🍮",p:69,l:4,g:13,cal:372},
  {id:"a901",n:"Barre HP Choco Cacahuète",c:"collation",e:"🍫",p:24,l:12,g:41,cal:380},
  {id:"a902",n:"Barre HP Caramel",c:"collation",e:"🍫",p:25,l:10,g:40,cal:370},
  {id:"a903",n:"Crêpe protéinée",c:"collation",e:"🥞",p:20,l:8,g:30,cal:280},
  {id:"a904",n:"Cookie protéiné",c:"collation",e:"🍪",p:20,l:12,g:35,cal:340},
  {id:"a905",n:"Shake protéiné (30g poudre)",c:"collation",e:"🥤",p:24,l:2,g:3,cal:125},
  {id:"a906",n:"Oeuf dur (collation)",c:"collation",e:"🥚",p:13,l:11,g:0.6,cal:155},
  {id:"a907",n:"Poignée amandes (30g)",c:"collation",e:"🌰",p:21,l:51,g:10,cal:580},
  {id:"a908",n:"Fromage blanc + baies",c:"collation",e:"🫐",p:8,l:0.1,g:8,cal:60},
  {id:"a909",n:"Skyr + fruits rouges",c:"collation",e:"🍓",p:10,l:0.2,g:8,cal:65},
];

// Catégories affichables avec emoji et label
const ALIMENTS_CATS = [
  {k:"viande",l:"Viandes",e:"🥩"},
  {k:"poisson",l:"Poissons",e:"🐟"},
  {k:"fruitsmer",l:"Fruits de mer",e:"🦐"},
  {k:"oeuf",l:"Œufs",e:"🥚"},
  {k:"laitage",l:"Laitages 0%",e:"🥛"},
  {k:"fromage",l:"Fromages",e:"🧀"},
  {k:"legume",l:"Légumes cuits",e:"🥦"},
  {k:"crudite",l:"Crudités",e:"🥗"},
  {k:"feculent",l:"Féculents",e:"🍚"},
  {k:"legumineuse",l:"Légumineuses",e:"🫘"},
  {k:"fruit",l:"Fruits",e:"🍎"},
  {k:"pain",l:"Pains",e:"🍞"},
  {k:"cereale",l:"Céréales PDJ",e:"🥣"},
  {k:"huile",l:"Matières grasses",e:"🫒"},
  {k:"oleagineux",l:"Oléagineux",e:"🌰"},
  {k:"collation",l:"Collations HP",e:"🍫"},
];

// Fonction de recherche optimisée (normalisée, insensible aux accents)
function searchAliments(query){
  if(!query||query.length<2) return [];
  const q=query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  return ALIMENTS_DB.filter(a=>{
    const n=a.n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    return n.includes(q);
  }).slice(0,30); // Max 30 résultats
}

const RECETTES = [
  {id:1,titre:"Bowl saumon & avocat",emoji:"🍣",cat:"midi",temps:10,kcal:420,macros:{p:38,l:22,g:8},formules:["sucre","equilibre"],photo:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=75",tags:["poisson","rapide"],ingredients:["150g saumon fumé","1/2 avocat","100g concombre","50g edamame","1 cas tamari","Citron","Sésame"],etapes:["Trancher le saumon et l'avocat","Disposer le concombre et les edamame","Arroser de tamari et citron","Parsemer de sésame grillé"],conseil:"Idéal en lunch box. Prépare tout la veille sauf l'avocat."},
  {id:2,titre:"Omelette épinards feta",emoji:"🍳",cat:"matin",temps:8,kcal:280,macros:{p:24,l:18,g:4},formules:["sucre","equilibre"],photo:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=75",tags:["oeufs","rapide"],ingredients:["3 oeufs","80g épinards","30g feta allégée","Herbes de Provence","1 cac huile olive"],etapes:["Faire suer les épinards","Battre les oeufs et verser","Émietter la feta, plier l'omelette"],conseil:"Les épinards peuvent être remplacés par du kale."},
  {id:3,titre:"Vapeur poulet légumes",emoji:"🥦",cat:"soir",temps:20,kcal:310,macros:{p:35,l:6,g:12},formules:["sucre","equilibre"],photo:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=75",tags:["viande","léger"],ingredients:["150g blanc de poulet","Brocolis","Courgettes","Citron","Curcuma"],etapes:["Couper les légumes en morceaux égaux","Cuire vapeur 20 min","Assaisonner citron et curcuma"],conseil:"La vapeur préserve 90% des vitamines."},
  {id:4,titre:"Skyr bowl fruits rouges",emoji:"🍓",cat:"matin",temps:5,kcal:195,macros:{p:18,l:3,g:22},formules:["equilibre"],photo:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75",tags:["laitage"],ingredients:["200g skyr nature","80g fruits rouges","1 cas graines de chia","Amandes effilées"],etapes:["Verser le skyr dans un bol","Disposer les fruits rouges","Saupoudrer graines et amandes"],conseil:"Prépare-le la veille, les graines gonflent."},
  {id:5,titre:"Salade crevettes thai",emoji:"🦐",cat:"midi",temps:15,kcal:340,macros:{p:32,l:10,g:18},formules:["sucre","equilibre"],photo:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=75",tags:["fruits de mer","exotique"],ingredients:["200g crevettes cuites","Salade iceberg","Mangue","Concombre","Coriandre","Citron vert"],etapes:["Préparer la sauce citron vert","Couper mangue et concombre","Assembler avec la salade","Arroser de sauce"],conseil:"Remplace la sauce poisson par du tamari."},
  {id:6,titre:"Bowl quinoa poulet",emoji:"🥙",cat:"midi",temps:25,kcal:450,macros:{p:36,l:10,g:40},formules:["equilibre"],photo:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=75",tags:["complet","meal prep"],ingredients:["80g quinoa cuit","150g blanc de poulet","Poivrons rotis","Courgettes","Huile olive"],etapes:["Cuire le quinoa 15 min","Rotir les légumes au four","Griller le poulet","Assembler en bowl"],conseil:"Prépare en grande quantité le dimanche."}
];
const CONSEILS = [
  {id:1,titre:"Protéines au petit-déjeuner",emoji:"💪",cat:"nutrition",temps:"3 min",niveau:"Essentiel",couleur:"#1A9050",bg:"#E8FFF2",formules:["sucre","equilibre"],intro:"La plupart des femmes actives démarrent leur journée avec des glucides rapides. Résultat : fringale à 10h, coup de barre à 14h.",points:[{titre:"Satiété durable",texte:"Les protéines stimulent la GLP-1 et la PYY, deux hormones coupe-faim. Effet rassasiant jusqu'à 4-5h."},{titre:"Stabilisation glycémique",texte:"Sans pic d'insuline le matin, ton énergie reste stable toute la journée."},{titre:"Préservation musculaire",texte:"20g de protéines le matin protège ta masse maigre après une nuit de jeûne."}],action:"Cette semaine : remplace ta tartine par un skyr + 2 oeufs brouillés."},
  {id:2,titre:"Le sucre caché dans les aliments",emoji:"🍬",cat:"sans sucre",temps:"4 min",niveau:"Essentiel",couleur:"#E53935",bg:"#FFEBEE",formules:["sucre"],intro:"Le sucre ne se limite pas aux bonbons. Il se cache dans des dizaines d'aliments considérés comme sains.",points:[{titre:"Les 56 noms du sucre",texte:"Sirop de glucose, dextrose, maltodextrine... Si l'un apparaît dans les 3 premiers ingrédients, l'aliment est sucré."},{titre:"Les pièges healthy",texte:"Jus de fruits (autant de sucre qu'un soda), yaourts aux fruits (10-15g par pot), sauces industrielles."},{titre:"L'effet dopaminergique",texte:"Le sucre active les mêmes circuits de récompense. Les cravings disparaissent après 2-3 semaines de sevrage."}],action:"Cette semaine : lis les étiquettes de 5 produits sains que tu consommes."},
  {id:3,titre:"Intuition alimentaire vs comptage",emoji:"🧠",cat:"comportement",temps:"5 min",niveau:"Avancé",couleur:"#6A1B9A",bg:"#F3E5F5",formules:["equilibre"],intro:"Le programme STIMBODY ne repose pas sur le comptage calorique. Voici pourquoi.",points:[{titre:"Le paradoxe du contrôle",texte:"Plus on se restreint, plus le cerveau déclenche des envies compulsives. C'est du biologique."},{titre:"L'échelle faim/satiété",texte:"Manger entre 3 et 7 sur l'échelle synchronise mieux ton apport avec tes besoins réels."},{titre:"Pourquoi les macros restent utiles",texte:"Connaître les aliments riches en protéines vs glucides guide des choix qualitatifs sans compter."}],action:"Pendant 3 jours : note ton niveau de faim avant et après chaque repas."},
  {id:4,titre:"Hydratation : plus que boire",emoji:"💧",cat:"bien-être",temps:"4 min",niveau:"Pratique",couleur:"#1565C0",bg:"#E3F2FD",formules:["sucre","equilibre"],intro:"Tu bois 2L par jour et tu penses que c'est suffisant ? La qualité et le timing comptent autant.",points:[{titre:"Rozana vs Evian",texte:"Rozana (gazeuse) riche en bicarbonates : parfaite le jour. Evian/Volvic riches en magnésium : idéales le soir."},{titre:"Le test de l'urine",texte:"Jaune paille = bien hydratée. Jaune foncé = bois maintenant. Incolore = tu surhydrates."},{titre:"Boire AVANT de manger",texte:"Un grand verre d'eau 15 min avant chaque repas réduit les portions de 13% en moyenne."}],action:"Teste 1 semaine : verre d'eau dès le réveil, avant chaque repas, et Hépar le soir."}
];

const PDJ_EQUILIBRE = {
  supports: [
    {nom:"Pain complet / aux céréales",emoji:"🍞"},
    {nom:"Pain blanc / baguette",emoji:"🥖"},
    {nom:"Pain de mie",emoji:"🍞"},
    {nom:"Brioche",emoji:"🥐"},
    {nom:"Croissant / pain au chocolat",emoji:"🥐"},
    {nom:"Biscottes",emoji:"🫓"},
    {nom:"Galettes de riz",emoji:"🍘"},
  ],
  graisses: [
    {nom:"Beurre doux / demi-sel",emoji:"🧈"},
    {nom:"Margarine",emoji:"🧈"},
    {nom:"Beurre de cacahuète",emoji:"🥜"},
    {nom:"Purée d'amande / noisette",emoji:"🌰"},
  ],
  sucres: [
    {nom:"Confiture (fraise, abricot, framboise...)",emoji:"🍓"},
    {nom:"Miel",emoji:"🍯"},
    {nom:"Nutella / pâte à tartiner",emoji:"🍫"},
    {nom:"Caramel au beurre salé",emoji:"🍮"},
    {nom:"Sirop d'érable",emoji:"🍁"},
    {nom:"Crème de marron",emoji:"🌰"},
  ],
  cereales: [
    {nom:"Corn flakes / muesli / granola",emoji:"🥣"},
    {nom:"Chocolat chaud / cacao",emoji:"☕"},
    {nom:"Lait (entier, demi-écrémé)",emoji:"🥛"},
    {nom:"Jus d'orange pressé",emoji:"🍊"},
  ],
  proteines: [
    {nom:"Oeufs entiers (omelette, pochés, brouillés, durs)",emoji:"🥚"},
    {nom:"Blancs d'oeufs",emoji:"🥚"},
    {nom:"Yaourt grec 0%",emoji:"🍶"},
    {nom:"Skyr nature",emoji:"🫙"},
    {nom:"Fromage blanc 0%",emoji:"🥛"},
    {nom:"Cottage cheese",emoji:"🧀"},
    {nom:"Jambon blanc (0% MG)",emoji:"🥓"},
    {nom:"Saumon fumé (en petite quantité)",emoji:"🐟"},
    {nom:"Thon en boîte (eau)",emoji:"🥫"},
  ],
  legumes: [
    {nom:"Épinards frais / sautés",emoji:"🌿"},
    {nom:"Tomates",emoji:"🍅"},
    {nom:"Champignons",emoji:"🍄"},
    {nom:"Poivrons",emoji:"🫑"},
    {nom:"Concombre",emoji:"🥒"},
    {nom:"Radis",emoji:"🔴"},
    {nom:"Courgettes",emoji:"🟢"},
    {nom:"Asperges vertes",emoji:"🌱"},
  ],
  ajouts: [
    {nom:"Feta (20g max)",emoji:"🧀"},
    {nom:"Graines de chia ou de lin (10-15g)",emoji:"🌱"},
    {nom:"Avocat (50g max)",emoji:"🥑"},
    {nom:"Herbes fraîches : basilic, ciboulette, menthe, persil",emoji:"🌿"},
    {nom:"Épices : curcuma, paprika, poivre",emoji:"🌶️"},
  ],
  eviter: [
    {nom:"Pain blanc, céréales sucrées, jus de fruits industriels",emoji:"❌"},
    {nom:"Fromages gras, charcuteries grasses",emoji:"❌"},
    {nom:"Confiture, miel, viennoiseries en excès",emoji:"❌"},
  ],
};

const REEQUILIBRAGE = [
  {semaine:1,titre:"Nettoyage & Fondations",couleur:"#1A9050",bg:"#E8FFF2",objectif:"Éliminer les aliments ultra-transformés et identifier tes habitudes.",actions:["Supprimer les sodas, jus industriels, bonbons","Réduire les plats préparés à 0","Introduire 1 portion de légumes à chaque repas","Boire 1,5L d'eau minimum par jour","Tenir un journal alimentaire simple"],conseil:"Ne cherche pas la perfection. Observe sans juger."},
  {semaine:2,titre:"Protéines & Énergie",couleur:"#1565C0",bg:"#E3F2FD",objectif:"Stabiliser l'énergie en optimisant l'apport protéique.",actions:["Ajouter une source de protéines à chaque repas","Petit-déjeuner protéiné (objectif 20g minimum)","Réduire les glucides rapides du matin","Maintenir les légumes à chaque repas","Atteindre 2L d'eau par jour"],conseil:"Si tu as faim entre les repas, ajoute 30g de protéines."},
  {semaine:3,titre:"Équilibre & Diversité",couleur:"#6A1B9A",bg:"#F3E5F5",objectif:"Introduire des glucides complexes au bon moment.",actions:["Glucides complexes uniquement au déjeuner (quinoa, lentilles)","Zéro glucides rapides le soir","Varier les légumes : 5 couleurs différentes dans la semaine","2 portions de poisson gras par semaine","Réduire le sel progressivement"],conseil:"Les glucides complexes sont tes alliés le matin et le midi."},
  {semaine:4,titre:"Consolidation & Style de Vie",couleur:"#E65100",bg:"#FFF3E0",objectif:"Ancrer les nouvelles habitudes sur le long terme.",actions:["Préparer tes repas de la semaine le dimanche","Identifier tes situations à risque (stress, fatigue)","Créer ta liste de repas rapides sains (moins de 15 min)","Inventer 2 recettes avec les ingrédients du programme","Évaluer ton bilan : énergie, humeur, envies sucrées"],conseil:"Le rééquilibrage n'est pas un régime. C'est un nouveau rapport à la nourriture."}
];

function calcOne(k,g) { if(!DB[k])return{p:0,f:0,c:0,cal:0}; const f=g/100; return{p:DB[k].p*f,f:DB[k].f*f,c:DB[k].c*f,cal:DB[k].cal*f}; }
function calc(items) { return items.reduce((a,x)=>{ const parts=x.parts&&x.parts.length?x.parts:[x]; return parts.reduce((b,p)=>{ const m=calcOne(p.k,p.g); return{p:b.p+m.p,f:b.f+m.f,c:b.c+m.c,cal:b.cal+m.cal}; },a); },{p:0,f:0,c:0,cal:0}); }
function mi(k,g) { if(!DB[k])return null; const f=g/100; return{p:+(DB[k].p*f).toFixed(1),li:+(DB[k].f*f).toFixed(1),c:+(DB[k].c*f).toFixed(1),cal:Math.round(DB[k].cal*f)}; }
const ALI = {poulet:["poulet","blanc de poulet"],steak5:["steak","boeuf"],veau:["veau"],cabillaud:["cabillaud","colin"],saumon:["saumon"],maquereau:["maquereau"],daurade:["daurade","dorade"],crevettes:["crevettes"],thon:["thon"],moules:["moules"],stJacques:["saint-jacques"],oeuf:["oeuf","oeufs"],jambonDinde:["jambon","dinde"],fromageBlanc0:["fromage blanc"],blancsOeuf:["blanc oeuf"],saumonFume:["saumon fume"],entremets:["entremets","levovia"],barreHP:["barre hp"],skyr:["skyr"],yaourtGrec:["yaourt grec"],cottageCheese:["cottage"],legumes:["salade","tomate","concombre","brocoli","epinard","haricot","courgette","champignon","poivron","aubergine","radis","endive","chou","konjac","legume"]};
const nr = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
function fk(name) { const n=nr(name.trim()); for(const[k,l]of Object.entries(ALI))for(const a of l)if(n===nr(a)||n.includes(nr(a))||nr(a).includes(n))return k; return"legumes"; }
function parseMeal(txt) { if(!txt.trim())return[]; return txt.split(/\s*\+\s*/).map(p=>{ const m=p.trim().match(/^(\d+)\s*g?\s+(?:de\s+|d[' ])?(.+)$/i); if(!m)return null; const g=parseInt(m[1]),foodRaw=m[2].trim(),k=fk(foodRaw); return{n:`${g}g de ${foodRaw}`,k,g,foodRaw}; }).filter(Boolean); }


function generatePlan(prefs) {
  const {breakfast,proteins,legumes} = prefs;
  if(!proteins.length||!legumes.length||!breakfast.length) return null;
  const pInfo = k => PROTO_LIST.find(p=>p.k===k);
  const lInfo = k => LEG_LIST.find(l=>l.k===k);
  const lLabel = k => lInfo(k)?.label||k;
  const pdjInfo = k => PDJ_LIST.find(p=>p.k===k)||PROTO_LIST.find(p=>p.k===k);
  const crudites = legumes.filter(k=>lInfo(k)?.tag==="cru");
  const legCuits = legumes.filter(k=>lInfo(k)?.tag==="cuit");
  const mainPool = proteins.map(k=>pInfo(k)).filter(p=>p&&["viande","poisson","fruitsmer"].includes(p.cat));
  const compPool = proteins.map(k=>pInfo(k)).filter(p=>p&&["leger","laitage"].includes(p.cat));
  const hasOeuf = proteins.includes("oeuf");
  const soirPool = proteins.map(k=>pInfo(k)).filter(p=>p&&["leger","laitage"].includes(p.cat));
  const matinPool = [];
  breakfast.forEach(k=>{
    const info=pdjInfo(k); if(!info)return;
    if(["entremets","barreHP","skyr","siggis","yaourtGrec","fromageBlanc0","cottageCheese","thon"].includes(k)) matinPool.push([{n:info.label,k:info.k,g:info.g}]);
    if(k==="oeuf"&&breakfast.includes("jambonDinde")) matinPool.push([{n:"2 oeufs brouillés",k:"oeuf",g:120},{n:"Jambon de dinde",k:"jambonDinde",g:60}]);
    if(k==="oeuf"&&breakfast.includes("saumonFume")) matinPool.push([{n:"2 oeufs brouillés",k:"oeuf",g:120},{n:"Saumon fumé",k:"saumonFume",g:60}]);
    if(k==="oeuf"&&!breakfast.includes("jambonDinde")&&!breakfast.includes("saumonFume")) matinPool.push([{n:"2 oeufs brouillés",k:"oeuf",g:120}]);
    if(k==="blancsOeuf"&&breakfast.includes("oeuf")) matinPool.push([{n:"Blancs d'oeufs 150ml",k:"blancsOeuf",g:150},{n:"1 oeuf entier",k:"oeuf",g:60}]);
  });
  if(!matinPool.length) matinPool.push([{n:"Entremets HP",k:"entremets",g:25}]);
  if(!mainPool.length) return null;
  const viandes=mainPool.filter(p=>p.cat==="viande"), poissons=mainPool.filter(p=>p.cat==="poisson"), fruitsmer=mainPool.filter(p=>p.cat==="fruitsmer");
  const p1seq=[]; let vi=0,pi=0,fi=0;
  for(let i=0;i<25;i++) {
    const t=i%4;
    if(t===0||t===2){ if(viandes.length){p1seq.push(viandes[vi%viandes.length]);vi++;}else if(poissons.length){p1seq.push(poissons[pi%poissons.length]);pi++;}else p1seq.push(mainPool[i%mainPool.length]); }
    else if(t===1){ if(poissons.length){p1seq.push(poissons[pi%poissons.length]);pi++;}else if(viandes.length){p1seq.push(viandes[vi%viandes.length]);vi++;}else p1seq.push(mainPool[i%mainPool.length]); }
    else { const fm=[...fruitsmer,...poissons]; if(fm.length){p1seq.push(fm[fi%fm.length]);fi++;}else if(viandes.length){p1seq.push(viandes[vi%viandes.length]);vi++;}else p1seq.push(mainPool[i%mainPool.length]); }
  }
  const days=[];
  for(let i=0;i<25;i++) {
    const matin=matinPool[i%matinPool.length], p1=p1seq[i];
    let p2=null; const compOptions=[...compPool].filter(p=>p.k!==p1.k);
    if(compOptions.length) p2=compOptions[(i+7)%compOptions.length];
    else if(hasOeuf&&p1.k!=="oeuf") p2={k:"oeuf",label:"2 oeufs durs",g:120,cat:"laitage"};
    const cruMidi=crudites.length?crudites[i%crudites.length]:null;
    const saladePLabel=p2?p2.label:"Jambon de dinde", saladePKey=p2?p2.k:"jambonDinde", saladePG=p2?(p2.cat==="oeuf"?120:p2.g):60;
    const prepLabel = k => { const preps={saumon:["grillé","mariné yaourt 0%","en papillote","poché citron"],cabillaud:["vapeur","poché","au four"],daurade:["au four","poêlée"],maquereau:["grillé","au four"],poulet:["grillé","mariné yaourt-épices","brochettes","sauté"],steak5:["poêlé","grillé","haché"],veau:["escalope poêlée"],crevettes:["sautées épices","poêlées ail-persil"],moules:["vapeur","marinière"],stJacques:["poêlées"]}; const opts=preps[k]; return opts?" — "+opts[i%opts.length]:""; };
    const vegMidiA=legCuits[i%legCuits.length], vegMidiB=legCuits.length>1?legCuits[(i+4)%legCuits.length]:null;
    const vegMidiLabel=vegMidiA&&vegMidiB&&vegMidiA!==vegMidiB?lLabel(vegMidiA)+" + "+lLabel(vegMidiB):vegMidiA?lLabel(vegMidiA):"Légumes";
    const midi=[{n:"Salade "+(cruMidi?lLabel(cruMidi):"verte")+" + "+saladePLabel,k:"legumes",g:150,parts:[{k:"legumes",g:150,label:"Salade "+(cruMidi?lLabel(cruMidi):"verte")},{k:saladePKey,g:saladePG,label:saladePLabel}]},{n:p1.label+prepLabel(p1.k),k:p1.k,g:p1.g},{n:vegMidiLabel,k:"legumes",g:200}];
    const soirOptions=soirPool.filter(p=>p.k!==p1.k&&p.k!==saladePKey), spPool=soirOptions.length?soirOptions:soirPool.filter(p=>p.k!==p1.k), sp=spPool.length?spPool[(i+13)%spPool.length]:null;
    const cuitSoirK=legCuits.length?legCuits[(i+6)%legCuits.length]:null, cuitSoir2K=legCuits.length>1?legCuits[(i+9)%legCuits.length]:null, cruSoirK=crudites.length?crudites[(i+3)%crudites.length]:null;
    const lCuit=cuitSoirK&&cuitSoir2K&&cuitSoirK!==cuitSoir2K?lLabel(cuitSoirK)+" + "+lLabel(cuitSoir2K):cuitSoirK?lLabel(cuitSoirK):"Légumes vapeur", lCru=cruSoirK?lLabel(cruSoirK):"Crudités";
    const soirPreps={oeuf:["oeufs brouillés aux champignons","omelette tomate-herbes"],jambonDinde:["tranches fines"],thon:["au naturel","émietté herbes"],crevettes:["poêlées ail-citron"],fromageBlanc0:["sauce herbes fraîches"],skyr:["nature herbes"],saumonFume:["tranches citronnées"]};
    const soirPrepLabel=sp?(soirPreps[sp.k]?" — "+soirPreps[sp.k][i%soirPreps[sp.k].length]:""):"";
    const soirParts=[{k:"legumes",g:200,label:lCuit+" (vapeur)"},{k:"legumes",g:150,label:lCru+" (cru)"},...(sp?[{k:sp.k,g:Math.round(sp.g*0.7||80),label:sp.label+soirPrepLabel}]:[])];
    const soir=[{n:(sp?sp.label+soirPrepLabel+" · ":"")+lCuit+" · "+lCru,k:"legumes",g:0,tag:"soir",parts:soirParts}];
    days.push({matin,midi,soir});
  }
  return days;
}

function buildCourses(plan,prefs) {
  if(!plan)return[];
  const totals={};
  plan.forEach(day=>[...day.matin,...day.midi,...day.soir].forEach(item=>{ if(item.k&&item.k!=="legumes"&&item.k!=="huileOlive") totals[item.k]=(totals[item.k]||0)+item.g; }));
  const fmt=g=>g>=1000?(g/1000).toFixed(1).replace(".0","")+" kg":Math.ceil(g/50)*50+"g";
  return[{cat:"🌅 Petit-déjeuner — 25 jours",items:PDJ_LIST.filter(p=>prefs.breakfast.includes(p.k)).map(p=>({n:p.emoji+" "+p.label,q:totals[p.k]?"~"+fmt(totals[p.k]):"—"}))},{cat:"🥩 Protéines midi & soir — 25 jours",items:PROTO_LIST.filter(p=>prefs.proteins.includes(p.k)).map(p=>({n:p.emoji+" "+p.label,q:totals[p.k]?"~"+fmt(totals[p.k]):"—"}))},{cat:"🥦 Légumes (renouveler chaque semaine)",items:LEG_LIST.filter(l=>prefs.legumes.includes(l.k)).map(l=>({n:l.emoji+" "+l.label,q:"Chaque semaine"}))},{cat:"🫒 Condiments",items:COND_LIST.filter(c=>prefs.condiments.includes(c.k)).map(c=>({n:c.emoji+" "+c.label,q:"1 flacon / pot"}))},{cat:"💧 Eaux",items:[{n:"💧 Rozana gazeuse",q:"2 casiers"},{n:"💧 Hépar plate",q:"1 casier"},{n:"💧 Evian / Volvic",q:"Magnésium soir"}]}];
}

function Ml({k,g}) { const m=mi(k,g); if(!m)return null; return(<div style={{display:"flex",gap:10,marginTop:4,paddingLeft:28}}><span style={{fontSize:9,color:"#1A6B3A"}}><strong>P</strong> {m.p}g</span><span style={{fontSize:9,color:"#1A4B8A"}}><strong>L</strong> {m.li}g</span><span style={{fontSize:9,color:"#5A3A9A"}}><strong>G</strong> {m.c}g</span><span style={{fontSize:9,color:"#8A5A00"}}><strong>kcal</strong> {m.cal}</span></div>); }
function MlParts({parts}) { const tot=parts.reduce((a,p)=>{ if(!DB[p.k])return a; const f=p.g/100; return{p:a.p+DB[p.k].p*f,li:a.li+DB[p.k].f*f,c:a.c+DB[p.k].c*f,cal:a.cal+DB[p.k].cal*f}; },{p:0,li:0,c:0,cal:0}); return(<div style={{display:"flex",gap:10,marginTop:5,paddingLeft:28}}><span style={{fontSize:9,color:"#1A6B3A"}}><strong>P</strong> {tot.p.toFixed(1)}g</span><span style={{fontSize:9,color:"#1A4B8A"}}><strong>L</strong> {tot.li.toFixed(1)}g</span><span style={{fontSize:9,color:"#5A3A9A"}}><strong>G</strong> {tot.c.toFixed(1)}g</span><span style={{fontSize:9,color:"#8A5A00"}}><strong>kcal</strong> {Math.round(tot.cal)}</span></div>); }
function Tb({items,huile}) { const all=huile?[...items,{k:"huileOlive",g:10}]:items; const m=calc(all); return(<div style={{display:"flex",background:C.navy,borderRadius:10,marginTop:10,overflow:"hidden"}}>{[{l:"Prot.",v:m.p,c:"#6EF0A0"},{l:"Lip.",v:m.f,c:"#6EC8FF"},{l:"Gluc.",v:m.c,c:"#C0A0FF"},{l:"kcal",v:m.cal,c:C.yellow}].map((x,i,arr)=>(<div key={i} style={{flex:1,textAlign:"center",padding:"7px 0",borderRight:i<arr.length-1?"1px solid rgba(255,255,255,0.1)":"none"}}><div style={{fontSize:14,fontWeight:"bold",color:x.c}}>{Math.round(x.v)}</div><div style={{fontSize:7,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1}}>{x.l}</div></div>))}</div>); }

function FItem({item,meal,idx,isSoir,isEaten,toggle}) {
  const done=isEaten(meal,idx); const tag=item.tag; const isParts=!!(item.parts&&item.parts.length>0);
  const bg=done?C.greenBg:isParts?(isSoir?"#F0F4FF":"#FFF8D6"):isSoir?(tag==="cru"?"#F0FFF6":tag==="cuit"?"#EEF2FF":"#FFF8D6"):(item.k==="legumes"?"#F5F7FF":"#FFF8D6");
  const bc=done?C.green:isParts?C.yellow:(isSoir?(tag==="cru"?"#1A8A5055":tag==="cuit"?"#1A4B8A55":C.navy+"55"):(item.k==="legumes"?C.border:C.yellow));
  return(
    <div onClick={()=>toggle(meal,idx)} style={{padding:"8px 10px",background:bg,borderRadius:9,marginBottom:5,borderLeft:"3px solid "+bc,cursor:"pointer",transition:"all 0.2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:20,height:20,borderRadius:5,flexShrink:0,border:"2px solid "+(done?C.green:C.muted),background:done?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>{done&&<span style={{color:"white",fontSize:12,fontWeight:"bold",lineHeight:1}}>✓</span>}</div>
          <span style={{fontSize:12,color:done?C.green:C.text,fontWeight:"600",textDecoration:done?"line-through":"none"}}>{item.n}</span>
        </div>
        {!isParts&&<span style={{fontSize:10,color:done?C.green:C.white,background:done?C.greenBg:C.navy,padding:"2px 8px",borderRadius:6,fontWeight:"bold",border:done?"1px solid "+C.greenBdr:"none"}}>{item.g}g</span>}
      </div>
      {isParts&&!done&&(<div style={{marginTop:5,paddingLeft:28}}>{item.parts.map((p,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,color:C.soft}}>{p.label}</span><span style={{fontSize:10,color:C.muted,background:"#EEF1FA",padding:"1px 7px",borderRadius:5,fontWeight:"bold"}}>{p.g}g</span></div>))}</div>)}
      {!done&&isParts&&<MlParts parts={item.parts}/>}
      {!done&&!isParts&&<Ml k={item.k} g={item.g}/>}
      {done&&<div style={{fontSize:9,color:C.green,marginTop:2,paddingLeft:28}}>Mangé !</div>}
    </div>
  );
}

function MCard({emoji,title,meal,items,huile,isSoir,footNote,done,count,isEditing,isCustom,inputText,parseError,onStartEdit,onConfirm,onCancel,onReset,onInputChange,isEaten,toggle}) {
  const preview=inputText.trim()?parseMeal(inputText):[]; const prevM=preview.length?calc(preview):null;
  return(
    <div style={{background:C.white,borderRadius:14,padding:13,marginBottom:10,boxShadow:"0 2px 12px rgba(13,27,75,0.08)",border:"1px solid "+(done?C.green:isCustom?C.yellow:C.border),transition:"border 0.3s"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:9}}>
        <span style={{fontSize:15}}>{emoji}</span><span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.soft,flex:1}}>{title}</span>
        {isCustom&&!done&&<span style={{fontSize:8,background:"#FFF3CC",color:"#7A5000",padding:"2px 6px",borderRadius:6,border:"1px solid "+C.yellow}}>Modifié</span>}
        {done?<span style={{fontSize:9,background:C.greenBg,color:C.green,padding:"3px 10px",borderRadius:8,fontWeight:"bold",border:"1px solid "+C.greenBdr}}>Terminé</span>:<span style={{fontSize:9,background:C.navy,color:C.yellow,padding:"2px 8px",borderRadius:8,fontWeight:"bold"}}>{count}/{items.length}</span>}
      </div>
      {items.map((item,i)=><FItem key={i} item={item} meal={meal} idx={i} isSoir={isSoir} isEaten={isEaten} toggle={toggle}/>)}
      <Tb items={items} huile={huile}/>
      {footNote&&<div style={{fontSize:9,color:C.muted,marginTop:7}}>{footNote}</div>}
      {!isEditing?(
        <div style={{display:"flex",gap:6,marginTop:10}}>
          <button onClick={onStartEdit} style={{flex:1,padding:"7px 0",background:"#F5F7FF",border:"1px dashed #C0D0E8",borderRadius:9,fontSize:11,color:C.navyL,cursor:"pointer"}}>Remplacer ce repas</button>
          {isCustom&&<button onClick={onReset} style={{padding:"7px 10px",background:"#FFF0F0",border:"1px dashed #FFAAAA",borderRadius:9,fontSize:11,color:"#CC3333",cursor:"pointer"}}>Rétablir</button>}
        </div>
      ):(
        <div style={{marginTop:10}}>
          <textarea value={inputText} onChange={onInputChange} placeholder="150g poulet + 2 oeufs + haricots verts" style={{width:"100%",padding:"10px 12px",borderRadius:9,border:"1.5px solid "+(parseError?"#FF8888":C.navy),fontSize:13,color:C.text,resize:"none",height:64,boxSizing:"border-box",fontFamily:"sans-serif",outline:"none",lineHeight:1.5}}/>
          {parseError&&<div style={{fontSize:10,color:"#CC3333",marginTop:3}}>{parseError}</div>}
          {prevM&&preview.length>0&&(<div style={{background:"#F0FFF6",border:"1px solid "+C.greenBdr,borderRadius:8,padding:"8px 10px",marginTop:6}}>{preview.map((p,i)=><div key={i} style={{fontSize:10,color:C.text,marginBottom:2}}>{p.n} — {DB[p.k]?"P "+(DB[p.k].p*p.g/100).toFixed(1)+"g · "+Math.round(DB[p.k].cal*p.g/100)+" kcal":"légumes"}</div>)}<div style={{fontSize:10,fontWeight:"bold",color:C.navy,marginTop:4,borderTop:"1px solid #C0EEDD",paddingTop:4}}>Total : Prot {Math.round(prevM.p)}g · {Math.round(prevM.cal)} kcal</div></div>)}
          <div style={{display:"flex",gap:6,marginTop:8}}>
            <button onClick={onConfirm} style={{flex:1,padding:"9px",background:C.navy,border:"none",borderRadius:9,color:C.yellow,fontSize:12,fontWeight:"bold",cursor:"pointer"}}>Valider</button>
            <button onClick={onCancel} style={{padding:"9px 14px",background:"#F5F7FF",border:"1px solid #C0D0E8",borderRadius:9,color:C.muted,fontSize:12,cursor:"pointer"}}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BJ({j,onMood,onFaim,onWater,onNote}) {
  return(
    <div style={{background:C.white,borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 12px rgba(13,27,75,0.08)",border:"1px solid "+C.border}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14}}><span style={{fontSize:16}}>📓</span><span style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.soft,fontWeight:"bold"}}>Bilan de la journée</span></div>
      <div style={{marginBottom:14}}><div style={{fontSize:11,color:C.navy,fontWeight:"bold",marginBottom:8}}>Comment tu te sens ?</div><div style={{display:"flex",gap:5}}>{MOODS.map(m=>(<button key={m.v} onClick={()=>onMood(m.v)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 4px",borderRadius:10,cursor:"pointer",flex:1,background:j.mood===m.v?C.navy:"#F5F7FF",border:j.mood===m.v?"2px solid "+C.yellow:"2px solid "+C.border,transition:"all 0.2s"}}><span style={{fontSize:18}}>{m.e}</span><span style={{fontSize:7,color:j.mood===m.v?C.yellow:C.muted,fontWeight:j.mood===m.v?"bold":"normal",textAlign:"center"}}>{m.l}</span></button>))}</div></div>
      <div style={{marginBottom:14}}><div style={{fontSize:11,color:C.navy,fontWeight:"bold",marginBottom:8}}>Niveau de faim</div><div style={{display:"flex",gap:6}}>{FAIM.map(f=>(<button key={f.v} onClick={()=>onFaim(f.v)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 6px",borderRadius:10,cursor:"pointer",flex:1,background:j.faim===f.v?C.navy:"#F5F7FF",border:j.faim===f.v?"2px solid "+C.yellow:"2px solid "+C.border,transition:"all 0.2s"}}><span style={{fontSize:18}}>{f.e}</span><span style={{fontSize:7,color:j.faim===f.v?C.yellow:C.muted,textAlign:"center",fontWeight:j.faim===f.v?"bold":"normal",lineHeight:1.2}}>{f.l}</span></button>))}</div></div>
      <div style={{marginBottom:14}}><div style={{fontSize:11,color:C.navy,fontWeight:"bold",marginBottom:8}}>Hydratation 2L</div><button onClick={onWater} style={{width:"100%",padding:"12px",borderRadius:10,cursor:"pointer",background:j.water?"#E8F4FF":"#F5F7FF",border:j.water?"2px solid #1A6BB0":"2px solid "+C.border,display:"flex",alignItems:"center",gap:10,transition:"all 0.2s"}}><div style={{width:24,height:24,borderRadius:6,border:"2px solid "+(j.water?"#1A6BB0":"#C0D0E8"),background:j.water?"#1A6BB0":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{j.water&&<span style={{color:"white",fontSize:14,fontWeight:"bold"}}>✓</span>}</div><span style={{fontSize:13,color:j.water?"#1A6BB0":C.muted,fontWeight:j.water?"bold":"normal"}}>{j.water?"J'ai bu mes 2 litres !":"J'ai bu mes 2 litres ?"}</span><span style={{fontSize:18,marginLeft:"auto"}}>{j.water?"💧":"🫙"}</span></button></div>
      <div><div style={{fontSize:11,color:C.navy,fontWeight:"bold",marginBottom:8}}>Tes notes du jour</div><textarea value={j.note} onChange={e=>onNote(e.target.value)} placeholder="J'ai rajouté 1 yaourt... J'ai eu faim vers 17h..." style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1.5px solid "+C.border,fontSize:13,color:C.text,resize:"none",height:80,boxSizing:"border-box",fontFamily:"sans-serif",outline:"none",lineHeight:1.6,background:"#FAFBFF"}}/></div>
      {(j.mood||j.faim||j.water)&&(<div style={{marginTop:12,padding:"8px 12px",background:"#F5F7FF",borderRadius:9,border:"1px solid "+C.border,fontSize:11,color:C.navyL}}>{j.mood&&<span>{MOODS.find(m=>m.v===j.mood).e} {MOODS.find(m=>m.v===j.mood).l} </span>}{j.faim&&<span>{FAIM.find(f=>f.v===j.faim).e} {FAIM.find(f=>f.v===j.faim).l} </span>}{j.water&&<span>💧 2L ✓</span>}</div>)}
    </div>
  );
}

function MoodTick({x,y,payload}) { const e={5:"😄",4:"😊",3:"😐",2:"😔",1:"😤"}; return <text x={x} y={y+4} textAnchor="middle" fontSize={10}>{e[payload.value]||""}</text>; }
function ChartTooltip({active,payload,label}) { if(!active||!payload||!payload.length)return null; return(<div style={{background:C.navy,borderRadius:8,padding:"7px 11px",fontSize:11,color:C.white,minWidth:110}}><div style={{color:C.yellow,fontWeight:"bold",marginBottom:3}}>Jour {label}</div>{payload.map((p,i)=>(<div key={i} style={{color:p.color||C.white}}>{p.name}: <strong>{isNaN(p.value)?"-":Math.round(p.value)}</strong></div>))}</div>); }

function Analytics({chartData,clientName}) {
  const filled=chartData.filter(d=>d.calActual>0||d.mood||d.faim);
  const avgCal=filled.length?Math.round(filled.reduce((a,d)=>a+d.calActual,0)/filled.length):0;
  const avgProt=filled.length?Math.round(filled.reduce((a,d)=>a+d.protActual,0)/filled.length):0;
  const waterDays=filled.filter(d=>d.water).length;
  if(!filled.length) return(<div style={{padding:"50px 20px",textAlign:"center"}}><div style={{fontSize:44,marginBottom:12}}>📊</div><div style={{fontSize:14,color:C.navy,fontWeight:"bold",marginBottom:8}}>Les courbes apparaissent ici</div><div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>Coche tes repas onglet Repas et remplis le bilan du jour.</div></div>);
  return(
    <div style={{padding:"14px 12px 30px"}}>
      <div style={{fontSize:10,color:C.muted,textAlign:"center",marginBottom:14}}>Tableau de bord · {clientName} · {filled.length} jour{filled.length>1?"s":""} suivi{filled.length>1?"s":""}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>{[{l:"Moy. kcal/jour",v:avgCal,u:"kcal",c:C.yellow},{l:"Moy. protéines",v:avgProt,u:"g/j",c:"#6EF0A0"},{l:"Jours hydratés",v:waterDays+"/"+filled.length,c:"#6EC8FF"},{l:"Jours suivis",v:filled.length,u:"/25",c:"#C0A0FF"}].map((k,i)=>(<div key={i} style={{background:C.white,borderRadius:12,padding:"12px 14px",boxShadow:"0 2px 8px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{k.l}</div><div style={{fontSize:20,fontWeight:"bold",color:k.c}}>{k.v}{k.u&&<span style={{fontSize:10,color:C.muted,marginLeft:3}}>{k.u}</span>}</div></div>))}</div>
      <div style={{background:C.white,borderRadius:14,padding:14,marginBottom:12,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}><div style={{fontSize:11,fontWeight:"bold",color:C.navy,marginBottom:12}}>Calories consommées vs objectif</div><ResponsiveContainer width="100%" height={180}><ComposedChart data={chartData} margin={{top:5,right:10,left:-20,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#EEF1FA"/><XAxis dataKey="day" tick={{fontSize:9,fill:C.muted}} tickFormatter={v=>"J"+v}/><YAxis tick={{fontSize:9,fill:C.muted}}/><Tooltip content={<ChartTooltip/>}/><Bar dataKey="calActual" name="kcal réelles" fill={C.yellow} radius={[4,4,0,0]} opacity={0.85}/><Line dataKey="calPlanned" name="Objectif" stroke={C.navy} strokeWidth={2} dot={false} strokeDasharray="5 5"/></ComposedChart></ResponsiveContainer></div>
      {filled.some(d=>d.mood||d.faim)&&(<div style={{background:C.white,borderRadius:14,padding:14,marginBottom:12,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}><div style={{fontSize:11,fontWeight:"bold",color:C.navy,marginBottom:12}}>Humeur et faim au fil des jours</div><ResponsiveContainer width="100%" height={180}><ComposedChart data={chartData} margin={{top:5,right:5,left:-10,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#EEF1FA"/><XAxis dataKey="day" tick={{fontSize:9,fill:C.muted}} tickFormatter={v=>"J"+v}/><YAxis yAxisId="mood" domain={[1,5]} tick={<MoodTick/>} width={28}/><YAxis yAxisId="faim" orientation="right" domain={[1,3]} tick={{fontSize:9,fill:"#C0A0FF"}} width={24}/><Tooltip content={<ChartTooltip/>}/><Legend iconSize={8} wrapperStyle={{fontSize:10}}/><Line yAxisId="mood" type="monotone" dataKey="mood" name="Humeur" stroke={C.yellow} strokeWidth={2.5} dot={{r:3,fill:C.yellow}} connectNulls/><Line yAxisId="faim" type="monotone" dataKey="faim" name="Faim" stroke="#C0A0FF" strokeWidth={2} dot={{r:3,fill:"#C0A0FF"}} connectNulls/></ComposedChart></ResponsiveContainer></div>)}
    </div>
  );
}

function CheckRow({item,cat,prefs,toggle}) {
  const on=prefs[cat]?.includes(item.k);
  return(<div onClick={()=>toggle(cat,item.k)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",background:on?"#FFF8D6":"#FAFBFF",borderRadius:9,marginBottom:5,cursor:"pointer",border:"1px solid "+(on?C.yellow:C.border),transition:"all 0.2s"}}><div style={{width:22,height:22,borderRadius:6,border:"2px solid "+(on?C.yellow:C.muted),background:on?C.yellow:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<span style={{color:C.navy,fontSize:13,fontWeight:"900",lineHeight:1}}>✓</span>}</div><span style={{fontSize:16}}>{item.emoji}</span><span style={{fontSize:13,color:on?C.navy:C.soft,fontWeight:on?"600":"normal",flex:1}}>{item.label}</span>{item.cat&&<span style={{fontSize:8,color:C.muted,background:"#EEF1FA",padding:"2px 6px",borderRadius:6}}>{item.cat==="viande"?"🥩 viande":item.cat==="poisson"?"🐟 poisson":item.cat==="fruitsmer"?"🦐 mer":item.cat==="leger"?"✨ complément":item.cat==="laitage"?"🥛 laitage":""}</span>}</div>);
}


const PROTO_CATS = [
  {key:"viande", label:"🥩 Viandes", color:"#C62828"},
  {key:"poisson", label:"🐟 Poissons", color:"#1565C0"},
  {key:"fruitsmer", label:"🦐 Fruits de mer", color:"#00695C"},
  {key:"leger", label:"✨ Protéines légères", color:"#E65100"},
  {key:"laitage", label:"🥛 Laitages protéinés", color:"#6A1B9A"},
];

function ProfilTab({prefs,setPrefs,onGenerate}) {
  const toggle=(cat,k)=>setPrefs(p=>({...p,[cat]:p[cat]?.includes(k)?p[cat].filter(x=>x!==k):[...(p[cat]||[]),k]}));
  const selectAll=(cat,list)=>setPrefs(p=>({...p,[cat]:list.map(x=>x.k)}));
  const clearAll=cat=>setPrefs(p=>({...p,[cat]:[]}));

  const PDJ_CATS = [
    {key:"proteines", label:"🥚 Protéines", color:"#1A9050"},
    {key:"fruits", label:"🍎 Fruits", color:"#E53935"},
    {key:"cereales", label:"🍞 Céréales & Pain", color:"#E65100"},
    {key:"matieres", label:"🧈 Matières grasses", color:"#7A5000"},
    {key:"sucres", label:"🍓 Sucrés à tartiner", color:"#C2185B"},
  ];
  const [openCat, setOpenCat] = useState(null);

  const SectionGrouped = ({title,emoji,cat,list}) => {
    const toggle2 = (c) => setOpenCat(openCat===c?null:c);
    const totalSelected = (prefs[cat]||[]).length;
    return(
      <div style={{background:C.white,borderRadius:14,padding:13,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
          <span style={{fontSize:16}}>{emoji}</span>
          <span style={{fontSize:11,fontWeight:"bold",color:C.navy,flex:1}}>{title}</span>
          <span style={{fontSize:9,background:C.navy,color:C.yellow,padding:"2px 8px",borderRadius:8,fontWeight:"bold"}}>{totalSelected}/{list.length}</span>
        </div>
        {PDJ_CATS.map(catObj=>{
          const items = list.filter(x=>x.cat===catObj.key);
          if(!items.length) return null;
          const isOpen = openCat===catObj.key;
          const selectedCount = items.filter(x=>(prefs[cat]||[]).includes(x.k)).length;
          return(
            <div key={catObj.key} style={{marginBottom:6,borderRadius:10,overflow:"hidden",border:"1px solid "+C.border}}>
              <div onClick={()=>toggle2(catObj.key)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:isOpen?"#F5F7FF":C.white,cursor:"pointer"}}>
                <span style={{fontSize:12,fontWeight:600,color:catObj.color}}>{catObj.label}</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {selectedCount>0&&<span style={{fontSize:10,background:catObj.color,color:"white",padding:"1px 7px",borderRadius:10,fontWeight:700}}>{selectedCount}</span>}
                  <span style={{fontSize:12,color:C.muted}}>{isOpen?"▲":"▼"}</span>
                </div>
              </div>
              {isOpen&&(
                <div style={{padding:"6px 8px 8px",background:"#FAFBFF"}}>
                  {items.map(item=><CheckRow key={item.k} item={item} cat={cat} prefs={prefs} toggle={toggle}/>)}
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <button onClick={()=>setPrefs(p=>({...p,[cat]:[...(p[cat]||[]).filter(k=>!items.map(i=>i.k).includes(k)),...items.map(i=>i.k)]}))} style={{flex:1,padding:"5px 0",background:"#F5F7FF",border:"1px solid "+C.border,borderRadius:7,fontSize:10,color:C.navyL,cursor:"pointer"}}>Tout cocher</button>
                    <button onClick={()=>setPrefs(p=>({...p,[cat]:(p[cat]||[]).filter(k=>!items.map(i=>i.k).includes(k))}))} style={{flex:1,padding:"5px 0",background:"#FFF5F5",border:"1px solid #FFCCCC",borderRadius:7,fontSize:10,color:"#CC3333",cursor:"pointer"}}>Tout effacer</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const Section=({title,emoji,info,cat,list,groupBy})=>(
    <div style={{background:C.white,borderRadius:14,padding:13,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:info?4:12}}><span style={{fontSize:16}}>{emoji}</span><span style={{fontSize:11,fontWeight:"bold",color:C.navy,flex:1}}>{title}</span><span style={{fontSize:9,background:C.navy,color:C.yellow,padding:"2px 8px",borderRadius:8,fontWeight:"bold"}}>{(prefs[cat]||[]).length}/{list.length}</span></div>
      {info&&<div style={{fontSize:10,color:C.muted,marginBottom:10,lineHeight:1.5,background:"#F5F7FF",padding:"7px 10px",borderRadius:8}}>{info}</div>}
      {groupBy?(<><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>Crudités</div>{list.filter(x=>x.tag==="cru").map(item=><CheckRow key={item.k} item={item} cat={cat} prefs={prefs} toggle={toggle}/>)}<div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:2,marginBottom:8,marginTop:12}}>Légumes cuits</div>{list.filter(x=>x.tag==="cuit").map(item=><CheckRow key={item.k} item={item} cat={cat} prefs={prefs} toggle={toggle}/>)}</>):list.map(item=><CheckRow key={item.k} item={item} cat={cat} prefs={prefs} toggle={toggle}/>)}
      <div style={{display:"flex",gap:6,marginTop:10}}><button onClick={()=>selectAll(cat,list)} style={{flex:1,padding:"6px 0",background:"#F5F7FF",border:"1px solid "+C.border,borderRadius:8,fontSize:11,color:C.navyL,cursor:"pointer"}}>Tout cocher</button><button onClick={()=>clearAll(cat)} style={{flex:1,padding:"6px 0",background:"#FFF5F5",border:"1px solid #FFCCCC",borderRadius:8,fontSize:11,color:"#CC3333",cursor:"pointer"}}>Tout effacer</button></div>
    </div>
  );

  const [openCat2, setOpenCat2] = useState(null);
  const CatSection = ({label, catKey, color, items, prefs, cat, toggle, setPrefs}) => {
    const isOpen = openCat2 === catKey;
    const selectedCount = items.filter(x=>(prefs[cat]||[]).includes(x.k)).length;
    return(
      <div style={{marginBottom:6,borderRadius:12,overflow:"hidden",border:"1px solid "+(isOpen?color:C.border),boxShadow:"0 1px 6px rgba(13,27,75,0.06)"}}>
        <div onClick={()=>setOpenCat2(isOpen?null:catKey)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:isOpen?"#F5F7FF":C.white,cursor:"pointer"}}>
          <span style={{fontSize:13,fontWeight:700,color:color}}>{label}</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,color:C.muted}}>{items.length} aliments</span>
            {selectedCount>0&&<span style={{fontSize:10,background:color,color:"white",padding:"2px 8px",borderRadius:10,fontWeight:700}}>{selectedCount} ✓</span>}
            <span style={{fontSize:14,color:C.muted,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
          </div>
        </div>
        {isOpen&&(
          <div style={{padding:"6px 10px 10px",background:"#FAFBFF"}}>
            {items.map(item=><CheckRow key={item.k} item={item} cat={cat} prefs={prefs} toggle={toggle}/>)}
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <button onClick={()=>setPrefs(p=>({...p,[cat]:[...(p[cat]||[]).filter(k=>!items.map(i=>i.k).includes(k)),...items.map(i=>i.k)]}))} style={{flex:1,padding:"6px 0",background:"#F5F7FF",border:"1px solid "+C.border,borderRadius:8,fontSize:11,color:C.navyL,cursor:"pointer"}}>Tout cocher</button>
              <button onClick={()=>setPrefs(p=>({...p,[cat]:(p[cat]||[]).filter(k=>!items.map(i=>i.k).includes(k))}))} style={{flex:1,padding:"6px 0",background:"#FFF5F5",border:"1px solid #FFCCCC",borderRadius:8,fontSize:11,color:"#CC3333",cursor:"pointer"}}>Tout effacer</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const nPdj=(prefs.breakfast||[]).length;
  const nMain=PROTO_LIST.filter(p=>["viande","poisson","fruitsmer"].includes(p.cat)&&(prefs.proteins||[]).includes(p.k)).length;
  const nComp=PROTO_LIST.filter(p=>["leger","laitage"].includes(p.cat)&&(prefs.proteins||[]).includes(p.k)).length;
  const nCru=(prefs.legumes||[]).filter(k=>LEG_LIST.find(x=>x.k===k)?.tag==="cru").length;
  const nCuit=(prefs.legumes||[]).filter(k=>LEG_LIST.find(x=>x.k===k)?.tag==="cuit").length;
  const ready=nPdj>=1&&nMain>=1&&nComp>=1&&nCru>=1&&nCuit>=1;
  return(
    <div style={{padding:"14px 12px 30px"}}>
      <div style={{background:"#FFF8D6",border:"1px solid "+C.yellow,borderRadius:12,padding:"12px 14px",marginBottom:14}}><div style={{fontSize:11,fontWeight:"bold",color:"#7A5000",marginBottom:6}}>Comment ça marche</div><div style={{fontSize:11,color:"#7A5000",lineHeight:1.6}}>Coche tes aliments dans chaque catégorie. L'app génère 25 jours sur mesure avec les bonnes associations.</div></div>
      <SectionGrouped title="Petit-déjeuner" emoji="🌅" cat="breakfast" list={PDJ_LIST}/>
      <CatSection label="🥩 Protéines" catKey="proteines" color="#C62828" items={PROTO_LIST} prefs={prefs} cat="proteins" toggle={toggle} setPrefs={setPrefs}/>
      <CatSection label="🍚 Féculents" catKey="feculents" color="#E65100" items={LEG_LIST.filter(x=>x.tag==="feculent")} prefs={prefs} cat="legumes" toggle={toggle} setPrefs={setPrefs}/>
      <CatSection label="🥦 Légumes cuits" catKey="legcuits" color="#1565C0" items={LEG_LIST.filter(x=>x.tag==="cuit")} prefs={prefs} cat="legumes" toggle={toggle} setPrefs={setPrefs}/>
      <CatSection label="🫘 Légumineuses" catKey="legumineuses" color="#6A1B9A" items={LEG_LIST.filter(x=>x.tag==="legumineuse")} prefs={prefs} cat="legumes" toggle={toggle} setPrefs={setPrefs}/>
      <CatSection label="🥗 Crudités" catKey="crudites" color="#1A9050" items={LEG_LIST.filter(x=>x.tag==="cru")} prefs={prefs} cat="legumes" toggle={toggle} setPrefs={setPrefs}/>
      <CatSection label="🫒 Assaisonnement" catKey="assaiso" color="#4A148C" items={COND_LIST} prefs={prefs} cat="condiments" toggle={toggle} setPrefs={setPrefs}/>

      <div style={{background:"#EEF1FA",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.soft,lineHeight:1.6}}>🌅 Petit-déj : {nPdj} · 🥩 Plat principal : {nMain} · 🥚 Complément : {nComp} · 🥬 Crudités : {nCru} · 🥦 Légumes cuits : {nCuit}</div>
      <button onClick={onGenerate} disabled={!ready} style={{width:"100%",padding:"16px",background:ready?C.navy:"#C0C8D8",border:"none",borderRadius:14,color:ready?C.yellow:C.white,fontSize:15,fontWeight:"900",cursor:ready?"pointer":"not-allowed",transition:"all 0.3s"}}>{ready?"⚡ Générer mon plan personnalisé":"Sélectionne les aliments pour continuer"}</button>
    </div>
  );
}



function BiblioRecettes({formule}) {
  const [filtre,setFiltre]=useState("tous");
  const [selected,setSelected]=useState(null);
  const filtres=[{k:"tous",l:"Tous"},{k:"matin",l:"🌅 Matin"},{k:"midi",l:"☀️ Midi"},{k:"soir",l:"🌙 Soir"}];
  const liste=(filtre==="tous"?RECETTES:RECETTES.filter(r=>r.cat===filtre)).filter(r=>!formule||r.formules.includes(formule));
  if(selected) {
    const r=RECETTES.find(x=>x.id===selected);
    return(
      <div style={{padding:"0 0 40px"}}>
        <button onClick={()=>setSelected(null)} style={{display:"flex",alignItems:"center",gap:6,padding:"14px 16px",background:C.white,border:"none",borderBottom:"1px solid "+C.border,width:"100%",cursor:"pointer",fontSize:12,color:C.soft}}>← Retour aux recettes</button>
        <div style={{position:"relative",height:200,overflow:"hidden",background:"#EEF1FA"}}><img src={r.photo} alt={r.titre} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/><div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(13,27,75,0.9))",padding:"20px 16px 12px"}}><div style={{fontSize:20,fontWeight:900,color:C.white}}>{r.emoji} {r.titre}</div></div></div>
        <div style={{padding:"12px 14px 0"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{r.tags.map(t=><span key={t} style={{fontSize:10,background:"#EEF1FA",color:C.soft,padding:"3px 8px",borderRadius:20}}>{t}</span>)}<span style={{fontSize:10,background:"#FFF8D6",color:"#7A5000",padding:"3px 8px",borderRadius:20}}>⏱ {r.temps} min</span></div>
          <div style={{background:C.navy,borderRadius:12,padding:"12px 14px",marginBottom:12,display:"flex"}}>{[{v:r.kcal,l:"kcal",c:C.yellow},{v:r.macros.p,l:"Prot.",c:"#6EF0A0",u:"g"},{v:r.macros.l,l:"Lip.",c:"#6EC8FF",u:"g"},{v:r.macros.g,l:"Gluc.",c:"#C0A0FF",u:"g"}].map((x,i,arr)=>(<div key={i} style={{flex:1,textAlign:"center",borderRight:i<arr.length-1?"1px solid rgba(255,255,255,0.1)":"none"}}><div style={{fontSize:18,fontWeight:900,color:x.c}}>{x.v}{x.u||""}</div><div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>{x.l}</div></div>))}</div>
          <div style={{background:C.white,borderRadius:12,border:"1px solid "+C.border,padding:"14px",marginBottom:10}}><div style={{fontSize:11,fontWeight:700,color:C.navy,marginBottom:10}}>INGRÉDIENTS</div>{r.ingredients.map((ing,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<r.ingredients.length-1?"1px solid "+C.border:"none"}}><div style={{width:6,height:6,borderRadius:"50%",background:C.yellow,flexShrink:0}}/><span style={{fontSize:12,color:C.soft}}>{ing}</span></div>))}</div>
          <div style={{background:C.white,borderRadius:12,border:"1px solid "+C.border,padding:"14px",marginBottom:10}}><div style={{fontSize:11,fontWeight:700,color:C.navy,marginBottom:10}}>PRÉPARATION</div>{r.etapes.map((e,i)=>(<div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<r.etapes.length-1?"1px solid "+C.border:"none"}}><div style={{width:22,height:22,borderRadius:"50%",background:C.navy,color:C.yellow,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div><span style={{fontSize:12,color:C.soft,lineHeight:1.5,paddingTop:2}}>{e}</span></div>))}</div>
          <div style={{background:C.greenBg,border:"1px solid "+C.green+"40",borderRadius:10,padding:"10px 14px"}}><span style={{fontSize:11,color:C.green,fontWeight:700}}>💡 Conseil Dominique : </span><span style={{fontSize:11,color:"#1A4B2A"}}>{r.conseil}</span></div>
        </div>
      </div>
    );
  }
  return(
    <div style={{padding:"14px 14px 40px"}}>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>{filtres.map(f=><button key={f.k} onClick={()=>setFiltre(f.k)} style={{padding:"7px 14px",borderRadius:20,border:"none",whiteSpace:"nowrap",background:filtre===f.k?C.navy:C.white,color:filtre===f.k?C.yellow:C.soft,fontSize:11,fontWeight:filtre===f.k?700:400,cursor:"pointer",boxShadow:"0 1px 6px rgba(13,27,75,0.08)"}}>{f.l}</button>)}</div>
      {liste.map(r=>(<div key={r.id} onClick={()=>setSelected(r.id)} style={{background:C.white,borderRadius:14,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border,cursor:"pointer",overflow:"hidden"}}><div style={{position:"relative",height:130,background:"#EEF1FA"}}><img src={r.photo} alt={r.titre} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/><div style={{position:"absolute",top:8,right:8,fontSize:22}}>{r.emoji}</div><div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(13,27,75,0.8))",padding:"16px 12px 8px"}}><div style={{fontSize:13,fontWeight:700,color:C.white}}>{r.titre}</div></div></div><div style={{padding:"10px 12px",display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",gap:5}}><span style={{fontSize:9,background:"#FFF8D6",color:"#7A5000",padding:"2px 6px",borderRadius:10}}>⏱ {r.temps} min</span><span style={{fontSize:9,background:C.greenBg,color:C.green,padding:"2px 6px",borderRadius:10}}>P {r.macros.p}g</span><span style={{fontSize:9,background:"#FFF8D6",color:"#7A5000",padding:"2px 6px",borderRadius:10}}>{r.kcal} kcal</span></div><span style={{fontSize:14,color:C.muted}}>›</span></div></div>))}
    </div>
  );
}

function ConseilsTab({formule}) {
  const [selected,setSelected]=useState(null);
  const liste=CONSEILS.filter(c=>!formule||c.formules.includes(formule));
  if(selected) {
    const c=CONSEILS.find(x=>x.id===selected);
    return(
      <div style={{padding:"0 0 40px"}}>
        <button onClick={()=>setSelected(null)} style={{display:"flex",alignItems:"center",gap:6,padding:"14px 16px",background:C.white,border:"none",borderBottom:"1px solid "+C.border,width:"100%",cursor:"pointer",fontSize:12,color:C.soft}}>← Retour aux conseils</button>
        <div style={{padding:"16px 14px"}}>
          <div style={{display:"inline-block",background:c.bg,color:c.couleur,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,marginBottom:10}}>{c.cat.toUpperCase()} · {c.temps}</div>
          <div style={{fontSize:20,fontWeight:900,color:C.navy,marginBottom:6,lineHeight:1.3}}>{c.emoji} {c.titre}</div>
          <div style={{fontSize:13,color:C.soft,lineHeight:1.7,marginBottom:16,padding:"12px",background:"#F8F9FF",borderRadius:10,borderLeft:"3px solid "+c.couleur}}>{c.intro}</div>
          {c.points.map((p,i)=>(<div key={i} style={{background:C.white,border:"1px solid "+C.border,borderRadius:12,padding:"14px",marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:c.couleur,marginBottom:5}}>{p.titre}</div><div style={{fontSize:12,color:C.soft,lineHeight:1.6}}>{p.texte}</div></div>))}
          <div style={{background:c.bg,border:"1px solid "+c.couleur+"40",borderRadius:12,padding:"14px"}}><div style={{fontSize:10,fontWeight:700,color:c.couleur,marginBottom:6}}>🎯 PASSE À L'ACTION</div><div style={{fontSize:12,color:C.navy,lineHeight:1.6}}>{c.action}</div></div>
        </div>
      </div>
    );
  }
  return(
    <div style={{padding:"14px 14px 40px"}}>
      <div style={{background:"linear-gradient(135deg,#1A2B6B,#0D1B4B)",borderRadius:14,padding:"16px",marginBottom:14,color:C.white}}><div style={{fontSize:13,fontWeight:900,marginBottom:4}}>📚 Fiches Conseils</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)",lineHeight:1.5}}>Nutrition, bien-être, comportement alimentaire — la science expliquée simplement.</div></div>
      {liste.map(c=>(<div key={c.id} onClick={()=>setSelected(c.id)} style={{background:C.white,borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border,cursor:"pointer"}}><div style={{display:"flex",gap:4,marginBottom:6}}><span style={{fontSize:9,background:c.bg,color:c.couleur,padding:"2px 8px",borderRadius:20,fontWeight:700}}>{c.cat}</span><span style={{fontSize:9,background:"#F5F7FF",color:C.muted,padding:"2px 8px",borderRadius:20}}>⏱ {c.temps}</span><span style={{fontSize:9,background:"#FFF8D6",color:"#7A5000",padding:"2px 8px",borderRadius:20}}>{c.niveau}</span></div><div style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:4}}>{c.emoji} {c.titre}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{c.intro.slice(0,90)}…</div></div>))}
    </div>
  );
}


function PdjEquilibreTab() {
  const categories = [
    {key:"proteines", label:"🥚 Protéines", items:PDJ_EQUILIBRE.proteines, bg:C.greenBg, border:C.green, color:C.green},
    {key:"supports", label:"🍞 Supports", items:PDJ_EQUILIBRE.supports, bg:"#FFF8D6", border:C.yellow, color:"#7A5000"},
    {key:"graisses", label:"🧈 Matières grasses", items:PDJ_EQUILIBRE.graisses, bg:"#FFF3E0", border:"#E65100", color:"#E65100"},
    {key:"sucres", label:"🍓 Sucrés à tartiner", items:PDJ_EQUILIBRE.sucres, bg:"#FCE4EC", border:"#C2185B", color:"#C2185B"},
    {key:"cereales", label:"🥣 Céréales & accompagnements", items:PDJ_EQUILIBRE.cereales, bg:"#E3F2FD", border:"#1565C0", color:"#1565C0"},
    {key:"legumes", label:"🥦 Légumes du matin", items:PDJ_EQUILIBRE.legumes, bg:"#F3E5F5", border:"#6A1B9A", color:"#6A1B9A"},
    {key:"ajouts", label:"🧀 Petits ajouts (modération)", items:PDJ_EQUILIBRE.ajouts, bg:"#FFF8D6", border:C.yellow, color:"#7A5000"},
    {key:"eviter", label:"❌ À éviter le matin", items:PDJ_EQUILIBRE.eviter, bg:"#FFEBEE", border:"#E53935", color:"#E53935"},
  ];
  return(
    <div style={{padding:"14px 14px 40px"}}>
      <div style={{background:"linear-gradient(135deg,"+C.navy+","+C.navyL+")",borderRadius:16,padding:"18px 16px",marginBottom:16,color:C.white}}>
        <div style={{fontSize:28,marginBottom:6}}>🥐</div>
        <div style={{fontSize:16,fontWeight:900,marginBottom:4}}>Petit-déjeuner équilibré</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",lineHeight:1.6}}>Les classiques du matin pour un rééquilibrage alimentaire durable. Associe un support + une matière grasse + un accompagnement.</div>
      </div>
      <div style={{background:"#FFF8D6",border:"1px solid "+C.yellow,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"#7A5000",marginBottom:4}}>💡 La règle d'or</div>
        <div style={{fontSize:11,color:"#7A5000",lineHeight:1.6}}>Toujours associer une source de protéines (oeuf, skyr, fromage blanc) à ces aliments pour stabiliser la glycémie et tenir jusqu'au déjeuner.</div>
      </div>
      {categories.map((cat,ci)=>(
        <div key={ci} style={{background:C.white,borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+C.border}}>
          <div style={{fontSize:12,fontWeight:700,color:cat.color,marginBottom:10,background:cat.bg,padding:"6px 10px",borderRadius:8,display:"inline-block"}}>{cat.label}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {cat.items.map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:"#FAFBFF",borderRadius:9,border:"1px solid "+C.border}}>
                <span style={{fontSize:18}}>{item.emoji}</span>
                <span style={{fontSize:13,color:C.soft}}>{item.nom}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


const REEQUILIBRAGE_ALIMENTS = [
  {key:"proteines", label:"🥩 Protéines", couleur:"#1A9050", bg:"#E8FFF2", items:[
    "Blanc de poulet","Escalope de dinde","Steak haché 5%","Veau","Saumon","Cabillaud","Daurade","Maquereau","Thon en boite (eau)","Crevettes","Moules","Saint-Jacques","Oeufs entiers","Blancs d'oeufs","Jambon blanc 0%","Saumon fumé","Skyr nature","Yaourt grec 0%","Fromage blanc 0%","Cottage cheese"
  ]},
  {key:"feculents", label:"🍚 Féculents", couleur:"#E65100", bg:"#FFF3E0", items:[
    "Riz basmati","Riz complet","Quinoa","Pâtes complètes","Pâtes blanches","Pomme de terre","Patate douce","Pain complet","Pain blanc","Biscottes","Galettes de riz","Avoine / flocons d'avoine","Couscous complet","Boulgour"
  ]},
  {key:"legumes", label:"🥦 Légumes cuits", couleur:"#1565C0", bg:"#E3F2FD", items:[
    "Brocolis","Épinards","Champignons","Courgettes","Haricots verts","Poivrons","Aubergines","Chou-fleur","Chou vert","Potiron","Asperges vertes","Poireaux","Fenouil","Endives","Pak-choï","Artichaut","Bette"
  ]},
  {key:"legumineuses", label:"🫘 Légumineuses", couleur:"#6A1B9A", bg:"#F3E5F5", items:[
    "Lentilles vertes / corail","Pois chiches","Haricots rouges","Haricots blancs","Fèves","Pois cassés","Edamame","Soja"
  ]},
  {key:"crudites", label:"🥗 Crudités", couleur:"#C62828", bg:"#FFEBEE", items:[
    "Salade verte / mesclun","Tomates","Concombre","Radis","Carottes râpées","Endives crues","Céleri","Betterave crue","Chou rouge cru","Maïs (modération)","Avocat"
  ]},
  {key:"assaisonnement", label:"🫒 Assaisonnement", couleur:"#4A148C", bg:"#EDE7F6", items:[
    "Huile d'olive","Huile de colza","Vinaigre de cidre","Jus de citron","Moutarde","Sauce soja light","Herbes de Provence","Curcuma","Paprika","Cumin","Curry","Ail","Échalote","Gingembre frais","Poivre","Piment doux"
  ]},
];

function ReequilibrageTab() {
  const [ouvert,setOuvert]=useState(null);
  const [coches,setCoches]=useState({});
  const [ouvertAlim,setOuvertAlim]=useState(null);
  const toggle=(s,i)=>setCoches(p=>({...p,[s+"-"+i]:!p[s+"-"+i]}));
  return(
    <div style={{padding:"14px 14px 40px"}}>
      <div style={{background:"linear-gradient(135deg,#1A5C38,#2E8B57)",borderRadius:16,padding:"20px 16px",marginBottom:16,color:C.white}}><div style={{fontSize:28,marginBottom:6}}>⚖️</div><div style={{fontSize:18,fontWeight:900,marginBottom:6}}>Rééquilibrage Alimentaire</div><div style={{fontSize:12,color:"rgba(255,255,255,0.75)",lineHeight:1.6}}>Programme progressif sur 4 semaines pour transformer durablement ton rapport à l'alimentation.</div></div>
      <div style={{background:"#FFF8D6",border:"1px solid "+C.yellow,borderRadius:12,padding:"12px 14px",marginBottom:14}}><div style={{fontSize:11,fontWeight:700,color:"#7A5000",marginBottom:4}}>💡 La différence avec le plan 25 jours</div><div style={{fontSize:11,color:"#7A5000",lineHeight:1.6}}>Le plan 25j te dit quoi manger chaque jour. Le rééquilibrage t'apprend pourquoi et comment construire une alimentation qui te ressemble sur le long terme.</div></div>
      <div style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:10,paddingLeft:2}}>📅 Programme 4 semaines</div>
      {REEQUILIBRAGE.map((etape,idx)=>{
        const isOpen=ouvert===idx;
        const total=etape.actions.length;
        const done=etape.actions.filter((_,i)=>coches[idx+"-"+i]).length;
        return(
          <div key={idx} style={{background:C.white,borderRadius:14,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.07)",border:"1px solid "+(isOpen?etape.couleur:C.border),overflow:"hidden",transition:"border 0.2s"}}>
            <div onClick={()=>setOuvert(isOpen?null:idx)} style={{padding:"14px",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:10,background:etape.bg,border:"2px solid "+etape.couleur+"40",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:14,fontWeight:900,color:etape.couleur}}>S{etape.semaine}</span></div><div><div style={{fontSize:13,fontWeight:700,color:C.navy}}>{etape.titre}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{done}/{total} actions</div></div></div>
                <span style={{fontSize:16,color:C.muted,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
              </div>
              <div style={{marginTop:10,height:4,background:C.border,borderRadius:2}}><div style={{height:"100%",background:etape.couleur,borderRadius:2,width:(done/total*100)+"%",transition:"width 0.3s"}}/></div>
            </div>
            {isOpen&&(
              <div style={{padding:"0 14px 14px"}}>
                <div style={{background:etape.bg,borderRadius:10,padding:"10px 12px",marginBottom:12,borderLeft:"3px solid "+etape.couleur}}><div style={{fontSize:10,fontWeight:700,color:etape.couleur,marginBottom:3}}>OBJECTIF</div><div style={{fontSize:12,color:C.navy,lineHeight:1.5}}>{etape.objectif}</div></div>
                <div style={{fontSize:10,fontWeight:700,color:C.navy,marginBottom:8,letterSpacing:1}}>ACTIONS À METTRE EN PLACE</div>
                {etape.actions.map((action,i)=>{
                  const isC=!!coches[idx+"-"+i];
                  return(<div key={i} onClick={()=>toggle(idx,i)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 10px",background:isC?"#E8FFF2":"#FAFBFF",borderRadius:9,marginBottom:6,cursor:"pointer",border:"1px solid "+(isC?C.green:C.border)}}><div style={{width:22,height:22,borderRadius:6,border:"2px solid "+(isC?C.green:C.muted),background:isC?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{isC&&<span style={{color:"white",fontSize:13,fontWeight:900}}>✓</span>}</div><span style={{fontSize:12,color:isC?C.green:C.soft,fontWeight:isC?"600":"normal",textDecoration:isC?"line-through":"none",lineHeight:1.4}}>{action}</span></div>);
                })}
                <div style={{marginTop:12,background:"#F5F7FF",borderRadius:10,padding:"10px 12px",borderLeft:"3px solid "+etape.couleur}}><span style={{fontSize:10,fontWeight:700,color:etape.couleur}}>✨ Conseil : </span><span style={{fontSize:11,color:C.soft,lineHeight:1.5}}>{etape.conseil}</span></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


const MENU_DAYS = [
  {day:1,meals:{breakfast:{name:"Omelette épinards-feta",emoji:"🥚",ingredients:[{name:"Oeufs entiers",qty:"2 (100g)",p:13,g:1,l:10},{name:"Épinards frais",qty:"80g",p:2,g:1,l:0},{name:"Feta",qty:"20g",p:3,g:0,l:4}],kcal:210},lunch:{name:"Bowl poulet + légumes rôtis",emoji:"🍗",ingredients:[{name:"Blanc de poulet",qty:"150g",p:35,g:0,l:3},{name:"Courgettes",qty:"150g",p:2,g:4,l:0},{name:"Poivrons",qty:"100g",p:1,g:6,l:0},{name:"Brocoli",qty:"100g",p:3,g:5,l:0},{name:"Huile d'olive",qty:"10g",p:0,g:0,l:10}],kcal:340},dinner:{name:"Saumon + haricots verts",emoji:"🐟",ingredients:[{name:"Saumon",qty:"120g",p:25,g:0,l:10},{name:"Haricots verts",qty:"150g",p:3,g:7,l:0},{name:"Champignons",qty:"100g",p:3,g:3,l:0}],kcal:260}}},
  {day:2,meals:{breakfast:{name:"Yaourt grec + graines de chia",emoji:"🥣",ingredients:[{name:"Yaourt grec 0%",qty:"200g",p:20,g:8,l:0},{name:"Graines de chia",qty:"15g",p:2,g:5,l:4},{name:"Concombre",qty:"80g",p:1,g:2,l:0}],kcal:195},lunch:{name:"Thon + salade nicoise legere",emoji:"🥗",ingredients:[{name:"Thon en boite (eau)",qty:"150g",p:33,g:0,l:2},{name:"Haricots verts cuits",qty:"150g",p:3,g:7,l:0},{name:"Tomates cerises",qty:"100g",p:1,g:4,l:0},{name:"Oeuf dur",qty:"1 (50g)",p:6,g:0,l:5},{name:"Huile d'olive",qty:"8g",p:0,g:0,l:8}],kcal:340},dinner:{name:"Dinde + poelee de legumes",emoji:"🦃",ingredients:[{name:"Escalope de dinde",qty:"130g",p:30,g:0,l:2},{name:"Aubergine",qty:"150g",p:2,g:6,l:0},{name:"Tomates",qty:"100g",p:1,g:4,l:0},{name:"Courgettes",qty:"100g",p:1,g:3,l:0}],kcal:220}}},
  {day:3,meals:{breakfast:{name:"Blanc d'oeuf brouille + tomates",emoji:"🍳",ingredients:[{name:"Blancs d'oeufs",qty:"4 (120g)",p:14,g:1,l:0},{name:"Tomates",qty:"150g",p:1,g:5,l:0},{name:"Herbes de Provence",qty:"—",p:0,g:0,l:0}],kcal:110},lunch:{name:"Cabillaud + ratatouille",emoji:"🐠",ingredients:[{name:"Cabillaud",qty:"180g",p:37,g:0,l:2},{name:"Aubergine",qty:"100g",p:1,g:4,l:0},{name:"Courgette",qty:"100g",p:1,g:3,l:0},{name:"Poivron",qty:"100g",p:1,g:6,l:0},{name:"Tomate",qty:"100g",p:1,g:4,l:0},{name:"Huile d'olive",qty:"10g",p:0,g:0,l:10}],kcal:350},dinner:{name:"Poulet marine + epinards sautes",emoji:"🥬",ingredients:[{name:"Blanc de poulet",qty:"120g",p:28,g:0,l:2},{name:"Epinards",qty:"200g",p:5,g:4,l:0},{name:"Ail",qty:"5g",p:0,g:1,l:0},{name:"Citron",qty:"—",p:0,g:1,l:0}],kcal:215}}},
  {day:4,meals:{breakfast:{name:"Omelette poivrons-jambon blanc",emoji:"🫑",ingredients:[{name:"Oeufs entiers",qty:"2 (100g)",p:13,g:1,l:10},{name:"Jambon blanc (0% MG)",qty:"50g",p:8,g:0,l:1},{name:"Poivron rouge",qty:"80g",p:1,g:5,l:0}],kcal:220},lunch:{name:"Crevettes + brocoli + champignons",emoji:"🦐",ingredients:[{name:"Crevettes decortiquees",qty:"200g",p:38,g:0,l:2},{name:"Brocoli",qty:"200g",p:5,g:8,l:0},{name:"Champignons",qty:"100g",p:3,g:3,l:0},{name:"Sauce soja (light)",qty:"15ml",p:1,g:2,l:0},{name:"Huile de sesame",qty:"5g",p:0,g:0,l:5}],kcal:310},dinner:{name:"Cabillaud vapeur + asperges",emoji:"🌿",ingredients:[{name:"Cabillaud",qty:"150g",p:30,g:0,l:1},{name:"Asperges vertes",qty:"200g",p:4,g:6,l:0},{name:"Citron + capres",qty:"—",p:0,g:2,l:0}],kcal:200}}},
  {day:5,meals:{breakfast:{name:"Fromage blanc + concombre + menthe",emoji:"🥒",ingredients:[{name:"Fromage blanc 0%",qty:"200g",p:16,g:8,l:0},{name:"Concombre",qty:"100g",p:1,g:3,l:0},{name:"Menthe fraiche",qty:"—",p:0,g:0,l:0}],kcal:130},lunch:{name:"Steak hache 5% + ratatouille",emoji:"🥩",ingredients:[{name:"Steak hache 5%MG",qty:"150g",p:30,g:0,l:8},{name:"Aubergine",qty:"150g",p:2,g:6,l:0},{name:"Tomate",qty:"150g",p:1,g:5,l:0},{name:"Courgette",qty:"100g",p:1,g:3,l:0},{name:"Huile d'olive",qty:"8g",p:0,g:0,l:8}],kcal:380},dinner:{name:"Poulet citron + chou-fleur roti",emoji:"🌸",ingredients:[{name:"Blanc de poulet",qty:"120g",p:28,g:0,l:2},{name:"Chou-fleur",qty:"200g",p:4,g:8,l:0},{name:"Citron + curcuma",qty:"—",p:0,g:1,l:0}],kcal:230}}},
  {day:6,meals:{breakfast:{name:"Omelette champignons-persil",emoji:"🍄",ingredients:[{name:"Oeufs entiers",qty:"2 (100g)",p:13,g:1,l:10},{name:"Champignons",qty:"100g",p:3,g:3,l:0},{name:"Persil frais",qty:"—",p:0,g:0,l:0}],kcal:195},lunch:{name:"Thon + salade verte + avocat",emoji:"🥑",ingredients:[{name:"Thon en boite (eau)",qty:"130g",p:29,g:0,l:1},{name:"Salade verte",qty:"80g",p:1,g:2,l:0},{name:"Avocat",qty:"50g",p:1,g:2,l:7},{name:"Tomates cerises",qty:"80g",p:1,g:3,l:0},{name:"Citron",qty:"—",p:0,g:1,l:0}],kcal:280},dinner:{name:"Lieu noir + poireaux vapeur",emoji:"🫛",ingredients:[{name:"Lieu noir",qty:"180g",p:34,g:0,l:2},{name:"Poireaux",qty:"200g",p:4,g:10,l:0},{name:"Moutarde (sauce)",qty:"10g",p:0,g:1,l:1}],kcal:250}}},
  {day:7,meals:{breakfast:{name:"Skyr + graines de lin + concombre",emoji:"🌱",ingredients:[{name:"Skyr nature",qty:"200g",p:22,g:10,l:0},{name:"Graines de lin",qty:"10g",p:2,g:2,l:3},{name:"Concombre",qty:"80g",p:1,g:2,l:0}],kcal:195},lunch:{name:"Dinde + endives braisees",emoji:"🥗",ingredients:[{name:"Escalope de dinde",qty:"150g",p:34,g:0,l:2},{name:"Endives",qty:"200g",p:2,g:6,l:0},{name:"Tomate",qty:"100g",p:1,g:4,l:0},{name:"Huile d'olive",qty:"8g",p:0,g:0,l:8}],kcal:300},dinner:{name:"Saumon + epinards + tomates",emoji:"🍃",ingredients:[{name:"Saumon",qty:"100g",p:20,g:0,l:8},{name:"Epinards",qty:"200g",p:5,g:4,l:0},{name:"Tomates cerises",qty:"100g",p:1,g:4,l:0}],kcal:235}}},
  {day:8,meals:{breakfast:{name:"Oeufs poches + asperges",emoji:"🥚",ingredients:[{name:"Oeufs poches",qty:"2 (100g)",p:13,g:1,l:10},{name:"Asperges vertes",qty:"150g",p:3,g:5,l:0},{name:"Citron",qty:"—",p:0,g:1,l:0}],kcal:195},lunch:{name:"Poulet tikka + chou-fleur",emoji:"🌶",ingredients:[{name:"Blanc de poulet",qty:"150g",p:35,g:0,l:3},{name:"Chou-fleur",qty:"200g",p:4,g:8,l:0},{name:"Yaourt 0% (marinade)",qty:"50g",p:5,g:2,l:0},{name:"Epices (curry, cumin)",qty:"—",p:0,g:1,l:0},{name:"Huile d'olive",qty:"8g",p:0,g:0,l:8}],kcal:355},dinner:{name:"Crevettes + pak-choi + ail",emoji:"🥬",ingredients:[{name:"Crevettes",qty:"150g",p:28,g:0,l:2},{name:"Pak-choi",qty:"200g",p:3,g:4,l:0},{name:"Ail + gingembre",qty:"—",p:0,g:2,l:0},{name:"Sauce soja light",qty:"15ml",p:1,g:2,l:0}],kcal:210}}},
  {day:9,meals:{breakfast:{name:"Cottage cheese + radis + ciboulette",emoji:"🧀",ingredients:[{name:"Cottage cheese",qty:"200g",p:22,g:6,l:4},{name:"Radis",qty:"80g",p:1,g:2,l:0},{name:"Ciboulette",qty:"—",p:0,g:0,l:0}],kcal:185},lunch:{name:"Thon + courgettes farcies",emoji:"🥒",ingredients:[{name:"Thon en boite (eau)",qty:"150g",p:33,g:0,l:2},{name:"Courgettes",qty:"200g",p:2,g:6,l:0},{name:"Tomates cerises",qty:"100g",p:1,g:4,l:0},{name:"Feta",qty:"20g",p:3,g:0,l:4},{name:"Herbes + citron",qty:"—",p:0,g:1,l:0}],kcal:310},dinner:{name:"Blanc de poulet + fenouil roti",emoji:"🌿",ingredients:[{name:"Blanc de poulet",qty:"130g",p:30,g:0,l:2},{name:"Fenouil",qty:"200g",p:2,g:10,l:0},{name:"Citron + aneth",qty:"—",p:0,g:1,l:0},{name:"Huile d'olive",qty:"8g",p:0,g:0,l:8}],kcal:280}}},
  {day:10,meals:{breakfast:{name:"Omelette tomates-basilic",emoji:"🍅",ingredients:[{name:"Oeufs entiers",qty:"2 (100g)",p:13,g:1,l:10},{name:"Tomates",qty:"100g",p:1,g:4,l:0},{name:"Basilic frais",qty:"—",p:0,g:0,l:0}],kcal:185},lunch:{name:"Cabillaud + epinards + poivrons",emoji:"🐟",ingredients:[{name:"Cabillaud",qty:"180g",p:37,g:0,l:2},{name:"Epinards",qty:"150g",p:4,g:3,l:0},{name:"Poivrons",qty:"150g",p:2,g:9,l:0},{name:"Huile d'olive",qty:"10g",p:0,g:0,l:10}],kcal:355},dinner:{name:"Dinde + chou romanesco",emoji:"🥦",ingredients:[{name:"Escalope de dinde",qty:"130g",p:30,g:0,l:2},{name:"Chou romanesco",qty:"200g",p:4,g:8,l:0},{name:"Ail + curcuma",qty:"—",p:0,g:1,l:0},{name:"Huile d'olive",qty:"5g",p:0,g:0,l:5}],kcal:245}}}
];

const MEAL_LABELS = {breakfast:{label:"Petit-déjeuner",icon:"🌅"},lunch:{label:"Déjeuner",icon:"☀️"},dinner:{label:"Dîner",icon:"🌙"}};
function getMealTotals(meal){return meal.ingredients.reduce((acc,i)=>({p:acc.p+i.p,g:acc.g+i.g,l:acc.l+i.l}),{p:0,g:0,l:0});}
function getDayTotals(meals){const all=Object.values(meals);return{p:all.reduce((s,m)=>s+getMealTotals(m).p,0),g:all.reduce((s,m)=>s+getMealTotals(m).g,0),l:all.reduce((s,m)=>s+getMealTotals(m).l,0),kcal:all.reduce((s,m)=>s+m.kcal,0)};}

function ExempleMenu() {
  const [activeDay,setActiveDay]=useState(0);
  const [expandedMeal,setExpandedMeal]=useState(null);
  const day=MENU_DAYS[activeDay];
  const totals=getDayTotals(day.meals);
  return(
    <div style={{fontFamily:"Georgia, serif",background:C.bg,minHeight:"100vh",color:C.text,padding:"0 0 40px 0"}}>
      <div style={{background:"linear-gradient(135deg,"+C.navy+","+C.navyL+")",padding:"28px 20px 20px",borderBottom:"1px solid "+C.border}}>
        <div style={{fontSize:11,letterSpacing:4,color:C.soft,textTransform:"uppercase",marginBottom:6}}>Exemple de menu · 10 jours</div>
        <div style={{fontSize:22,fontWeight:"bold",color:C.white,letterSpacing:1}}>Légumes & Protéines</div>
        <div style={{fontSize:13,color:C.soft,marginTop:2}}>Faible en glucides · Programme rééquilibrage</div>
      </div>
      <div style={{overflowX:"auto",padding:"14px 16px 0",display:"flex",gap:8,scrollbarWidth:"none"}}>
        {MENU_DAYS.map((d,i)=>(
          <button key={i} onClick={()=>{setActiveDay(i);setExpandedMeal(null);}} style={{flexShrink:0,background:activeDay===i?C.navy:C.white,border:activeDay===i?"1.5px solid #5aad6e":"1.5px solid #2a4d2e",borderRadius:12,padding:"8px 14px",cursor:"pointer",color:activeDay===i?C.yellow:C.soft,transition:"all 0.2s"}}>
            <div style={{fontSize:11,letterSpacing:1,opacity:0.7}}>J{d.day}</div>
            <div style={{fontSize:13,fontWeight:"bold"}}>{getDayTotals(d.meals).kcal}</div>
            <div style={{fontSize:9,opacity:0.6}}>kcal</div>
          </button>
        ))}
      </div>
      <div style={{margin:"14px 16px",background:C.navy,borderRadius:14,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid "+C.border}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:"bold",color:C.green}}>{totals.kcal}</div><div style={{fontSize:10,color:C.soft,letterSpacing:1}}>KCAL</div></div>
        <div style={{width:1,height:36,background:C.border}}/>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:"bold",color:"#82c9f5"}}>{totals.p}g</div><div style={{fontSize:10,color:C.soft,letterSpacing:1}}>PROT.</div></div>
        <div style={{width:1,height:36,background:C.border}}/>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:"bold",color:"#f5d782"}}>{totals.g}g</div><div style={{fontSize:10,color:C.soft,letterSpacing:1}}>GLUC.</div></div>
        <div style={{width:1,height:36,background:C.border}}/>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:"bold",color:"#f5a442"}}>{totals.l}g</div><div style={{fontSize:10,color:C.soft,letterSpacing:1}}>LIP.</div></div>
      </div>
      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:12}}>
        {Object.entries(day.meals).map(([mealKey,meal])=>{
          const mt=getMealTotals(meal);
          const isOpen=expandedMeal===mealKey;
          return(
            <div key={mealKey} style={{background:C.white,borderRadius:16,border:"1px solid "+C.border,overflow:"hidden"}}>
              <button onClick={()=>setExpandedMeal(isOpen?null:mealKey)} style={{width:"100%",background:"none",border:"none",padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:28}}>{meal.emoji}</div>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:10,color:C.soft,letterSpacing:2,textTransform:"uppercase"}}>{MEAL_LABELS[mealKey].icon} {MEAL_LABELS[mealKey].label}</div>
                  <div style={{fontSize:15,fontWeight:"bold",color:C.navy,marginTop:2}}>{meal.name}</div>
                </div>
                <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:"bold",color:C.green}}>{meal.kcal}</div><div style={{fontSize:10,color:C.soft}}>kcal</div></div>
                <div style={{color:C.soft,fontSize:14,marginLeft:4}}>{isOpen?"▲":"▼"}</div>
              </button>
              <div style={{display:"flex",gap:10,padding:"0 16px 12px",fontSize:11}}>
                <span style={{color:"#82c9f5"}}>P {mt.p}g</span>
                <span style={{color:C.muted}}>·</span>
                <span style={{color:"#f5d782"}}>G {mt.g}g</span>
                <span style={{color:C.muted}}>·</span>
                <span style={{color:"#f5a442"}}>L {mt.l}g</span>
              </div>
              {isOpen&&(
                <div style={{borderTop:"1px solid "+C.border,padding:"12px 16px 16px"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead><tr style={{color:C.soft,fontSize:10,letterSpacing:1}}><th style={{textAlign:"left",paddingBottom:8,fontWeight:"normal"}}>ALIMENT</th><th style={{textAlign:"right",paddingBottom:8,fontWeight:"normal"}}>QTÉ</th><th style={{textAlign:"right",paddingBottom:8,fontWeight:"normal",color:"#82c9f5"}}>P</th><th style={{textAlign:"right",paddingBottom:8,fontWeight:"normal",color:"#f5d782"}}>G</th><th style={{textAlign:"right",paddingBottom:8,fontWeight:"normal",color:"#f5a442"}}>L</th></tr></thead>
                    <tbody>
                      {meal.ingredients.map((ing,idx)=>(<tr key={idx} style={{borderTop:"1px solid "+C.border}}><td style={{padding:"7px 0",color:C.soft}}>{ing.name}</td><td style={{textAlign:"right",color:C.soft,padding:"7px 0"}}>{ing.qty}</td><td style={{textAlign:"right",color:"#82c9f5",padding:"7px 0"}}>{ing.p}g</td><td style={{textAlign:"right",color:"#f5d782",padding:"7px 0"}}>{ing.g}g</td><td style={{textAlign:"right",color:"#f5a442",padding:"7px 0"}}>{ing.l}g</td></tr>))}
                      <tr style={{borderTop:"1px solid "+C.border}}><td colSpan={2} style={{padding:"8px 0",color:C.green,fontWeight:"bold",fontSize:11}}>TOTAL REPAS</td><td style={{textAlign:"right",color:"#82c9f5",fontWeight:"bold",padding:"8px 0"}}>{mt.p}g</td><td style={{textAlign:"right",color:"#f5d782",fontWeight:"bold",padding:"8px 0"}}>{mt.g}g</td><td style={{textAlign:"right",color:"#f5a442",fontWeight:"bold",padding:"8px 0"}}>{mt.l}g</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{margin:"18px 16px 0",background:"#F5F7FF",border:"1px solid "+C.border,borderRadius:12,padding:"12px 16px",fontSize:12,color:C.soft,lineHeight:1.7}}>
        💧 1,5 à 2L d'eau par jour · Assaisonnement libre (herbes, épices, citron) · En collation si besoin : yaourt grec 0%
      </div>
    </div>
  );
}

function EspaceCoach() {
  const [subtab,setSubtab]=useState("dashboard");
  const clientes=[{nom:"Sophie M.",formule:"equilibre",age:34,jour:12,derniere:"Hier 20h",mood:"😊",water:true,done:8,total:9,objectif:"Équilibre et énergie",alerte:false},{nom:"Marie L.",formule:"sucre",age:41,jour:7,derniere:"Auj. 13h",mood:"😐",water:false,done:5,total:9,objectif:"Perte de poids douce",alerte:true},{nom:"Clara B.",formule:"equilibre",age:28,jour:20,derniere:"Hier 22h",mood:"😄",water:true,done:9,total:9,objectif:"Performance sportive",alerte:false},{nom:"Anne D.",formule:"sucre",age:52,jour:3,derniere:"Auj. 8h",mood:"😔",water:false,done:3,total:9,objectif:"Ménopause et bien-être",alerte:true}];
  return(
    <div style={{padding:"0 0 40px"}}>
      <div style={{background:C.navy,padding:"16px 14px"}}><div style={{fontSize:16,fontWeight:900,color:C.yellow,marginBottom:2}}>👩‍💼 Espace Coach</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Dominique YALAP · Prevent'Secours®</div><div style={{display:"flex",gap:6,marginTop:12}}>{[["dashboard","📊 Vue globale"],["clientes","👥 Clientes"],["messages","💬 Messages"]].map(([t,l])=>(<button key={t} onClick={()=>setSubtab(t)} style={{padding:"6px 10px",background:"transparent",border:"none",borderBottom:subtab===t?"2px solid "+C.yellow:"2px solid transparent",color:subtab===t?C.yellow:"rgba(255,255,255,0.45)",fontSize:9,cursor:"pointer",fontWeight:subtab===t?700:400}}>{l}</button>))}</div></div>
      {subtab==="dashboard"&&(<div style={{padding:"14px 14px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>{[{l:"Clientes actives",v:"4",c:C.yellow,bg:C.navy},{l:"En alerte",v:"2",c:"#FF6B6B",bg:"#FFF0F0"},{l:"Formule Équilibre",v:"2",c:C.green,bg:C.greenBg},{l:"Formule Sans Sucre",v:"2",c:C.orange,bg:C.orangeBg}].map((k,i)=>(<div key={i} style={{background:k.bg,borderRadius:12,padding:"14px",border:"1px solid "+k.c+"30"}}><div style={{fontSize:22,fontWeight:900,color:k.c}}>{k.v}</div><div style={{fontSize:9,color:i===0?"rgba(255,255,255,0.6)":C.muted,marginTop:2}}>{k.l}</div></div>))}</div><div style={{background:"#FFF8D6",border:"1px solid "+C.yellow,borderRadius:12,padding:"12px 14px"}}><div style={{fontSize:11,fontWeight:700,color:"#7A5000",marginBottom:8}}>⚠️ Alertes à traiter</div>{clientes.filter(c=>c.alerte).map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i===0?"1px solid "+C.yellow+"40":"none"}}><div><span style={{fontSize:12,fontWeight:600,color:C.navy}}>{c.nom}</span><span style={{fontSize:10,color:C.muted,marginLeft:6}}>Jour {c.jour} · {c.mood}</span></div><button style={{fontSize:10,background:C.navy,color:C.yellow,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Écrire</button></div>))}</div></div>)}
      {subtab==="clientes"&&(<div style={{padding:"14px 14px"}}>{clientes.map((c,i)=>(<div key={i} style={{background:C.white,borderRadius:14,padding:"14px",marginBottom:10,border:"1px solid "+(c.alerte?"#FFCCCC":C.border),boxShadow:"0 2px 10px rgba(13,27,75,0.06)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}><div><span style={{fontSize:14,fontWeight:700,color:C.navy}}>{c.nom}</span><span style={{fontSize:11,color:C.muted,marginLeft:6}}>{c.age} ans</span><div style={{marginTop:3}}><span style={{fontSize:9,background:c.formule==="sucre"?C.orangeBg:C.greenBg,color:c.formule==="sucre"?C.orange:C.green,padding:"2px 8px",borderRadius:20,fontWeight:700}}>{c.formule==="sucre"?"🚫🍬 Sans Sucre":"⚖️ Équilibre"}</span></div></div><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:16}}>{c.mood}</span>{c.water&&<span style={{fontSize:12}}>💧</span>}{c.alerte&&<span style={{fontSize:10,background:"#FFF0F0",color:C.red,padding:"2px 6px",borderRadius:8,fontWeight:700}}>!</span>}</div></div><div style={{fontSize:10,color:C.muted,marginBottom:6}}>🎯 {c.objectif} · Jour {c.jour}/25 · {c.derniere}</div><div style={{height:6,background:C.border,borderRadius:3,marginBottom:8}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,"+C.navy+","+C.yellow+")",width:(c.done/c.total*100)+"%"}}/></div><div style={{display:"flex",gap:6}}><button style={{flex:1,padding:"7px",background:"#F5F7FF",border:"1px solid "+C.border,borderRadius:8,fontSize:10,color:C.navyL,cursor:"pointer"}}>📊 Suivi</button><button style={{flex:1,padding:"7px",background:C.navy,border:"none",borderRadius:8,fontSize:10,color:C.yellow,fontWeight:700,cursor:"pointer"}}>💬 Message</button></div></div>))}</div>)}
      {subtab==="messages"&&(<div style={{padding:"14px 14px"}}>{[{nom:"Marie L.",msg:"Bonjour Dominique, j'ai eu faim hier soir malgré le dîner complet 😔",heure:"Auj. 9h14",non_lu:true},{nom:"Clara B.",msg:"Super semaine ! J'ai réussi les 9 repas 5 jours de suite 🎉",heure:"Hier 21h30",non_lu:false},{nom:"Sophie M.",msg:"Est-ce que je peux remplacer le saumon par du thon chaque jour ?",heure:"Hier 14h02",non_lu:true}].map((m,i)=>(<div key={i} style={{background:m.non_lu?"#FFF8D6":C.white,borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(m.non_lu?C.yellow:C.border),cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:700,color:C.navy}}>{m.nom}</span><span style={{fontSize:9,color:C.muted}}>{m.heure}</span></div><div style={{fontSize:11,color:C.soft,lineHeight:1.4}}>{m.msg}</div>{m.non_lu&&<div style={{marginTop:6}}><span style={{fontSize:9,background:C.yellow,color:C.navy,padding:"2px 8px",borderRadius:10,fontWeight:700}}>Non lu</span></div>}</div>))}</div>)}
    </div>
  );
}

// === COMPOSANT : Recherche et ajout d'aliment ===
function AlimentSearch({mealKey, mealLabel, mealEmoji, onAdd, onClose}){
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [qty,setQty]=useState(100);
  const results=searchAliments(query);
  // Si aucune recherche, montrer les catégories avec top 10 aliments
  const showCategories=query.length<2;

  if(selected){
    const f=qty/100;
    const kcal=Math.round(selected.cal*f);
    const prot=+(selected.p*f).toFixed(1);
    const lip=+(selected.l*f).toFixed(1);
    const gluc=+(selected.g*f).toFixed(1);
    return(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
        <div style={{background:C.white,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,maxHeight:"85vh",overflow:"auto",padding:"20px 18px 30px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:2}}>{mealEmoji} {mealLabel}</div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.muted,fontSize:16,cursor:"pointer"}}>←</button>
          </div>
          <div style={{fontSize:18,fontWeight:900,color:C.navy,marginBottom:4}}>{selected.e} {selected.n}</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:16}}>Pour 100g : {selected.cal} kcal · P {selected.p}g · L {selected.l}g · G {selected.g}g</div>
          <div style={{background:"#F5F7FF",borderRadius:12,padding:"14px",marginBottom:14}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:6,letterSpacing:1,textTransform:"uppercase"}}>Quantité consommée</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <button onClick={()=>setQty(Math.max(5,qty-10))} style={{width:38,height:38,borderRadius:10,background:C.navy,color:C.yellow,border:"none",fontSize:20,fontWeight:"bold",cursor:"pointer"}}>−</button>
              <input type="number" value={qty} onChange={e=>setQty(Math.max(1,parseInt(e.target.value)||0))} style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid "+C.border,fontSize:22,fontWeight:"bold",textAlign:"center",color:C.navy,outline:"none",fontFamily:"sans-serif"}}/>
              <span style={{fontSize:13,color:C.navy,fontWeight:"bold",minWidth:20}}>g</span>
              <button onClick={()=>setQty(qty+10)} style={{width:38,height:38,borderRadius:10,background:C.navy,color:C.yellow,border:"none",fontSize:20,fontWeight:"bold",cursor:"pointer"}}>+</button>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {[50,100,150,200].map(v=>(
                <button key={v} onClick={()=>setQty(v)} style={{padding:"5px 10px",borderRadius:8,border:"1px solid "+C.border,background:qty===v?C.yellow:"white",color:qty===v?C.navy:C.soft,fontSize:11,cursor:"pointer",fontWeight:qty===v?"bold":"normal"}}>{v}g</button>
              ))}
            </div>
          </div>
          <div style={{background:C.navy,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
            <div style={{fontSize:9,color:C.yellow,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Valeurs pour {qty}g</div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontSize:22,fontWeight:900,color:C.yellow}}>{kcal}</div><div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>kcal</div></div>
              <div><div style={{fontSize:22,fontWeight:900,color:"#6EF0A0"}}>{prot}g</div><div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>Prot</div></div>
              <div><div style={{fontSize:22,fontWeight:900,color:"#6EC8FF"}}>{lip}g</div><div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>Lip</div></div>
              <div><div style={{fontSize:22,fontWeight:900,color:"#C0A0FF"}}>{gluc}g</div><div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase"}}>Gluc</div></div>
            </div>
          </div>
          <button onClick={()=>{onAdd(selected,qty);onClose();}} style={{width:"100%",padding:"15px",background:C.yellow,border:"none",borderRadius:12,color:C.navy,fontSize:15,fontWeight:"900",cursor:"pointer"}}>✓ Ajouter à {mealLabel.toLowerCase()}</button>
        </div>
      </div>
    );
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:C.white,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,height:"85vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px 18px 12px",borderBottom:"1px solid "+C.border}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:2}}>{mealEmoji} {mealLabel}</div><div style={{fontSize:16,fontWeight:900,color:C.navy}}>Ajouter un aliment</div></div>
            <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>×</button>
          </div>
          <div style={{position:"relative"}}>
            <input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="🔍 Rechercher (ex: poulet, tomate...)" style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1.5px solid "+C.border,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif",background:"#F5F7FF"}}/>
          </div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"10px 12px 20px"}}>
          {showCategories?(
            <div>
              <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:2,padding:"8px 4px"}}>Catégories</div>
              {ALIMENTS_CATS.map(cat=>{
                const items=ALIMENTS_DB.filter(a=>a.c===cat.k);
                if(!items.length) return null;
                return(
                  <div key={cat.k} style={{marginBottom:6}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.navy,padding:"8px 6px",background:"#F5F7FF",borderRadius:8,display:"flex",justifyContent:"space-between"}}>
                      <span>{cat.e} {cat.l}</span>
                      <span style={{color:C.muted,fontSize:10}}>{items.length}</span>
                    </div>
                    {items.slice(0,4).map(a=>(
                      <div key={a.id} onClick={()=>setSelected(a)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",cursor:"pointer",borderBottom:"1px solid "+C.border}}>
                        <span style={{fontSize:18}}>{a.e}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:12,color:C.text,fontWeight:600}}>{a.n}</div>
                          <div style={{fontSize:9,color:C.muted}}>{a.cal} kcal · P {a.p}g · 100g</div>
                        </div>
                        <span style={{color:C.muted}}>›</span>
                      </div>
                    ))}
                    {items.length>4&&<div style={{fontSize:10,color:C.muted,padding:"4px 10px",fontStyle:"italic"}}>Tape au-dessus pour voir les {items.length-4} autres...</div>}
                  </div>
                );
              })}
            </div>
          ):results.length===0?(
            <div style={{padding:"40px 20px",textAlign:"center",color:C.muted}}>
              <div style={{fontSize:40,marginBottom:10}}>🔍</div>
              <div style={{fontSize:12}}>Aucun résultat pour "{query}"</div>
              <div style={{fontSize:10,marginTop:8}}>Essaye avec un mot plus court</div>
            </div>
          ):(
            <div>
              <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:2,padding:"8px 4px"}}>{results.length} résultat{results.length>1?"s":""}</div>
              {results.map(a=>(
                <div key={a.id} onClick={()=>setSelected(a)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 10px",cursor:"pointer",borderBottom:"1px solid "+C.border,borderRadius:8}}>
                  <span style={{fontSize:20}}>{a.e}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:C.text,fontWeight:600}}>{a.n}</div>
                    <div style={{fontSize:10,color:C.muted}}>{a.cal} kcal · P {a.p}g · L {a.l}g · G {a.g}g · 100g</div>
                  </div>
                  <span style={{color:C.muted,fontSize:14}}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Calcul totaux d'un tableau de free items [{alimentId, qty}]
function calcFreeItems(items){
  return items.reduce((acc,it)=>{
    const a=ALIMENTS_DB.find(x=>x.id===it.alimentId);
    if(!a) return acc;
    const f=it.qty/100;
    return {
      p:acc.p+a.p*f,
      f:acc.f+a.l*f,
      c:acc.c+a.g*f,
      cal:acc.cal+a.cal*f
    };
  },{p:0,f:0,c:0,cal:0});
}

export default function App() {
  const [day,setDay]=useState(0);
  const [tab,setTab]=useState("profil");
  const [step,setStep]=useState("info");
  const [eaten,setEaten]=useState({});
  const [custom,setCustom]=useState({});
  const [editing,setEditing]=useState(null);
  const [inputText,setInputText]=useState("");
  const [parseError,setParseError]=useState("");
  const [journal,setJournal]=useState({});
  const [freeJournal,setFreeJournal]=useState({});  // Session 2 : journal libre d'aliments
  const [prefs,setPrefs]=useState(FORMULES.equilibre.prefs);
  const [plan,setPlan]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const [clientInfo,setClientInfo]=useState(null);
  const [editingProfile,setEditingProfile]=useState(false);
  const [form,setForm]=useState({prenom:"",age:"",objectif:""});
  const CLIENT=clientInfo?.prenom||"Cliente";
  const formule=clientInfo?.formule||"equilibre";
  const [searchMeal,setSearchMeal]=useState(null); // Session 2 : modal recherche aliment

  useEffect(()=>{
    // === MIGRATION V3 : Méthode Coach STIMBODY ===
    try{
      const r=localStorage.getItem("sb-info");
      if(r){
        const info=JSON.parse(r);
        // Si le profil existe SANS les nouveaux champs coach → reset propre
        if(!info.bmr || !info.protObjectif || !info.kcalObjectif){
          // Reset complet des données
          localStorage.removeItem("sb-info");
          localStorage.removeItem("sb-e");
          localStorage.removeItem("sb-c");
          localStorage.removeItem("sb-j");
          localStorage.removeItem("sb-p");
          setTimeout(()=>{
            alert("✨ Nouvelle version STIMBODY !\n\nTon app utilise maintenant TA méthode coach Dominique :\n\n🔬 Pesée impédancemètre\n🔥 Objectif perte de gras\n🥩 Protéines 1g/kg\n\n📝 Quelques infos à re-renseigner pour que l'app calcule ton plan personnalisé.\n\nDemande à Dominique ton métabolisme de base (BMR) lors de ta prochaine pesée !");
          },300);
          setLoaded(true);
          return;
        }
        setClientInfo(info);
      }
    }catch(e){}
    try{const r=localStorage.getItem("sb-e");if(r)setEaten(JSON.parse(r));}catch(e){}
    try{const r=localStorage.getItem("sb-c");if(r)setCustom(JSON.parse(r));}catch(e){}
    try{const r=localStorage.getItem("sb-j");if(r)setJournal(JSON.parse(r));}catch(e){}
    try{const r=localStorage.getItem("sb-fj");if(r)setFreeJournal(JSON.parse(r));}catch(e){}
    try{const r=localStorage.getItem("sb-p");if(r){const s=JSON.parse(r);setPrefs(s.prefs);if(s.plan){setPlan(s.plan);setTab("repas");}}}catch(e){}
    setLoaded(true);
  },[]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem("sb-e",JSON.stringify(eaten));}catch(e){};},[eaten,loaded]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem("sb-c",JSON.stringify(custom));}catch(e){};},[custom,loaded]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem("sb-j",JSON.stringify(journal));}catch(e){};},[journal,loaded]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem("sb-fj",JSON.stringify(freeJournal));}catch(e){};},[freeJournal,loaded]);

  const handleGenerate=()=>{
    const p=generatePlan(prefs);
    if(!p){alert("Sélectionne au moins 1 option petit-déj, 1 plat principal, 1 complément, 1 crudité et 1 légume cuit.");return;}
    setPlan(p);setTab("repas");setDay(0);setEaten({});setCustom({});setJournal({});
    try{localStorage.setItem("sb-p",JSON.stringify({prefs,plan:p}));}catch(e){}
  };

  const DAYS=plan||[]; const d=DAYS[day]; const planReady=!!plan;
  const eKey=(meal,idx)=>day+"-"+meal+"-"+idx;
  const isEaten=(meal,idx)=>!!eaten[eKey(meal,idx)];
  const toggle=(meal,idx)=>{ const k=eKey(meal,idx); setEaten(p=>({...p,[k]:!p[k]})); };
  const getI=meal=>planReady&&d?(custom[day+"-"+meal]||d[meal]):[];
  const mDone=meal=>getI(meal).length>0&&getI(meal).every((_,i)=>isEaten(meal,i));
  const mCount=meal=>getI(meal).filter((_,i)=>isEaten(meal,i)).length;
  const allI=planReady&&d?[...getI("matin"),...getI("midi"),...getI("soir")]:[];
  const total=calc([...allI,{k:"huileOlive",g:10}]);
  // === MÉTHODE COACH DOMINIQUE STIMBODY ===
  const userKcalObjectif=clientInfo?.kcalObjectif||2000;
  const userProtObjectif=clientInfo?.protObjectif||65; // Basé sur poids × ratio coach (1g/kg par défaut)
  // === Calcul du réel mangé (uniquement les repas cochés) ===
  const eatenItems=planReady&&d?[
    ...getI("matin").filter((_,i)=>isEaten("matin",i)),
    ...getI("midi").filter((_,i)=>isEaten("midi",i)),
    ...getI("soir").filter((_,i)=>isEaten("soir",i))
  ]:[];
  const huileEaten=mDone("midi")?[{k:"huileOlive",g:10}]:[];
  const planTotalActual=calc([...eatenItems,...huileEaten]);
  // === SESSION 2 : Aliments ajoutés librement au journal ===
  const getFreeItems=meal=>(freeJournal[day]?.[meal]||[]);
  const freeItemsAll=[
    ...getFreeItems("matin"),
    ...getFreeItems("midi"),
    ...getFreeItems("soir"),
    ...getFreeItems("collation")
  ];
  const freeTotalActual=calcFreeItems(freeItemsAll);
  // Total réel = plan coché + aliments libres
  const totalActual={
    p:planTotalActual.p+freeTotalActual.p,
    f:planTotalActual.f+freeTotalActual.f,
    c:planTotalActual.c+freeTotalActual.c,
    cal:planTotalActual.cal+freeTotalActual.cal
  };
  // Ajouter/supprimer un aliment du journal libre
  const addFreeItem=(meal,aliment,qty)=>{
    setFreeJournal(prev=>{
      const dayJ=prev[day]||{};
      const mealArr=dayJ[meal]||[];
      return{...prev,[day]:{...dayJ,[meal]:[...mealArr,{alimentId:aliment.id,qty,ts:Date.now()}]}};
    });
  };
  const removeFreeItem=(meal,idx)=>{
    setFreeJournal(prev=>{
      const dayJ=prev[day]||{};
      const mealArr=(dayJ[meal]||[]).filter((_,i)=>i!==idx);
      return{...prev,[day]:{...dayJ,[meal]:mealArr}};
    });
  };
  // Progression vs OBJECTIF PERSONNEL
  const pctCal=userKcalObjectif>0?Math.round(totalActual.cal/userKcalObjectif*100):0;
  const pctProt=userProtObjectif>0?Math.round(totalActual.p/userProtObjectif*100):0;
  const restCal=Math.max(0,Math.round(userKcalObjectif-totalActual.cal));
  const restProt=Math.max(0,Math.round(userProtObjectif-totalActual.p));
  // Couleur intelligente de la barre kcal
  const barColor=pctCal>=110?C.red:pctCal>=80?C.green:pctCal>=50?C.yellow:"#6EC8FF";
  const motivMsg=totalActual.cal===0?"🍽 Coche tes repas ou ajoute des aliments":pctCal>=110?"⚠️ Attention, dépassement de "+(Math.round(totalActual.cal-userKcalObjectif))+" kcal":pctCal>=95?"🎯 Objectif atteint ! Bravo "+CLIENT:pctCal>=80?"💪 Tu y es presque ! Plus que "+restCal+" kcal":"🌱 Plus que "+restCal+" kcal pour atteindre l'objectif";
  // === FIN MÉTHODE COACH ===
  const totalC=allI.length; const doneC=planReady?mCount("matin")+mCount("midi")+mCount("soir"):0;
  const dayOk=planReady&&mDone("matin")&&mDone("midi")&&mDone("soir");
  const j=journal[day]||{mood:null,faim:null,water:false,note:""};
  const setJ=patch=>setJournal(prev=>({...prev,[day]:{...(prev[day]||{mood:null,faim:null,water:false,note:""}), ...patch}}));
  const startEdit=meal=>{setEditing(day+"-"+meal);const ex=custom[day+"-"+meal];setInputText(ex?ex.map(i=>i.g+"g de "+i.foodRaw).join(" + "):"");setParseError("");};
  const confirmEdit=meal=>{
    if(!inputText.trim()){const n={...custom};delete n[day+"-"+meal];setCustom(n);const ne={...eaten};Object.keys(ne).filter(k=>k.startsWith(day+"-"+meal+"-")).forEach(k=>delete ne[k]);setEaten(ne);setEditing(null);setInputText("");setParseError("");return;}
    const parsed=parseMeal(inputText);if(!parsed.length){setParseError("Format non reconnu");return;}
    const ne={...eaten};Object.keys(ne).filter(k=>k.startsWith(day+"-"+meal+"-")).forEach(k=>delete ne[k]);setEaten(ne);
    setCustom(p=>({...p,[day+"-"+meal]:parsed}));setEditing(null);setInputText("");setParseError("");
  };
  const cancelEdit=()=>{setEditing(null);setInputText("");setParseError("");};
  const resetMeal=meal=>{const n={...custom};delete n[day+"-"+meal];setCustom(n);const ne={...eaten};Object.keys(ne).filter(k=>k.startsWith(day+"-"+meal+"-")).forEach(k=>delete ne[k]);setEaten(ne);};
  const mp=meal=>({meal,items:getI(meal),done:mDone(meal),count:mCount(meal),isEditing:editing===day+"-"+meal,isCustom:!!custom[day+"-"+meal],inputText,parseError,isEaten,toggle,onStartEdit:()=>startEdit(meal),onConfirm:()=>confirmEdit(meal),onCancel:cancelEdit,onReset:()=>resetMeal(meal),onInputChange:e=>{setInputText(e.target.value);setParseError("");}});
  const chartData=(planReady?DAYS:[]).map((dd,di)=>{
    const gi=meal=>custom[di+"-"+meal]||dd[meal];
    const planned=calc([...gi("matin"),...gi("midi"),...gi("soir"),{k:"huileOlive",g:10}]);
    const checked=[...gi("matin").filter((_,i)=>!!eaten[di+"-matin-"+i]),...gi("midi").filter((_,i)=>!!eaten[di+"-midi-"+i]),...gi("soir").filter((_,i)=>!!eaten[di+"-soir-"+i])];
    const actual=calc(checked); const jj=journal[di]||{};
    return{day:di+1,calPlanned:Math.round(planned.cal),calActual:Math.round(actual.cal),protPlanned:Math.round(planned.p),protActual:Math.round(actual.p),mood:jj.mood?MV[jj.mood]:null,faim:jj.faim?FV[jj.faim]:null,water:jj.water?1:0,note:jj.note||""};
  });
  const courses=buildCourses(plan,prefs);

  if(!clientInfo||editingProfile) {
    // === ÉTAPE 1 : Infos personnelles ===
    if(step==="info") return(
      <div style={{fontFamily:"sans-serif",minHeight:"100vh",background:C.navy,color:C.white,maxWidth:480,margin:"0 auto",padding:"30px 24px"}}>
        <div style={{marginBottom:24,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:8}}><span style={{fontSize:32,fontWeight:"900",color:C.white,letterSpacing:1}}>STIM</span><span style={{fontSize:32,fontWeight:"900",color:C.yellow,letterSpacing:1}}>BODY</span><span style={{fontSize:18,color:C.yellow,marginLeft:3}}>⚡</span></div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:3}}>PLAN NUTRITIONNEL PERSONNALISÉ</div></div>
        <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3].map(n=>(<div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=1?C.yellow:"rgba(255,255,255,0.15)"}}/>))}</div>
        <div style={{fontSize:10,color:C.yellow,letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Étape 1 / 3</div>
        <div style={{fontSize:22,fontWeight:900,color:C.white,marginBottom:4}}>{editingProfile?"Modifier mon profil ✏️":"Bienvenue ! 👋"}</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:22,lineHeight:1.5}}>Quelques infos avant de calculer ton plan personnalisé.</div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:18,padding:"20px 18px",width:"100%",boxSizing:"border-box"}}>
          {[{key:"prenom",label:"Ton prénom",placeholder:"Ex: Marie",type:"text"},{key:"age",label:"Ton âge",placeholder:"Ex: 38",type:"number"},{key:"objectif",label:"Ta motivation (optionnel)",placeholder:"Ex: Retrouver de l'énergie...",type:"text"}].map(field=>(
            <div key={field.key} style={{marginBottom:14}}><div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:1,textTransform:"uppercase"}}>{field.label}</div><input type={field.type} value={form[field.key]||""} onChange={e=>setForm(p=>({...p,[field.key]:e.target.value}))} placeholder={field.placeholder} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif"}}/></div>
          ))}
        </div>
        <button onClick={()=>{ if(!form.prenom.trim()){alert("Entre ton prénom pour continuer");return;} if(!form.age||parseInt(form.age)<16||parseInt(form.age)>99){alert("Entre un âge valide (16-99)");return;} setStep("impedance"); }} style={{width:"100%",padding:"15px",background:C.yellow,border:"none",borderRadius:12,color:C.navy,fontSize:15,fontWeight:"900",cursor:"pointer",marginTop:16}}>Suivant →</button>
      </div>
    );

    // === ÉTAPE 2 : Pesée impédancemètre + Objectif ===
    if(step==="impedance") {
      const poidsCur=parseFloat(form.poids)||0;
      const bmrCur=parseInt(form.bmr)||0;
      const objCur=form.objectifKcal||"gras";
      const ratCur=form.ratioProt||"1";
      const kcalCalc=bmrCur>0?calcObjectifKcal(bmrCur,objCur):0;
      const protCalc=poidsCur>0?calcObjectifProteines(poidsCur,ratCur):0;
      return(
        <div style={{fontFamily:"sans-serif",minHeight:"100vh",background:C.navy,color:C.white,maxWidth:480,margin:"0 auto",padding:"30px 20px"}}>
          <div style={{marginBottom:20,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}><span style={{fontSize:28,fontWeight:"900",color:C.white}}>STIM</span><span style={{fontSize:28,fontWeight:"900",color:C.yellow}}>BODY</span><span style={{fontSize:16,color:C.yellow,marginLeft:3}}>⚡</span></div></div>
          <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3].map(n=>(<div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=2?C.yellow:"rgba(255,255,255,0.15)"}}/>))}</div>
          <div style={{fontSize:10,color:C.yellow,letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Étape 2 / 3 · Pesée & Objectif</div>
          <div style={{fontSize:20,fontWeight:900,color:C.white,marginBottom:6}}>Ta pesée STIMBODY 🔬</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:18,lineHeight:1.6,background:"rgba(245,194,0,0.08)",border:"1px solid rgba(245,194,0,0.2)",borderRadius:10,padding:"10px 12px"}}>💡 Valeurs données par Dominique lors de ta pesée mensuelle à l'impédancemètre STIMBODY.</div>
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"16px 16px",marginBottom:14}}>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:1,textTransform:"uppercase"}}>⚖️ Ton poids (kg)</div>
              <input type="number" step="0.1" value={form.poids||""} onChange={e=>setForm(p=>({...p,poids:e.target.value}))} placeholder="Ex: 65.5" style={{width:"100%",padding:"14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:C.white,fontSize:16,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif"}}/>
            </div>
            <div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginBottom:5,letterSpacing:1,textTransform:"uppercase"}}>🔥 Ton métabolisme de base (kcal)</div>
              <input type="number" value={form.bmr||""} onChange={e=>setForm(p=>({...p,bmr:e.target.value}))} placeholder="Ex: 1400" style={{width:"100%",padding:"14px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:C.white,fontSize:16,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif"}}/>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:5,fontStyle:"italic"}}>📊 Valeur mesurée par impédancemètre (kcal au repos)</div>
            </div>
          </div>
          <div style={{fontSize:14,fontWeight:900,color:C.white,marginBottom:10}}>🎯 Ton objectif</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
            {OBJECTIFS_COACH.map(o=>{ const on=objCur===o.v; return(
              <div key={o.v} onClick={()=>setForm(p=>({...p,objectifKcal:o.v}))} style={{background:on?"rgba(245,194,0,0.15)":"rgba(255,255,255,0.05)",border:"1.5px solid "+(on?C.yellow:"rgba(255,255,255,0.1)"),borderRadius:12,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{o.e}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:on?C.yellow:C.white}}>{o.l}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",marginTop:1}}>{o.desc}</div>
                </div>
                {on&&<span style={{fontSize:14,color:C.yellow}}>✓</span>}
              </div>
            );})}
          </div>
          <div style={{fontSize:14,fontWeight:900,color:C.white,marginBottom:8}}>🥩 Protéines</div>
          <div style={{display:"flex",gap:5,marginBottom:16}}>
            {RATIOS_PROTEINES.map(r=>{ const on=ratCur===r.v; return(
              <div key={r.v} onClick={()=>setForm(p=>({...p,ratioProt:r.v}))} style={{flex:1,background:on?"rgba(245,194,0,0.15)":"rgba(255,255,255,0.05)",border:"1.5px solid "+(on?C.yellow:"rgba(255,255,255,0.1)"),borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:12,fontWeight:700,color:on?C.yellow:C.white}}>{r.l}</div>
                <div style={{fontSize:8,color:"rgba(255,255,255,0.5)",marginTop:1}}>{r.desc}</div>
              </div>
            );})}
          </div>
          {bmrCur>0&&poidsCur>0&&(
            <div style={{background:"linear-gradient(135deg,rgba(245,194,0,0.15),rgba(245,194,0,0.05))",border:"1.5px solid "+C.yellow,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:9,color:C.yellow,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>✨ TON PLAN CALCULÉ</div>
              <div style={{display:"flex",gap:12,marginBottom:6}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:22,fontWeight:900,color:C.yellow}}>{kcalCalc}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.6)"}}>kcal / jour</div>
                </div>
                <div style={{width:1,background:"rgba(255,255,255,0.15)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:22,fontWeight:900,color:"#6EF0A0"}}>{protCalc}g</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.6)"}}>protéines / jour</div>
                </div>
              </div>
              <details style={{marginTop:6}}>
                <summary style={{fontSize:10,color:"rgba(255,255,255,0.5)",cursor:"pointer",listStyle:"none"}}>▸ Voir le détail du calcul</summary>
                <div style={{marginTop:8,fontSize:10,color:"rgba(255,255,255,0.7)",lineHeight:1.7}}>
                  <div>🔬 BMR impédancemètre : <strong style={{color:C.white}}>{bmrCur} kcal</strong></div>
                  <div>🎯 Déficit : <strong style={{color:C.white}}>−{OBJECTIFS_COACH.find(o=>o.v===objCur)?.deficit||0} kcal</strong></div>
                  <div>✅ Objectif kcal : <strong style={{color:C.yellow}}>{kcalCalc} kcal</strong></div>
                  <div style={{marginTop:5}}>⚖️ Poids : <strong style={{color:C.white}}>{poidsCur} kg</strong> × <strong>{RATIOS_PROTEINES.find(r=>r.v===ratCur)?.mult||1}g</strong></div>
                  <div>✅ Objectif protéines : <strong style={{color:"#6EF0A0"}}>{protCalc}g</strong></div>
                </div>
              </details>
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setStep("info")} style={{padding:"14px 18px",background:"transparent",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:12,color:"rgba(255,255,255,0.7)",fontSize:13,cursor:"pointer"}}>← Retour</button>
            <button onClick={()=>{ const p=parseFloat(form.poids); const b=parseInt(form.bmr); if(!p||p<35||p>250){alert("Entre un poids valide (35-250 kg)");return;} if(!b||b<800||b>3000){alert("Entre un BMR valide (800-3000 kcal)\n\nC'est la valeur donnée par Dominique lors de ta pesée.");return;} setStep("formule"); }} style={{flex:1,padding:"15px",background:C.yellow,border:"none",borderRadius:12,color:C.navy,fontSize:15,fontWeight:"900",cursor:"pointer"}}>Suivant →</button>
          </div>
        </div>
      );
    }

    // === ÉTAPE 3 : Choix de la formule ===
    return(
      <div style={{fontFamily:"sans-serif",minHeight:"100vh",background:C.navy,color:C.white,maxWidth:480,margin:"0 auto",padding:"30px 20px"}}>
        <div style={{marginBottom:20,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}><span style={{fontSize:26,fontWeight:"900",color:C.white}}>STIM</span><span style={{fontSize:26,fontWeight:"900",color:C.yellow}}>BODY</span><span style={{fontSize:14,color:C.yellow,marginLeft:3}}>⚡</span></div></div>
        <div style={{display:"flex",gap:4,marginBottom:18}}>{[1,2,3].map(n=>(<div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=3?C.yellow:"rgba(255,255,255,0.15)"}}/>))}</div>
        <div style={{fontSize:10,color:C.yellow,letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Étape 3 / 3 · Ta formule</div>
        <div style={{fontSize:19,fontWeight:900,color:C.white,marginBottom:4}}>Choisis ta formule, {form.prenom} 👇</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:18,lineHeight:1.5}}>Elle sera utilisée comme recommandation dans ton journal alimentaire.</div>
        {Object.entries(FORMULES).map(([key,f])=>(
          <div key={key} onClick={()=>{
            const poids=parseFloat(form.poids);
            const bmr=parseInt(form.bmr);
            const objectifKcal=form.objectifKcal||"gras";
            const ratioProt=form.ratioProt||"1";
            const kcalObj=calcObjectifKcal(bmr,objectifKcal);
            const protObj=calcObjectifProteines(poids,ratioProt);
            const info={prenom:form.prenom.trim(),age:form.age,objectif:form.objectif,formule:key,poids,bmr,objectifKcal,ratioProt,kcalObjectif:kcalObj,protObjectif:protObj,datePesee:new Date().toISOString()};
            setClientInfo(info); setPrefs(f.prefs);
            try{localStorage.setItem("sb-info",JSON.stringify(info));}catch(e){}
            setEditingProfile(false); setStep("info");
          }} style={{background:"rgba(255,255,255,0.07)",borderRadius:18,padding:"20px",marginBottom:12,cursor:"pointer",border:"2px solid rgba(255,255,255,0.15)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><div style={{fontSize:32}}>{f.emoji}</div><div><div style={{fontSize:16,fontWeight:900,color:C.yellow}}>{f.label}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:2}}>Programme 25 jours recommandé</div></div></div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.6,marginBottom:12}}>{f.desc}</div>
            <div style={{background:C.yellow,borderRadius:10,padding:"10px 14px",textAlign:"center",color:C.navy,fontWeight:900,fontSize:13}}>Choisir cette formule →</div>
          </div>
        ))}
        <button onClick={()=>setStep("impedance")} style={{width:"100%",padding:"12px",background:"transparent",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,color:"rgba(255,255,255,0.5)",fontSize:12,cursor:"pointer",marginTop:4}}>← Retour</button>
      </div>
    );
  }

  const TABS=[{k:"profil",l:"👤 Profil"},{k:"repas",l:"🍽 Repas"},{k:"recettes",l:"🍳 Recettes"},{k:"conseils",l:"📚 Conseils"},...(formule==="equilibre"?[{k:"reequilibrage",l:"⚖️ Rééquilibrage"},{k:"exemple",l:"🍽️ Exemple menu"}]:[]),{k:"analytics",l:"📊 Suivi"},{k:"courses",l:"🛒 Courses"}];

  return(
    <div style={{fontFamily:"sans-serif",minHeight:"100vh",background:C.bg,color:C.text,maxWidth:480,margin:"0 auto"}}>
      <div style={{background:C.navy,padding:"14px 16px 0"}}>
        <div style={{textAlign:"center",paddingBottom:8}}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}><span style={{fontSize:24,fontWeight:"900",color:C.white,letterSpacing:1}}>STIM</span><span style={{fontSize:24,fontWeight:"900",color:C.yellow,letterSpacing:1}}>BODY</span><span style={{fontSize:14,color:C.yellow,marginLeft:3}}>⚡</span></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:2}}>
            <span style={{fontSize:9,background:formule==="sucre"?C.orange:C.green,color:"white",padding:"2px 8px",borderRadius:20,fontWeight:700}}>{FORMULES[formule].emoji} {FORMULES[formule].label}</span>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>· {CLIENT.toUpperCase()}</span>
            {clientInfo?.kcalObjectif&&<span style={{fontSize:9,color:C.yellow,fontWeight:700}}>· 🎯 {clientInfo.kcalObjectif} kcal</span>}
            <button onClick={()=>{setForm({prenom:clientInfo?.prenom||"",age:clientInfo?.age||"",objectif:clientInfo?.objectif||"",poids:clientInfo?.poids||"",bmr:clientInfo?.bmr||"",objectifKcal:clientInfo?.objectifKcal||"gras",ratioProt:clientInfo?.ratioProt||"1"});setEditingProfile(true);setStep("info");}} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:6,color:C.yellow,fontSize:9,padding:"2px 7px",cursor:"pointer"}}>✏️</button>
          </div>
        </div>
        <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none"}}>{TABS.map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flexShrink:0,padding:"8px 10px",background:"transparent",border:"none",borderBottom:tab===t.k?"3px solid "+C.yellow:"3px solid transparent",color:tab===t.k?C.yellow:"rgba(255,255,255,0.4)",fontSize:8,cursor:"pointer",whiteSpace:"nowrap",fontWeight:tab===t.k?"bold":"normal"}}>{t.l}</button>))}</div>
      </div>

      {tab==="profil"&&<ProfilTab prefs={prefs} setPrefs={setPrefs} onGenerate={handleGenerate}/>}
      {tab==="repas"&&(!planReady?(
        <div style={{padding:"60px 24px",textAlign:"center"}}><div style={{fontSize:44,marginBottom:16}}>👤</div><div style={{fontSize:15,color:C.navy,fontWeight:"bold",marginBottom:10}}>Commence par le Profil</div><div style={{fontSize:12,color:C.muted,marginBottom:24,lineHeight:1.6}}>Coche les aliments et génère ton plan sur mesure.</div><button onClick={()=>setTab("profil")} style={{background:C.navy,border:"none",borderRadius:12,color:C.yellow,fontSize:14,fontWeight:"bold",padding:"14px 32px",cursor:"pointer"}}>Aller au profil →</button></div>
      ):(
        <div style={{padding:"14px 12px 30px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <button onClick={()=>setDay(d=>Math.max(0,d-1))} disabled={day===0} style={{background:day===0?"#E8EAF0":C.navy,border:"none",color:day===0?C.muted:C.yellow,borderRadius:9,padding:"8px 15px",fontSize:16,cursor:day===0?"default":"pointer",fontWeight:"bold"}}>{"<"}</button>
            <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:22,fontWeight:"900",color:dayOk?C.green:C.navy}}>JOUR {day+1} <span style={{fontSize:13,color:C.muted,fontWeight:"normal"}}>/ 25</span></div><div style={{fontSize:10,color:C.muted}}>Semaine {Math.floor(day/7)+1}</div></div>
            <button onClick={()=>setDay(d=>Math.min(24,d+1))} disabled={day===24} style={{background:day===24?"#E8EAF0":C.navy,border:"none",color:day===24?C.muted:C.yellow,borderRadius:9,padding:"8px 15px",fontSize:16,cursor:day===24?"default":"pointer",fontWeight:"bold"}}>{">"}</button>
          </div>
          <div style={{height:5,background:C.border,borderRadius:3,marginBottom:14}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,"+C.navy+","+C.yellow+")",width:((day+1)/25*100)+"%",transition:"width 0.3s"}}/></div>
          {/* === BANDEAU JOURNALIER V3 - Méthode Coach Dominique === */}
          <div style={{background:C.navy,borderRadius:14,padding:"14px 14px 12px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:9,letterSpacing:2,color:C.yellow,textTransform:"uppercase",fontWeight:"bold"}}>🎯 Tes objectifs du jour</span>
              <span style={{fontSize:8,letterSpacing:1,color:"rgba(255,255,255,0.5)"}}>Mangé / Objectif</span>
            </div>
            {/* KCAL - Gros affichage */}
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.6)",fontWeight:600}}>🔥 KCAL</span>
                <span style={{fontSize:11,color:barColor,fontWeight:"bold"}}>{pctCal}%</span>
              </div>
              <div style={{fontSize:18,fontWeight:"bold",color:C.yellow,marginBottom:5}}>
                {Math.round(totalActual.cal)} <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>/ {Math.round(userKcalObjectif)} kcal</span>
              </div>
              <div style={{height:7,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:Math.min(100,pctCal)+"%",background:barColor,borderRadius:4,transition:"width 0.5s"}}/>
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",marginTop:4}}>{motivMsg}</div>
            </div>
            {/* PROTÉINES - Gros affichage */}
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.6)",fontWeight:600}}>🥩 PROTÉINES <span style={{fontSize:8,color:"rgba(255,255,255,0.4)",fontWeight:400}}>({clientInfo?.ratioProt==="12"?"1.2":clientInfo?.ratioProt==="15"?"1.5":"1"}g/kg)</span></span>
                <span style={{fontSize:11,color:pctProt>=100?C.green:pctProt>=70?"#6EF0A0":"#6EC8FF",fontWeight:"bold"}}>{pctProt}%</span>
              </div>
              <div style={{fontSize:18,fontWeight:"bold",color:"#6EF0A0",marginBottom:5}}>
                {Math.round(totalActual.p)}g <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>/ {userProtObjectif}g</span>
              </div>
              <div style={{height:7,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:Math.min(100,pctProt)+"%",background:pctProt>=100?C.green:"#6EF0A0",borderRadius:4,transition:"width 0.5s"}}/>
              </div>
              {restProt>0&&totalActual.p>0&&<div style={{fontSize:10,color:"rgba(255,255,255,0.7)",marginTop:4}}>🌱 Encore {restProt}g de protéines</div>}
              {restProt===0&&totalActual.p>0&&<div style={{fontSize:10,color:C.green,marginTop:4,fontWeight:"bold"}}>✅ Objectif protéines atteint !</div>}
            </div>
            {/* Macros détails pliable */}
            <details style={{marginTop:8,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:8}}>
              <summary style={{fontSize:9,color:"rgba(255,255,255,0.4)",cursor:"pointer",listStyle:"none",letterSpacing:1}}>▸ VOIR LES MACROS (LIPIDES / GLUCIDES)</summary>
              <div style={{display:"flex",marginTop:10,gap:10}}>
                <div style={{flex:1,textAlign:"center"}}>
                  <div style={{fontSize:15,fontWeight:"bold",color:"#6EC8FF"}}>{Math.round(totalActual.f)}g</div>
                  <div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1}}>Lipides</div>
                </div>
                <div style={{flex:1,textAlign:"center"}}>
                  <div style={{fontSize:15,fontWeight:"bold",color:"#C0A0FF"}}>{Math.round(totalActual.c)}g</div>
                  <div style={{fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1}}>Glucides</div>
                </div>
              </div>
            </details>
          </div>
          {/* Rappel plan théorique */}
          <div style={{background:"#F5F7FF",borderRadius:10,padding:"8px 12px",marginBottom:14,fontSize:10,color:C.soft,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>💡 Plan STIMBODY recommandé : <strong style={{color:C.navy}}>{Math.round(total.cal)} kcal</strong></span>
            <span style={{fontSize:9,color:C.muted}}>Indicatif</span>
          </div>
          {/* === FIN BANDEAU V3 === */}
          {/* === SESSION 2 : Composant FreeItemsSection réutilisable === */}
          {(()=>{
            const FreeItemsSection=({meal,mealLabel,mealEmoji})=>{
              const items=getFreeItems(meal);
              if(!items.length) return null;
              const mealTotal=calcFreeItems(items);
              return(
                <div style={{background:"#FFFBF0",border:"1px solid "+C.yellow+"60",borderRadius:10,padding:"10px 12px",marginTop:-6,marginBottom:10}}>
                  <div style={{fontSize:9,color:"#7A5000",textTransform:"uppercase",letterSpacing:1,marginBottom:6,fontWeight:700}}>+ Aliments ajoutés</div>
                  {items.map((it,idx)=>{
                    const a=ALIMENTS_DB.find(x=>x.id===it.alimentId);
                    if(!a) return null;
                    const f=it.qty/100;
                    return(
                      <div key={idx} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:idx<items.length-1?"1px dotted "+C.border:"none"}}>
                        <span style={{fontSize:15}}>{a.e}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:11,color:C.navy,fontWeight:600}}>{a.n}</div>
                          <div style={{fontSize:9,color:C.muted}}>{it.qty}g · {Math.round(a.cal*f)} kcal · P {(a.p*f).toFixed(1)}g</div>
                        </div>
                        <button onClick={()=>removeFreeItem(meal,idx)} style={{background:"none",border:"none",color:"#CC3333",fontSize:16,cursor:"pointer",padding:"0 4px"}}>×</button>
                      </div>
                    );
                  })}
                  <div style={{fontSize:10,color:"#7A5000",fontWeight:700,marginTop:6,paddingTop:6,borderTop:"1px solid "+C.yellow+"40"}}>Total ajouts : {Math.round(mealTotal.cal)} kcal · P {mealTotal.p.toFixed(1)}g</div>
                </div>
              );
            };
            const AddButton=({meal,mealLabel,mealEmoji})=>(
              <button onClick={()=>setSearchMeal({key:meal,label:mealLabel,emoji:mealEmoji})} style={{width:"100%",padding:"10px",marginTop:-6,marginBottom:10,background:"white",border:"1.5px dashed "+C.yellow,borderRadius:10,color:"#7A5000",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Ajouter un aliment au {mealLabel.toLowerCase()}</button>
            );
            return(
              <>
                <MCard {...mp("matin")} emoji="🌅" title="Petit-déjeuner" footNote="Thé / Café noir · Grand verre d'eau"/>
                <FreeItemsSection meal="matin" mealLabel="petit-déj" mealEmoji="🌅"/>
                <AddButton meal="matin" mealLabel="petit-déj" mealEmoji="🌅"/>

                <MCard {...mp("midi")} emoji="☀️" title="Déjeuner · plat + complément" huile footNote="Huile olive · Vinaigre cidre · Citron · Moutarde"/>
                <FreeItemsSection meal="midi" mealLabel="déjeuner" mealEmoji="☀️"/>
                <AddButton meal="midi" mealLabel="déjeuner" mealEmoji="☀️"/>

                <MCard {...mp("soir")} emoji="🌙" title="Dîner · légumes cuits + crus + protéine" isSoir/>
                <FreeItemsSection meal="soir" mealLabel="dîner" mealEmoji="🌙"/>
                <AddButton meal="soir" mealLabel="dîner" mealEmoji="🌙"/>

                {/* Card COLLATION (4e repas) - uniquement aliments libres */}
                <div style={{background:C.white,borderRadius:14,padding:13,marginBottom:10,boxShadow:"0 2px 12px rgba(13,27,75,0.08)",border:"1px solid "+C.border}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:getFreeItems("collation").length?9:0}}>
                    <span style={{fontSize:15}}>🍎</span>
                    <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.soft,flex:1}}>Collations</span>
                    <span style={{fontSize:9,background:"#FFF8D6",color:"#7A5000",padding:"2px 8px",borderRadius:8,fontWeight:"bold",border:"1px solid "+C.yellow}}>{getFreeItems("collation").length} ajout{getFreeItems("collation").length>1?"s":""}</span>
                  </div>
                  {getFreeItems("collation").length===0?(
                    <div style={{fontSize:11,color:C.muted,fontStyle:"italic",padding:"8px 0"}}>Aucune collation ajoutée aujourd'hui</div>
                  ):(
                    <>
                      {getFreeItems("collation").map((it,idx)=>{
                        const a=ALIMENTS_DB.find(x=>x.id===it.alimentId);
                        if(!a) return null;
                        const f=it.qty/100;
                        return(
                          <div key={idx} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"#FFFBF0",borderRadius:8,marginBottom:4,borderLeft:"3px solid "+C.yellow}}>
                            <span style={{fontSize:16}}>{a.e}</span>
                            <div style={{flex:1}}>
                              <div style={{fontSize:12,color:C.navy,fontWeight:600}}>{a.n}</div>
                              <div style={{fontSize:9,color:C.muted}}>{it.qty}g · {Math.round(a.cal*f)} kcal · P {(a.p*f).toFixed(1)}g</div>
                            </div>
                            <button onClick={()=>removeFreeItem("collation",idx)} style={{background:"none",border:"none",color:"#CC3333",fontSize:16,cursor:"pointer",padding:"0 4px"}}>×</button>
                          </div>
                        );
                      })}
                      {(()=>{const t=calcFreeItems(getFreeItems("collation"));return(<div style={{fontSize:10,color:C.navy,fontWeight:700,marginTop:6,padding:"6px 10px",background:"#F5F7FF",borderRadius:6}}>Total collations : {Math.round(t.cal)} kcal · P {t.p.toFixed(1)}g · L {t.f.toFixed(1)}g · G {t.c.toFixed(1)}g</div>);})()}
                    </>
                  )}
                  <button onClick={()=>setSearchMeal({key:"collation",label:"collation",emoji:"🍎"})} style={{width:"100%",padding:"10px",marginTop:10,background:"white",border:"1.5px dashed "+C.yellow,borderRadius:10,color:"#7A5000",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Ajouter une collation</button>
                </div>
              </>
            );
          })()}          <div style={{background:dayOk?C.green:C.white,border:"2px solid "+(dayOk?C.green:C.border),borderRadius:16,padding:"16px 18px",marginTop:4,marginBottom:10,transition:"all 0.4s",boxShadow:dayOk?"0 4px 20px rgba(26,144,80,0.25)":"0 2px 10px rgba(13,27,75,0.06)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:40,height:40,borderRadius:10,flexShrink:0,border:"3px solid "+(dayOk?C.white:"#C0D0E8"),background:dayOk?"rgba(255,255,255,0.25)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s"}}>{dayOk?<span style={{color:C.white,fontSize:22,fontWeight:"900"}}>✓</span>:<span style={{color:"#C0D0E8",fontSize:13,fontWeight:"bold"}}>{doneC}/{totalC}</span>}</div>
              <div style={{flex:1}}><div style={{fontSize:15,fontWeight:"900",color:dayOk?C.white:C.navy}}>{dayOk?"Journée complète !":"Journée en cours…"}</div><div style={{fontSize:11,color:dayOk?"rgba(255,255,255,0.8)":C.muted}}>{dayOk?"Bravo "+CLIENT+" ! Jour "+(day+1)+" terminé":doneC+" plats sur "+totalC+" cochés"}</div></div>
            </div>
            {!dayOk&&<div style={{marginTop:12,height:6,background:C.border,borderRadius:3}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,"+C.navy+","+C.yellow+")",width:totalC>0?(doneC/totalC*100)+"%":"0%",transition:"width 0.3s"}}/></div>}
          </div>
          <BJ j={j} onMood={v=>setJ({mood:j.mood===v?null:v})} onFaim={v=>setJ({faim:j.faim===v?null:v})} onWater={()=>setJ({water:!j.water})} onNote={v=>setJ({note:v})}/>
          <div style={{background:C.white,border:"1px solid #C0D0F0",borderRadius:10,padding:"9px 12px",fontSize:10,color:C.navyL,textAlign:"center",marginBottom:14}}>Rozana / Hépar journée · Evian/Volvic magnésium soir</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center"}}>{Array.from({length:25},(_,i)=>(<button key={i} onClick={()=>setDay(i)} style={{width:26,height:26,borderRadius:"50%",border:i===day?"2px solid "+C.navy:"1px solid #C8D0E8",background:i===day?C.navy:i<day?"#DDE3F5":C.white,color:i===day?C.yellow:i<day?C.navyL:C.muted,fontSize:8,cursor:"pointer",fontWeight:i===day?"bold":"normal"}}>{i+1}</button>))}</div>
          <button onClick={()=>setTab("profil")} style={{width:"100%",marginTop:16,padding:"10px",background:"#F5F7FF",border:"1px dashed "+C.border,borderRadius:10,fontSize:11,color:C.navyL,cursor:"pointer"}}>Modifier les préférences et régénérer</button>
        </div>
      ))}
      {tab==="recettes"&&<BiblioRecettes formule={formule}/>}
      {tab==="conseils"&&<ConseilsTab formule={formule}/>}
      {tab==="reequilibrage"&&<ReequilibrageTab/>}
      {tab==="analytics"&&<Analytics chartData={chartData} clientName={CLIENT}/>}
      {tab==="courses"&&(
        <div style={{padding:"14px 12px 30px"}}>
          {!planReady?(
            <div style={{padding:"40px 20px",textAlign:"center"}}><div style={{fontSize:36,marginBottom:12}}>🛒</div><div style={{fontSize:13,color:C.navy,fontWeight:"bold",marginBottom:8}}>Génère d'abord ton plan</div><button onClick={()=>setTab("profil")} style={{marginTop:16,background:C.navy,border:"none",borderRadius:10,color:C.yellow,fontSize:13,fontWeight:"bold",padding:"12px 24px",cursor:"pointer"}}>Aller au profil →</button></div>
          ):courses.map((cat,i)=>(
            <div key={i} style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,padding:12,marginBottom:10,boxShadow:"0 2px 10px rgba(13,27,75,0.06)"}}>
              <div style={{fontSize:11,fontWeight:"bold",color:C.white,background:C.navy,margin:"-12px -12px 10px -12px",padding:"9px 12px",borderRadius:"14px 14px 0 0"}}>{cat.cat}</div>
              {cat.items.length>0?cat.items.map((item,j)=>(<div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 8px",background:j%2===0?"#F5F7FF":C.white,borderRadius:7,marginBottom:3}}><span style={{fontSize:12,color:C.text,flex:1}}>{item.n}</span><span style={{fontSize:11,fontWeight:"bold",color:C.navy,background:"#EEF1FA",padding:"2px 10px",borderRadius:8,marginLeft:8,flexShrink:0}}>{item.q}</span></div>)):<div style={{fontSize:11,color:C.muted,padding:"8px",textAlign:"center"}}>Aucun sélectionné</div>}
            </div>
          ))}
        </div>
      )}
      {tab==="exemple"&&<ExempleMenu/>}
      {/* === SESSION 2 : Modal de recherche d'aliments === */}
      {searchMeal&&<AlimentSearch mealKey={searchMeal.key} mealLabel={searchMeal.label} mealEmoji={searchMeal.emoji} onAdd={(aliment,qty)=>addFreeItem(searchMeal.key,aliment,qty)} onClose={()=>setSearchMeal(null)}/>}
    </div>
  );
}
