import Link from "next/link";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-blue pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white group">
              <img src="/logo/LogoSize.svg" alt="Logo" className="w-40" />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Crafting premium digital experiences for forward-thinking brands.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Work', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'UI/UX Design', 'Branding', 'Product Engineering'].map((item) => (
                <li key={item} className="text-gray-400">
                  {item}
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
