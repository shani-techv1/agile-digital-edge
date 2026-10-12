"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Code, Palette, Zap, Smartphone, Globe, PenTool, Database, ShoppingCart, Search, Share2 } from "lucide-react";

const servicesList = [
  {
    icon: <Globe size={40} />,
    title: "Web Development",
    slug: "web-development",
    desc: "Custom web applications built with Next.js, React, and Node.js. Fast, secure, and scalable.",
    tags: ["Next.js", "React", "Node.js", "Tailwind", "Wordpress"]
  },
  {
    icon: <ShoppingCart size={40} />,
    title: "Ecommerce Development",
    slug: "ecommerce-development",
    desc: "Custom Ecommerce applications built with Shopify, React, and Node.js. Fast, secure, and scalable.",
    tags: ["Shopify", "React", "Node.js", "Tailwind", "Wordpress"]
  },
  {
    icon: <Code size={40} />,
    title: "Shopify App",
    slug: "shopify-app",
    desc: "Custom Shopify apps built with Shopify, React, and Node.js. Fast, secure, and scalable.",
    tags: ["Shopify", "Apps", "User Research", "Wireframing"]
  },
  {
    icon: <Palette size={40} />,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    desc: "User-centric designs that look stunning and function seamlessly across all devices.",
    tags: ["Figma", "Prototyping", "User Research", "Wireframing"]
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    desc: "Native and cross-platform mobile apps that provide a smooth user experience.",
    tags: ["React Native", "iOS", "Android", "Flutter"]
  },
  {
    icon: <Search size={40} />,
    title: "Search Engine Optimization",
    slug: "seo",
    desc: "Improve your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    tags: ["Business Listing", "On-page Optimization", "Off-page Optimization"]
  },
  {
    icon: <Share2 size={40} />,
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    desc: "Boost your brand presence and engage with your audience across all major social platforms.",
    tags: ["Instagram", "Facebook", "LinkedIn", "Twitter", "Strategy"]
  },
  {
    icon: <Zap size={40} />,
    title: "Brand Strategy",
    slug: "brand-strategy",
    desc: "Building strong brand identities that communicate your values and vision effectively.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"]
  },
  {
    icon: <PenTool size={40} />,
    title: "Content Creation",
    slug: "content-creation",
    desc: "Engaging content that drives traffic and converts visitors into loyal customers.",
    tags: ["Copywriting", "SEO", "Video Production"]
  },
  {
    icon: <Database size={40} />,
    title: "Cloud Solutions",
    slug: "cloud-solutions",
    desc: "Scalable cloud infrastructure setup and management for your growing business.",
    tags: ["AWS", "Azure", "Google Cloud", "DevOps"]
  },
];

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
      gsap.fromTo(".services-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animate Cards
      gsap.fromTo(".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 services-header opacity-0">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We provide end-to-end digital solutions to help you achieve your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              key={index}
              className="service-card opacity-0 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 group block"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed bg-transparent">{service.desc}</p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
