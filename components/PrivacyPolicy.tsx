import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function PrivacyPolicy() {
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

                <h1 className="text-3xl md:text-4xl font-bold mb-8">개인정보 처리방침</h1>
                <p className="text-gray-400 mb-8">최종 수정일: 2025년 2월 24일</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">1. 개인정보의 처리 목적</h2>
                        <p className="text-gray-300">
                            주식회사 고메블은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">2. 개인정보의 처리 및 보유 기간</h2>
                        <p className="text-gray-300">
                            (준비 중입니다. 추후 업데이트될 예정입니다.)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-white">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
                        <p className="text-gray-300">
                            (준비 중입니다. 추후 업데이트될 예정입니다.)
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
