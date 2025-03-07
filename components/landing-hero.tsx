import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/registration-modal";
import FeatureCourse from "./featurecourse";
import { Toast } from "./ui/toast";
// import Group from "../app/images/Group.png";

export function LandingHero() {
  // bg-gradient-to-b from-primary/5 to-background
  return (
    <>
      <section className=" w-full pt-8 mt-16 bg-[url(/images/background.png)] relative h-[98vh] bg-center bg-no-repeat ">
        <div className="container px-4 md:px-6 h-full mx-auto max-sm:flex flex-col justify-center items-center">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 align-middle">
            <div className="flex flex-col justify-center space-y-4 ">
              <div className="space-y-2">
                <h1 className=" font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white text-6xl">
                  Master New <span className="text-[#2AAA94]">Skills</span> with
                  Our Expert-Led Course
                </h1>
                <p className="text-muted-foreground md:text-xl text-white">
                  Join our exclusive demo batch and experience our world-class
                  training. Limited seats available!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <RegistrationModal>
                  <Button
                    size="lg"
                    className="rounded-lg p-6 bg-transparent border-2 border-[#4BE5CA] text-[#4BE5CA] hover:bg-[#4BE5CA] hover:text-white"
                    // variant="outline"
                  >
                    Register for DEMO Batch
                  </Button>
                </RegistrationModal>
              </div>
            </div>
            <div className="relative h-[90vh] w-full max-sm:hidden">
              <Image
                className="object-cover rounded-full"
                src={"/images/Group.png"}
                alt="Course Preview"
                priority
                fill
              />
            </div>

            <Image
              src={"/images/Dline.png"}
              alt="Dline"
              width={280} // Adjust width
              height={100}
              className="absolute left-1/2 transform -translate-x-1/2 bottom-[-120px] hidden sm:block"
            />
          </div>
        </div>
      </section>
    </>
  );
}
