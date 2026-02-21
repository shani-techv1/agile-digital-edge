"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Zap, Layers } from "lucide-react";

const successStories = [
    {
        id: 1,
        client: "Luxe Apparel",
        title: "Automating Inventory for Scale",
        description: "Built a custom Shopify app that synchronized inventory across 5 warehouses in real-time, eliminating overselling and reducing manual work by 20 hours/week.",
        challenge: "Luxe Apparel was struggling with overselling issues due to inventory discrepancies between their 5 warehouses and online store. Manual updates were prone to errors and took valuable time.",
        solution: "We developed a bespoke private Shopify App using Node.js and React. The app hooks into Shopify's inventory webhooks and synchronizes stock levels across all locations in near real-time (< 2s).",
        stats: [
            { label: "Hours Saved/Week", value: "20+" },
            { label: "Sync Speed", value: "< 2s" },
            { label: "Overselling Incidents", value: "0" }
        ],
        tags: ["Shopify App", "Automation", "Node.js", "React", "Redis"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
        color: "from-purple-500 to-indigo-500",
        accent: "text-purple-400"
    },
    {
        id: 2,
        client: "TechStream",
        title: "Legacy to Next.js Migration",
        description: "Migrated a heavy legacy PHP application to a modern Next.js architecture, resulting in a 3x faster load time and significantly improved SEO rankings.",
        challenge: "The client's existing PHP application was slow, difficult to maintain, and suffering in search rankings due to poor core web vitals.",
        solution: "We re-architected the entire frontend using Next.js for server-side rendering and static generation. We also implemented a headless CMS to allow the marketing team to update content easily.",
        stats: [
            { label: "Performance", value: "3x Faster" },
            { label: "Traffic Increase", value: "+150%" },
            { label: "SEO Score", value: "100" }
        ],
        tags: ["Next.js", "Migration", "SEO", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "from-blue-500 to-cyan-500",
        accent: "text-blue-400"
    },
    {
        id: 3,
        client: "Glow Beauty",
        title: "E-commerce Redesign & CRO",
        description: "Complete UI/UX overhaul focusing on mobile-first design. Simplifed the checkout process which led to a massive jump in conversion rates.",
        challenge: "High cart abandonment rates on mobile devices were costing the business significant revenue. The user interface was cluttered and navigation was confusing.",
        solution: "We designed a mobile-first experience with a focus on speed and simplicity. We streamlined the checkout flow and implemented a new visual identity that resonates with their target audience.",
        stats: [
            { label: "Conversion Rate", value: "+40%" },
            { label: "Mobile Sales", value: "+65%" },
            { label: "Cart Abandonment", value: "-25%" }
        ],
        tags: ["UI/UX", "Shopify Plus", "CRO", "Figma"],
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2574&auto=format&fit=crop",
        color: "from-rose-500 to-pink-500",
        accent: "text-rose-400"
    },
    {
        id: 4,
        client: "PayFlow",
        title: "Custom Payment Gateway",
        description: "Developed a secure, PCI-compliant custom payment gateway integration that allowed the client to accept crypto and local currency seamlessly.",
        challenge: "The client needed to accept a specific set of cryptocurrencies and local payment methods that were not supported by standard gateways.",
        solution: "We built a custom gateway integration that connects directly to multiple payment processors. We ensured full PCI compliance and implemented robust fraud detection measures.",
        stats: [
            { label: "Transaction Success", value: "99.9%" },
            { label: "Currencies", value: "50+" },
            { label: "Fraud Rate", value: "< 0.1%" }
        ],
        tags: ["Fintech", "Security", "API", "Node.js"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
        color: "from-emerald-500 to-green-500",
        accent: "text-emerald-400"
    },
    {
        id: 5,
        client: "DataDash",
        title: "High-Traffic Dashboard",
        description: "Built a high-performance React dashboard capable of visualizing millions of data points with zero lag for a SaaS analytics platform.",
        challenge: "Rendering large datasets in the browser was causing the application to freeze, leading to a poor user experience for enterprise clients.",
        solution: "We utilized Web Workers for data processing and implemented virtualization to only render visible data points. We also used D3.js for efficient, hardware-accelerated charting.",
        stats: [
            { label: "Data Points", value: "1M+" },
            { label: "Load Time", value: "0.5s" },
            { label: "User Satisfaction", value: "4.9/5" }
        ],
        tags: ["React", "Big Data", "D3.js", "Web Workers"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "from-orange-500 to-amber-500",
        accent: "text-orange-400"
    },
    // {
    //     id: 6,
    //     client: "StyleConfig",
    //     title: "Product Customizer Plugin",
    //     description: "Engineered a complex product customization tool allowing users to preview billions of potential product combinations in real-time.",
    //     challenge: "The client sells highly customizable furniture. They needed a way for customers to visualize exactly what they were buying to reduce returns.",
    //     solution: "We built a 3D product configurator using Three.js and WebGL. This allows users to rotate, zoom, and change materials on their furniture in real-time directly in the browser.",
    //     stats: [
    //         { label: "Combinations", value: "1B+" },
    //         { label: "Engagement", value: "+200%" },
    //         { label: "Return Rate", value: "-30%" }
    //     ],
    //     tags: ["WebGL", "Three.js", "Interactive", "React"],
    //     image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    //     color: "from-fuchsia-500 to-violet-500",
    //     accent: "text-fuchsia-400"
    // },
];

export default function SuccessStoryDetail() {
    const params = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        if (params?.id) {
            const foundStory = successStories.find(s => s.id === parseInt(params.id));
            setStory(foundStory);
        }
    }, [params]);

    if (!story && !params?.id) return <div className="min-h-screen bg-black" />;

    if (!story && params?.id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
                    <Link href="/success-stories" className="text-primary hover:underline">
                        Back to Success Stories
                    </Link>
                </div>
            </div>
        );
    }

    // Fallback loading
    if (!story) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-40 pb-20">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className={`inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wide uppercase mb-6 ${story.accent}`}>
                            {story.client}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                            {story.title}
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                            {story.description}
                        </p>
                    </div>

                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl group"
                    >
                        <div className={`absolute -inset-1 bg-gradient-to-r ${story.color} opacity-20 blur-xl group-hover:opacity-40 transition duration-1000`}></div>
                        <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-[400px] md:h-[600px] object-cover relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-30 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {story.stats.map((stat, i) => (
                                <div key={i} className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                    <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-neutral-300 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <TrendingUp className={story.accent} /> The Challenge
                            </h2>
                            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                                {story.challenge}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <Zap className={story.accent} /> The Solution
                            </h2>
                            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                                {story.solution}
                            </p>
                        </motion.div>
                    </div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-20 p-8 md:p-12 rounded-3xl bg-neutral-900/50 border border-white/10"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Layers className="text-gray-400" /> Technologies Used
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {story.tags.map((tag, i) => (
                                <span key={i} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <div className="text-center">
                        <p className="text-neutral-400 mb-6">Need a similar solution for your business?</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                        >
                            Start Your Project <ArrowUpRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
