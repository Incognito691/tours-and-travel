"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Percent, Clock } from "lucide-react"
import Link from "next/link"
import { getPackages } from "@/lib/data"
import type { TravelPackage } from "@/lib/types"

export default function TopDiscounts() {
  const [discountPackages, setDiscountPackages] = useState<TravelPackage[]>([])

  useEffect(() => {
    const allPackages = getPackages()
    const withDiscounts = allPackages.filter((pkg) => pkg.discount && pkg.discount > 0).slice(0, 3)
    setDiscountPackages(withDiscounts)
  }, [])

  if (discountPackages.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Percent className="h-8 w-8 text-red-500 mr-2" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Limited Time Offers</h2>
          </div>
          <p className="text-lg text-gray-600">Don't miss out on these incredible deals!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {discountPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="relative overflow-hidden border-2 border-red-200 hover:border-red-300 transition-colors"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-lg">
                <span className="font-bold text-lg">{pkg.discount}% OFF</span>
              </div>

              <div className="relative">
                <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{pkg.title}</h3>
                  <p className="text-sm opacity-90">{pkg.location}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-500 line-through mr-2">${pkg.originalPrice}</span>
                    <span className="text-2xl font-bold text-red-600">${pkg.price}</span>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Limited Time
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href={`/package/${pkg.id}`}>Book Now & Save</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
