import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";
import { EASE, float, riseNow, wordChild, wordsParent } from "../lib/motion";
import { Em } from "./Em";

// 제목을 단어 단위로 쪼개 차례로 띄운다. **강조** 표기는 단어째로 묶어 Em이 칠한다.
function Words({ text }: { text: string }) {
  // 토큰 = (**강조** + 붙은 조사) 또는 공백 없는 단어. 강조 안의 공백은 유지된다.
  const tokens = text.match(/\*\*[^*]+\*\*\S*|\S+/g) ?? [];
  return (
    <>
      {tokens.map((w, i) => (
        <motion.span key={i} className="inline-block" {...wordChild}>
          <Em text={w} />
          {i < tokens.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  );
}

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="wash-hero relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.h1
              className="text-[2.5rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink md:text-[3.4rem] lg:text-[3.6rem]"
              {...wordsParent()}
            >
              <Words text={t("hero.title1")} />
              <br />
              <Words text={t("hero.title2")} />
            </motion.h1>
            <motion.p className="mt-6 max-w-md text-lg leading-[1.7] text-ink-soft" {...riseNow(0.4)}>
              {t("hero.description")}
            </motion.p>
            <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" {...riseNow(0.5)}>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <AppleLogo className="h-[18px] w-[18px]" />
                {t("hero.appStore")}
              </a>
              <a href="#how-it-works" className="btn-secondary group">
                {t("hero.learnMore")}
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.figure
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            {/* 등장이 끝나면 천천히 떠다닌다 */}
            <motion.img
              src="/images/Mockup.webp"
              alt="드링키지 앱 화면: 취향 분석 결과와 테이스팅 노트"
              width={680}
              height={680}
              fetchPriority="high"
              decoding="async"
              className="mx-auto w-[300px] md:w-[420px] lg:w-full lg:max-w-[440px]"
              {...float(10, 7, 1.2)}
            />
          </motion.figure>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-6xl px-6 md:mt-24">
        <motion.div
          className="grad-rule origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
        />
      </div>
    </section>
  );
}
