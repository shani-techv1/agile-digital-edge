"use client";
import React, { useEffect, useState } from "react";
import { servicesData } from "@/data/services";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Zap, Rocket, Shield } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function ServiceDetail() {
    const params = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        if (params?.slug) {
            setService(servicesData[params.slug]);
        }
    }, [params]);

    if (!service && !params?.slug) {
        return <div className="min-h-screen bg-black" />; // Loading state
    }

    if (!service && params?.slug) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <p className="text-neutral-400 mb-8">The service "{params.slug}" could not be found.</p>
                    <Link href="/services" className="text-primary hover:underline">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    // Fallback if still loading or initial render
    if (!service) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-40 pb-20">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="container mx-auto px-6 relative z-10">
                <Breadcrumbs
                    items={[
                        { name: "Home", path: "/" },
                        { name: "Services", path: "/services" },
                        { name: service.title, path: `/services/${params.slug}` },
                    ]}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mb-20"
                >
                    <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                        Our Expertise
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
                        {service.title}
                        <span className="block text-2xl md:text-4xl text-neutral-400 mt-2 font-light">
                            {service.subtitle}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">
                        {service.description}
                    </p>
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-8">What this includes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {service.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits & Tech Stack Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Shield className="text-secondary" /> Key Benefits
                        </h2>
                        <ul className="space-y-4">
                            {service.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center p-4 rounded-xl bg-neutral-900 border border-white/5">
                                    <CheckCircle2 className="w-6 h-6 text-secondary mr-4 flex-shrink-0" />
                                    <span className="text-lg text-white">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Code2 className="text-accent-blue" /> Tech Stack
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {service.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-primary/40 transition-all cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10">
                            <h4 className="text-xl font-bold text-white mb-4">Why choose us for {service.title}?</h4>
                            <p className="text-neutral-300 mb-6">
                                We combine technical expertise with business acumen to deliver solutions that not only work but also drive growth.
                            </p>
                            <Link href="/contact" className="text-primary font-bold hover:text-white transition-colors inline-flex items-center">
                                Schedule a consultation <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-gradient-to-r from-neutral-900 to-black border border-white/10 p-12 md:p-20 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                        Ready to elevate your {service.title}?
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                        Let's discuss how we can help you achieve your goals with our expert services.
                    </p>
                    <Link
                        href="/contact"
                        className="relative z-10 inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/10"
                    >
                        Start Project <Rocket className="ml-2 w-5 h-5" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
