import { Button } from "./ui/button";
const drinkeasyLogo = "/images/drinkeasy-logo.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* 로고 */}
          <img 
            src={drinkeasyLogo} 
            alt="드링키지" 
            className="h-10 w-auto brightness-0 invert opacity-90 mb-6"
          />
          
          <p className="text-gray-400 text-lg mb-10 font-light">
            와인을 이지하게, <span className="text-white font-medium">드링키지</span>
          </p>

          {/* 버튼 그룹 */}
          <div className="flex gap-4 mb-16">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 rounded-full border-white/20 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => window.open('https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172', '_blank')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 rounded-full border-white/20 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => window.open('https://www.instagram.com/drinki.g/', '_blank')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
              </svg>
              Instagram
            </Button>
          </div>

          {/* 구분선 */}
          <div className="w-full h-px bg-white/10 mb-8 max-w-2xl mx-auto"></div>

          {/* 사업자 정보 */}
          <div className="text-gray-500 text-xs space-y-2 leading-relaxed">
            <div className="flex flex-wrap justify-center gap-4">
              <span>상호명: 고메블</span>
              <span className="hidden sm:inline">|</span>
              <span>대표: 위승주</span>
              <span className="hidden sm:inline">|</span>
              <span>사업자등록번호: 342-15-02376</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <span>주소: 서울특별시 서대문구 가재울미래로2, 114동 2102호</span>
              <span className="hidden sm:inline">|</span>
              <span>연락처: 010-3655-5641</span>
            </div>
            <p>이메일: drinkeasyy@gmail.com</p>
            <p className="pt-4 text-gray-600">&copy; 2025 Drinkig. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}