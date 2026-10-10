// 기능 섹션 머리에 흘러가는 와인 카드. 사진은 DB(S3 wine-images)에 있는 실제 와인이고,
// 이름·타입·나라는 와인 마스터 CSV 값이다. (001460은 CSV에 로제로 돼 있지만 사진이 레드라 레드로 적음)
export interface MarqueeWine {
  id: string;
  name: string;
  nameEng: string;
  type: string;
  typeEng: string;
  country: string;
  countryEng: string;
}

const T = {
  red: ["레드", "Red"],
  white: ["화이트", "White"],
  rose: ["로제", "Rosé"],
  sparkling: ["스파클링", "Sparkling"],
} as const;
const C = {
  fr: ["프랑스", "France"],
  us: ["미국", "USA"],
  cl: ["칠레", "Chile"],
  nz: ["뉴질랜드", "New Zealand"],
  es: ["스페인", "Spain"],
  ar: ["아르헨티나", "Argentina"],
  de: ["독일", "Germany"],
  at: ["오스트리아", "Austria"],
} as const;

const w = (id: string, name: string, nameEng: string, t: keyof typeof T, c: keyof typeof C): MarqueeWine => ({
  id, name, nameEng, type: T[t][0], typeEng: T[t][1], country: C[c][0], countryEng: C[c][1],
});

export const MARQUEE_WINES: MarqueeWine[] = [
  w("114170", "샤또 보 세주르 베코", "Château Beau-Séjour Bécot", "red", "fr"),
  w("062490", "오이스터 베이 말버러 샤르도네", "Oyster Bay Marlborough Chardonnay", "white", "nz"),
  w("074560", "달라 발레 마야", "Dalla Valle Maya", "red", "us"),
  w("033092", "생 일레르 리무 블랑 드 블랑 브뤼", "Saint-Hilaire Limoux Blanc de Blancs Brut", "sparkling", "fr"),
  w("097510", "로어 게리스 빈야드 피노 누아", "Roar Garys' Vineyard Pinot Noir", "red", "us"),
  w("015570", "도멘 자쿠레트 꼬뜨 드 프로방스 로제", "Domaine Jacourette Côtes de Provence Rosé", "rose", "fr"),
  w("018330", "하이츠 셀러 벨라 오크스 카베르네 소비뇽", "Heitz Cellar Bella Oaks Cabernet Sauvignon", "red", "us"),
  w("089625", "로버트 바일 에스테이트 슈페트레제", "Robert Weil Estate Spätlese", "white", "de"),
  w("093177", "본드 베치나", "Bond Vecina", "red", "us"),
  w("067208", "샤또 프라도 방돌 로제", "Château Pradeaux Bandol Rosé", "rose", "fr"),
  w("033458", "샤또 듀카스 루즈", "Château Ducasse Rouge", "red", "fr"),
  w("024240", "펜스 에스테이트 샤르도네", "Pence Estate Chardonnay", "white", "us"),
  w("109159", "마스 칼 드무라 랭피델", "Mas Cal Demoura L'Infidèle", "red", "fr"),
  w("097281", "슈람스버그 제이 슈람", "Schramsberg J. Schram", "sparkling", "us"),
  w("001460", "에라주리즈 맥스 레세르바 카르메네르", "Errázuriz Max Reserva Carmenère", "red", "cl"),
  w("105401", "바인구트 오트 그뤼너 펠트리너 슈피겔", "Weingut Ott Grüner Veltliner Spiegel", "white", "at"),
  w("013906", "루베리 비가 리오하 크리안사", "Luberri Biga Rioja Crianza", "red", "es"),
  w("098557", "위트니스 트리 에스테이트 피노 누아", "Witness Tree Estate Pinot Noir", "red", "us"),
  w("010832", "에라주리즈 맥스 레세르바 피노 누아", "Errázuriz Max Reserva Pinot Noir", "red", "cl"),
  w("023157", "안굴로 이노첸티 유니소노", "Angulo Innocenti Unísono", "red", "ar"),
];
