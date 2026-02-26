"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";

const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const ctx = gsap.context(() => {
                        gsap.to(
                            { value: 0 },
                            {
                                value: end,
                                duration: duration,
                                ease: "power2.out",
                                onUpdate: function () {
                                    setCount(Math.ceil(this.targets()[0].value));
                                },
                            }
                        );
                    }, countRef);
                    return () => ctx.revert();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <span ref={countRef}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
};

const WhyChooseUs = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Why Industry Leaders Choose{" "}
                            <span className="text-gradient">Agile Digital Edge</span>
                        </h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            We don&apos;t just build websites; we craft digital ecosystems that
                            drive growth, engagement, and brand loyalty.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Award-winning design aesthetics",
                                "Performance-obsessed engineering",
                                "Data-driven user experience strategies",
                                "Agile development for rapid delivery",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="text-secondary w-6 h-6 flex-shrink-0" />
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative glass p-8 rounded-2xl border border-white/10">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-dark-blue/50 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-primary mb-1">
                                        <AnimatedCounter end={98} suffix="%" />
                                    </h3>
                                    <p className="text-sm text-gray-400">Client Retention</p>
                                </div>
                                <div className="p-4 bg-dark-blue/50 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-secondary mb-1">
                                        <AnimatedCounter end={500} suffix="+" />
                                    </h3>
                                    <p className="text-sm text-gray-400">Projects Launched</p>
                                </div>
                                <div className="p-4 bg-dark-blue/50 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-secondary mb-1">
                                        <AnimatedCounter end={10} suffix="x" />
                                    </h3>
                                    <p className="text-sm text-gray-400">ROI Average</p>
                                </div>
                                <div className="p-4 bg-dark-blue/50 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-secondary mb-1">
                                        <AnimatedCounter end={24} suffix="/7" />
                                    </h3>
                                    <p className="text-sm text-gray-400">Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;