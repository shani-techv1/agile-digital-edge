"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons Map
const TechIcons = {
  NextJS: (props) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white" />
      </mask>
      <g mask="url(#mask0_408_134)">
        <circle cx="90" cy="90" r="90" fill="white" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.6V72.698L136.008 163.322C140.724 161.648 145.242 159.71 149.508 157.52ZM115.65 54H128.25V125.97H115.65V54Z" fill="black" />
      </g>
    </svg>
  ),
  React: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  NodeJS: (props) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 2L3 9.4V22.6L16 30L29 22.6V9.4L16 2Z" fill="#339933" />
      <path d="M16 2.5L28.5 9.7V22.3L16 29.5L3.5 22.3V9.7L16 2.5Z" stroke="#339933" />
      <path d="M22 17.5C21.4 18.5 20.3 19 19.3 19H12.7C11.7 19 10.6 18.5 10 17.5L8 14H12V16H20V14H24L22 17.5Z" fill="white" />
    </svg>
  ),
  Shopify: (props) => (
    <Image src={"/shopify.webp"} alt="shopify" width={300} height={343.2} {...props}></Image>
  ),
  WordPress: (props) => (
    <Image src={"/wordpress.png"} alt="wordpress" width={300} height={343.2} {...props}></Image>
  ),
  HTML: (props) => (
    <Image src={"/html-5.png"} alt="html" width={300} height={343.2} {...props}></Image>
  ),
  CSS: (props) => (
    <Image src={"/css-3.png"} alt="css" width={300} height={343.2} {...props}></Image>
  ),
  JS: (props) => (
    <Image src={"/js.png"} alt="js" width={300} height={343.2} {...props}></Image>
  ),
};

const selectedWorks = [
  {
    title: "Pharmmaex",
    category: "Pharmaceuticals",
    image: "/pharmmaex.jpeg",
    tech: ["NextJS", "React", "NodeJS"],
    url: "https://portfolio.agiledigitaledge.dev/case-studies/13"
  },
  {
    title: "Compression",
    category: "Sport Branding",
    image: "/compression.jpeg",
    tech: ["Shopify"],
    url: "https://portfolio.agiledigitaledge.dev/case-studies/1"
  },
  // {
  //   title: "SundanceYoga",
  //   category: "Yoga And Healing",
  //   image: "/sundanceyoga.jpeg",
  //   tech: ["WordPress", "HTML", "CSS", "JS"],
  // },
];

export default function SelectedWork() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card Entry Animation
      gsap.from(".work-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Image Auto Scroll Animation
      gsap.utils.toArray(".project-image").forEach((img) => {
        gsap.to(img, {
          objectPosition: "0% 100%",
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 2,
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play pause resume pause",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
            <p className="text-gray-400">Highlights from our recent partnerships.</p>
          </div>
          <Link href="/work" className="hidden md:flex items-center text-primary font-medium hover:text-white transition-colors">
            View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="space-y-12 md:space-y-20">
          {selectedWorks.map((work, index) => (
            <div
              key={index}
              className={`work-card flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
            >
              {/* Media Container */}
              <div className="w-full md:w-3/5 aspect-video md:aspect-[16/10] lg:h-[500px] rounded-2xl overflow-hidden relative shadow-2xl overflow-hidden group">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="project-image object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 pointer-events-none"></div>
              </div>

              {/* Content */}
              <div className="w-full md:w-2/5">
                <span className="text-primary text-sm font-bold tracking-wider uppercase mb-2 block">{work.category}</span>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {work.tech && work.tech.map((techName) => {
                      const Icon = TechIcons[techName];
                      return Icon ? (
                        <div key={techName} className="p-1.5 bg-white rounded-full hover:bg-white/20 transition-colors" title={techName}>
                          <Icon className="w-5 h-5" />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  A premium digital experience designed to solve complex user problems while engaging customers with immersive visuals and intuitive navigation.
                </p>
                <Link href={work.url} className="inline-flex items-center text-white border-b border-primary pb-1 group-hover:text-primary transition-colors">
                  View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-12 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center text-primary font-medium hover:text-white transition-colors">
            View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
