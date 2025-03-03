"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/registration-modal";
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const navContaint = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Features",
      route: "#features",
    },
    {
      name: "Testimonials",
      route: "#testimonials",
    },
    {
      name: " FAQ",
      route: "#fAQ",
    },
    {
      name: "Contact",
      route: "#Contact",
    },
  ];

  return (
    <header className="w-full py-4 bg-background/80 backdrop-blur-md fixed top-0 z-10">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">CourseDemo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto flex gap-4 sm:gap-6 max-sm:hidden">
          {navContaint.map((nav, index) => (
            <Link
              key={index}
              href={nav.route}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {nav.name}
            </Link>
          ))}
        </nav>

        <div className="ml-4 max-sm:hidden">
          <RegistrationModal>
            <Button size="sm" className="rounded-full">
              Register Now
            </Button>
          </RegistrationModal>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showNavigation && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 left-0 w-[70vw] h-[100vh] bg-white  flex flex-col justify-center items-center z-50 shadow-lg"
            >
              <button
                className="absolute top-5 right-5 text-black"
                onClick={() => setShowNavigation(false)}
              >
                <X size={28} />
              </button>

              {navContaint.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.route}
                  className="text-black text-2xl mb-4 hover:scale-110 "
                  onClick={() => setShowNavigation(false)}
                >
                  {nav.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Mobile Menu Icon */}
        <div className="flex justify-end w-full sm:hidden z-[100]">
          {!showNavigation ? (
            <AlignJustify
              size={28}
              onClick={() => setShowNavigation(true)}
              className="cursor-pointer"
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
