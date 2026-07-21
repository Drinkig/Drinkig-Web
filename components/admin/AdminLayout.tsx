import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, Flag, LogOut, MessageSquareWarning, Wine } from "lucide-react";
import { clearSession, fetchMe, getAdminName, isLoggedIn } from "../../lib/adminApi";
import { cn } from "../ui/utils";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "대시보드", icon: BarChart3 },
  { to: "/admin/requests", label: "와인 등록 요청", icon: Wine },
  { to: "/admin/reports", label: "신고 관리", icon: Flag },
  { to: "/admin/feedback", label: "스캔 피드백", icon: MessageSquareWarning },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin", { replace: true });
      return;
    }
    setAdminName(getAdminName());
    // 토큰 유효성 검증 — 만료/권한 없음이면 세션 정리 후 로그인으로
    fetchMe()
      .then((me) => {
        if (me.name) setAdminName(me.name);
        setReady(true);
      })
      .catch(() => {
        clearSession();
        navigate("/admin", { replace: true });
      });
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/admin", { replace: true });
  };

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-base">
        <p className="text-sm text-zinc-500">확인 중...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base text-white flex flex-col md:flex-row">
      <aside className="md:w-56 md:min-h-screen border-b md:border-b-0 md:border-r border-white/10 bg-surface-sunken flex md:flex-col shrink-0">
        <div className="hidden md:block px-5 py-6">
          <p className="text-lg font-bold">Drinkig Admin</p>
          {adminName && <p className="mt-1 text-xs text-zinc-500">{adminName}</p>}
        </div>
        <nav className="flex md:flex-col flex-1 overflow-x-auto md:overflow-visible px-2 md:px-3 py-2 md:py-0 gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-purple-500/15 text-purple-300"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white",
                )
              }
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="md:mt-auto px-2 md:px-3 py-2 md:py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <LogOut className="size-4" aria-hidden />
            <span className="hidden md:inline">로그아웃</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-4 md:px-8 py-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
