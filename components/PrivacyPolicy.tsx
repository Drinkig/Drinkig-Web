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
                <p className="text-sm text-gray-500 mb-8">시행일: 2025년 12월 31일</p>

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
                            <li>테이스팅 노트 저장, 위시리스트 관리 및 커뮤니티 서비스 운영</li>
                            <li>서비스 개선을 위한 통계 분석 및 접속 빈도 파악</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제2조 (수집하는 개인정보 항목)</h2>
                        <ul className="space-y-2">
                            <li><span className="text-white font-medium">필수 항목:</span> 소셜 로그인 고유 식별값(Kakao/Apple ID), 이메일 주소, 닉네임</li>
                            <li><span className="text-white font-medium">자동 수집 항목:</span> 기기정보(모델명, OS 버전, 기기 고유값), 접속 로그, 서비스 이용 기록(검색어, 클릭 이력)</li>
                            <li><span className="text-white font-medium">선택 항목:</span> 프로필 사진, 성별/연령대 (소셜 로그인 시 동의한 경우에 한함), 테이스팅 노트 내 사진 데이터</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제3조 (개인정보의 보유 및 이용기간)</h2>
                        <p>이용자의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 시 지체 없이 파기합니다. 단, 관계 법령에 따라 다음의 정보는 명시한 기간 동안 보존합니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>로그기록 (통신비밀보호법): 3개월</li>
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록 (전자상거래법): 3년</li>
                            <li>표시/광고에 관한 기록 (전자상거래법): 6개월</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제4조 (개인정보의 파기절차 및 방법)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>회사는 목적이 달성된 개인정보를 재생 불가능한 기술적 방법을 사용하여 파기합니다.</li>
                            <li>Apple 로그인 탈퇴 시, Apple 서버와의 연동을 끊는 토큰 철회(Revoke)를 동시에 수행하여 데이터 유출을 방지합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제5조 (개인정보 보호책임자)</h2>
                        <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고 이용자의 불만처리를 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <ul className="mt-2 space-y-1">
                            <li>성명: 위승주</li>
                            <li>직책: 대표</li>
                            <li>연락처: gourevel@gmail.com</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제6조 (개인정보의 안전성 확보 조치)</h2>
                        <p>
                            회사는 이용자의 개인정보를 취급함에 있어 분실, 도난, 유출되지 않도록 비밀번호 암호화, 보안 프로그램 설치 및 접근 권한 제한 등의 기술적/관리적 대책을 강구하고 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3 text-white">제7조 (권익침해 구제방법)</h2>
                        <p>이용자는 개인정보침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수 있습니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                            <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-lg font-semibold mb-3 text-white">부칙</h2>
                        <p>본 방침은 2025년 12월 31일부터 시행합니다.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
