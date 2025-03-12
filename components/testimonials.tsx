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
import { Stars } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "Vijay Gurram",
      role: "Software Developer",
      testimonial:
        "I want to express my utmost satisfaction with the courses offered at u'r institute. I recently completed the CCNA , CCNP & CCSA training ,and now I enrolled for CCIE , CEH training from CCN institute. From the moment I enrolled in the program, The training infrastructure at your institute was commendable and knowledgeable and I was impressed by the professionalism and expertise of the instructors. The curriculum was comprehensive and aligned perfectly with the exams. It covered all the essential topics, including network fundamentals, routing and switching, network security, and advanced troubleshooting techniques. The institute focus on practical implementation and hands-on lab exercises allowed me to apply theoretical knowledge in real-world scenarios. And also students can access the servers, students can experiment, test, and apply their knowledge in a controlled environment. I am especially thankful to the Main guy of Connecting Cyber network 𝐌𝐫. 𝐀𝐬𝐡𝐢𝐬𝐡 𝐒𝐢𝐫. He is very talented knowledgeable and Experienced in his field of Cyber security/Networking's & Security and also one more trainer 𝐌𝐫.𝐊𝐮𝐬𝐡𝐚𝐥 𝐬𝐢𝐫. Thank you Sir's for your unwavering commitment to education, your genuine care for your each students, and the lasting impact you have had on my life. The training infrastructure at your institute was commendable. The labs were well-equipped with the latest networking equipment, providing an authentic experience of working with Cisco Devices (Switches, Routers, Firewall ) Next generation firewall, Palo-Alto Devices, Checkpoint Devices. Additionally, the availability of virtual lab environments and simulation software allowed for flexible practice sessions, and ensuring that I gained practical skills even outside of the classroom. Moreover, I greatly appreciated the additional resources provided by the institute, such as study materials, recorded videos, and also provide exams papers for practice .These resources served as valuable supplements to the course materials. The support staff at your institute 𝐌𝐫𝐬. 𝐅𝐚𝐭𝐞𝐞𝐦𝐚 𝐌𝐚'𝐚𝐦 was always helpful and responsive to any queries. She demonstrated a genuine commitment to the success of each student. And having 𝐌𝐫. 𝐒𝐚𝐣𝐢𝐭 𝐬𝐢𝐫 who have excellent Communication skills talent. Thank you Sajit sir for your unwavering dedication to teaching communication skills. And also institute having a small lunch room (Cafeteria) it's offers a convenient dining experience. With its limited space, it provides a quick and accessible option for students and staff to grab a bite. Overall it's been a really great opportunity for me to learn something off my regular curriculum.",
      image: "https://picsum.photos/200",
      stars: 5,
    },
    {
      name: "mohit shah",
      role: "Data Analyst",
      testimonial:
        "The complete Cyber Security Expert course at CCN spans 15 months, and my experience with CCN has been excellent. I secured a job in the middle of my course with Digitaltrack in their security team (Blue Team). I am currently completing the remaining courses alongside my job. CCN ensures that job placements are based on the students' requirements, and it is not necessary to complete the entire 15-month course to secure a job. Students can secure a job even after completing Phase 1 or in the middle of the course. CCN provides full support for job placements, including second and third job opportunities, and they offer a 100% written and signed Job Placement Guarantee bond paper.",
      image: "https://picsum.photos/200",
      stars: 5,
    },
    {
      name: "Abhishek kudapkar",
      role: "UX Designer",
      testimonial:
        "I wanted to share my experience with CCN Institute. The education quality at CCN Institute is top-notch, and the staff is very supportive and knowledgeable. I recently completed my CCNA certification with them, and I'm thrilled to share that I've secured a placement at EbixCash. I'm grateful to be a student at CCN Institute and highly recommend it to anyone looking for quality education and excellent placement opportunities.",
      image: "https://picsum.photos/200",
      stars: 5,
    },
    {
      name: "Simranjit Singh Thind",
      role: "AI Engineer",
      testimonial:
        "Connecting Cyber Networks consistently exceeds my expectations. I'm thoroughly impressed with the top-notch training curriculum, faculty, professionalism, and the high-end data center. The inviting and comfortable ambiance makes it my preferred choice for Networking training. Special thanks to trainers like Ashish Sir, Kushal Sir, Sajit Sir, and Hari Sir, who have played a crucial role in guiding me to where I am today. Right now I'm in Movate Company all thanks to CCN 'Highly recommended.'",
      image: "https://picsum.photos/200",
      stars: 5,
    },
  ];

  return (
    <section
      className="w-full overflow-hidden py-12 md:py-24 lg:py-32"
      id="testimonials"
    >
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
                  className="h-full flex justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white p-4 cursor-pointer rounded-lg w-[80%]">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={70}
                        height={70}
                        className="rounded-full object-cover border-green-500 border-2"
                      />
                      <div className="flex justify-center mt-4 ">
                        {[...Array(testimonial.stars)].map((_, index) => (
                          <Stars
                            key={index}
                            size={16}
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm italic text-muted-foreground mt-4">
                        {testimonial.testimonial.length > 200
                          ? testimonial.testimonial.slice(0, 800) + "..."
                          : ""}
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
