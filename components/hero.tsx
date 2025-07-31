"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, MapPin, Search } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
  })

  const handleSearch = () => {
    const params = new URLSearchParams(searchData)
    window.location.href = `/destinations?${params.toString()}`
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover Your Next
            <span className="text-yellow-400"> Adventure</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Explore breathtaking destinations, create unforgettable memories, and embark on the journey of a lifetime
            with our curated travel experiences.
          </p>
        </div>

        {/* Search Card */}
        <Card className="mt-16 mx-auto max-w-4xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-2">
                <Label htmlFor="destination" className="text-gray-700">
                  Destination
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="destination"
                    placeholder="Where do you want to go?"
                    className="pl-10"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="checkin" className="text-gray-700">
                  Check In
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkin"
                    type="date"
                    className="pl-10"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="checkout" className="text-gray-700">
                  Check Out
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkout"
                    type="date"
                    className="pl-10"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="adults" className="text-gray-700">
                    Adults
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      className="pl-10"
                      value={searchData.adults}
                      onChange={(e) => setSearchData({ ...searchData, adults: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="children" className="text-gray-700">
                    Children
                  </Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={searchData.children}
                    onChange={(e) => setSearchData({ ...searchData, children: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button onClick={handleSearch} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Search Packages
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/destinations">Browse All Destinations</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
