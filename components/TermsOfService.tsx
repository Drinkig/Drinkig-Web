import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-gray-300 transition-colors"
                >
                    ← 돌아가기
                </Button>

                <h1 className="text-2xl font-bold mb-2">드링키지(Drinkig) 서비스 이용약관</h1>
                <p className="text-sm text-gray-500 mb-8">시행일: 2025년 12월 31일</p>

                <div className="space-y-8 text-sm leading-relaxed text-gray-300">
                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제1조 (목적)</h2>
                        <p>
                            이 약관은 고메블(이하 "회사")가 제공하는 와인 정보 제공 및 기록 서비스인 "드링키지(Drinkig)"(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제2조 (용어의 정의)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>"서비스"란 단말기(모바일, 태블릿 등)를 통해 회원이 이용할 수 있는 드링키지(Drinkig) 앱 및 관련 제반 서비스를 의미합니다.</li>
                            <li>"회원"이란 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                            <li>"게시물"이란 회원이 서비스를 이용함에 있어 작성한 테이스팅 노트, 리뷰, 커뮤니티 글, 사진 등을 의미합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제3조 (이용계약의 체결)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>이용계약은 회원이 되고자 하는 자가 약관 내용에 동의하고, 카카오 또는 Apple 등 외부 소셜 계정 연동을 통한 가입 절차를 완료함으로써 체결됩니다.</li>
                            <li>회사는 가입신청자의 계정 정보가 허위이거나 타인의 정보를 도용함이 확인될 경우 승낙을 거절하거나 이용을 제한할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제4조 (서비스의 제공 및 변경)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사는 회원에게 와인 정보 검색, 개인별 와인 취향 분석 및 추천, 테이스팅 노트 작성 및 커뮤니티 서비스를 제공합니다.</li>
                            <li>회사는 운영상, 기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있으며, 이 경우 앱 내 공지사항을 통해 사전에 공지합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제5조 (게시물의 저작권 및 라이선스)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회원이 서비스 내에 게시한 테이스팅 노트, 사진 등 게시물의 저작권은 회원 본인에게 귀속됩니다.</li>
                            <li>회원은 자신이 게시한 내용을 회사가 서비스 운영, 홍보, 개인화 추천 알고리즘의 고도화 및 AI 데이터 분석을 목적으로 무상으로 사용하는 것을 허락합니다.</li>
                            <li>타인의 저작권을 침해하거나 불법적인 게시물을 작성하여 발생하는 책임은 회원 본인에게 있으며, 회사는 해당 게시물을 사전 통지 없이 삭제할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제6조 (계약 해지 및 이용 제한)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회원은 언제든지 앱 내 '설정 &gt; 회원 탈퇴' 메뉴를 통해 계약을 해지할 수 있습니다.</li>
                            <li>Apple 로그인을 이용하는 회원의 경우, 탈퇴 시 시스템상 Apple 인증 토큰 철회(Revoke) 절차가 함께 진행됩니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제7조 (사업자 정보 및 연락처)</h2>
                        <p className="mb-2">회사의 신원정보는 다음과 같습니다.</p>
                        <ul className="space-y-1">
                            <li>상호: 고메블 (Gourmevel)</li>
                            <li>대표자: 위승주</li>
                            <li>사업자등록번호: 342-15-02376</li>
                            <li>주소: 서울특별시 서대문구 가재울미래로 2, 114동 2102호(남가좌동, DMC파크뷰자이)</li>
                            <li>이메일: gourmevel@gmail.com</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-lg font-semibold mb-3 text-white">부칙</h2>
                        <p>본 약관은 2025년 12월 31일부터 시행합니다.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
