"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users, Search, Filter } from "lucide-react"
import Link from "next/link"
import { getPackages } from "@/lib/data"
import type { TravelPackage } from "@/lib/types"

export default function DestinationsPage() {
  const searchParams = useSearchParams()
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>([])
  const [filters, setFilters] = useState({
    search: searchParams.get("destination") || "",
    category: searchParams.get("category") || "all",
    priceRange: searchParams.get("priceRange") || "any",
    duration: searchParams.get("duration") || "any",
    season: searchParams.get("season") || "any",
  })

  useEffect(() => {
    const allPackages = getPackages()
    setPackages(allPackages)
    setFilteredPackages(allPackages)
  }, [])

  useEffect(() => {
    let filtered = packages

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          pkg.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          pkg.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((pkg) => pkg.category === filters.category)
    }

    // Price range filter
    if (filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((pkg) => {
        if (max) {
          return pkg.price >= min && pkg.price <= max
        } else {
          return pkg.price >= min
        }
      })
    }

    // Duration filter
    if (filters.duration !== "any") {
      filtered = filtered.filter((pkg) => {
        const days = Number.parseInt(pkg.duration.split(" ")[0])
        switch (filters.duration) {
          case "short":
            return days <= 5
          case "medium":
            return days >= 6 && days <= 10
          case "long":
            return days > 10
          default:
            return true
        }
      })
    }

    // Season filter
    if (filters.season !== "any") {
      filtered = filtered.filter((pkg) => pkg.season === filters.season)
    }

    setFilteredPackages(filtered)
  }, [packages, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      priceRange: "any",
      duration: "any",
      season: "any",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Destinations</h1>
          <p className="mt-2 text-gray-600">Discover amazing travel packages tailored for you</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search destinations..."
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <Label>Category</Label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Wildlife">Wildlife</SelectItem>
                        <SelectItem value="Culinary">Culinary</SelectItem>
                        <SelectItem value="Nature">Nature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label>Price Range</Label>
                    <Select
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange("priceRange", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any price</SelectItem>
                        <SelectItem value="0-1000">Under $1,000</SelectItem>
                        <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500-4000">$2,500 - $4,000</SelectItem>
                        <SelectItem value="4000">Over $4,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label>Duration</Label>
                    <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any duration</SelectItem>
                        <SelectItem value="short">Short (1-5 days)</SelectItem>
                        <SelectItem value="medium">Medium (6-10 days)</SelectItem>
                        <SelectItem value="long">Long (10+ days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Season */}
                  <div>
                    <Label>Best Season</Label>
                    <Select value={filters.season} onValueChange={(value) => handleFilterChange("season", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any season</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="autumn">Autumn</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredPackages.length} of {packages.length} packages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
                    {pkg.discount && <Badge className="absolute top-4 left-4 bg-red-500">{pkg.discount}% OFF</Badge>}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                    <Badge className="absolute bottom-4 left-4 bg-blue-600">{pkg.category}</Badge>
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

            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms to find more results.</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
