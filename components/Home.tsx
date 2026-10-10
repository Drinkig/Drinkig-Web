import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorks } from "./HowItWorks";
import { WhyDrinkig } from "./WhyDrinkig";
import { CtaSection, StoresBand } from "./CtaSection";
import { Footer } from "./Footer";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <WhyDrinkig />
                <CtaSection />
                <StoresBand />
            </main>
            <Footer />
        </>
    );
}
