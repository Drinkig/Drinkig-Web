import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#030213] pt-32 sm:pt-40">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#030213]"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 backdrop-blur-xl">
              <span className="mr-2 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              New Standard of Wine Experience
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block text-white -mb-1 md:-mb-2 text-3xl md:text-5xl lg:text-6xl leading-tight">어려운 와인 용어 대신</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient-x bg-[length:200%_auto] text-4xl md:text-6xl lg:text-7xl leading-tight">
              일상의 언어로 찾는 와인
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            추상적인 맛의 표현을 직관적인 일상 언어로.
            <br className="hidden sm:block" />
            전문가와 초보자의 간극을 좁혀, 당신에게 꼭 맞는 와인을 찾아드립니다.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-100 rounded-full transition-all hover:scale-105"
              onClick={() => window.open('https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172', '_blank')}
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store에서 다운로드
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 rounded-full backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              더 알아보기
            </Button>
          </motion.div>

          {/* App Mockup Visual (Direct & Intuitive) */}
          <motion.div 
            className="relative w-full max-w-[600px] mx-auto mt-12 mb-20 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-600/30 blur-[100px] rounded-full -z-10"></div>
            
            {/* Mockup Image with Float Animation */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex justify-center"
            >
              <img 
                src="/images/Mockup.png" 
                alt="Drinkig App Mockup" 
                className="w-full h-auto drop-shadow-2xl" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}