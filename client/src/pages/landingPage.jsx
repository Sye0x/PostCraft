import Navbar from "../components/navbar";
import HeroSection from "../components/landingPage/herosection";
import FeatureSection from "../components/landingPage/featuresection";
import StatsSection from "../components/landingPage/statsection";
import TestimonialSection from "../components/landingPage/testimonialsection";
import Footer from "../components/footer";
function LandingPage() {
  return (
    <div
      className="bg-background min-h-screen
  bg-[radial-gradient(circle,var(--color-buttonbg)_2px,transparent_2px)]
  bg-size-[25px_25px]"
    >
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
