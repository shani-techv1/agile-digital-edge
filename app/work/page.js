"use client";
import { useRef } from "react";
import { ArrowRight, Stethoscope, Landmark, ShoppingBag, Building2, Activity, Rocket, GraduationCap, Plane, Truck, Car, Film, Leaf } from "lucide-react";
import Link from "next/link";

const industries = [
  {
    title: "Healthcare & Pharma",
    desc: "Empowering medical providers with secure, patient-centric digital platforms.",
    icon: <Stethoscope size={48} strokeWidth={1.5} />,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Fintech & Banking",
    desc: "Secure, high-performance solutions for the future of finance and payments.",
    icon: <Landmark size={48} strokeWidth={1.5} />,
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    title: "E-Commerce & Retail",
    desc: "Driving sales with high-converting, seamless online shopping experiences.",
    icon: <ShoppingBag size={48} strokeWidth={1.5} />,
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Real Estate & Architecture",
    desc: "Showcasing properties and designs with immersive visual experiences.",
    icon: <Building2 size={48} strokeWidth={1.5} />,
    gradient: "from-orange-400 to-red-600",
  },
  {
    title: "Sports & Fitness",
    desc: "Engaging apps and platforms that inspire movement and track performance.",
    icon: <Activity size={48} strokeWidth={1.5} />,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "SaaS & Startups",
    desc: "Scalable MVPs and full-stack products designed for rapid growth.",
    icon: <Rocket size={48} strokeWidth={1.5} />,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Education & EdTech",
    desc: "Transforming learning with interactive LMS and educational platforms.",
    icon: <GraduationCap size={48} strokeWidth={1.5} />,
    gradient: "from-rose-400 to-pink-600",
  },
  {
    title: "Travel & Hospitality",
    desc: "Seamless booking engines and immersive experiences for the modern traveler.",
    icon: <Plane size={48} strokeWidth={1.5} />,
    gradient: "from-sky-400 to-cyan-500",
  },
  {
    title: "Logistics & Supply Chain",
    desc: "Optimizing operations with smart tracking, fleet management, and analytics.",
    icon: <Truck size={48} strokeWidth={1.5} />,
    gradient: "from-violet-400 to-purple-600",
  },
  {
    title: "Automotive & Mobility",
    desc: "Connected vehicle solutions and smart mobility platforms.",
    icon: <Car size={48} strokeWidth={1.5} />,
    gradient: "from-red-500 to-orange-600",
  },
  {
    title: "Media & Entertainment",
    desc: "Streaming platforms and interactive content delivery systems.",
    icon: <Film size={48} strokeWidth={1.5} />,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Green Energy & Utilities",
    desc: "Sustainable tech solutions for renewable energy and smart grids.",
    icon: <Leaf size={48} strokeWidth={1.5} />,
    gradient: "from-green-400 to-emerald-600",
  },
];

export default function Work() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="pt-40 pb-20 min-h-screen bg-dark-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Industries We Serve</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Targeting Your Niche</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We build specialized digital solutions tailored to the unique challenges and opportunities of your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, index) => (
            <div
              key={index}
              className="industry-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br ${item.gradient} shadow-lg shadow-black/20`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>

                <a
                  href="https://portfolio.agiledigitaledge.dev/case-studies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary font-medium opacity-100 transform translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">Don&apos;t see your industry?</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25">
            Let&apos;s Discuss Your Needs
          </Link>
        </div>
      </div>
    </div>
  );
}
