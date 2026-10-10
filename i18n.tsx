import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pathnameToLang, localizePath, type Lang } from "./lib/seo-meta";

export type { Lang };

const translations = {
  ko: {
    // Header
    "nav.features": "기능",
    "nav.howItWorks": "사용 방법",
    "nav.why": "드링키지는",
    "nav.download": "App Store",

    // Hero
    "hero.title1": "별점 대신 취향으로,",
    "hero.title2": "나에게 맞는 와인 점수",
    "hero.description":
      "내 입맛을 말하면, 모든 와인에 내 점수가 붙어요.",
    "hero.appStore": "App Store에서 받기",
    "hero.learnMore": "어떻게 작동하나요?",
    "hero.caption": "취향 분석 결과와 테이스팅 노트 화면",

    // Features
    "features.eyebrow": "주요 기능",
    "features.title": "수많은 와인 앞에서 막막할 때",
    "features.scan.eyebrow": "01 · 라벨 스캔",
    "features.scan.title": "이름이 복잡한 와인,\n찍어서 바로 검색하세요",
    "features.scan.desc":
      "리스트든 매대든 찍으면 끝. 내 점수 순으로 줄 세워요.",
    "features.scan.caption": "샤토 용 피작 2000, 라벨 스캔 중",
    "features.pairing.eyebrow": "02 · 음식 페어링",
    "features.pairing.title": "메뉴만 고르세요,\n와인은 맡기세요",
    "features.pairing.desc":
      "음식을 말하면 어울리는 와인을 골라드려요.",
    "features.pairing.caption": "크림 파스타에는 알자스 게뷔르츠트라미너",
    "features.note.eyebrow": "03 · 테이스팅 노트",
    "features.note.title": "그 와인 뭐였지?\n까먹지 말고 기록하세요",
    "features.note.desc":
      "향, 맛, 피니시를 키워드로. 쌓일수록 점수가 정확해져요.",
    "features.note.caption": "도멘 르플레이브 퓔리니 몽라쉐 2007 기록",
    "features.cellar.eyebrow": "04 · 내 와인 창고",
    "features.cellar.title": "언제 산 와인이었더라?\n우리 집 셀러를 한눈에",
    "features.cellar.desc":
      "산 지 며칠인지, 레드가 몇 병인지 한눈에.",
    "features.cellar.caption": "라 타슈, 돔 페리뇽, 르플레이브가 들어 있는 셀러",

    // How it works
    "how.eyebrow": "사용 방법",
    "how.title": "질문 몇 개면 돼요",
    "how.step1.title": "입맛을 말해주세요",
    "how.step1.desc": "\"달달한 게 좋아요\" 정도면 충분해요.",
    "how.step2.title": "내 점수를 확인하세요",
    "how.step2.desc": "모든 와인에 나와 맞는 정도가 점수로 붙어요.",
    "how.step3.title": "마신 와인을 기록하세요",
    "how.step3.desc": "기록할수록 점수가 정확해져요.",

    // Why
    "why.eyebrow": "드링키지는",
    "why.lead": "초보자의 \"달콤한\"과 전문가의 \"달콤한\"은 다릅니다.\n드링키지는 그 사이를 번역합니다.",
    "why.match.title": "별점이 아닌 매칭 점수",
    "why.match.desc": "같은 와인도 사람마다 점수가 달라요.",
    "why.language.title": "내 언어로 말하면 돼요",
    "why.language.desc": "품종이니 테루아니, 어려운 말 몰라도 돼요.",
    "why.easy.title": "공부는 나중에, 와인은 지금",
    "why.easy.desc": "고르는 시간은 줄이고, 마시는 시간은 늘리고.",

    // CTA
    "cta.title": "오늘 저녁 와인,\n뭐 마실지 정했나요?",
    "cta.description": "질문 몇 개에 답하면 바로 첫 추천을 받아요.",
    "cta.button": "App Store에서 받기",

    // Footer
    "terms": "이용약관",
    "privacy": "개인정보 처리방침",
    "notices": "공지사항",
    "footer.businessInfo": "상호: 고메블 (Gourmevel) · 대표: 위승주 · 사업자등록번호: 342-15-02376 · 통신판매업신고: 2026-서울서대문-0410",
    "footer.contact": "문의",

    // Notices
    "notices.back": "← 돌아가기",
    "notices.title": "공지사항",
    "notices.empty": "등록된 공지사항이 없습니다.",
    "notices.notFound": "공지사항을 찾을 수 없습니다.",
    "notices.backToList": "목록으로 돌아가기",
    "notices.backShort": "← 목록으로",
  },
  en: {
    // Header
    "nav.features": "Features",
    "nav.howItWorks": "How it works",
    "nav.why": "About",
    "nav.download": "App Store",

    // Hero
    "hero.title1": "Not star ratings.",
    "hero.title2": "A score that fits your taste",
    "hero.description":
      "Tell us your taste. Every wine gets your score.",
    "hero.appStore": "Get it on the App Store",
    "hero.learnMore": "How does it work?",
    "hero.caption": "Taste profile and tasting note screens",

    // Features
    "features.eyebrow": "Features",
    "features.title": "Lost in front of a wall of wine?",
    "features.scan.eyebrow": "01 · Label scan",
    "features.scan.title": "Long, hard names?\nJust take a photo",
    "features.scan.desc":
      "A list or a shelf, just shoot. Sorted by your score.",
    "features.scan.caption": "Scanning Château Yon-Figeac 2000",
    "features.pairing.eyebrow": "02 · Food pairing",
    "features.pairing.title": "Pick the dish,\nleave the wine to us",
    "features.pairing.desc":
      "Name the dish, we pick the wine.",
    "features.pairing.caption": "Cream pasta, meet Alsace Gewürztraminer",
    "features.note.eyebrow": "03 · Tasting notes",
    "features.note.title": "What was that wine?\nWrite it down before it fades",
    "features.note.desc":
      "Nose, palate, finish as keywords. More notes, sharper scores.",
    "features.note.caption": "A note on Domaine Leflaive Puligny-Montrachet 2007",
    "features.cellar.eyebrow": "04 · My cellar",
    "features.cellar.title": "When did I buy this?\nYour cellar at a glance",
    "features.cellar.desc":
      "Days since you bought it, how many reds are left. At a glance.",
    "features.cellar.caption": "A cellar holding La Tâche, Dom Pérignon and Leflaive",

    // How it works
    "how.eyebrow": "How it works",
    "how.title": "A few questions is all it takes",
    "how.step1.title": "Tell us your taste",
    "how.step1.desc": "\"I like it sweet\" is enough.",
    "how.step2.title": "See your score",
    "how.step2.desc": "Every wine gets a score for how well it fits you.",
    "how.step3.title": "Log what you drink",
    "how.step3.desc": "The more you log, the sharper the scores.",

    // Why
    "why.eyebrow": "About Drinkig",
    "why.lead": "\"Sweet\" means one thing to a beginner and another to a sommelier.\nDrinkig translates between the two.",
    "why.match.title": "Match scores, not star ratings",
    "why.match.desc": "The same wine scores differently for everyone.",
    "why.language.title": "Speak your own language",
    "why.language.desc": "Terroir, tannins, all that jargon. You can skip it.",
    "why.easy.title": "Study later, drink now",
    "why.easy.desc": "Less time choosing, more time drinking.",

    // CTA
    "cta.title": "Decided what to open\ntonight?",
    "cta.description": "Answer a few questions and get your first pick right away.",
    "cta.button": "Get it on the App Store",

    // Footer
    "terms": "Terms of Service",
    "privacy": "Privacy Policy",
    "notices": "Notices",
    "footer.businessInfo": "Gourmevel · CEO: Seungju Wi · Business Reg. No: 342-15-02376 · E-commerce Permit: 2026-서울서대문-0410",
    "footer.contact": "Contact",

    // Notices
    "notices.back": "← Back",
    "notices.title": "Notices",
    "notices.empty": "No notices yet.",
    "notices.notFound": "Notice not found.",
    "notices.backToList": "Back to list",
    "notices.backShort": "← Back to list",
  },
} as const;

export type TranslationKey = keyof typeof translations.ko;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  /** 현재 언어를 유지한 내부 링크 경로. 예: en에서 lp("/notices") → "/en/notices" */
  lp: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// 언어는 URL이 소스다: /en 접두어가 있으면 en, 없으면 ko.
// 검색엔진이 언어별 URL을 각각 인덱싱할 수 있게 하기 위함.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = pathnameToLang(pathname);

  const changeLang = (newLang: Lang) => {
    if (newLang !== lang) navigate(localizePath(pathname, newLang));
  };

  // 스크린리더 발음·검색엔진 언어 판별을 위해 <html lang>을 현재 언어와 동기화
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.ko[key] || key;
  };

  const lp = (path: string) => localizePath(path, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t, lp }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
