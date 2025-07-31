"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { getPackages } from "@/lib/data"
import type { TravelPackage } from "@/lib/types"

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([])

  useEffect(() => {
    const allPackages = getPackages()
    const featured = allPackages.filter((pkg) => pkg.featured).slice(0, 6)
    setPackages(featured)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Travel Packages</h2>
          <p className="mt-4 text-lg text-gray-600">Handpicked destinations for your perfect getaway</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
                {pkg.discount && <Badge className="absolute top-4 left-4 bg-red-500">{pkg.discount}% OFF</Badge>}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{pkg.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{pkg.duration}</span>
                  <Users className="h-4 w-4 ml-4 mr-1" />
                  <span className="text-sm">Max {pkg.maxPeople} people</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">${pkg.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-gray-600 text-sm ml-1">per person</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/package/${pkg.id}`}>View Details & Book</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/destinations">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
