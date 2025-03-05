// import { ShoppingCart } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RegistrationModal } from "@/components/registration-modal";
import { Clock, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
      duration: "12 weeks",
      students: 1200,
      price: 29999,
      image: "/images/Mask group-1.png",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description:
        "Master Python, statistics, machine learning, and data visualization for a career in data science.",
      duration: "16 weeks",
      students: 850,
      price: 34999,
      image: "/images/Mask group-2.png",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description:
        "Build iOS and Android apps using React Native and publish them to the app stores.",
      duration: "10 weeks",
      students: 750,
      price: 27999,
      image: "/images/Mask group-1.png",
    },
    {
      id: 4,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of practical experience.",
      img: "/images/Mask group.png",
      duration: "10 weeks",
      students: 750,
      price: 27999,
    },
  ];

  return (
    <section className=" py-12 md:py-24 lg:py-32 bg-background-feature z-10">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured <span className="text-highlight">Course</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              What makes our course stand out from the rest
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {features.map((course, index) => (
            // <div
            //   key={index}
            //   className="flex flex-col gap-2  border bg-card shadow-lg rounded-lg"
            // >
            //   <img
            //     src={feature.img}
            //     alt={feature.title}
            //     className="w-full h-30 rounded-t-lg object-cover"
            //   />

            //   <div className="flex items-center flex-col gap-8 p-4">
            //     <div className="flex justify-between text-xs flex-row w-full">
            //       <p> 5,957 Students</p>
            //       <p>01h 49m</p>
            //     </div>
            //     <h5 className="text-sm  font-semibold">
            //       {feature.description}
            //     </h5>
            //     <div className="flex justify-between text-xs flex-row w-full">
            //       <p>$ 55</p>
            //       <p>
            //         <ShoppingCart />
            //       </p>
            //     </div>
            //   </div>
            // </div>

            <Card className="overflow-hidden" key={index}>
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="p-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.students}+ students
                  </div>
                </div>
                <h3 className="text-xl font-bold">{course.title}</h3>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <p className="text-muted-foreground">{course.description}</p>

                <div className="pt-2">
                  <p className="text-lg font-bold">₹{course.price}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <RegistrationModal>
                  <Button className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 w-full">
                    Register for DEMO Batch
                  </Button>
                </RegistrationModal>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
