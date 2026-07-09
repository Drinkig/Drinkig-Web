import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";
import { fadeUp } from "../lib/motion";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-surface-sunken relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-2xl mx-auto" {...fadeUp()}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            {t("cta.title")}
          </h2>
          <p className="text-gray-400 text-lg mb-10 whitespace-pre-line">
            {t("cta.description")}
          </p>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            <AppleLogo className="w-5 h-5 mr-2.5" />
            {t("cta.button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
