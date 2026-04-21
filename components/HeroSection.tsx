import { motion } from "motion/react";
import { useLanguage } from "../i18n";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center bg-[#0a0a0a] pt-24 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              <span className="text-purple-300 text-sm font-medium">{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.2] mb-6">
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
                href="https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-7 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <svg className="w-5 h-5 mr-2.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t("hero.appStore")}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-14 px-7 text-gray-300 border border-white/10 rounded-full hover:border-white/25 hover:bg-white/5 transition-all"
              >
                {t("hero.learnMore")}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full scale-75" />
            <img
              src="/images/Mockup.png"
              alt="드링키지 앱 화면"
              className="relative w-[280px] md:w-[340px] h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
