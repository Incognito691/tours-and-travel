import { Shield, Award, Headphones, Globe } from "lucide-react"

const features = [
  {
    name: "Trusted & Secure",
    description: "Your bookings and personal information are protected with industry-leading security measures.",
    icon: Shield,
  },
  {
    name: "Award-Winning Service",
    description: "Recognized for excellence in travel services with numerous industry awards and certifications.",
    icon: Award,
  },
  {
    name: "24/7 Support",
    description: "Round-the-clock customer support to assist you before, during, and after your journey.",
    icon: Headphones,
  },
  {
    name: "Global Network",
    description: "Extensive network of partners worldwide ensuring seamless travel experiences everywhere.",
    icon: Globe,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose WanderLust?</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We're committed to making your travel dreams come true with exceptional service and unforgettable
            experiences.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <dt className="flex flex-col items-center gap-y-4 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
