import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Seo } from "./Seo";

export function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white pt-8 pb-20 px-4">
            <Seo title="이용약관 | 드링키지" description="드링키지 서비스 이용약관" path="/terms" />
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-gray-300 transition-colors"
                >
                    ← 돌아가기
                </Button>

                <h1 className="text-2xl font-bold mb-2">드링키지(Drinkig) 서비스 이용약관</h1>
                <p className="text-sm text-gray-500 mb-8">시행일: 2026년 6월 22일</p>

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
                            <li>"유료서비스(프리미엄 구독)"란 회원이 일정 금액을 결제하고 이용하는 자동 갱신 구독 등 유료 기능을 의미합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제3조 (이용계약의 체결 및 자격)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>이용계약은 회원이 되고자 하는 자가 약관 내용에 동의하고, 카카오 또는 Apple 등 외부 소셜 계정 연동을 통한 가입 절차를 완료함으로써 체결됩니다.</li>
                            <li>본 서비스는 주류 관련 정보를 다루므로, 만 19세 이상인 자만 가입 및 이용할 수 있습니다. 만 19세 미만 미성년자의 가입은 제한되며, 회사는 이를 확인하기 위한 조치를 취할 수 있습니다.</li>
                            <li>회사는 가입신청자의 계정 정보가 허위이거나 타인의 정보를 도용함이 확인될 경우 승낙을 거절하거나 이용을 제한할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제4조 (서비스의 제공 및 변경)</h2>
                        <p className="mb-2">회사는 회원에게 다음의 서비스를 제공합니다.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>와인 정보 검색</li>
                            <li>개인별 와인 취향 분석 및 추천</li>
                            <li>와인 라벨·메뉴판 사진 스캔(OCR) 및 AI 기반 와인 인식</li>
                            <li>AI 소믈리에 및 음식 페어링 추천 서비스</li>
                            <li>테이스팅 노트 작성 및 커뮤니티 서비스</li>
                            <li>유료 구독(프리미엄) 서비스</li>
                            <li>광고 및 프로모션 제공</li>
                            <li>기타 회사가 정하는 업무</li>
                        </ul>
                        <p className="mt-2">회사는 운영상, 기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있으며, 이 경우 앱 내 공지사항을 통해 사전에 공지합니다.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제5조 (AI 추천 서비스의 책임 한계)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사가 제공하는 와인 인식, AI 소믈리에, 음식 페어링 추천 등은 참고용 정보이며, 그 정확성·완전성을 보증하지 않습니다.</li>
                            <li>라벨·메뉴 스캔 결과는 촬영 환경에 따라 실제와 다를 수 있으며, 최종 판단 및 구매·음용에 대한 책임은 회원에게 있습니다.</li>
                            <li>회사는 음주가 건강에 미치는 영향에 대해 책임지지 않으며, 회원은 관련 법령과 건강 상태를 고려하여 적정 음주를 하여야 합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제6조 (유료서비스 및 자동 갱신 구독)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사는 프리미엄 구독 등 유료서비스를 제공하며, 요금 및 결제 주기(월간/연간)는 앱 내 결제 화면에 표시됩니다.</li>
                            <li>모든 유료 결제는 Apple App Store의 인앱결제(In-App Purchase)를 통해 이루어지며, 결제 및 환불 처리는 Apple의 정책을 따릅니다.</li>
                            <li><span className="text-white">자동 갱신:</span> 구독은 현재 결제 기간 종료 최소 24시간 전에 회원이 자동 갱신을 해지하지 않는 한 동일 조건으로 자동 갱신되며, 갱신 요금은 기간 종료 24시간 이내에 회원의 Apple 계정으로 청구됩니다.</li>
                            <li><span className="text-white">구독 관리·해지:</span> 회원은 기기의 App Store 계정 설정 &gt; 구독 메뉴에서 언제든지 자동 갱신을 해지할 수 있습니다. 해지 시 다음 결제 주기부터 갱신이 중단되며, 이미 시작된 구독 기간은 만료일까지 유지됩니다.</li>
                            <li>프로모션 코드로 제공되는 무료/할인 혜택의 조건은 제공 시점에 별도로 고지합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제7조 (청약철회 및 환불)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회원은 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령에 따라 청약철회 및 환불을 요청할 수 있습니다.</li>
                            <li>다만 인앱결제로 구매한 유료서비스의 환불은 Apple App Store를 통해 처리되며, 구체적인 환불 가능 여부 및 절차는 Apple의 환불 정책(<a href="https://support.apple.com/ko-kr/HT204084" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Apple 환불 요청</a>)을 따릅니다.</li>
                            <li>이미 제공이 개시된 디지털 콘텐츠의 경우 관련 법령이 정하는 범위 내에서 청약철회가 제한될 수 있습니다.</li>
                            <li>환불 및 결제 관련 문의는 회사 이메일(gourmevel@gmail.com)로 접수할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제8조 (게시물의 저작권 및 라이선스)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회원이 서비스 내에 게시한 테이스팅 노트, 사진 등 게시물의 저작권은 회원 본인에게 귀속됩니다.</li>
                            <li>회원은 자신이 게시한 내용을 회사가 서비스 운영, 홍보, 개인화 추천 알고리즘의 고도화 및 AI 데이터 분석을 목적으로 무상으로 사용하는 것을 허락합니다.</li>
                            <li>타인의 저작권을 침해하거나 불법적인 게시물을 작성하여 발생하는 책임은 회원 본인에게 있으며, 회사는 해당 게시물을 사전 통지 없이 삭제할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제9조 (계약 해지 및 이용 제한)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회원은 언제든지 앱 내 '설정 &gt; 회원 탈퇴' 메뉴를 통해 계약을 해지할 수 있습니다. 단, 진행 중인 유료 구독의 자동 갱신 해지는 제6조에 따라 App Store에서 별도로 처리해야 합니다.</li>
                            <li>Apple 로그인을 이용하는 회원의 경우, 탈퇴 시 시스템상 Apple 인증 토큰 철회(Revoke) 절차가 함께 진행됩니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제10조 (정보의 제공 및 광고의 게재)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사는 서비스 운영과 관련하여 서비스 화면, 홈페이지, 앱 내 알림 등에 광고를 게재할 수 있습니다.</li>
                            <li>회원이 서비스상에 게재되어 있는 광고를 이용하거나 광고주와 교신·거래하는 것은 전적으로 회원과 광고주 간의 문제입니다. 따라서 이와 관련하여 발생하는 손해나 분쟁에 대해 회사는 어떠한 책임도 지지 않습니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제11조 (사업자 정보 및 연락처)</h2>
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
                        <p>① 본 약관은 2026년 1월 21일부터 최초 시행되었습니다.</p>
                        <p>② 본 개정 약관은 2026년 6월 22일부터 시행합니다.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
