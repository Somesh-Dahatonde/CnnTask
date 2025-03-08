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
    <section className="w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <motion.div
        className="container px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
          Student <span className="text-highlight">Testimonials</span>
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground mt-2 text-sm sm:text-lg md:text-xl">
          Hear what our students have to say about their experience
        </p>
      </motion.div>

      <div className="mt-10 max-w-5xl mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent className="flex flex-nowrap">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-2"
              >
                <motion.div
                  className="h-full flex"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white p-4 cursor-pointer border-none shadow-lg rounded-lg w-full">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={70}
                        height={70}
                        className="rounded-full object-cover border-green-500 border-2"
                      />
                      <p className="text-xs sm:text-sm italic text-muted-foreground mt-4">
                        "{testimonial.testimonial}"
                      </p>
                      <h3 className="font-semibold mt-3 text-sm sm:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}
                      </p>
                    </CardContent>
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
