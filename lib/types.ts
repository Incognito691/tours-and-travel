export interface TravelPackage {
  id: string
  title: string
  description: string
  location: string
  duration: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  maxPeople: number
  image: string
  images: string[]
  featured: boolean
  category: string
  season?: string
  inclusions: string[]
  exclusions: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
  }[]
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  packageId: string
  packageTitle: string
  customerName: string
  customerEmail: string
  customerPhone: string
  adults: number
  children: number
  checkIn: string
  checkOut: string
  totalPrice: number
  specialRequests?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}
