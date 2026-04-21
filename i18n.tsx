import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ko" | "en";

const translations = {
  ko: {
    // Header
    "nav.features": "기능",
    "nav.howItWorks": "사용 방법",
    "nav.why": "드링키지란",
    "nav.download": "다운로드",

    // Hero
    "hero.badge": "와인을 이지하게",
    "hero.title1": "별점 대신 취향으로,",
    "hero.title2": "나에게 맞는 와인 점수",
    "hero.description": "내 취향을 입력하면 모든 와인에 매칭 점수를 알려줘요.\n라벨만 찍어도, 음식만 말해도 딱 맞는 와인을 찾아드립니다.",
    "hero.appStore": "App Store에서 다운로드",
    "hero.learnMore": "더 알아보기",

    // How it works
    "how.title": "이렇게 사용해요",
    "how.subtitle": "복잡한 와인 공부 없이, 3단계로 나만의 와인을 찾아보세요.",
    "how.step1.title": "취향을 말해주세요",
    "how.step1.desc": "\"달달한 거 좋아해요\", \"쓴 건 싫어요\" 같은 일상 언어로 내 입맛을 표현하면 돼요.",
    "how.step2.title": "매칭 점수를 확인하세요",
    "how.step2.desc": "입력한 취향을 바탕으로 모든 와인에 나만의 매칭 점수를 매겨드려요. 별점이 아닌, 나와 얼마나 맞는지를 알려줍니다.",
    "how.step3.title": "마시고, 기록하고, 발전하세요",
    "how.step3.desc": "마신 와인을 기록할수록 추천이 더 정확해져요. 내 취향이 선명해지는 경험을 해보세요.",

    // Features
    "features.title": "주요 기능",
    "features.subtitle": "와인을 즐기는 데 필요한 모든 것을 담았어요.",

    "features.match.title": "취향 매칭 점수",
    "features.match.subtitle": "별점이 아닌 나만의 점수",
    "features.match.desc": "다른 사람의 별점 대신,\n내 취향 데이터를 기반으로 모든 와인에 매칭 점수를 산출합니다.",

    "features.scan.title": "라벨 & 리스트 스캔",
    "features.scan.subtitle": "찍으면 바로 점수 확인",
    "features.scan.desc": "와인 라벨이나 레스토랑 와인 리스트를 카메라로 촬영하세요.\n자동으로 인식해서 매칭 점수순으로 정렬해 보여드립니다.",

    "features.chat.title": "음식 페어링 챗봇",
    "features.chat.subtitle": "음식에 어울리는 와인 추천",
    "features.chat.desc": "\"스테이크에 어울리는 와인 뭐가 있어?\" 라고 물어보세요.\nAI 챗봇이 음식과 완벽하게 어울리는 와인을 추천해드립니다.",

    "features.note.title": "테이스팅 노트",
    "features.note.subtitle": "감각적인 와인 기록",
    "features.note.desc": "마신 와인의 맛과 향을 키워드로 간편하게 기록하세요.\n기록이 쌓일수록 매칭 점수도 더 정확해집니다.",

    "features.cellar.title": "마이 셀러",
    "features.cellar.subtitle": "내 와인 컬렉션 관리",
    "features.cellar.desc": "보유 중인 와인을 한눈에 관리하세요.\n언제 마실지, 어떤 와인이 있는지 깔끔하게 정리됩니다.",

    // Why
    "why.title": "왜 드링키지인가요?",
    "why.subtitle": "와인 입문의 장벽을 낮추기 위해 만들었어요.",
    "why.match.title": "별점이 아닌 매칭 점수",
    "why.match.desc": "남들이 매긴 별점이 아니라, 내 취향에 얼마나 맞는지를 점수로 보여줍니다.\n같은 와인이라도 사람마다 점수가 다릅니다.",
    "why.language.title": "언어의 간극을 해소",
    "why.language.desc": "초보자가 말하는 \"달콤한\"과 전문가가 말하는 \"달콤한\"은 다릅니다.\n드링키지는 이 차이를 정확히 번역합니다.",
    "why.scan.title": "찍으면 끝, 고민 끝",
    "why.scan.desc": "레스토랑에서 와인 리스트 앞에서 고민할 필요 없어요.\n찍으면 나에게 맞는 순서대로 정렬해드립니다.",
    "why.easy.title": "공부 없이 즐기는 와인",
    "why.easy.desc": "품종, 빈티지, 테루아... 몰라도 됩니다.\n내 언어로 말하면, 나머지는 드링키지가 알아서 해요.",

    // CTA
    "cta.title": "나만의 와인 여정을 시작하세요",
    "cta.description": "복잡한 와인의 세계, 드링키지와 함께라면 쉬워집니다.\n지금 무료로 다운로드하고 첫 와인 추천을 받아보세요.",
    "cta.button": "무료로 시작하기",

    // Footer
    "terms": "이용약관",
    "privacy": "개인정보 처리방침",
    "notices": "공지사항",
  },
  en: {
    // Header
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.why": "About",
    "nav.download": "Download",

    // Hero
    "hero.badge": "Wine made easy",
    "hero.title1": "Not ratings.",
    "hero.title2": "Your personal match score",
    "hero.description": "Tell us your taste, and we'll score every wine just for you.\nSnap a label or ask about food — we'll find the perfect match.",
    "hero.appStore": "Download on App Store",
    "hero.learnMore": "How does it work?",

    // How it works
    "how.title": "How It Works",
    "how.subtitle": "No wine knowledge needed. Find your perfect wine in 3 simple steps.",
    "how.step1.title": "Tell us your taste",
    "how.step1.desc": "Use everyday words like \"I like sweet\" or \"nothing too bitter\" to describe your palate.",
    "how.step2.title": "Get your match scores",
    "how.step2.desc": "Based on your taste profile, every wine gets a personal match score. Not ratings — how well it fits you.",
    "how.step3.title": "Drink, record, improve",
    "how.step3.desc": "The more you log, the smarter your recommendations get. Watch your taste profile sharpen over time.",

    // Features
    "features.title": "Features",
    "features.subtitle": "Everything you need to enjoy wine, all in one app.",

    "features.match.title": "Taste Match Score",
    "features.match.subtitle": "Your score, not ratings",
    "features.match.desc": "Instead of generic star ratings,\nevery wine gets a personal match score based on your taste data.",

    "features.scan.title": "Label & List Scan",
    "features.scan.subtitle": "Snap and see scores",
    "features.scan.desc": "Point your camera at a wine label or restaurant wine list.\nWe'll recognize them instantly and sort by your match score.",

    "features.chat.title": "Food Pairing Chat",
    "features.chat.subtitle": "Wine meets food",
    "features.chat.desc": "Ask \"What goes with steak?\"\nand our AI chatbot will recommend wines that pair perfectly with your meal.",

    "features.note.title": "Tasting Notes",
    "features.note.subtitle": "Record your experience",
    "features.note.desc": "Log flavors and aromas with simple keywords.\nThe more you record, the more accurate your match scores become.",

    "features.cellar.title": "My Cellar",
    "features.cellar.subtitle": "Manage your collection",
    "features.cellar.desc": "Keep track of your wines at a glance.\nSee what you have, plan when to drink, and stay organized.",

    // Why
    "why.title": "Why Drinkig?",
    "why.subtitle": "We built this to lower the barrier to wine.",
    "why.match.title": "Match scores, not star ratings",
    "why.match.desc": "Instead of other people's ratings, see how well each wine fits your taste. The same wine gets a different score for everyone.",
    "why.language.title": "Bridging the language gap",
    "why.language.desc": "\"Sweet\" means different things to beginners and experts. Drinkig precisely translates between the two.",
    "why.scan.title": "Snap it, sorted",
    "why.scan.desc": "No more staring at a wine list in confusion. Just snap a photo and see them ranked by your personal match.",
    "why.easy.title": "No studying required",
    "why.easy.desc": "Varietals, vintages, terroir... you don't need to know any of it. Just speak your language, and Drinkig does the rest.",

    // CTA
    "cta.title": "Start your wine journey",
    "cta.description": "The complex world of wine, simplified.\nDownload for free and get your first recommendation today.",
    "cta.button": "Get started for free",

    // Footer
    "terms": "Terms of Service",
    "privacy": "Privacy Policy",
    "notices": "Notices",
  },
} as const;

type TranslationKey = keyof typeof translations.ko;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("drinkig-lang");
    if (saved === "en" || saved === "ko") return saved;
    return navigator.language.startsWith("en") ? "en" : "ko";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("drinkig-lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.ko[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
