"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

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
                            Work with an engineering team through a project or dedicated
                            engagement, with timezone overlap planned around your team.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Shopify, WordPress, and BigCommerce",
                                "Direct access to developers",
                                "Support and maintenance beyond launch",
                                "Project-based or dedicated team",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="text-secondary w-6 h-6 flex-shrink-0" />
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/why-agile" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:text-white transition-colors">
                            Why businesses work with Agile <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="md:w-1/2 relative">
                        <div className="relative border-y border-white/10 py-4">
                            <div className="grid grid-cols-2 gap-x-6">
                                {[
                                    ["Delivery", "Flexible team model"],
                                    ["Client regions", "AU · UK · CA · US"],
                                    ["Engagement", "Project or dedicated"],
                                    ["After launch", "Maintenance available"],
                                ].map(([label, value]) => (
                                    <div key={label} className="border-b border-white/10 py-5 last:border-b-0">
                                        <p className="text-sm text-gray-400">{label}</p>
                                        <p className="mt-2 font-semibold text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;