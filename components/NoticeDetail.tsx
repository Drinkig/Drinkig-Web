import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getNotice } from "../data/notices";
import { useLanguage } from "../i18n";

export function NoticeDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const noticeId = Number(id);
    const notice = getNotice(noticeId);
    const { t, lp } = useLanguage();

    if (!notice) {
        return (
            <div className="min-h-screen bg-black text-white pt-20 px-4 text-center">
                <p className="text-gray-400 mb-4">{t("notices.notFound")}</p>
                <Button variant="outline" onClick={() => navigate(lp("/notices"))}>
                    {t("notices.backToList")}
                </Button>
            </div>
        );
    }

    const formatContent = (content: string) => {
        return content.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-white block mt-4 mb-2">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="min-h-screen bg-black text-white pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate(lp("/notices"))}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-gray-300 transition-colors"
                >
                    {t("notices.backShort")}
                </Button>

                <div className="border-b border-white/10 pb-6 mb-8">
                    <h1 className="text-2xl font-bold mb-3">{notice.title}</h1>
                    <p className="text-sm text-gray-500">{notice.date}</p>
                </div>

                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed min-h-[50vh]">
                    {formatContent(notice.content)}
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 text-center">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(lp("/notices"))}
                        className="text-gray-400 hover:text-white"
                    >
                        {t("notices.backToList")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
