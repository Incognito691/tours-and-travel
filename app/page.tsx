import Hero from "@/components/hero"
import FeaturedPackages from "@/components/featured-packages"
import TopDiscounts from "@/components/top-discounts"
import SeasonalOffers from "@/components/seasonal-offers"
import WhyChooseUs from "@/components/why-choose-us"

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <TopDiscounts />
      <FeaturedPackages />
      <SeasonalOffers />
      <WhyChooseUs />
    </div>
  )
}
