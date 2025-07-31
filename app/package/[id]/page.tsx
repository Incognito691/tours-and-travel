"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Calendar, Users, Check, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPackageById } from "@/lib/data"
import type { TravelPackage } from "@/lib/types"
import BookingForm from "@/components/booking-form"

export default function PackageDetailsPage() {
  const params = useParams()
  const [pkg, setPkg] = useState<TravelPackage | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (params.id) {
      const packageData = getPackageById(params.id as string)
      setPkg(packageData)
    }
  }, [params.id])

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h2>
          <Button asChild>
            <Link href="/destinations">Browse All Packages</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <Button variant="ghost" asChild>
            <Link href="/destinations" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Destinations
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={pkg.images[selectedImage] || pkg.image}
                  alt={pkg.title}
                  className="w-full h-96 object-cover"
                />
                {pkg.discount && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-lg px-3 py-1">{pkg.discount}% OFF</Badge>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{pkg.rating}</span>
                </div>
              </div>

              {pkg.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {pkg.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${pkg.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Package Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{pkg.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-lg">{pkg.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Max {pkg.maxPeople} people</span>
                      </div>
                      <Badge variant="secondary">{pkg.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    {pkg.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">${pkg.originalPrice}</div>
                    )}
                    <div className="text-3xl font-bold text-blue-600">${pkg.price}</div>
                    <div className="text-gray-600">per person</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-700">What's Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Detailed Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pkg.itinerary.map((day, index) => (
                    <div key={day.day} className="relative">
                      {index !== pkg.itinerary.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200" />
                      )}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-700 mb-3">{day.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.activities.map((activity, actIndex) => (
                              <Badge key={actIndex} variant="outline">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Book This Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">${pkg.price}</div>
                    <div className="text-gray-600">per person</div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">Was ${pkg.originalPrice}</div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max People:</span>
                      <span className="font-medium">{pkg.maxPeople}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="secondary">{pkg.category}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <Button className="w-full text-lg py-6" onClick={() => setShowBookingForm(true)}>
                    Book Now
                  </Button>

                  <p className="text-xs text-gray-500 text-center">Free cancellation up to 24 hours before departure</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && <BookingForm package={pkg} onClose={() => setShowBookingForm(false)} />}
    </div>
  )
}
