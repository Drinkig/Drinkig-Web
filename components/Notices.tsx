import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import { notices } from "../data/notices";
import { useLanguage } from "../i18n";

export function Notices() {
    const navigate = useNavigate();
    const { t, lp } = useLanguage();

    return (
        <div className="min-h-screen bg-paper text-ink pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate(lp("/"))}
                    className="mb-6 pl-0 hover:bg-transparent hover:text-ink-muted transition-colors"
                >
                    {t("notices.back")}
                </Button>

                <h1 className="text-2xl font-bold mb-8">{t("notices.title")}</h1>

                <div className="border-t border-paper-line">
                    {notices.length > 0 ? (
                        <div className="divide-y divide-paper-line">
                            {notices.map((notice) => (
                                <Link
                                    key={notice.id}
                                    to={lp(`/notices/${notice.id}`)}
                                    className="block py-6 group transition-colors"
                                >
                                    <h2 className="text-lg font-medium mb-2 group-hover:text-ink-muted transition-colors">
                                        {notice.title}
                                    </h2>
                                    <p className="text-sm text-ink-muted">{notice.date}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-ink-muted">
                            {t("notices.empty")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
