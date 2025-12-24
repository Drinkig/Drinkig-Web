import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";
import { useState } from "react";
import { X } from "lucide-react";

const wiseungjuPhoto = "/images/lead_sean.jpeg";

// 초기 멤버 리스트


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
              Creator
            </h2>
            <p className="text-lg text-gray-400">
              와인 문화를 바꾸기 위한 열정으로 시작했습니다.
            </p>
          </motion.div>

          {/* 레이아웃 변경: 상단 2단 (프로필 + 스토리) / 하단 1단 (Thanks) */}
          <div className="flex flex-col gap-8">

            {/* 상단: Creator & Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* 1. Creator Profile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="relative h-full bg-gray-900 border border-white/10 rounded-3xl p-8 sm:p-10 overflow-hidden flex flex-col justify-center">
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <div className="flex-shrink-0 relative">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                        <ImageWithFallback
                          src={wiseungjuPhoto}
                          alt="위승주"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 shadow-lg">
                        Creator
                      </div>
                    </div>

                    <div className="text-center sm:text-left flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">위승주</h3>
                      <p className="text-purple-400 font-medium text-sm mb-4">Founder & Product Maker</p>
                      <p className="text-gray-400 leading-relaxed text-sm mb-5 break-keep">
                        "개발자가 아닙니다. 오직 와인 시장의 문제를 해결하고 싶다는 마음 하나로 시작했습니다.
                        기획부터 디자인, 코드까지 직접 빚어내며 진정성 있는 서비스를 만듭니다."
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 tracking-wide">Product Planning</span>
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 tracking-wide">Vibe Coding</span>
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 tracking-wide">Gastronomy Editor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. Why I Restarted (Graphic Card) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-full min-h-[320px]" onClick={() => setIsModalOpen(true)}>
                  {/* 배경: Abstract Graphic */}
                  <div className="absolute inset-0 bg-black">
                    <motion.div
                      className="absolute top-1/4 -left-10 w-40 h-40 bg-blue-600 blur-[50px] opacity-60"
                      animate={{ x: [0, 100, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 -right-10 w-40 h-40 bg-pink-600 blur-[50px] opacity-60"
                      animate={{ x: [0, -100, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Why I Restarted</h3>
                        <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
                      </div>
                      <div className="p-2 bg-white/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <p className="text-2xl font-light text-gray-200 leading-relaxed mb-6">
                        "말은 같아도 맛은 다르다.<br />
                        나는 그 <span className="text-purple-400 font-bold">언어의 간극</span>을<br />
                        좁히고 싶었다."
                      </p>
                      <div className="flex items-center text-xs text-gray-400 font-medium uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                        Read Founder's Note
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