import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";
import { useState } from "react";
import { X } from "lucide-react";

const wiseungjuPhoto = "/images/lead_sean.jpeg";

// 초기 멤버 리스트
const contributors = [
  "박정연 (Backend Lead)", "윤다영 (Backend)", "박상욱 (Backend)",
  "전채운 (PM)", "김도연 (Frontend Lead)", "이예성 (Frontend)", 
  "이현주 (Frontend)", "천윤화 (Design Lead)", "배하영 (Designer)", 
  "윤시은 (Designer)"
];

// Founder's Note 내용
const StoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-[#111111] w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111111] sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-bold text-white">먼지 속에서 찾은 문제</h3>
              <p className="text-sm text-gray-500">Founder's Note</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 본문 (스크롤) */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-gray-300 leading-relaxed font-light scrollbar-hide">
            
            {/* 섹션 1: 문제의 발견 */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white mb-6">문제의 본질을 다시 보다</h4>
              <p>
                과거의 드링키지는 실패했다. 기능도, 타겟도 모호했기 때문이다.
                그래서 나는 솔루션을 지우고, 처음부터 다시 질문했다.
              </p>
              <p className="font-medium text-white">
                "왜 사람들은 와인을 어려워하는가?"
              </p>
            </div>

            <hr className="border-white/10" />

            {/* 섹션 2: 언어의 간극 */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-purple-400">말은 같아도 맛은 다르다</h4>
              <p>
                와인을 처음 접하는 사람들은 비슷한 어려움 앞에서 멈칫한다. 
                추천을 받을 때 “단 게 좋아요”라고 말하지만, 와인을 오래 마신 사람이 말하는 단맛이나 부드러움은 전혀 다른 감각의 스케일을 가리킨다.
              </p>
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-6">
                "겉으로는 같은 단어를 쓰지만, 입문자가 기대하는 ‘단맛’과 추천자가 말하는 ‘단맛’은 서로 다른 세계에 놓여 있다."
              </blockquote>
              <p>
                이 작은 불일치는 첫 경험의 방향을 크게 틀어놓는다. 
                입문자는 자신에게 맞지 않는 와인을 마주하게 되고, “와인은 나와 안 맞는다”는 결론으로 쉽게 이어진다.
              </p>
            </div>

            <hr className="border-white/10" />

            {/* 섹션 3: 해결책 */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-purple-400">감각의 번역기</h4>
              <p>
                결국 문제는 추천이나 선택의 기술 이전에, 초보자와 추천자 사이의 감각 언어 자체가 맞지 않는 데 있었다. 
                나는 이 간극을 수정하고 싶었다.
              </p>
              <p>
                초보자의 일상 언어를 와인의 맛 체계로 번역하고, 와인의 기준을 초보자가 이해할 수 있는 감각적 형태로 다시 내려주는 서비스.
                두 세계의 언어를 이어주는 일종의 해석 장치를 만드는 것.
              </p>
              <p className="font-bold text-white mt-8">
                그것이 드링키지가 존재하는 이유이자, 우리가 만드는 서비스의 본질이다.
              </p>
            </div>
            
            <div className="pt-10 pb-4 text-right">
              <p className="text-sm text-gray-500">Dec 13. 2025</p>
              <p className="font-script text-xl text-purple-400 mt-2">Founder. Wiseungju</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export function TeamSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="team" className="py-24 bg-black relative overflow-hidden">
      <StoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* 배경 효과 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              만든 사람들
            </h2>
            <p className="text-lg text-gray-400">
              와인 문화를 바꾸기 위한 열정으로 시작했습니다.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Creator Section (메인) */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative group mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-gray-900 border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <div className="flex-shrink-0 relative">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white/10">
                        <ImageWithFallback
                          src={wiseungjuPhoto}
                          alt="위승주"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-gray-900">
                        Creator
                      </div>
                    </div>
                    
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">위승주</h3>
                      <p className="text-purple-400 font-medium mb-4">Founder & Product Maker</p>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        "개발자가 아닙니다. 오직 와인 시장의 문제를 해결하고 싶다는 마음 하나로 시작했습니다. 
                        AI와 함께 기획부터 디자인, 그리고 코드 한 줄 한 줄까지 직접 빚어냈습니다.
                        기술의 한계를 넘어, 진정성 있는 서비스를 만듭니다."
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Product Planning</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Vibe Coding</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">Sommelier Advised</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder's Note Teaser */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.0171 16H6.01709V14H19.0171V7H15.0171C13.9125 7 13.0171 6.10457 13.0171 5V1H10.0171V12H4.01709V21H14.017ZM21.0171 21V5C21.0171 3.89543 20.1216 3 19.0171 3H15.0171V7H19.0171V21H21.0171Z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Why We Started</h3>
                <p className="text-2xl font-light text-gray-300 italic mb-6">
                  "말은 같아도 맛은 다르다.<br/>
                  우리는 그 <span className="text-purple-400 font-semibold">언어의 간극</span>을 좁히고 싶었다."
                </p>
                <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300">
                  Founder's Note 읽기 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </motion.div>

            {/* Contributors Section (서브) */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                  Special Thanks to
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  드링키지의 첫 시작을 함께하며<br/>
                  소중한 기반을 다져준 초기 멤버들입니다.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  {contributors.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm group">
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-500 transition-colors"></span>
                      <span>{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}