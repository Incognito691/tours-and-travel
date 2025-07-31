import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Globe, Heart } from "lucide-react"

const stats = [
  { name: "Happy Travelers", value: "50,000+", icon: Users },
  { name: "Destinations", value: "200+", icon: Globe },
  { name: "Years Experience", value: "15+", icon: Award },
  { name: "Customer Satisfaction", value: "98%", icon: Heart },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With over 20 years in the travel industry, Sarah founded WanderLust to make extraordinary travel accessible to everyone.",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Michael ensures every trip runs smoothly, bringing his expertise in logistics and customer service to every journey.",
  },
  {
    name: "Emily Rodriguez",
    role: "Travel Experience Designer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Emily crafts unique itineraries that create unforgettable memories, combining local insights with traveler preferences.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">About WanderLust</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Passionate about creating extraordinary travel experiences that inspire, connect, and transform lives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At WanderLust, we believe that travel has the power to transform lives, broaden perspectives, and create
              lasting memories. Our mission is to make extraordinary travel experiences accessible to everyone, while
              promoting sustainable and responsible tourism that benefits local communities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <Card key={stat.name} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.name}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009 by a group of passionate travelers, WanderLust began as a small travel agency with a
                  big dream: to help people discover the world's most incredible destinations while creating meaningful
                  connections with local cultures.
                </p>
                <p>
                  What started as a handful of carefully curated trips has grown into a comprehensive travel platform
                  serving thousands of adventurers worldwide. We've maintained our commitment to personalized service,
                  authentic experiences, and sustainable travel practices.
                </p>
                <p>
                  Today, we're proud to be a trusted partner for travelers seeking everything from relaxing beach
                  getaways to challenging mountain expeditions, cultural immersions to wildlife safaris.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Our team at work"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">The passionate people behind your unforgettable journeys</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Experiences</h3>
                <p className="text-gray-600">
                  We believe in creating genuine connections with local cultures and communities, offering experiences
                  that go beyond typical tourist attractions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Tourism</h3>
                <p className="text-gray-600">
                  We're committed to responsible travel practices that protect the environment and support local
                  economies for future generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence in Service</h3>
                <p className="text-gray-600">
                  From planning to return, we provide exceptional service and support to ensure every aspect of your
                  journey exceeds expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
