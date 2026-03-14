import { Hero } from "@/components/landing/Hero";
import { NicheStrip } from "@/components/landing/NicheStrip";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { NicheShowcase } from "@/components/landing/NicheShowcase";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { Testimonials } from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NicheStrip />
      <div className="max-w-7xl mx-auto px-4">
        <FeaturedProducts />
        <HowItWorks />
        <NicheShowcase />
        <StatsCounter />
        <Testimonials />
      </div>
    </>
  );
}
