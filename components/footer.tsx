import {
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "About Us",
    links: [
      { name: "Our Story", href: "#" },
      { name: "Team", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Courses",
    links: [
      { name: "Web Development", href: "#" },
      { name: "Data Science", href: "#" },
      { name: "Mobile App Development", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background-gradient">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20 text-white">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Dynamically Generating Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-green-500 flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">
                Stay updated with our latest courses and offers
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="max-w-[220px] text-white bg-transparent border-2 border-[#4BE5CA] rounded-lg p-4 placeholder:text-white"
                  type="email"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-lg p-4 bg-transparent border-2 border-[#4BE5CA] text-[#4BE5CA] hover:bg-[#4BE5CA] hover:text-white"
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link href="#" className="hover:text-orange-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-orange-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-orange-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-orange-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Copyright Section */}
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Course Demo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
