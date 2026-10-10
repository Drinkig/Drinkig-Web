import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pathnameToLang, localizePath, type Lang } from "./lib/seo-meta";

export type { Lang };

const translations = {
  ko: {
    // Header
    "nav.features": "Features",
    "nav.howItWorks": "How it works",
    "nav.why": "About",
    "nav.download": "App Store",
    "nav.stores": "매장 도입 문의",

    // Home → 매장 페이지로 가는 띠
    "home.stores.title": "와인을 파는 매장이라면",
    "home.stores.desc": "테이블에 QR 하나만 두면 손님 취향에 맞는 와인을 골라줍니다.",
    "home.stores.link": "매장 도입 안내",

    // Stores
    "stores.title": "와인을 잘 모르는 손님은\n**두 번째로 싼 와인**을 주문합니다",
    "stores.description": "그 와인이 입에 안 맞으면 *매장에 대한 인상이 나빠집니다.* 드링키지는 테이블의 QR 하나로 손님 취향과 예산에 맞는 와인을 골라줍니다. *도입 비용은 없습니다.*",
    "stores.cta": "도입 문의하기",
    "stores.how": "How it works",
    "stores.problem.title": "큰맘 먹고 시키는데\n**고를 방법이 없습니다**",
    "stores.problem.desc": "와인 한 병은 식사비보다 비쌉니다. 그런데 리스트를 봐도 뭐가 뭔지 모르니 가장 싼 것, 아니면 그 바로 위를 고릅니다. 그렇게 고른 와인이 입에 안 맞으면 손님은 *와인이 아니라 매장이 별로였다고 기억합니다.*",
    "stores.flow.title": "**앱 설치 없이** 테이블에서 끝납니다",
    "stores.flow.step1.title": "QR을 찍습니다",
    "stores.flow.step1.desc": "테이블이나 메뉴판에 붙은 QR을 찍습니다. 앱은 필요 없습니다.",
    "stores.flow.step2.title": "매장을 선택합니다",
    "stores.flow.step2.desc": "현재 위치 근처의 도입 매장이 표시됩니다.",
    "stores.flow.step3.title": "취향과 예산을 고릅니다",
    "stores.flow.step3.desc": "\"달달한 게 좋아요\", \"5만 원 이하\" 정도만 고르면 됩니다.",
    "stores.flow.step4.title": "매장 와인 중에서 추천합니다",
    "stores.flow.step4.desc": "우리 매장 리스트 안에서 손님에게 맞는 순서대로 보여줍니다.",
    "stores.benefit.title": "싼 와인이 아니라\n**맞는 와인**을 주문하게 됩니다",
    "stores.benefit.1.title": "가격이 아니라 취향으로 고릅니다",
    "stores.benefit.1.desc": "예산 안에서 입에 맞는 와인이 먼저 보이니 *두 번째로 싼 와인만 나가는 일*이 줄어듭니다.",
    "stores.benefit.2.title": "와인 때문에 생기는 불만이 줄어듭니다",
    "stores.benefit.2.desc": "본인 취향대로 고른 와인은 *매장 탓이 되지 않습니다.*",
    "stores.benefit.3.title": "손님 취향 데이터가 쌓입니다",
    "stores.benefit.3.desc": "어떤 손님이 어떤 와인을 고르는지 *매장에 알려드립니다.*",
    "stores.setup.title": "**와인 리스트와 가격표**만\n보내주시면 됩니다",
    "stores.setup.desc": "QR 스티커와 매장 페이지는 저희가 만듭니다. 리스트가 바뀌면 메일 한 통이면 됩니다.",
    "stores.price.title": "도입 비용은 **없습니다**",
    "stores.price.desc": "유료 전환 시 도입 매장에 가장 먼저 안내드립니다.",
    "stores.form.title": "매장 정보를 남겨주세요",
    "stores.form.desc": "영업일 기준 하루 안에 연락드립니다.",
    "stores.form.name": "매장명",
    "stores.form.type": "업종",
    "stores.form.type.restaurant": "음식점",
    "stores.form.type.shop": "와인샵",
    "stores.form.type.other": "기타",
    "stores.form.type.otherHint": "업종을 적어주세요",
    "stores.form.email": "이메일",
    "stores.form.phone": "연락처",
    "stores.form.note": "문의 내용 (선택)",
    "stores.form.submit": "문의하기",
    "stores.form.hint": "누르면 메일 앱이 열립니다.",
    "stores.form.subject": "[드링키지 매장 도입 문의]",

    // Hero
    "hero.title1": "별점 말고 **내 취향**으로,",
    "hero.title2": "나한테 맞는 와인 점수",
    "hero.description":
      "내 입맛만 알려주면 모든 와인에 나만의 점수가 매겨져요.",
    "hero.appStore": "App Store에서 받기",
    "hero.learnMore": "How it works",
    "hero.caption": "취향 분석 결과와 테이스팅 노트 화면",

    // Features
    "features.eyebrow": "Features",
    "features.title": "와인 고를 때 **막막했다면**",
    "features.scan.eyebrow": "01 · Label scan",
    "features.scan.title": "이름이 어려운 와인,\n찍으면 바로 찾아줘요",
    "features.scan.desc":
      "와인 리스트든 마트 매대든 사진만 찍으세요. 내 점수가 높은 순서로 정리해 드려요.",
    "features.scan.caption": "샤토 용 피작 2000, 라벨 스캔 중",
    "features.pairing.eyebrow": "02 · Food pairing",
    "features.pairing.title": "메뉴만 고르면\n와인은 알아서",
    "features.pairing.desc":
      "오늘 먹을 음식을 알려주면 거기에 어울리는 와인을 추천해 드려요.",
    "features.pairing.caption": "크림 파스타에는 알자스 게뷔르츠트라미너",
    "features.note.eyebrow": "03 · Tasting note",
    "features.note.title": "그 와인 뭐였더라?\n잊기 전에 기록해요",
    "features.note.desc":
      "향과 맛을 키워드로 골라 남기세요. 기록이 쌓일수록 추천이 정확해져요.",
    "features.note.caption": "도멘 르플레이브 퓔리니 몽라쉐 2007 기록",
    "features.cellar.eyebrow": "04 · My cellar",
    "features.cellar.title": "집에 있는 와인,\n한눈에 정리해요",
    "features.cellar.desc":
      "언제 샀는지, 레드가 몇 병 남았는지 바로 확인할 수 있어요.",
    "features.cellar.caption": "라 타슈, 돔 페리뇽, 르플레이브가 들어 있는 셀러",

    // How it works
    "how.eyebrow": "How it works",
    "how.title": "시작은 질문 몇 개면 충분해요",
    "how.step1.title": "입맛을 알려주세요",
    "how.step1.desc": "\"달달한 게 좋아요\" 정도면 돼요.",
    "how.step2.title": "내 점수를 확인하세요",
    "how.step2.desc": "모든 와인에 나와 얼마나 맞는지 점수가 매겨져요.",
    "how.step3.title": "마신 와인을 기록하세요",
    "how.step3.desc": "기록할수록 점수가 더 정확해져요.",

    // Why
    "why.eyebrow": "About",
    "why.lead": "초보자가 말하는 \"달콤한\"과 전문가가 말하는 \"달콤한\"은 다릅니다.\n드링키지는 그 차이를 알아듣습니다.",
    "why.match.title": "별점이 아니라 내 점수",
    "why.match.desc": "같은 와인이라도 사람마다 점수가 다릅니다.",
    "why.language.title": "평소 쓰는 말로",
    "why.language.desc": "품종, 테루아 같은 어려운 말은 몰라도 됩니다.",
    "why.easy.title": "공부는 나중에",
    "why.easy.desc": "고르느라 고민하는 시간을 줄여드립니다.",

    // CTA
    "cta.title": "오늘 저녁 와인,\n정하셨나요?",
    "cta.description": "질문 몇 개에만 답하면 바로 첫 추천을 받을 수 있어요.",
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
    "nav.stores": "For stores",

    // Home → stores band
    "home.stores.title": "Do you run a place that sells wine?",
    "home.stores.desc": "One QR code on the table recommends your wines, matched to each guest's taste.",
    "home.stores.link": "See how it works for stores",

    // Stores
    "stores.title": "Guests who don't know wine\norder the **second-cheapest bottle**",
    "stores.description": "When it doesn't suit them, *the store gets the blame.* One QR code on the table picks a bottle that fits each guest's taste and budget. *Free for now.*",
    "stores.cta": "Get in touch",
    "stores.how": "How does it work?",
    "stores.problem.title": "Spending more than usual,\n**with no way to choose**",
    "stores.problem.desc": "A bottle costs more than the meal. The list means nothing to them, so they take the cheapest or the one above it. When it doesn't suit them, *they remember the store, not the wine.*",
    "stores.flow.title": "**No app to install.** It happens at the table.",
    "stores.flow.step1.title": "Scan the QR",
    "stores.flow.step1.desc": "On the table or the menu. Nothing to install.",
    "stores.flow.step2.title": "Pick the store",
    "stores.flow.step2.desc": "Nearby partner stores show up by location.",
    "stores.flow.step3.title": "Answer taste and budget",
    "stores.flow.step3.desc": "\"I like it sweet\", \"under 50,000 won\" is enough.",
    "stores.flow.step4.title": "Your wines, ranked",
    "stores.flow.step4.desc": "Only bottles from your list, in the order that fits the guest.",
    "stores.benefit.title": "Not the cheap one.\n**The right one.**",
    "stores.benefit.1.title": "Beyond the second-cheapest bottle",
    "stores.benefit.1.desc": "Bottles that fit the guest's taste show first, within their budget. *Fewer second-cheapest orders.*",
    "stores.benefit.2.title": "Fewer bad-wine memories",
    "stores.benefit.2.desc": "A bottle chosen by taste *doesn't get blamed on the store.*",
    "stores.benefit.3.title": "See what guests like",
    "stores.benefit.3.desc": "We show you *which guests pick which wines.*",
    "stores.setup.title": "Just your **wine list and prices**",
    "stores.setup.desc": "We make the QR sticker and your store page. When the list changes, one email is enough.",
    "stores.price.title": "**Free** for now",
    "stores.price.desc": "When pricing arrives, partner stores hear about it first.",
    "stores.form.title": "Tell us about your store",
    "stores.form.desc": "We reply within a day.",
    "stores.form.name": "Store name",
    "stores.form.type": "Type of store",
    "stores.form.type.restaurant": "Restaurant",
    "stores.form.type.shop": "Wine shop",
    "stores.form.type.other": "Other",
    "stores.form.type.otherHint": "Tell us what kind of place",
    "stores.form.email": "Email",
    "stores.form.phone": "Phone",
    "stores.form.note": "Anything else (optional)",
    "stores.form.submit": "Send inquiry",
    "stores.form.hint": "This opens your mail app.",
    "stores.form.subject": "[Drinkig store inquiry]",

    // Hero
    "hero.title1": "Not star ratings.",
    "hero.title2": "A score that fits **your taste**",
    "hero.description":
      "Tell us your taste. Every wine gets your score.",
    "hero.appStore": "Get it on the App Store",
    "hero.learnMore": "How does it work?",
    "hero.caption": "Taste profile and tasting note screens",

    // Features
    "features.eyebrow": "Features",
    "features.title": "Lost in front of **a wall of wine?**",
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
