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
    "hero.title1": "어려운 와인 용어 대신,",
    "hero.title2": "일상의 언어로 찾는 와인",
    "hero.description": "\"달콤한\", \"부드러운\" 같은 내 언어로 취향을 말하면,\n소믈리에 수준의 추천을 받을 수 있어요.",
    "hero.appStore": "App Store에서 다운로드",
    "hero.learnMore": "어떻게 작동하나요?",

    // How it works
    "how.title": "이렇게 사용해요",
    "how.subtitle": "복잡한 와인 공부 없이, 3단계로 나만의 와인을 찾아보세요.",
    "how.step1.title": "취향을 말해주세요",
    "how.step1.desc": "\"달달한 거 좋아해요\", \"쓴 건 싫어요\" 같은 일상 언어로 내 입맛을 표현하면 돼요.",
    "how.step2.title": "AI가 와인 언어로 번역",
    "how.step2.desc": "소믈리에의 자문을 바탕으로, 당신의 감각을 와인의 맛 체계에 정확히 매핑합니다.",
    "how.step3.title": "딱 맞는 와인 추천",
    "how.step3.desc": "내 취향에 맞는 와인을 추천받고, 마셔보면서 취향을 더 선명하게 만들어가요.",

    // Features
    "features.title": "주요 기능",
    "features.subtitle": "와인을 즐기는 데 필요한 모든 것을 담았어요.",
    "features.journey.title": "취향 여정",
    "features.journey.subtitle": "나만의 와인 취향 발견",
    "features.journey.desc": "기록이 쌓일수록 선명해지는 나만의 와인 취향을 발견하세요. 직관적인 질문에 답하면, AI가 당신의 취향 프로필을 만들어줍니다.",
    "features.note.title": "테이스팅 노트",
    "features.note.subtitle": "감각적인 와인 기록",
    "features.note.desc": "마신 와인의 맛과 향을 키워드로 간편하게 기록하세요. 어렵지 않게, 내가 느낀 그대로 남길 수 있어요.",
    "features.cellar.title": "마이 셀러",
    "features.cellar.subtitle": "내 와인 컬렉션 관리",
    "features.cellar.desc": "보유 중인 와인을 한눈에 관리하세요. 언제 마실지, 어떤 와인이 있는지 깔끔하게 정리됩니다.",

    // Why
    "why.title": "왜 드링키지인가요?",
    "why.subtitle": "와인 입문의 장벽을 낮추기 위해 만들었어요.",
    "why.sommelier.title": "소믈리에 수준의 추천",
    "why.sommelier.desc": "현직 소믈리에의 자문과 미식 에디터의 기획으로 완성된 추천 시스템. 전문가의 감각을 앱에 담았습니다.",
    "why.language.title": "언어의 간극을 해소",
    "why.language.desc": "초보자가 말하는 \"달콤한\"과 전문가가 말하는 \"달콤한\"은 다릅니다. 드링키지는 이 차이를 정확히 번역합니다.",
    "why.learning.title": "마실수록 정확해지는 추천",
    "why.learning.desc": "와인을 기록할수록 AI가 당신의 취향을 더 정밀하게 학습합니다. 쓸수록 좋아지는 개인화 경험.",
    "why.easy.title": "공부 없이 즐기는 와인",
    "why.easy.desc": "품종, 빈티지, 테루아... 몰라도 됩니다. 내 언어로 말하면, 나머지는 드링키지가 알아서 해요.",

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
    "hero.title1": "Skip the jargon.",
    "hero.title2": "Find wine in your own words",
    "hero.description": "Just say what you like — \"sweet\", \"smooth\", \"light\" — and get sommelier-level recommendations.",
    "hero.appStore": "Download on App Store",
    "hero.learnMore": "How does it work?",

    // How it works
    "how.title": "How It Works",
    "how.subtitle": "No wine knowledge needed. Find your perfect wine in 3 simple steps.",
    "how.step1.title": "Tell us your taste",
    "how.step1.desc": "Use everyday words like \"I like sweet\" or \"nothing too bitter\" to describe your palate.",
    "how.step2.title": "AI translates to wine",
    "how.step2.desc": "Built with real sommelier expertise, our AI maps your senses to the language of wine.",
    "how.step3.title": "Get your perfect match",
    "how.step3.desc": "Receive personalized recommendations and refine your taste with every glass.",

    // Features
    "features.title": "Features",
    "features.subtitle": "Everything you need to enjoy wine, all in one app.",
    "features.journey.title": "Taste Journey",
    "features.journey.subtitle": "Discover your wine taste",
    "features.journey.desc": "Uncover your unique wine preferences as you build your history. Answer intuitive questions and let AI create your taste profile.",
    "features.note.title": "Tasting Notes",
    "features.note.subtitle": "Record your experience",
    "features.note.desc": "Easily log the flavors and aromas of every wine with simple keywords. No expertise required — just record what you feel.",
    "features.cellar.title": "My Cellar",
    "features.cellar.subtitle": "Manage your collection",
    "features.cellar.desc": "Keep track of your wines at a glance. See what you have, plan when to drink, and stay organized.",

    // Why
    "why.title": "Why Drinkig?",
    "why.subtitle": "We built this to lower the barrier to wine.",
    "why.sommelier.title": "Sommelier-level picks",
    "why.sommelier.desc": "Powered by real sommelier consultation and editorial curation. Professional taste, in your pocket.",
    "why.language.title": "Bridging the language gap",
    "why.language.desc": "\"Sweet\" means different things to beginners and experts. Drinkig precisely translates between the two.",
    "why.learning.title": "Gets smarter over time",
    "why.learning.desc": "The more you record, the better AI understands your palate. A personalized experience that improves with every use.",
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
