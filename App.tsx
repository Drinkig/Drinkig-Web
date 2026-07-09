import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { Home } from "./components/Home";
import { ScrollToTop } from "./components/ScrollToTop";
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

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/notices/:id" element={<NoticeDetail />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </MotionConfig>
    </LanguageProvider>
  );
}
