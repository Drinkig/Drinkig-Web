import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";
import { Em } from "./Em";
import { float, resolve, rise } from "../lib/motion";

// 소비자 랜딩 맨 아래, 푸터 바로 위의 한 줄. 매장 쪽 안내는 여기 하나로 끝낸다.
export function StoresBand() {
  const { t, lp } = useLanguage();
  return (
    <section className="bg-paper-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 md:flex-row md:items-center md:justify-between">
        <p className="text-ink">
          <span className="font-semibold">{t("home.stores.title")}</span>
          <span className="hidden text-ink-soft md:inline"> · {t("home.stores.desc")}</span>
        </p>
        <Link to={lp("/stores")} className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          {t("home.stores.link")}
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="wash-ink text-paper">
      <div className="grad-rule" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
          <motion.div className="lg:col-span-7" {...rise()}>
            <h2 className="whitespace-pre-line text-3xl font-bold leading-[1.2] tracking-[-0.03em] md:text-[2.75rem]">
              <Em text={t("cta.title")} />
            </h2>
            <p className="mt-5 max-w-md text-lg leading-[1.7] text-paper/70">{t("cta.description")}</p>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10">
              <AppleLogo className="h-[18px] w-[18px]" />
              {t("cta.button")}
            </a>
          </motion.div>
          <motion.figure className="lg:col-span-4 lg:col-start-9" {...resolve(0.1)}>
            <motion.img
              src="/images/bottles.webp"
              alt=""
              width={900}
              height={899}
              loading="lazy"
              decoding="async"
              className="mx-auto w-52 md:w-64 lg:w-full"
              {...float(7, 6.5, 0.5)}
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
