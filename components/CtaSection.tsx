import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";
import { float, resolve, rise } from "../lib/motion";

// 소비자 랜딩 끝에서 매장 페이지로 보내는 띠. 한 문장과 링크 하나.
export function StoresBand() {
  const { t, lp } = useLanguage();
  return (
    <section className="border-t border-paper-line">
      <motion.div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-14" {...rise()}>
        <div>
          <p className="text-xl font-semibold text-ink md:text-2xl">{t("home.stores.title")}</p>
          <p className="mt-1.5 text-ink-soft">{t("home.stores.desc")}</p>
        </div>
        <Link to={lp("/stores")} className="btn-secondary shrink-0">
          {t("home.stores.link")}
        </Link>
      </motion.div>
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
              {t("cta.title")}
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
