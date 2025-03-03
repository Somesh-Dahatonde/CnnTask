"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "What is included in the demo batch?",
      answer:
        "The demo batch includes a condensed version of our full course, covering key concepts and providing hands-on experience with our teaching methodology.",
    },
    {
      question: "How long is the demo session?",
      answer:
        "Our demo sessions typically run for 2-3 hours, providing enough time to get a comprehensive understanding of the course content and teaching style.",
    },
    {
      question: "Is the registration fee refundable?",
      answer:
        "Yes, the registration fee is fully refundable if you decide to enroll in the full course. It will be adjusted against your course fee.",
    },
    {
      question: "How many students will be in the demo batch?",
      answer: "We limit our demo batches to 15-20 students to ensure personalized attention and interaction.",
    },
    {
      question: "Do I need any prior knowledge to join the demo?",
      answer:
        "No prior knowledge is required. Our demo is designed to be accessible to beginners while also providing value to those with some background in the subject.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to know about our demo batch
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

