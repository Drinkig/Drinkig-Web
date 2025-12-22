import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-8 pl-0 hover:bg-transparent hover:text-gray-300"
                >
                    ← 돌아가기
                </Button>

                <h1 className="text-3xl md:text-4xl font-bold mb-8">이용약관</h1>
                <p className="text-gray-400 mb-8">최종 수정일: 2025년 2월 24일</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">1. 목적</h2>
                        <p className="div text-gray-300">
                            드링키지 서비스 이용약관은 회원이 주식회사 고메블(이하 "회사")이 제공하는 드링키지 서비스(이하 "서비스")를 이용함에 있어 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">2. 용어의 정의</h2>
                        <p className="text-gray-300">
                            (준비 중입니다. 추후 업데이트될 예정입니다.)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">3. 약관의 효력과 변경</h2>
                        <p className="text-gray-300">
                            (준비 중입니다. 추후 업데이트될 예정입니다.)
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
