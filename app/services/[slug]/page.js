"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Zap, Rocket, Shield } from "lucide-react";

const servicesData = {
    "web-development": {
        title: "Web Development",
        subtitle: "Scalable, High-Performance Web Applications",
        description: "We build robust, scalable, and high-performance web applications tailored to your business needs. Using the latest technologies like Next.js and React, we ensure your digital presence is future-proof.",
        features: [
            { title: "Custom Web Apps", description: "Tailor-made solutions that fit your specific business processes." },
            { title: "SPA Development", description: "Fast and responsive Single Page Applications for seamless user experience." },
            { title: "Progressive Web Apps", description: "Mobile-first PWA solutions that work offline and load instantly." },
            { title: "API Integration", description: "Seamless integration with third-party services and legacy systems." },
        ],
        techStack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
        benefits: ["Faster Load Times", "SEO Optimized", "Scalable Architecture", "Secure by Design"],
    },
    "ecommerce-development": {
        title: "Ecommerce Development",
        subtitle: "Drive Sales with Superior Shopping Experiences",
        description: "Transform your retail business with our custom ecommerce solutions. From Shopify stores to headless commerce architectures, we build platforms that convert visitors into loyal customers.",
        features: [
            { title: "Shopify Development", description: "Custom themes and apps to extend your Shopify store's functionality." },
            { title: "Headless Commerce", description: "Decoupled frontend and backend for ultimate flexibility and speed." },
            { title: "Payment Gateway Integration", description: "Secure and diverse payment options for your global customers." },
            { title: "Inventory Management", description: "Automated systems to keep track of your stock in real-time." },
        ],
        techStack: ["Shopify", "WooCommerce", "Next.js Commerce", "Stripe", "Redis"],
        benefits: ["Higher Conversion Rates", "Mobile Optimized", "Easy Management", "Global Reach"],
    },
    "shopify-app": {
        title: "Shopify App Development",
        subtitle: "Extend Your Store's Functionality",
        description: "Need a specific feature for your store or want to build a public app for the Shopify App Store? We specialize in building secure, compliant, and high-performance Shopify Apps.",
        features: [
            { title: "Public App Development", description: "Build apps for the Shopify App Store using Shopify CLI and Polaris." },
            { title: "Custom Private Apps", description: "Bespoke solutions for your specific store needs." },
            { title: "App Extensions", description: "Integrate directly into the Shopify Admin and Checkout." },
            { title: "Theme App Extensions", description: "Inject widgets and blocks directly into Shopify themes." },
        ],
        techStack: ["Shopify CLI", "Remix", "Node.js", "GraphQL", "Polaris", "Prisma"],
        benefits: ["Automated Workflows", "Increased AOV", "Custom Functionality", "Seamless Integration"],
    },
    "ui-ux-design": {
        title: "UI/UX Design",
        subtitle: "Design That Delights and Converts",
        description: "We believe that great design is not just about looks—it's about how it works. Our user-centric design process ensures your product is intuitive, accessible, and engaging.",
        features: [
            { title: "User Research", description: "Understanding your audience through surveys and interviews." },
            { title: "Wireframing & Prototyping", description: "Visualizing the user journey before writing a single line of code." },
            { title: "Visual Design", description: "Creating stunning, high-fidelity interfaces that align with your brand." },
            { title: "Usability Testing", description: "Validating designs with real users to ensure frictionless experiences." },
        ],
        techStack: ["Figma", "Adobe XD", "Sketch", "Framer", "Maze"],
        benefits: ["Improved User Retention", "Lower Support Costs", "Brand Consistency", "Accessible Interfaces"],
    },
    "mobile-app-development": {
        title: "Mobile App Development",
        subtitle: "Native Performance, Cross-Platform Efficiency",
        description: "Reach your customers wherever they are with our mobile app development services. We build high-quality iOS and Android apps using React Native and Flutter.",
        features: [
            { title: "Cross-Platform Apps", description: "One codebase for both iOS and Android, saving time and cost." },
            { title: "Native Development", description: "Platform-specific Swift and Kotlin development for maximum performance." },
            { title: "App Store Optimization", description: "Strategies to help your app rank higher in app stores." },
            { title: "Maintenance & Support", description: "Regular updates to keep your app compatible with new OS versions." },
        ],
        techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        benefits: ["Wider Audience Reach", "Offline Capabilities", "Push Notifications", "Better Engagement"],
    },
    "seo": {
        title: "Search Engine Optimization",
        subtitle: "Rank Higher, Grow Faster",
        description: "Don't let your website get lost in the noise. Our data-driven SEO strategies help you climb the search engine rankings and attract high-quality organic traffic.",
        features: [
            { title: "Technical SEO", description: "Optimizing site structure, speed, and crawlability." },
            { title: "On-Page SEO", description: "Content optimization, meta tags, and internal linking." },
            { title: "Off-Page SEO", description: "High-quality backlink building and digital PR." },
            { title: "Local SEO", description: "Dominating local search results for brick-and-mortar businesses." },
        ],
        techStack: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog"],
        benefits: ["Increased Traffic", "Better Brand Credibility", "Long-term ROI", "Targeted Audience"],
    },
    "social-media-marketing": {
        title: "Social Media Marketing",
        subtitle: "Connect, Engage, Convert",
        description: "Build a community around your brand. We create compelling social media strategies that foster engagement and drive conversions across all major platforms.",
        features: [
            { title: "Content Strategy", description: "Planning and creating content that resonates with your audience." },
            { title: "Community Management", description: "Active engagement with your followers to build loyalty." },
            { title: "Paid SMM Ads", description: "Highly targeted ad campaigns on Facebook, Instagram, and LinkedIn." },
            { title: "Influencer Marketing", description: "Collaborating with key opinion leaders in your niche." },
        ],
        techStack: ["Meta Business Suite", "LinkedIn Ads", "Buffer", "Canva"],
        benefits: ["Brand Awareness", "Direct Customer Communication", "Viral Potential", "Lead Generation"],
    },
    "branding": {
        title: "Branding",
        subtitle: "Identities People Remember",
        description: "We shape how your brand looks, sounds, and feels. From logo and visual systems to positioning and guidelines, we build identities that stay consistent across every touchpoint.",
        features: [
            { title: "Logo & Visual Identity", description: "A distinctive mark, color system, and typography that travel with your brand." },
            { title: "Brand Guidelines", description: "Clear rules so every team and partner presents the brand the same way." },
            { title: "Brand Positioning", description: "A sharp point of view that sets you apart from competitors." },
            { title: "Rebranding", description: "A refreshed identity when your business has outgrown the old one." },
        ],
        techStack: ["Adobe Illustrator", "Photoshop", "Figma", "Brand Books"],
        benefits: ["Customer Loyalty", "Consistent Presence", "Clear Communication", "Stronger Recognition"],
    },
    "product-engineering": {
        title: "Product Engineering",
        subtitle: "From Idea to a Product People Use",
        description: "We take products from discovery through design, build, and launch. The result is software that is reliable in production and ready to grow with your roadmap.",
        features: [
            { title: "Product Discovery", description: "Scope, priorities, and a plan grounded in how people will actually use the product." },
            { title: "Architecture & Build", description: "A solid technical foundation using modern web, mobile, and cloud stacks." },
            { title: "Quality & Delivery", description: "Testing, reviews, and release practices that keep shipping predictable." },
            { title: "Iteration After Launch", description: "Ongoing improvements driven by usage, feedback, and business goals." },
        ],
        techStack: ["Next.js", "React", "Node.js", "React Native", "AWS", "PostgreSQL"],
        benefits: ["Faster Time to Market", "Scalable Architecture", "Fewer Production Surprises", "A Product You Can Grow"],
    },
    "brand-strategy": {
        title: "Brand Strategy",
        subtitle: "More Than Just a Logo",
        description: "Your brand is your promise. We help you define your voice, values, and visual identity to create a memorable brand that stands out in a crowded market.",
        features: [
            { title: "Brand Identity", description: "Logo, color palette, typography and visual assets." },
            { title: "Brand Positioning", description: "Defining your unique value proposition and target market." },
            { title: "Tone of Voice", description: "Developing a consistent communication style." },
            { title: "Rebranding", description: "Refreshing your brand to maximize impact." },
        ],
        techStack: ["Adobe Illustrator", "Photoshop", "Brand Books", "Market Research"],
        benefits: ["Customer Loyalty", "Premium Pricing Power", "Clear Communication", "Emotional Connection"],
    },
    "content-creation": {
        title: "Content Creation",
        subtitle: "Storytelling That Sells",
        description: "Content is king. We produce high-quality copy, videos, and graphics that educate your audience and compel them to take action.",
        features: [
            { title: "Copywriting", description: "Persuasive text for websites, ads, and emails." },
            { title: "Blog Writing", description: "SEO-friendly articles that establish authority." },
            { title: "Video Production", description: "Engaging video content for social media and web." },
            { title: "Graphic Design", description: "Visual assets for all your marketing needs." },
        ],
        techStack: ["Adobe Premiere", "After Effects", "Figma", "Jasper AI"],
        benefits: ["Authority Building", "Lead Nurturing", "Improved SEO", "Higher Engagement"],
    },
    "cloud-solutions": {
        title: "Cloud Solutions",
        subtitle: "Scale Without Limits",
        description: "Leverage the power of the cloud. We help you design, deploy, and manage scalable cloud infrastructure that grows with your business.",
        features: [
            { title: "Cloud Migration", description: "Safe and secure migration of legacy systems to the cloud." },
            { title: "DevOps Implementation", description: "CI/CD pipelines for faster and more reliable deployments." },
            { title: "Serverless Architecture", description: "Cost-effective and infinitely scalable backend solutions." },
            { title: "Security & Compliance", description: "Implementing best practices to keep your data safe." },
        ],
        techStack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
        benefits: ["Cost Efficiency", "High Availability", "Disaster Recovery", "Flexibility"],
    },
};

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

                {/* Features Grid */}
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
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Shield className="text-secondary" /> Key Benefits
                        </h3>
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
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Code2 className="text-accent-blue" /> Tech Stack
                        </h3>
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
