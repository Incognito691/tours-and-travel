"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { addPackage } from "@/lib/data"

export default function NewPackagePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 4.5,
    maxPeople: 4,
    image: "",
    images: [""],
    featured: false,
    category: "",
    season: "",
    inclusions: [""],
    exclusions: [""],
    itinerary: [{ day: 1, title: "", description: "", activities: [""] }],
  })

  const handleInputChange = (field: string, value: any) => {
    setPackageData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: string) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field as keyof typeof prev],
        field === "itinerary" ? { day: prev.itinerary.length + 1, title: "", description: "", activities: [""] } : "",
      ],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index),
    }))
  }

  const handleItineraryChange = (index: number, field: string, value: any) => {
    setPackageData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...packageData,
        images: packageData.images.filter((img) => img.trim() !== ""),
        inclusions: packageData.inclusions.filter((inc) => inc.trim() !== ""),
        exclusions: packageData.exclusions.filter((exc) => exc.trim() !== ""),
        itinerary: packageData.itinerary.map((day) => ({
          ...day,
          activities: day.activities.filter((act) => act.trim() !== ""),
        })),
      }

      addPackage(cleanedData)

      toast({
        title: "Package Created Successfully!",
        description: "The new travel package has been added to your catalog.",
      })

      router.push("/admin")
    } catch (error) {
      toast({
        title: "Failed to Create Package",
        description: "There was an error creating the package. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Package</h1>
          <p className="text-gray-600">Create a new travel package for your customers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Package Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Tropical Paradise Getaway"
                    value={packageData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Maldives"
                    value={packageData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the package in detail..."
                  rows={4}
                  value={packageData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days, 6 Nights"
                    value={packageData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={packageData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="Wildlife">Wildlife</SelectItem>
                      <SelectItem value="Culinary">Culinary</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="season">Best Season</Label>
                  <Select value={packageData.season} onValueChange={(value) => handleInputChange("season", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
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

          {/* Pricing & Details */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={packageData.price}
                    onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (USD)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={packageData.originalPrice}
                    onChange={(e) => handleInputChange("originalPrice", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={packageData.discount}
                    onChange={(e) => handleInputChange("discount", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxPeople">Max People *</Label>
                  <Input
                    id="maxPeople"
                    type="number"
                    min="1"
                    value={packageData.maxPeople}
                    onChange={(e) => handleInputChange("maxPeople", Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={packageData.rating}
                    onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="featured"
                    checked={packageData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured Package</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mainImage">Main Image URL *</Label>
                <Input
                  id="mainImage"
                  placeholder="https://example.com/image.jpg"
                  value={packageData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Additional Images</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("images")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-2">
                  {packageData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChange={(e) => handleArrayChange("images", index, e.target.value)}
                      />
                      {packageData.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("images", index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>What's Included</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("inclusions")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {packageData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="e.g., Round-trip flights"
                        value={inclusion}
                        onChange={(e) => handleArrayChange("inclusions", index, e.target.value)}
                      />
                      {packageData.inclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("inclusions", index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>What's Not Included</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("exclusions")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {packageData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="e.g., Travel insurance"
                        value={exclusion}
                        onChange={(e) => handleArrayChange("exclusions", index, e.target.value)}
                      />
                      {packageData.exclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("exclusions", index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Itinerary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Itinerary</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("itinerary")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Day {day.day}</h3>
                      {packageData.itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("itinerary", index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Day Title</Label>
                        <Input
                          placeholder="e.g., Arrival & Welcome"
                          value={day.title}
                          onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe what happens on this day..."
                          value={day.description}
                          onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Activities</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newItinerary = [...packageData.itinerary]
                              newItinerary[index].activities.push("")
                              setPackageData((prev) => ({ ...prev, itinerary: newItinerary }))
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Activity
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-center space-x-2">
                              <Input
                                placeholder="e.g., Airport pickup"
                                value={activity}
                                onChange={(e) => {
                                  const newItinerary = [...packageData.itinerary]
                                  newItinerary[index].activities[actIndex] = e.target.value
                                  setPackageData((prev) => ({ ...prev, itinerary: newItinerary }))
                                }}
                              />
                              {day.activities.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newItinerary = [...packageData.itinerary]
                                    newItinerary[index].activities = newItinerary[index].activities.filter(
                                      (_, i) => i !== actIndex,
                                    )
                                    setPackageData((prev) => ({ ...prev, itinerary: newItinerary }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Package"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
