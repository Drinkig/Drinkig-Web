import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";
import { float, resolve, rise } from "../lib/motion";

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
