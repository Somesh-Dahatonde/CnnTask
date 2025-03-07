// // import { ShoppingCart } from "lucide-react";
// import Image from "next/image";
// // import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { RegistrationModal } from "@/components/registration-modal";
// import { Clock, Users } from "lucide-react";

// export function Features() {
//   const features = [
//     {
//       id: 1,
//       title: "Web Development Bootcamp",
//       description:
//         "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
//       duration: "12 weeks",
//       students: 1200,
//       price: 29999,
//       image: "/images/Mask group-1.png",
//     },
//     {
//       id: 2,
//       title: "Data Science Fundamentals",
//       description:
//         "Master Python, statistics, machine learning, and data visualization for a career in data science.",
//       duration: "16 weeks",
//       students: 850,
//       price: 34999,
//       image: "/images/Mask group-2.png",
//     },
//     {
//       id: 3,
//       title: "Mobile App Development",
//       description:
//         "Build iOS and Android apps using React Native and publish them to the app stores.",
//       duration: "10 weeks",
//       students: 750,
//       price: 27999,
//       image: "/images/Mask group-1.png",
//     },
//     {
//       id: 4,
//       title: "Expert Instructors",
//       description:
//         "Learn from industry professionals with years of practical experience.",
//       img: "/images/Mask group.png",
//       duration: "10 weeks",
//       students: 750,
//       price: 27999,
//     },
//   ];

//   return (
//     <section className=" py-12 md:py-24 lg:py-32 bg-background-feature z-10">
//       <div className="container px-4 md:px-6 ">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//               Featured <span className="text-highlight">Course</span>
//             </h2>
//             <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               What makes our course stand out from the rest
//             </p>
//           </div>
//         </div>
//         <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
//           {features.map((course, index) => (
//             // <div
//             //   key={index}
//             //   className="flex flex-col gap-2  border bg-card shadow-lg rounded-lg"
//             // >
//             //   <img
//             //     src={feature.img}
//             //     alt={feature.title}
//             //     className="w-full h-30 rounded-t-lg object-cover"
//             //   />

//             //   <div className="flex items-center flex-col gap-8 p-4">
//             //     <div className="flex justify-between text-xs flex-row w-full">
//             //       <p> 5,957 Students</p>
//             //       <p>01h 49m</p>
//             //     </div>
//             //     <h5 className="text-sm  font-semibold">
//             //       {feature.description}
//             //     </h5>
//             //     <div className="flex justify-between text-xs flex-row w-full">
//             //       <p>$ 55</p>
//             //       <p>
//             //         <ShoppingCart />
//             //       </p>
//             //     </div>
//             //   </div>
//             // </div>

//             <Card className="overflow-hidden" key={index}>
//               <div className="relative h-48">
//                 <Image
//                   src={course.image || "/placeholder.svg"}
//                   alt={course.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <CardHeader className="p-4">
//                 <div className="flex justify-between text-sm text-muted-foreground">
//                   <div className="flex items-center">
//                     <Clock className="mr-1 h-4 w-4" />
//                     {course.duration}
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="mr-1 h-4 w-4" />
//                     {course.students}+ students
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold">{course.title}</h3>
//               </CardHeader>
//               <CardContent className="p-4 pt-0 space-y-2">
//                 <p className="text-muted-foreground">{course.description}</p>

//                 <div className="pt-2">
//                   <p className="text-lg font-bold">₹{course.price}</p>
//                 </div>
//               </CardContent>
//               <CardFooter className="p-4 pt-0">
//                 <RegistrationModal>
//                   <Button className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 w-full">
//                     Register for DEMO Batch
//                   </Button>
//                 </RegistrationModal>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { X, Zap } from "lucide-react";
import { RegistrationModal } from "@/components/registration-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const courses = [
  {
    title: "Cyber Security Associate",
    duration: "6 months",
    features: [
      { name: "CCNA", included: true },
      { name: "CEH", included: true },
      { name: "Security Cisco ASA Firewall + VPN", included: true },
      { name: "Checkpoint Firewall (CCSA)", included: true },
      { name: "Palo Alto Firewall (PCNSA)", included: true },
      { name: "Maximum 5 Interviews", included: true },
      // { name: "N no. of Interviews", included: false },
      { name: "100% placement guaranteed on bond", included: false },
      { name: "Lifetime Consultation Programme", included: false },
      { name: "Soft Skill + Mock Interview Preparation", included: false },
      { name: "Forensic Investigation", included: false },
      { name: "Bug Bounty", included: false },
    ],
  },
  {
    title: "Cyber Security Professional",
    duration: "10 months",
    popular: true,
    features: [
      { name: "CCNA", included: true },
      { name: "CEH", included: true },
      { name: "CCNP Security", included: true },
      { name: "Checkpoint Firewall (CCSA)", included: true },
      { name: "Palo Alto Firewall (PCNSA)", included: true },
      // { name: "Maximum 5 Interviews", included: false },
      { name: "N no. of Interviews", included: true },
      { name: "100% placement guaranteed on bond", included: true },
      { name: "Lifetime Consultation Programme", included: true },
      { name: "Soft Skill + Mock Interview Preparation", included: true },
      { name: "Forensic Investigation", included: false },
      { name: "Bug Bounty", included: false },
    ],
  },
  {
    title: "Cyber Security Expert",
    duration: "12 months+",
    features: [
      { name: "CCNA", included: true },
      { name: "CEH", included: true },
      { name: "CCNP Security", included: true },
      { name: "Checkpoint Firewall (CCSA)", included: true },
      { name: "Palo Alto Firewall (PCNSA)", included: true },
      // { name: "Maximum 5 Interviews", included: false },
      { name: "N no. of Interviews", included: true },
      { name: "100% placement guaranteed on bond", included: true },
      { name: "Lifetime Consultation Programme", included: true },
      {
        name: "Soft Skills + Mock Interviews training Included",
        included: true,
      },
      { name: "Forensic Investigation", included: true },
      { name: "Bug Bounty", included: true },
    ],
  },
];

export function Features() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background-feature z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured <span className="text-highlight">Courses</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the right cyber security path for your career
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col h-full overflow-hidden border-2 transition-all duration-200 relative",
                course.popular
                  ? "border-blue-500 shadow-lg shadow-blue-100"
                  : "border-gray-200 hover:border-blue-300"
              )}
            >
              {/* {course.popular && (
                <div className="absolute top-7 -left-1  bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full -rotate-45 z-[9999] inline">
                  POPULAR
                </div>
              )} */}
              <CardHeader
                className={cn(
                  "py-6 px-6 text-center  text-white",
                  course.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-500"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                )}
              >
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
                <p className="text-blue-100 font-medium mt-1">
                  Duration: {course.duration}
                </p>
              </CardHeader>

              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {course.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2">
                      {feature.included ? (
                        <Zap className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-gray-800"
                            : "text-gray-400 line-through"
                        )}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 pt-0 mt-auto">
                {/* <Button
                  className={cn(
                    "w-full text-white font-bold py-2 rounded-lg transition-colors",
                    course.popular
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  )}
                  size="lg"
                >
                  Join Now
                </Button> */}
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
