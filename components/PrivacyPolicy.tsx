import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function PrivacyPolicy() {
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

                <h1 className="text-2xl font-bold mb-2">드링키지(Drinkig) 개인정보 처리방침</h1>
                <p className="text-sm text-gray-500 mb-8">시행일: 2026년 6월 22일</p>

                <div className="space-y-8 text-sm leading-relaxed text-gray-300">
                    <p>
                        고메블('드링키지' 또는 'Drinkig' 이하 '회사')은(는) 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제1조 (개인정보의 수집 및 이용 목적)</h2>
                        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>회원 식별 및 가입 의사 확인, 회원 탈퇴 처리</li>
                            <li>맞춤형 와인 추천 서비스 제공 및 취향 데이터 분석</li>
                            <li>와인 라벨·메뉴판 사진 스캔(OCR) 및 AI 기반 와인 인식·추천 서비스 제공</li>
                            <li>AI 소믈리에 및 음식 페어링 추천 등 생성형 AI 기반 개인화 서비스 제공</li>
                            <li>테이스팅 노트 저장, 위시리스트 관리 및 커뮤니티 서비스 운영</li>
                            <li>유료 구독(프리미엄) 서비스의 결제, 구독 상태 관리, 영수증 검증 및 고객 문의 대응</li>
                            <li>서비스 개선을 위한 통계 분석 및 접속 빈도 파악</li>
                            <li>신규 서비스(제품) 개발 및 마케팅·광고 활용</li>
                            <li>맞춤형 광고 제공, 광고 유효성 및 효율 분석, 이벤트 정보 및 참여기회 제공</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제2조 (수집하는 개인정보 항목)</h2>
                        <p className="mb-2">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.</p>
                        <ul className="space-y-2">
                            <li><span className="text-white font-medium">필수 항목:</span> 소셜 로그인 고유 식별값(Kakao/Apple ID), 이메일 주소, 닉네임</li>
                            <li><span className="text-white font-medium">서비스 이용 항목:</span> 와인 취향 프로필(당도·산도·탄닌·바디·도수 등 0~100 척도), 선호 와인 종류·음식·주종, 테이스팅 노트(평점·리뷰·향 등), 위시리스트, 보유 와인 및 구매 기록(구매일·구매가·구매처), 음식 페어링 입력값</li>
                            <li><span className="text-white font-medium">이미지 데이터:</span> 와인 라벨·메뉴판 스캔 사진, 테이스팅 노트 첨부 사진, 프로필 사진, 와인 등록 요청 사진 (서버 전송 후 OCR·AI 분석에 이용)</li>
                            <li><span className="text-white font-medium">결제 항목:</span> Apple 인앱결제 거래 식별자(transactionId, originalTransactionId), 상품 식별자, 구독 상태 및 만료일, 프로모션 코드 사용 내역 (실제 카드번호 등 결제수단 정보는 Apple이 처리하며 회사는 보유하지 않습니다)</li>
                            <li><span className="text-white font-medium">자동 수집 항목:</span> 기기정보(모델명, OS 버전, 기기 고유값), 접속 로그, 서비스 이용 기록(검색어, 클릭 이력, 스캔 사용량), 광고 식별자(IDFA/ADID), 광고 상호작용 데이터, 진단 데이터</li>
                            <li><span className="text-white font-medium">선택 항목:</span> 성별/연령대 (소셜 로그인 시 동의한 경우에 한함)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제3조 (개인정보 처리의 위탁 및 제3자 제공)</h2>
                        <p>회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 외부 전문업체에 위탁하거나 제3자 서비스를 이용하고 있습니다. 이 과정에서 일부 데이터는 해당 사업자의 해외 서버에서 처리될 수 있습니다(제4조 참조).</p>

                        <div className="mt-4 space-y-4">
                            <div>
                                <h3 className="text-white font-medium mb-2">Google AdMob (Google LLC)</h3>
                                <ul className="space-y-1 pl-2 text-gray-400">
                                    <li>수집 항목: 광고 식별자(IDFA/ADID), 기기 정보, 광고 데이터(노출·클릭 등), 진단 데이터</li>
                                    <li>이용 목적: 맞춤형 광고 제공, 광고 성과 분석 및 부정 클릭 방지</li>
                                    <li>처리방침: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://policies.google.com/privacy</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-2">Google Firebase (Google LLC)</h3>
                                <ul className="space-y-1 pl-2 text-gray-400">
                                    <li>수집 항목: 앱 이용·화면 이벤트 로그, 기기 정보, 인증 토큰</li>
                                    <li>이용 목적: 이용 통계 분석(Analytics), 회원 인증(Authentication)</li>
                                    <li>처리방침: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://firebase.google.com/support/privacy</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-2">Apple Inc. (인앱결제)</h3>
                                <ul className="space-y-1 pl-2 text-gray-400">
                                    <li>수집 항목: 인앱결제 거래 식별자, 구독 상태</li>
                                    <li>이용 목적: 유료 구독 결제 처리 및 영수증 검증</li>
                                    <li>처리방침: <a href="https://www.apple.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.apple.com/legal/privacy</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-2">생성형 AI 서비스 (예: OpenAI, L.L.C.)</h3>
                                <ul className="space-y-1 pl-2 text-gray-400">
                                    <li>수집 항목: 라벨·메뉴 스캔 이미지 또는 텍스트, 와인 취향 프로필, 음식명 등 추천 입력값 (회원의 직접 식별정보는 전송하지 않습니다)</li>
                                    <li>이용 목적: 와인 인식, AI 소믈리에·음식 페어링 추천 등 개인화 분석</li>
                                    <li>처리방침: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://openai.com/policies/privacy-policy</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-2">Kakao (주식회사 카카오)</h3>
                                <ul className="space-y-1 pl-2 text-gray-400">
                                    <li>수집 항목: 소셜 로그인 인증 토큰, 식별값</li>
                                    <li>이용 목적: 카카오 소셜 로그인 인증</li>
                                    <li>처리방침: <a href="https://www.kakao.com/policy/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.kakao.com/policy/privacy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-white font-medium mb-2">광고 식별자 수집 거부(Opt-out) 방법</h3>
                            <p className="mb-2">이용자는 언제든지 맞춤형 광고 수신을 거부할 수 있습니다.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><span className="text-white">iOS:</span> 설정 &gt; 개인정보 보호 및 보안 &gt; 추적 &gt; '앱이 추적을 요청하도록 허용' 해제 또는 '드링키지' 앱 비활성화</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제4조 (개인정보의 국외 이전)</h2>
                        <p>회사는 제3조의 서비스를 이용하는 과정에서 일부 개인정보가 국외로 이전되어 처리될 수 있습니다. 이용자는 서비스 이용(소셜 로그인, 광고, 통계 분석, AI 추천, 인앱결제) 시 아래 국외 이전에 동의한 것으로 봅니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>이전받는 자: Google LLC, Apple Inc., OpenAI L.L.C. 등 (제3조 기재)</li>
                            <li>이전 국가: 미국 등 (각 사업자의 서버 소재지)</li>
                            <li>이전 항목·목적·보유기간: 제2조·제3조에 기재된 항목을 각 서비스 제공 목적으로 처리하며, 처리 목적 달성 시 또는 각 사업자 정책에 따라 파기·보관됩니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제5조 (개인정보의 보유 및 이용기간)</h2>
                        <p>이용자의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 시 지체 없이 파기합니다. 단, 관계 법령에 따라 다음의 정보는 명시한 기간 동안 보존합니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>계약 또는 청약철회 등에 관한 기록 (전자상거래법): 5년</li>
                            <li>대금결제 및 재화 등의 공급에 관한 기록 (전자상거래법): 5년</li>
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록 (전자상거래법): 3년</li>
                            <li>표시/광고에 관한 기록 (전자상거래법): 6개월</li>
                            <li>로그기록 (통신비밀보호법): 3개월</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제6조 (개인정보의 파기절차 및 방법)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사는 목적이 달성된 개인정보를 재생 불가능한 기술적 방법을 사용하여 파기합니다.</li>
                            <li>회원 탈퇴 시 테이스팅 노트, 스캔 이력, 취향 프로필 등 회원이 생성한 데이터는 지체 없이 파기하되, 제5조의 법정 보존 의무가 있는 정보는 해당 기간 동안 분리 보관 후 파기합니다.</li>
                            <li>Apple 로그인 탈퇴 시, Apple 서버와의 연동을 끊는 토큰 철회(Revoke)를 동시에 수행하여 데이터 유출을 방지합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제7조 (개인정보 보호책임자)</h2>
                        <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고 이용자의 불만처리를 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <ul className="mt-2 space-y-1">
                            <li>성명: 위승주</li>
                            <li>직책: 대표</li>
                            <li>연락처: gourmevel@gmail.com</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제8조 (개인정보의 안전성 확보 조치)</h2>
                        <p>
                            회사는 이용자의 개인정보를 취급함에 있어 분실, 도난, 유출되지 않도록 비밀번호 암호화, 보안 프로그램 설치 및 접근 권한 제한 등의 기술적/관리적 대책을 강구하고 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제9조 (권익침해 구제방법)</h2>
                        <p>이용자는 개인정보침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수 있습니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                            <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-lg font-semibold mb-3 text-white">부칙</h2>
                        <p>① 본 방침은 2026년 1월 21일부터 최초 시행되었습니다.</p>
                        <p>② 본 개정 방침은 2026년 6월 22일부터 시행합니다.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
