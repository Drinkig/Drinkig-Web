import { motion } from "motion/react";
import { useLanguage } from "../i18n";

const colorMap: Record<string, { bg: string; border: string; glow: string }> = {
  purple: {
    bg: "from-purple-500/10 to-transparent",
    border: "border-purple-500/10",
    glow: "bg-purple-500/10",
  },
  amber: {
    bg: "from-amber-500/10 to-transparent",
    border: "border-amber-500/10",
    glow: "bg-amber-500/10",
  },
  emerald: {
    bg: "from-emerald-500/10 to-transparent",
    border: "border-emerald-500/10",
    glow: "bg-emerald-500/10",
  },
};

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("features.journey.title"),
      subtitle: t("features.journey.subtitle"),
      description: t("features.journey.desc"),
      image: "/images/feature-curation.png",
      color: "purple",
    },
    {
      title: t("features.note.title"),
      subtitle: t("features.note.subtitle"),
      description: t("features.note.desc"),
      image: "/images/feature-note.png",
      color: "amber",
    },
    {
      title: t("features.cellar.title"),
      subtitle: t("features.cellar.subtitle"),
      description: t("features.cellar.desc"),
      image: "/images/feature-cellar.png",
      color: "emerald",
    },
  ];

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

        <div className="space-y-16">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br ${colors.bg} border ${colors.border}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-sm text-purple-400 font-medium mb-2 tracking-wide">{feature.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 text-[15px]">
                    {feature.description}
                  </p>
                </div>

                <div className="flex-shrink-0 relative">
                  <div className={`absolute inset-0 ${colors.glow} blur-[60px] rounded-full scale-110`} />
                  <div className="relative w-[180px] md:w-[220px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
