import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { rise } from "../lib/motion";
import { Roadmap } from "./Roadmap";

const STEPS = ["step1", "step2", "step3"] as const;

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-paper-line py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...rise()}>
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink md:text-[2.75rem]">
            {t("how.title")}
          </h2>
        </motion.div>
        <Roadmap className="mt-14 md:mt-16" steps={STEPS.map((s) => ({ title: t(`how.${s}.title`), desc: t(`how.${s}.desc`) }))} />
      </div>
    </section>
  );
}
