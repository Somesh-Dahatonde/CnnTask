import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      testimonial:
        "This course transformed my career. The instructors were knowledgeable and supportive throughout the journey.",
      image: "https://g-mxtlc2zquep.vusercontent.net/placeholder.svg",
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      testimonial:
        "I was skeptical at first, but after attending the demo session, I was convinced. Best investment I've made in my education.",
      image: "https://g-mxtlc2zquep.vusercontent.net/placeholder.svg",
    },
    {
      name: "Priya Sharma",
      role: "UX Designer",
      testimonial:
        "The hands-on approach and real-world projects helped me build a strong portfolio. Highly recommended!",
      image: "https://g-mxtlc2zquep.vusercontent.net/placeholder.svg",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Student Testimonials
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear what our students have to say about their experience
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      "{testimonial.testimonial}"
                    </p>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
