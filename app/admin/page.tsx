"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Users, Mail, TrendingUp, Plus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { getPackages, getBookings, getContactMessages } from "@/lib/data"
import type { TravelPackage, Booking, ContactMessage } from "@/lib/types"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata?.role !== "admin")) {
      redirect("/")
    }
  }, [user, isLoaded])

  useEffect(() => {
    setPackages(getPackages())
    setBookings(getBookings())
    setMessages(getContactMessages())
  }, [])

  if (!isLoaded || !user || user.publicMetadata?.role !== "admin") {
    return null
  }

  const stats = [
    {
      name: "Total Packages",
      value: packages.length,
      icon: Package,
      color: "bg-blue-600",
    },
    {
      name: "Total Bookings",
      value: bookings.length,
      icon: Users,
      color: "bg-green-600",
    },
    {
      name: "Messages",
      value: messages.length,
      icon: Mail,
      color: "bg-purple-600",
    },
    {
      name: "Revenue",
      value: `$${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your travel packages and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Travel Packages</CardTitle>
                  <Button asChild>
                    <Link href="/admin/packages/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Package
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{pkg.title}</h3>
                          <p className="text-gray-600">{pkg.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={pkg.featured ? "default" : "secondary"}>
                              {pkg.featured ? "Featured" : "Regular"}
                            </Badge>
                            <span className="text-sm text-gray-500">${pkg.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/package/${pkg.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/packages/${pkg.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{booking.packageTitle}</h3>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Customer:</strong> {booking.customerName}
                          <br />
                          <strong>Email:</strong> {booking.customerEmail}
                        </div>
                        <div>
                          <strong>Dates:</strong> {booking.checkIn} to {booking.checkOut}
                          <br />
                          <strong>Guests:</strong> {booking.adults} adults, {booking.children} children
                        </div>
                        <div>
                          <strong>Total:</strong> ${booking.totalPrice.toFixed(2)}
                          <br />
                          <strong>Booked:</strong> {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>From:</strong> {message.name} ({message.email})
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
