"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      testimonial:
        "This course transformed my career. The instructors were knowledgeable and supportive throughout the journey.",
      image: "https://picsum.photos/200",
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      testimonial:
        "I was skeptical at first, but after attending the demo session, I was convinced. Best investment I've made in my education.",
      image: "https://picsum.photos/200",
    },
    {
      name: "Priya Sharma",
      role: "UX Designer",
      testimonial:
        "The hands-on approach and real-world projects helped me build a strong portfolio. Highly recommended!",
      image: "https://picsum.photos/200",
    },
    {
      name: "David Brown",
      role: "AI Engineer",
      testimonial:
        "The structured learning path and mentorship helped me land my dream job in AI. Can't recommend this enough!",
      image: "https://picsum.photos/200",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <motion.div
        className="container px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Student <span className="text-highlight">Testimonials</span>
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground mt-2 md:text-xl">
          Hear what our students have to say about their experience
        </p>
      </motion.div>

      <div className="mt-10 max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 p-3"
              >
                <motion.div
                  className="h-full flex"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className=" bg-white fp-4 cursor-pointer p-4 border-none">
                    <CardContent className="pt-6 lex flex-col items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                      <p className="text-sm italic text-muted-foreground mt-4">
                        "{testimonial.testimonial}"
                      </p>
                      <h3 className="font-semibold mt-3">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}
                      </p>
                    </CardContent>{" "}
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
