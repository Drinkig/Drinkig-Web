import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getNotice } from "../data/notices";

export function NoticeDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const noticeId = Number(id);
    const notice = getNotice(noticeId);

    if (!notice) {
        return (
            <div className="min-h-screen bg-black text-white pt-20 px-4 text-center">
                <p className="text-gray-400 mb-4">공지사항을 찾을 수 없습니다.</p>
                <Button variant="outline" onClick={() => navigate("/notices")}>
                    목록으로 돌아가기
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/notices")}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-gray-300 transition-colors"
                >
                    ← 목록으로
                </Button>

                <div className="border-b border-white/10 pb-6 mb-8">
                    <h1 className="text-2xl font-bold mb-3">{notice.title}</h1>
                    <p className="text-sm text-gray-500">{notice.date}</p>
                </div>

                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed min-h-[50vh]">
                    {notice.content}
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 text-center">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/notices")}
                        className="text-gray-400 hover:text-white"
                    >
                        목록으로 돌아가기
                    </Button>
                </div>
            </div>
        </div>
    );
}
