import HeroSection from '../components/LandingPage/Hero';
import About from '../components/LandingPage/About';
import Features from '../components/LandingPage/Features';
import CTASection from '../components/LandingPage/CTA';
import FooterSection from '../components/LandingPage/Footer';

function LandingPage() {
  return (
    <main className="w-full items-center justify-center">
      <div className="w-full items-center justify-center bg-white dark:bg-gray-950">
        <HeroSection />
        <About />
        <Features />
        <CTASection />
        <FooterSection />
      </div>
    </main>
  );
}

export default LandingPage;
