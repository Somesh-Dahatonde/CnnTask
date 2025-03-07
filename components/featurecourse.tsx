"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const courses = [
  {
    title: "Cyber Security Associate",
    duration: "6 months",
    features: [
      "CCNA",
      "CEH",
      "Security Cisco ASA Firewall + VPN",
      "Checkpoint Firewall (CCSA)",
      "Palo Alto Firewall (PCNSA)",
      "Maximum 5 Interviews",
    ],
  },
  {
    title: "Cyber Security Professional",
    duration: "10 months",
    features: [
      "CCNA",
      "CEH",
      "CCNP Security",
      "Checkpoint Firewall (CCSA)",
      "Palo Alto Firewall (PCNSA)",
      "N no. of Interviews",
      "100% placement guaranteed on bond",
      "Lifetime Consultation Programme",
      "Soft Skill + Mock Interview Preparation",
    ],
  },
  {
    title: "Cyber Security Expert",
    duration: "12 months+",
    features: [
      "CCNA",
      "CEH",
      "CCNP Security",
      "Checkpoint Firewall (CCSA)",
      "Palo Alto Firewall (PCNSA)",
      "Forensic Investigation",
      "Bug Bounty",
      "N no. of Interviews",
      "100% placement guaranteed on bond",
      "Lifetime Consultation Programme",
      "Soft Skills + Mock Interviews training Included",
    ],
  },
];

export default function FeatureCourse() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Featured <span className="text-blue-600">Courses</span>
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground mt-2 md:text-xl">
          Explore our most popular courses
        </p>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 hover:border-blue-500 transition-colors"
            >
              <CardHeader className="bg-blue-500 text-white p-6">
                <CardTitle className="text-2xl font-bold">
                  {course.title}
                </CardTitle>
                <p className="text-blue-100 mt-2">
                  Duration:- {course.duration}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
