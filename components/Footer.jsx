import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-blue pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white group">
              <Image src="/logo/LogoSize.svg" alt="Agile Digital Edge" width={160} height={40} className="h-auto w-40" />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Crafting premium digital experiences for forward-thinking brands.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Solutions", href: "/solutions" },
                { name: "Industries", href: "/industries" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Free Ecommerce Audit", href: "/free-ecommerce-audit" },
                { name: "Work", href: "/work" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Web Development", href: "/services/web-development" },
                { name: "UI/UX Design", href: "/services/ui-ux-design" },
                { name: "Brand Strategy", href: "/services/brand-strategy" },
                { name: "Product Engineering", href: "/services/product-engineering" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Packages</h4>
            <ul className="space-y-4">
              {[
                { name: "Web Design Packages", href: "/web-packages" },
                { name: "SEO Packages", href: "/seo-packages" },
                { name: "PPC Packages", href: "/ppc-packages" },
                { name: "SMO Packages", href: "/smo-packages" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/agile-digital-edge/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/agile-digital-edge/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://www.linkedin.com/company/agile-digital-edge/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AgileDigitalEdge. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
