import { CheckCircle } from "lucide-react"

export function Features() {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of practical experience.",
    },
    {
      title: "Hands-on Projects",
      description: "Apply your knowledge through real-world projects and case studies.",
    },
    {
      title: "Flexible Schedule",
      description: "Choose from various time slots that fit your busy schedule.",
    },
    {
      title: "Certification",
      description: "Earn a recognized certificate upon successful completion.",
    },
    {
      title: "Career Support",
      description: "Get guidance on job placement and career advancement.",
    },
    {
      title: "Community Access",
      description: "Join our community of learners and expand your network.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Course Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              What makes our course stand out from the rest
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-lg border bg-card p-6 shadow">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

