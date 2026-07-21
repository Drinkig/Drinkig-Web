import { lazy, Suspense, type ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { Home } from "./components/Home";
import { ScrollToTop } from "./components/ScrollToTop";
import { Seo } from "./components/Seo";
import { LanguageProvider } from "./i18n";

const TermsOfService = lazy(() =>
  import("./components/TermsOfService").then((m) => ({ default: m.TermsOfService })),
);
const PrivacyPolicy = lazy(() =>
  import("./components/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const Notices = lazy(() =>
  import("./components/Notices").then((m) => ({ default: m.Notices })),
);
const NoticeDetail = lazy(() =>
  import("./components/NoticeDetail").then((m) => ({ default: m.NoticeDetail })),
);

// 어드민 — 클라이언트 전용(프리렌더 제외, /en 미러 없음)
const AdminLogin = lazy(() =>
  import("./components/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })),
);
const AdminLayout = lazy(() =>
  import("./components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })),
);
const AdminDashboard = lazy(() =>
  import("./components/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AdminWineRequests = lazy(() =>
  import("./components/admin/AdminWineRequests").then((m) => ({ default: m.AdminWineRequests })),
);
const AdminReports = lazy(() =>
  import("./components/admin/AdminReports").then((m) => ({ default: m.AdminReports })),
);
const AdminScanFeedback = lazy(() =>
  import("./components/admin/AdminScanFeedback").then((m) => ({ default: m.AdminScanFeedback })),
);

const routes: Array<{ path: string; element: ReactElement }> = [
  { path: "/", element: <Home /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/notices", element: <Notices /> },
  { path: "/notices/:id", element: <NoticeDetail /> },
];

// 라우터(BrowserRouter/StaticRouter) 안쪽 전체. SSR 엔트리에서도 재사용한다.
export function AppShell() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <Seo />
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <Routes>
              {routes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
              {/* 영어 버전: /en 접두어 경로 */}
              {routes.map((r) => (
                <Route
                  key={`/en${r.path}`}
                  path={r.path === "/" ? "/en" : `/en${r.path}`}
                  element={r.element}
                />
              ))}
              {/* 어드민 (클라이언트 전용) */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/requests" element={<AdminWineRequests />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/feedback" element={<AdminScanFeedback />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
