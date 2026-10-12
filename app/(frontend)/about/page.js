"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Target, Zap, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".about-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Text Reveal
      gsap.from(".about-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.2
      });

      // Counters Animation
      gsap.from(".counter-num", {
        scrollTrigger: {
          trigger: ".counters-section",
          start: "top 90%",
        },
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        stagger: 0.2,
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-50 overflow-hidden">
      {/* About Header */}
      <div className="container mx-auto px-6 mb-20 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 about-header">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We Are <span className="text-gradient">Agile Digital Edge</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A collective of dreamers, thinkers, and doers. We don&apos;t just follow trends; we set them.
              Our mission is to empower businesses with digital tools that feel like magic.
            </p>
            <div className="p-6 bg-white/5 border-l-4 border-primary rounded-r-xl">
              <p className="text-lg text-white font-medium italic">
                &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 about-text relative">
            <div className="w-full h-80 bg-gradient-to-tr from-primary to-secondary rounded-2xl opacity-20 blur-2xl absolute inset-0 transform rotate-3"></div>
            <div className="w-full h-80 bg-dark-blue border border-white/10 rounded-2xl relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 hover:scale-110 transition-transform duration-700"></div>
              <h3 className="relative z-10 text-3xl font-bold text-white">Our Vision</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Counters Section */}
      <section className="counters-section py-20 bg-white/5 backdrop-blur-sm border-y border-white/5 mb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", val: 5, suffix: "+" },
              { label: "Projects Completed", val: 150, suffix: "+" },
              { label: "Happy Clients", val: 100, suffix: "+" },
              { label: "Awards Won", val: 15, suffix: "+" },
            ].map((stat, i) => (
              <div key={i}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="counter-num">{stat.val}</span>{stat.suffix}
                </h2>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values / Mindset */}
      <div className="container mx-auto px-6 pb-25 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 about-text">Our Mindset</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Innovate Daily", desc: "We challenge the status quo every single day to find better solutions." },
            { title: "User First", desc: "Every pixel, every line of code is crafted with the user in mind." },
            { title: "Transparency", desc: "Honest communication and clear processes are the foundation of our trust." }
          ].map((item, i) => (
            <div key={i} className="about-text p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach Section */}
      <section className="py-20 relative bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Approach</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We combine data-driven insights with creative brilliance to deliver results that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {[
              {
                icon: <Brain size={32} />,
                title: "Strategic Vision",
                desc: "We don't just build; we strategize. Every project starts with a deep dive into your business goals and market positioning.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
                border: "border-purple-400/20"
              },
              {
                icon: <Target size={32} />,
                title: "Creative Excellence",
                desc: "Design that captivates. We craft intuitive, stunning interfaces that tell your brand story and convert visitors.",
                color: "text-pink-400",
                bg: "bg-pink-400/10",
                border: "border-pink-400/20"
              },
              {
                icon: <Zap size={32} />,
                title: "Technical Precision",
                desc: "Code that performs. We build with the latest tech stacks to ensure speed, security, and scalability.",
                color: "text-cyan-400",
                bg: "bg-cyan-400/10",
                border: "border-cyan-400/20"
              },
              {
                icon: <Rocket size={32} />,
                title: "Continuous Evolution",
                desc: "Launch is just the beginning. We help you iterate, optimize, and scale your digital presence over time.",
                color: "text-orange-400",
                bg: "bg-orange-400/10",
                border: "border-orange-400/20"
              }
            ].map((item, index) => (
              <div key={index} className={`p-8 rounded-3xl border ${item.border} ${item.bg} hover:bg-opacity-20 transition-all duration-300 group`}>
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
