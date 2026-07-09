import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import { notices } from "../data/notices";
import { useLanguage } from "../i18n";
import { Seo } from "./Seo";

export function Notices() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-black text-white pt-8 pb-20 px-4">
            <Seo title="공지사항 | 드링키지" description="드링키지의 새로운 소식과 공지사항을 확인하세요." path="/notices" />
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-gray-300 transition-colors"
                >
                    {t("notices.back")}
                </Button>

                <h1 className="text-2xl font-bold mb-8">{t("notices.title")}</h1>

                <div className="border-t border-white/10">
                    {notices.length > 0 ? (
                        <div className="divide-y divide-white/10">
                            {notices.map((notice) => (
                                <Link
                                    key={notice.id}
                                    to={`/notices/${notice.id}`}
                                    className="block py-6 group transition-colors"
                                >
                                    <h2 className="text-lg font-medium mb-2 group-hover:text-gray-300 transition-colors">
                                        {notice.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">{notice.date}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            {t("notices.empty")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
