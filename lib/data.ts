import type { TravelPackage, Booking, ContactMessage } from "./types"

// Sample travel packages data
const samplePackages: TravelPackage[] = [
  {
    id: "1",
    title: "Tropical Paradise Getaway",
    description:
      "Escape to pristine beaches with crystal clear waters, luxury resorts, and unforgettable sunsets. Perfect for couples and families seeking relaxation.",
    location: "Maldives",
    duration: "7 Days, 6 Nights",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.9,
    maxPeople: 4,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
    category: "Beach",
    season: "summer",
    inclusions: [
      "Round-trip flights",
      "Luxury resort accommodation",
      "All meals included",
      "Airport transfers",
      "Snorkeling equipment",
      "Sunset cruise",
    ],
    exclusions: ["Travel insurance", "Spa treatments", "Alcoholic beverages", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive at Malé International Airport and transfer to your luxury resort",
        activities: ["Airport pickup", "Resort check-in", "Welcome dinner", "Beach walk"],
      },
      {
        day: 2,
        title: "Island Exploration",
        description: "Discover the beauty of the local islands and marine life",
        activities: ["Island hopping", "Snorkeling", "Local village visit", "Traditional lunch"],
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "European Cultural Journey",
    description:
      "Immerse yourself in the rich history and culture of Europe's most iconic cities. Visit museums, historic landmarks, and enjoy local cuisine.",
    location: "Paris, Rome, Barcelona",
    duration: "12 Days, 11 Nights",
    price: 3299,
    originalPrice: 3799,
    discount: 13,
    rating: 4.8,
    maxPeople: 6,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
    category: "Cultural",
    season: "spring",
    inclusions: [
      "Round-trip flights",
      "4-star hotel accommodation",
      "Daily breakfast",
      "High-speed train tickets",
      "Guided city tours",
      "Museum entries",
    ],
    exclusions: ["Lunch and dinner", "Travel insurance", "Optional excursions", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Begin your European adventure in the City of Light",
        activities: ["Airport pickup", "Hotel check-in", "Seine River cruise", "Welcome dinner"],
      },
    ],
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "3",
    title: "Mountain Adventure Trek",
    description:
      "Challenge yourself with breathtaking mountain trails, stunning vistas, and an unforgettable camping experience under the stars.",
    location: "Swiss Alps, Switzerland",
    duration: "8 Days, 7 Nights",
    price: 1899,
    rating: 4.7,
    maxPeople: 8,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
    category: "Adventure",
    season: "summer",
    inclusions: [
      "Round-trip flights",
      "Mountain lodge accommodation",
      "All meals",
      "Professional guide",
      "Hiking equipment",
      "Cable car tickets",
    ],
    exclusions: ["Travel insurance", "Personal hiking gear", "Alcoholic beverages", "Souvenirs"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Preparation",
        description: "Arrive in Zurich and prepare for your mountain adventure",
        activities: ["Airport pickup", "Equipment check", "Briefing session", "Welcome dinner"],
      },
    ],
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "4",
    title: "Safari Wildlife Experience",
    description:
      "Witness the Big Five in their natural habitat and experience the raw beauty of African wilderness with expert guides.",
    location: "Serengeti, Tanzania",
    duration: "10 Days, 9 Nights",
    price: 4299,
    originalPrice: 4999,
    discount: 14,
    rating: 4.9,
    maxPeople: 6,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
    category: "Wildlife",
    season: "winter",
    inclusions: [
      "Round-trip flights",
      "Safari lodge accommodation",
      "All meals",
      "Game drives",
      "Professional safari guide",
      "Park entrance fees",
    ],
    exclusions: ["Travel insurance", "Alcoholic beverages", "Tips for guides", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Begin your safari adventure in Tanzania",
        activities: ["Airport pickup", "Safari briefing", "Equipment check", "Welcome dinner"],
      },
    ],
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "5",
    title: "Asian Culinary Discovery",
    description:
      "Embark on a gastronomic journey through Asia's most vibrant food scenes, from street food to Michelin-starred restaurants.",
    location: "Tokyo, Bangkok, Singapore",
    duration: "14 Days, 13 Nights",
    price: 3799,
    rating: 4.8,
    maxPeople: 8,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: false,
    category: "Culinary",
    season: "autumn",
    inclusions: [
      "Round-trip flights",
      "Boutique hotel accommodation",
      "Food tours",
      "Cooking classes",
      "Local transportation",
      "English-speaking guide",
    ],
    exclusions: ["Travel insurance", "Some meals", "Alcoholic beverages", "Personal shopping"],
    itinerary: [
      {
        day: 1,
        title: "Tokyo Arrival",
        description: "Start your culinary adventure in Japan's capital",
        activities: ["Airport pickup", "Hotel check-in", "Tsukiji fish market tour", "Sushi dinner"],
      },
    ],
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "6",
    title: "Northern Lights Expedition",
    description:
      "Chase the magical Aurora Borealis in the pristine wilderness of Iceland, complete with hot springs and glacier tours.",
    location: "Reykjavik, Iceland",
    duration: "6 Days, 5 Nights",
    price: 2199,
    originalPrice: 2599,
    discount: 15,
    rating: 4.6,
    maxPeople: 10,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
    category: "Nature",
    season: "winter",
    inclusions: [
      "Round-trip flights",
      "Hotel accommodation",
      "Northern lights tours",
      "Blue Lagoon entry",
      "Glacier tour",
      "Airport transfers",
    ],
    exclusions: ["Meals", "Travel insurance", "Winter clothing rental", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Reykjavik Arrival",
        description: "Arrive in Iceland's charming capital city",
        activities: ["Airport pickup", "City tour", "Northern lights briefing", "Traditional dinner"],
      },
    ],
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
]

// Local storage keys
const PACKAGES_KEY = "wanderlust_packages"
const BOOKINGS_KEY = "wanderlust_bookings"
const MESSAGES_KEY = "wanderlust_messages"

// Initialize data if not exists
export function initializeData() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(PACKAGES_KEY)) {
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(samplePackages))
  }
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]))
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify([]))
  }
}

// Package functions
export function getPackages(): TravelPackage[] {
  if (typeof window === "undefined") return samplePackages

  initializeData()
  const packages = localStorage.getItem(PACKAGES_KEY)
  return packages ? JSON.parse(packages) : samplePackages
}

export function getPackageById(id: string): TravelPackage | null {
  const packages = getPackages()
  return packages.find((pkg) => pkg.id === id) || null
}

export function addPackage(packageData: Omit<TravelPackage, "id" | "createdAt" | "updatedAt">): TravelPackage {
  const packages = getPackages()
  const newPackage: TravelPackage = {
    ...packageData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  packages.push(newPackage)
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages))
  return newPackage
}

export function updatePackage(id: string, updates: Partial<TravelPackage>): TravelPackage | null {
  const packages = getPackages()
  const index = packages.findIndex((pkg) => pkg.id === id)
  if (index === -1) return null

  packages[index] = {
    ...packages[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages))
  return packages[index]
}

export function deletePackage(id: string): boolean {
  const packages = getPackages()
  const filteredPackages = packages.filter((pkg) => pkg.id !== id)
  if (filteredPackages.length === packages.length) return false

  localStorage.setItem(PACKAGES_KEY, JSON.stringify(filteredPackages))
  return true
}

// Booking functions
export function getBookings(): Booking[] {
  if (typeof window === "undefined") return []

  initializeData()
  const bookings = localStorage.getItem(BOOKINGS_KEY)
  return bookings ? JSON.parse(bookings) : []
}

export function addBooking(bookingData: Omit<Booking, "id" | "createdAt">): Booking {
  const bookings = getBookings()
  const newBooking: Booking = {
    ...bookingData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  bookings.push(newBooking)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
  return newBooking
}

// Contact message functions
export function getContactMessages(): ContactMessage[] {
  if (typeof window === "undefined") return []

  initializeData()
  const messages = localStorage.getItem(MESSAGES_KEY)
  return messages ? JSON.parse(messages) : []
}

export function addContactMessage(messageData: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const messages = getContactMessages()
  const newMessage: ContactMessage = {
    ...messageData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  messages.push(newMessage)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  return newMessage
}
