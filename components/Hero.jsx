"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Spotlight } from "./ui/Spotlight";

// Dynamically import SplineScene with distinct loading state and no SSR
const SplineScene = dynamic(() => import("./ui/SplineScene").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent"></div>,
});

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const shapesRef = useRef([]);
  const [showSpline, setShowSpline] = useState(false);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="reveal-text opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Typing Animation
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // Search for all .reveal-text elements within the container
      // Stagger them to create a typing effect
      tl.to(".reveal-text", {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        delay: 0.2,
      })
        .fromTo(
          ".reveal-svg",
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.6,
            duration: 0.8,
            ease: "power3.out",
            transformOrigin: "left center",
          },
          "-=0.2"
        )
        .fromTo(
          subheadlineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5" // Start slightly before typing ends or adjust as needed
        )
        .fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power3.out" },
          "-=0.3"
        );

      // Floating Shapes Animation
      shapesRef.current.forEach((shape, i) => {
        gsap.to(shape, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-10, 10)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, containerRef);

    // Defer heavy WebGL execution (Spline) completely off the critical rendering path
    // giving time for the LCP and typing text to render at 60fps first.
    const splineTimer = setTimeout(() => {
      setShowSpline(true);
    }, 1200);

    return () => {
      ctx.revert();
      clearTimeout(splineTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black/[0.96] antialiased flex flex-col lg:block"
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Background Shapes */}
      <div
        ref={(el) => (shapesRef.current[0] = el)}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl filter -z-10 mix-blend-screen opacity-50"
      ></div>
      <div
        ref={(el) => (shapesRef.current[1] = el)}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl filter -z-10 mix-blend-screen opacity-50"
      ></div>
      <div
        ref={(el) => (shapesRef.current[2] = el)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-3xl filter -z-10 opacity-30"
      ></div>

      <div className="container relative z-10 mx-auto px-6 flex-1 lg:h-full flex flex-col justify-center lg:justify-start pt-20 lg:pt-0 pointer-events-none">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-20 mt-20 lg:mt-0 h-full pointer-events-auto">
          <div ref={headlineRef} className="mb-6">
            <h1
              className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-4"
              aria-label="Building Digital Experiences That Give You an Edge"
            >
              <span aria-hidden="true">
                {splitText("Building Digital ")}
                <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-blue to-secondary">
                  {splitText("Experiences")}
                </span>{" "}
                <br className="md:hidden" />
                {splitText("That ")}
                <br className="hidden md:inline" />
                {splitText("Give You an ")}
                <span className="text-white relative inline-block">
                  {splitText("Edge")}
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-primary reveal-svg opacity-0"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
            </h1>
          </div>

          <div
            ref={subheadlineRef}
            className="mb-8 text-gray-300 text-lg md:text-xl font-light tracking-wide lg:max-w-xl mx-auto lg:mx-0"
            role="region"
            aria-label="Our services: Web Development, Product Design, Digital Solutions, and more."
          >
            <TypeAnimation
              sequence={[
                "Web Development • Product Design • Digital Solutions",
                1000,
                "Shopify Apps • Mobile Applications • Artifical Intelligence",
                1000,
              ]}
              wrapper="p"
              speed={50}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </div>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-primary text-white rounded-full font-semibold overflow-hidden shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
              aria-label="Start a project with Agile Digital Edge"
            >
              <span className="relative z-10 flex items-center">
                Let&apos;s Start Project{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/work"
              className="group px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center"
              aria-label="View our work portfolio"
            >
              <PlayCircle className="mr-2 w-5 h-5 text-secondary" />
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Right Spline Scene - positioned absolutely on desktop, stacked on mobile */}
      <div className="w-full h-[45vh] lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full z-10 flex items-center justify-center pointer-events-auto order-last lg:order-none">
        <div className="w-full h-full relative">
          {showSpline ? (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-primary border-solid rounded-full animate-spin opacity-50"></div>
            </div>
          )}
          {/* subtle glow behind spline */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] -z-10 rounded-full opacity-40"></div>
        </div>
      </div>
    </section>
  );
}
