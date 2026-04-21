import { motion } from "motion/react";

const features = [
  {
    title: "취향 여정",
    subtitle: "나만의 와인 취향 발견",
    description: "기록이 쌓일수록 선명해지는 나만의 와인 취향을 발견하세요. 직관적인 질문에 답하면, AI가 당신의 취향 프로필을 만들어줍니다.",
    image: "/images/feature-curation.png",
    color: "purple",
  },
  {
    title: "테이스팅 노트",
    subtitle: "감각적인 와인 기록",
    description: "마신 와인의 맛과 향을 키워드로 간편하게 기록하세요. 어렵지 않게, 내가 느낀 그대로 남길 수 있어요.",
    image: "/images/feature-note.png",
    color: "amber",
  },
  {
    title: "마이 셀러",
    subtitle: "내 와인 컬렉션 관리",
    description: "보유 중인 와인을 한눈에 관리하세요. 언제 마실지, 어떤 와인이 있는지 깔끔하게 정리됩니다.",
    image: "/images/feature-cellar.png",
    color: "emerald",
  },
];

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
  return (
    <section id="features" className="py-28 bg-[#050505] relative overflow-hidden">
      {/* 배경 장식 */}
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
            주요 기능
          </h2>
          <p className="text-gray-500 text-lg">
            와인을 즐기는 데 필요한 모든 것을 담았어요.
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
                {/* 텍스트 */}
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-sm text-purple-400 font-medium mb-2 tracking-wide">{feature.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 text-[15px]">
                    {feature.description}
                  </p>
                </div>

                {/* 이미지 */}
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
