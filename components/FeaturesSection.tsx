import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { MatchScoreIllust, ScanIllust, ChatbotIllust, TastingNoteIllust, CellarIllust } from "./FeatureIllustrations";
import { type ComponentType } from "react";

const colorMap: Record<string, { bg: string; border: string }> = {
  purple: { bg: "from-purple-500/10 to-transparent", border: "border-purple-500/10" },
  blue: { bg: "from-blue-500/10 to-transparent", border: "border-blue-500/10" },
  pink: { bg: "from-pink-500/10 to-transparent", border: "border-pink-500/10" },
  amber: { bg: "from-amber-500/10 to-transparent", border: "border-amber-500/10" },
  emerald: { bg: "from-emerald-500/10 to-transparent", border: "border-emerald-500/10" },
};

interface FeatureItem {
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  color: string;
  Illust: ComponentType<{ className?: string }>;
}

const featureList: FeatureItem[] = [
  { titleKey: "features.match.title", subtitleKey: "features.match.subtitle", descKey: "features.match.desc", color: "purple", Illust: MatchScoreIllust },
  { titleKey: "features.scan.title", subtitleKey: "features.scan.subtitle", descKey: "features.scan.desc", color: "blue", Illust: ScanIllust },
  { titleKey: "features.chat.title", subtitleKey: "features.chat.subtitle", descKey: "features.chat.desc", color: "pink", Illust: ChatbotIllust },
  { titleKey: "features.note.title", subtitleKey: "features.note.subtitle", descKey: "features.note.desc", color: "amber", Illust: TastingNoteIllust },
  { titleKey: "features.cellar.title", subtitleKey: "features.cellar.subtitle", descKey: "features.cellar.desc", color: "emerald", Illust: CellarIllust },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-28 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("features.title")}
          </h2>
          <p className="text-gray-500 text-lg">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="space-y-12">
          {featureList.map((feature, index) => {
            const colors = colorMap[feature.color];
            const { Illust } = feature;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-14 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br ${colors.bg} border ${colors.border}`}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* 텍스트 */}
                <motion.div
                  className="flex-1 text-center lg:text-left"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <p className="text-sm text-purple-400 font-medium mb-2 tracking-wide">
                    {t(feature.subtitleKey as any)}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t(feature.titleKey as any)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 text-[15px] whitespace-pre-line">
                    {t(feature.descKey as any)}
                  </p>
                </motion.div>

                {/* 일러스트 */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Illust className="w-[200px] h-[200px] md:w-[240px] md:h-[240px]" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
