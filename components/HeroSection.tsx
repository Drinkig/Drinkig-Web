import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { APP_STORE_URL } from "../lib/constants";
import { AppleLogo } from "./icons";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center bg-surface-base pt-24 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              <span className="text-purple-300 text-sm font-medium">{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-6">
              {t("hero.title1")}
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0 whitespace-pre-line">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-8 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <AppleLogo className="w-5 h-5 mr-2.5" />
                {t("hero.appStore")}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-14 px-8 text-gray-300 border border-white/10 rounded-full hover:border-white/25 hover:bg-white/5 transition-all"
              >
                {t("hero.learnMore")}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full scale-75" />
            <img
              src="/images/Mockup.webp"
              alt="드링키지 앱 화면"
              width={680}
              height={680}
              fetchPriority="high"
              decoding="async"
              className="relative w-[280px] md:w-[340px] h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
