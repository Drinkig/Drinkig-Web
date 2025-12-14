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
            {/* 중앙 타임라인 선 (Gradient 변경: 파란색(과거) -> 보라색(미래)) */}
            <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 sm:-translate-x-1/2"></div>
            
            <div className="space-y-12 sm:space-y-16">
              {/* Part 1: Team History (Compact Size) */}
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className={`relative flex flex-col sm:flex-row items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* 날짜 마커 (Size Reduced) */}
                  <div className="absolute left-[9px] sm:left-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black border-[3px] border-blue-500/50 rounded-full flex items-center justify-center z-20 sm:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                  </div>

                  {/* 컨텐츠 카드 (Compact Original Style with Soft Rounding) */}
                  <div className="w-full sm:w-[calc(50%-40px)] ml-12 sm:ml-0">
                    <div className="group relative bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors duration-500 grayscale hover:grayscale-0">
                      <div className="aspect-video overflow-hidden relative">
                        <ImageWithFallback
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="text-blue-400 font-bold text-xs mb-1 block">{milestone.shortDate}</span>
                        <h3 className="text-lg font-bold text-gray-200 mb-1 group-hover:text-white transition-colors">{milestone.title}</h3>
                        <p className="text-gray-500 text-xs group-hover:text-gray-300 transition-colors line-clamp-2">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 반대쪽 빈 공간 */}
                  <div className="hidden sm:block w-[calc(50%-40px)]"></div>
                </motion.div>
              ))}

              {/* The Break: 구분선 UI */}
              <motion.div 
                className="relative py-12 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                 <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                 <div className="relative z-10 bg-black px-6 py-2 border border-purple-500/30 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <span className="text-purple-400 font-bold text-sm tracking-widest uppercase">Chapter 2 : Reboot</span>
                 </div>
              </motion.div>

              {/* Part 2: Solo Restart (현재 - Full Width 강조) */}
              <motion.div 
                className="relative flex justify-center pt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                  {/* 날짜 마커 (중앙 배치) */}
                  <div className="absolute top-0 left-1/2 w-12 h-12 bg-black border-4 border-purple-500 rounded-full flex items-center justify-center z-20 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>

                  {/* 컨텐츠 카드 (Full Width & Highlight - Resized Smaller) */}
                  <div className="w-full max-w-2xl relative z-10">
                    {/* 타임라인 선 가리기 위한 불투명 배경 */}
                    <div className="absolute inset-0 bg-black rounded-2xl -z-10"></div>
                    
                    <div className="group relative bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/50 rounded-2xl overflow-hidden hover:border-purple-400 transition-all duration-500 shadow-2xl shadow-purple-900/20 hover:shadow-purple-900/40 hover:-translate-y-1">
                      <div className="flex flex-col sm:flex-row items-stretch">
                        {/* 왼쪽: 비주얼 영역 (이미지 잘림 방지) */}
                        <div className="w-full sm:w-2/5 min-h-[200px] relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4">
                           {/* 배경 일러스트 (Contain으로 전체 표시) */}
                           <div className="absolute inset-0 bg-[url('/images/Drinky_3.png')] bg-contain bg-center bg-no-repeat opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
                           
                           {/* 그라데이션 오버레이 */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/80"></div>
                        </div>

                        {/* 오른쪽: 텍스트 영역 */}
                        <div className="w-full sm:w-3/5 p-6 sm:p-8 text-center sm:text-left relative flex flex-col justify-center">
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent sm:hidden"></div>
                          <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent hidden sm:block"></div>
                          
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold text-[10px] tracking-wider mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)] self-center sm:self-start">
                            NOW & FUTURE
                          </span>
                          <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                            새로운 도약,<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Solo Reboot</span>
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            과거의 배움을 거름 삼아, 본질에 집중합니다.<br/>
                            미식 에디터의 시선으로 새롭게 정의합니다.
                          </p>
                          <div className="inline-flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors justify-center sm:justify-start">
                            Next Step Loading
                            <span className="flex space-x-1 ml-2">
                              <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-0"></span>
                              <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-100"></span>
                              <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-200"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}