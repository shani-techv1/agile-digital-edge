"use client";
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const successStories = [
    {
        id: 1,
        client: " Luxe Apparel",
        title: "Automating Inventory for Scale",
        description: "Built a custom Shopify app that synchronized inventory across 5 warehouses in real-time, eliminating overselling and reducing manual work by 20 hours/week.",
        stats: [
            { label: "Hours Saved/Week", value: "20+" },
            { label: "Sync Speed", value: "< 2s" },
        ],
        tags: ["Shopify App", "Automation", "Node.js"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: 2,
        client: "TechStream",
        title: "Legacy to Next.js Migration",
        description: "Migrated a heavy legacy PHP application to a modern Next.js architecture, resulting in a 3x faster load time and significantly improved SEO rankings.",
        stats: [
            { label: "Performance", value: "3x Faster" },
            { label: "Traffic Increase", value: "+150%" },
        ],
        tags: ["Next.js", "Migration", "SEO"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        client: "Glow Beauty",
        title: "E-commerce Redesign & CRO",
        description: "Complete UI/UX overhaul focusing on mobile-first design. Simplifed the checkout process which led to a massive jump in conversion rates.",
        stats: [
            { label: "Conversion Rate", value: "+40%" },
            { label: "Mobile Sales", value: "+65%" },
        ],
        tags: ["UI/UX", "Shopify Plus", "CRO"],
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2574&auto=format&fit=crop",
        color: "from-rose-500 to-pink-500"
    },
    {
        id: 4,
        client: "PayFlow",
        title: "Custom Payment Gateway",
        description: "Developed a secure, PCI-compliant custom payment gateway integration that allowed the client to accept crypto and local currency seamlessly.",
        stats: [
            { label: "Transaction Success", value: "99.9%" },
            { label: "Currencies", value: "50+" },
        ],
        tags: ["Fintech", "Security", "API"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
        color: "from-emerald-500 to-green-500"
    },
    {
        id: 5,
        client: "DataDash",
        title: "High-Traffic Dashboard",
        description: "Built a high-performance React dashboard capable of visualizing millions of data points with zero lag for a SaaS analytics platform.",
        stats: [
            { label: "Data Points", value: "1M+" },
            { label: "Load Time", value: "0.5s" },
        ],
        tags: ["React", "Big Data", "D3.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "from-orange-500 to-amber-500"
    },
    // {
    //     id: 6,
    //     client: "StyleConfig",
    //     title: "Product Customizer Plugin",
    //     description: "Engineered a complex product customization tool allowing users to preview billions of potential product combinations in real-time.",
    //     stats: [
    //         { label: "Combinations", value: "1B+" },
    //         { label: "Engagement", value: "+200%" },
    //     ],
    //     tags: ["WebGL", "Three.js", "Interactive"],
    //     image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    //     color: "from-fuchsia-500 to-violet-500"
    // },
];

export default function SuccessStoriesPage() {
    return (
        <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-40 pb-20">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="#10b981"
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-6">
                        <CheckCircle2 className="w-4 h-4" />
                        Proven Track Record
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
                        Success Stories
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
                        See how we help businesses transform their digital presence and achieve measurable growth.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {successStories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className={`absolute -inset-4 bg-gradient-to-r ${story.color} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700`}></div>
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                <span className={`text-sm font-bold tracking-wider uppercase bg-gradient-to-r ${story.color} bg-clip-text text-transparent mb-2`}>
                                    {story.client}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    {story.title}
                                </h2>
                                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                                    {story.description}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-6 mb-8 w-full">
                                    {story.stats.map((stat, i) => (
                                        <div key={i} className="flex flex-col p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <span className="text-2xl md:text-3xl font-bold text-white mb-1">
                                                {stat.value}
                                            </span>
                                            <span className="text-xs md:text-sm text-neutral-400 uppercase tracking-wide">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {story.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/success-stories/${story.id}`}
                                    className="group flex items-center gap-2 text-white font-semibold border-b border-primary pb-0.5 hover:text-primary transition-colors"
                                >
                                    Read Case Study <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors"
                    >
                        Start Your Success Story <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
