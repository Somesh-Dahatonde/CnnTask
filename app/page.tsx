import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/landing-hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { RegistrationModal } from "@/components/registration-modal";
import { GTMProvider } from "@/components/gtm-provider";

export default function LandingPage() {
  return (
    <GTMProvider gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""}>
      <main className="flex min-h-screen flex-col">
        <LandingHero />
        <Features />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Our Demo Batch Today
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience our world-class course with a special demo session.
                  Limited seats available!
                </p>
              </div>
              <RegistrationModal>
                <Button size="lg" className="rounded-full px-8">
                  Register for DEMO Batch
                </Button>
              </RegistrationModal>
            </div>
          </div>
        </section>
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </GTMProvider>
  );
}
