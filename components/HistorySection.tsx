import { Card, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const workshopImage = "/images/history-workshop.jpg";
const demodayImage = "/images/history-demoday.png";
const launchImage = "/images/history-launch.png";
const ideathonImage = "/images/history-ideathon.jpg";
const startupImage = "/images/history-startup.png";
import { motion } from "motion/react";

export function HistorySection() {
  const milestones = [
    {
      shortDate: "24.5",
      title: "UMC 아이디어톤 1등",
      image: ideathonImage,
      description: "첫 시작, 아이디어의 가능성을 증명하다."
    },
    {
      shortDate: "24.8",
      title: "UMC 데모데이 참가",
      image: demodayImage,
      description: "MVP 개발과 첫 사용자 피드백."
    },
    {
      shortDate: "25.3",
      title: "iOS 앱스토어 런칭",
      image: launchImage,
      description: "드링키지, 세상에 첫발을 내딛다."
    },
    {
      shortDate: "25.5",
      title: "홍익대학교 창업경진대회 우수상",
      image: startupImage,
      description: "비즈니스 모델의 검증과 성장."
    },
    {
      shortDate: "25.7",
      title: "드링키지 팀 춘천 워크샵",
      image: workshopImage,
      description: "더 단단해진 팀워크와 새로운 비전."
    }
  ];

  return (
    <section id="history" className="py-24 bg-black relative overflow-hidden">
       {/* 배경 효과 */}
       <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Our Journey
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            문제 정의부터 해결까지, 드링키지가 걸어온 치열한 고민의 시간들입니다.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* 중앙 타임라인 선 */}
            <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-purple-500/20 to-transparent sm:-translate-x-1/2"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className={`relative flex flex-col sm:flex-row items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* 날짜 마커 */}
                  <div className="absolute left-[9px] sm:left-1/2 w-9 h-9 sm:w-12 sm:h-12 bg-black border-4 border-purple-500 rounded-full flex items-center justify-center z-20 sm:-translate-x-1/2 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                  </div>

                  {/* 컨텐츠 카드 */}
                  <div className="w-full sm:w-[calc(50%-40px)] ml-12 sm:ml-0">
                    <div className="group relative bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors duration-500">
                      <div className="aspect-video overflow-hidden">
                        <ImageWithFallback
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="text-purple-400 font-bold text-sm mb-2 block">{milestone.shortDate}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 반대쪽 빈 공간 (PC 레이아웃용) */}
                  <div className="hidden sm:block w-[calc(50%-40px)]"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}