import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorks } from "./HowItWorks";
import { WhyDrinkig } from "./WhyDrinkig";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import { Seo } from "./Seo";

export function Home() {
    return (
        <>
            <Seo
                title="와인이 쉬워진다, 드링키지"
                description="와인 초보도 쉽게. 추상적인 맛 표현을 일상 언어로 풀어, 내 취향에 꼭 맞는 와인을 추천해드립니다. 드링키지에서 나만의 와인을 찾아보세요."
                path="/"
            />
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <WhyDrinkig />
                <CtaSection />
            </main>
            <Footer />
        </>
    );
}
