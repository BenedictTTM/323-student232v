import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import StocksSection from "../components/home/StocksSection";
import DerivativesSection from "../components/home/DerivativesSection";
import ExploreTokens from "../components/home/ExploreTokens";
import PredictionMarkets from "../components/home/PredictionMarkets";
import AdvancedTrade from "../components/home/AdvancedTrade";
import CoinbaseOne from "../components/home/CoinbaseOne";
import BaseApp from "../components/home/BaseApp";
import Prime from "../components/home/Prime";
import LearnCards from "../components/home/LearnCards";
import CtaSection from "../components/home/CtaSection";
import Disclaimers from "../components/home/Disclaimers";
import UnderHero from "../components/home/UnderHero";
import Footer from "../components/layout/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <UnderHero />

        {/* <StocksSection /> */}
        <DerivativesSection />
        <ExploreTokens />
        <PredictionMarkets />
        <AdvancedTrade />
        <CoinbaseOne />
        <BaseApp />
        <Prime />
        <LearnCards />
        <CtaSection />
        <Disclaimers />
      </main>
      <Footer />
    </div>
  );
}
