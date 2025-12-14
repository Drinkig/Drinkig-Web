import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";
import Tilt from 'react-parallax-tilt';

// 이미지는 기존 에셋을 최대한 활용하되, 의미에 맞게 매핑
const wineCurationImage = '/images/feature-curation.png';
const tastingNoteImage = '/images/feature-note.png';
const wineCellarImage = '/images/feature-cellar.png';

// 스크린샷 이미지 컴포넌트 (목업 제거, 깔끔한 플로팅 스타일)
function ScreenshotCard({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <Tilt
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      perspective={1000}
      scale={1.02}
      transitionSpeed={2000}
      gyroscope={true}
      className={cn("relative mx-auto", className)}
    >
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black group-hover:shadow-purple-500/20 transition-shadow duration-500">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* 유리 질감 오버레이 (고급스러움 추가) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
        
        {/* 하단 페이드 (자연스럽게 배경과 섞이도록) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      </div>
    </Tilt>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: "취향 여정의 시작",
      description: "기록이 쌓일수록 선명해지는\n나만의 와인 취향을 발견하세요.",
      image: wineCurationImage,
      className: "bg-gradient-to-br from-purple-900/20 to-black",
      icon: "🧬",
      gradient: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      title: "기록 (Tasting Note)",
      description: "직관적인 키워드로\n감각적인 기록을 남겨보세요.",
      image: tastingNoteImage,
      className: "bg-gradient-to-br from-amber-900/20 to-black",
      icon: "📝",
      gradient: "from-amber-500 to-orange-500",
      delay: 0.1
    },
    {
      title: "관리 (My Cellar)",
      description: "내 손안의 와인 창고,\n보유 중인 와인을 한눈에.",
      image: wineCellarImage,
      className: "bg-gradient-to-br from-emerald-900/20 to-black",
      icon: "🍷",
      gradient: "from-emerald-500 to-teal-500",
      delay: 0.2
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
            미식 에디터의 기획과 현직 소믈리에의 자문으로 완성했습니다.
            <br className="hidden sm:block" />
            복잡한 공부 없이도, 당신의 취향에 딱 맞는 와인을 찾아보세요.
          </p>
        </motion.div>
        
        {/* 3-Column Grid Layout (Balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn("group relative overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col", 
                "bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm min-h-[520px] lg:min-h-[600px]",
                feature.className
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
            >
              {/* 노이즈 텍스처 */}
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              
              <div className="p-8 flex flex-col h-full z-10 relative">
                {/* 타이틀 & 설명 영역 (아이콘 제거, 심플함 강조) */}
                <div className="flex flex-col items-center text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 whitespace-pre-line leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* 이미지 영역 (하단 고정 및 중앙 정렬) */}
                <div className="flex-1 relative flex items-end justify-center w-full mt-4">
                  {/* 글로우 효과 (이미지 뒤) */}
                  <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br ${feature.gradient} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  {/* 스크린샷 이미지 (Floating Style) */}
                  <div className="relative transform transition-transform duration-500 ease-out translate-y-6 group-hover:translate-y-2">
                    <ScreenshotCard 
                      src={feature.image} 
                      alt={feature.title}
                      className="h-[280px] w-[140px] lg:h-[340px] lg:w-[170px]" 
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