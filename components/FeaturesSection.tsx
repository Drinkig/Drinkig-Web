import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";

// 이미지는 기존 에셋을 최대한 활용하되, 의미에 맞게 매핑
const wineCurationImage = '/images/feature-wine-curation.png';
const wineSearchImage = '/images/feature-wine-search.png'; // 상황별 추천에 활용
const tastingNoteImage = '/images/feature-tasting-note.png';
const wineManagementImage = '/images/feature-wine-management.png';

// 아이폰 목업 컴포넌트
function IPhoneMockup({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[400px] w-[200px] shadow-2xl flex flex-col overflow-hidden", className)}>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[11px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[11px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[11px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black relative">
        {/* 노치 디자인 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
        {/* 화면 반사 효과 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "취향 여정의 시작",
      description: "마신 와인을 기록할수록\n당신의 취향은 더 선명해집니다.\n확실한 취향을 찾을 때까지 함께할게요.",
      image: wineCurationImage,
      className: "lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-purple-900/20 to-black",
      icon: "🧬",
      gradient: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      title: "상황별 맞춤 추천",
      description: "마트, 식당, 홈파티...\n와인을 고르는 그 순간,\n최적의 한 병을 제안합니다.",
      image: wineSearchImage,
      className: "lg:col-span-1 bg-gradient-to-br from-blue-900/20 to-black",
      icon: "🎯",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      title: "기록 & 관리",
      description: "테이스팅 노트와 셀러 관리로\n나만의 와인 경험을 쌓으세요.",
      image: tastingNoteImage,
      className: "lg:col-span-1 bg-gradient-to-br from-amber-900/20 to-black",
      icon: "📝",
      gradient: "from-amber-500 to-orange-500",
      delay: 0.2
    },
    {
      title: "전문가 로직",
      description: "현직 소믈리에 자문.\n검증된 큐레이션 알고리즘으로\n실패 없는 와인을 추천합니다.",
      image: wineManagementImage,
      className: "lg:col-span-2 bg-gradient-to-br from-emerald-900/20 to-black",
      icon: "🎩",
      gradient: "from-emerald-500 to-teal-500",
      delay: 0.3
    }
  ];

  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            와인을 즐기는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">가장 완벽한 방법</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            당신의 입맛을 가장 잘 아는 소믈리에가 되어드릴게요.
            <br className="hidden sm:block" />
            기록이 쌓일수록 추천은 더 정교해집니다.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn("group relative overflow-hidden rounded-3xl border border-white/10 hover:border-purple-500/30 transition-colors duration-500", feature.className)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 whitespace-pre-line leading-relaxed group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <div className="flex-1 relative flex items-center justify-center pt-4">
                  {/* 글로우 효과 */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br ${feature.gradient} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* 목업 이미지 */}
                  <div className="transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    <IPhoneMockup 
                      src={feature.image} 
                      alt={feature.title}
                      className="h-[300px] w-[150px] sm:h-[350px] sm:w-[175px]" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}