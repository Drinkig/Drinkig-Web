import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { rise } from "../lib/motion";
import { Em } from "./Em";

const POINTS = ["match", "language", "easy"] as const;

export function WhyDrinkig() {
  const { t } = useLanguage();

  return (
    <section id="why" className="scroll-mt-20 border-t border-paper-line py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="max-w-3xl" {...rise()}>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <p className="mt-5 whitespace-pre-line text-[1.5rem] font-bold leading-[1.35] tracking-[-0.03em] text-ink md:text-[2.5rem]">
            <Em text={t("why.lead")} />
          </p>
        </motion.div>

        <dl className="mt-14 grid gap-x-10 border-t border-paper-line md:grid-cols-3 md:gap-x-8">
          {POINTS.map((p, i) => (
            <motion.div
              key={p}
              className="border-b border-paper-line py-6 md:border-b-0 md:py-8"
              {...rise(0.1 + i * 0.1)}
            >
              <dt className="text-lg font-semibold text-ink">{t(`why.${p}.title`)}</dt>
              <dd className="mt-2 text-base leading-[1.7] md:text-lg text-ink-soft">{t(`why.${p}.desc`)}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
