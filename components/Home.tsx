import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import { FeaturesSection } from "./FeaturesSection";
import { WhyDrinkig } from "./WhyDrinkig";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <HowItWorks />
                <FeaturesSection />
                <WhyDrinkig />
                <CtaSection />
            </main>
            <Footer />
        </>
    );
}
