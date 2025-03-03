import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/registration-modal";

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master New Skills with Our Expert-Led Course
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our exclusive demo batch and experience our world-class
                training. Limited seats available!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <RegistrationModal>
                <Button size="lg" className="rounded-full px-8">
                  Register for DEMO Batch
                </Button>
              </RegistrationModal>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://g-mxtlc2zquep.vusercontent.net/placeholder.svg"
              alt="Course Preview"
              width={550}
              height={550}
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
