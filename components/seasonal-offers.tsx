"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Snowflake, Sun, Leaf, Flower } from "lucide-react"
import Link from "next/link"

const seasonalOffers = [
  {
    id: 1,
    season: "Winter",
    title: "Winter Wonderland",
    description: "Experience magical winter destinations with snow-capped mountains and cozy retreats.",
    icon: Snowflake,
    color: "from-blue-400 to-cyan-300",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    season: "Summer",
    title: "Summer Paradise",
    description: "Tropical beaches, crystal clear waters, and endless sunshine await you.",
    icon: Sun,
    color: "from-yellow-400 to-orange-300",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
  },
  {
    id: 3,
    season: "Spring",
    title: "Spring Awakening",
    description: "Witness nature come alive with blooming flowers and perfect weather.",
    icon: Flower,
    color: "from-pink-400 to-rose-300",
    textColor: "text-pink-700",
    bgColor: "bg-pink-50",
  },
  {
    id: 4,
    season: "Autumn",
    title: "Autumn Colors",
    description: "Fall foliage, harvest festivals, and comfortable temperatures for exploration.",
    icon: Leaf,
    color: "from-amber-400 to-orange-400",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
  },
]

export default function SeasonalOffers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Seasonal Adventures</h2>
          <p className="mt-4 text-lg text-gray-600">Perfect destinations for every season of the year</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalOffers.map((offer) => {
            const IconComponent = offer.icon
            return (
              <Card key={offer.id} className={`${offer.bgColor} border-0 hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3 className={`text-xl font-semibold mb-2 ${offer.textColor}`}>{offer.title}</h3>

                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className={`border-current ${offer.textColor} hover:bg-current hover:text-white`}
                  >
                    <Link href={`/destinations?season=${offer.season.toLowerCase()}`}>Explore {offer.season}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
