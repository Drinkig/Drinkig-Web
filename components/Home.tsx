import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { TeamSection } from "./TeamSection";
import { Footer } from "./Footer";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <TeamSection />
            </main>
            <Footer />
        </>
    );
}
