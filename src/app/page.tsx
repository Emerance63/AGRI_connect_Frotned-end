import Hero from "@/components/landing/Hero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CTA from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedProducts />
      <CTA />
    </>
  );
}
