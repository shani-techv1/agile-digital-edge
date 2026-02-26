"use client";

import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { Activity, Globe2, Server } from "lucide-react";

export default function GlobeDemo() {
    return (
        <section className="py-20 bg-dark-blue relative overflow-hidden" id="globe-demo">
            <div className="container mx-auto px-6 relative z-10">
                <div className="w-full max-w-6xl mx-auto rounded-3xl bg-[#0a0a0a] overflow-hidden relative">
                    {/* Ambient glow */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" />

                    <div className="flex flex-col md:flex-row min-h-[500px]">
                        {/* Left content */}
                        <div className="flex-1 flex flex-col justify-center p-10 md:p-14 relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 mb-6 w-fit backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                All systems operational
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                                Making Waves
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-[#00f0ff] bg-clip-text text-transparent inline-flex items-center gap-3 mt-1">
                                    Around the World <Globe2 className="w-8 h-8 md:w-10 md:h-10 text-[#00f0ff]" />
                                </span>
                            </h2>

                            <p className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed mb-10">
                                We’re a global team of innovators, designers, and developers who love building amazing digital experiences. From San Francisco to Sydney, we’re making waves around the world.
                            </p>

                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Server className="w-5 h-5 text-blue-400" /> 150+
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Edge Nodes</p>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-green-400" /> &lt;50ms
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Avg Latency</p>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div>
                                    <p className="text-2xl font-bold text-white">99.99%</p>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Uptime</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — Globe */}
                        <div className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[400px] relative">
                            {/* Optional Unsplash background image overlay for texture */}
                            <div
                                className="absolute inset-0 opacity-[0.03] bg-cover bg-center pointer-events-none mix-blend-screen"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}
                            />
                            <InteractiveGlobe
                                size={460}
                                autoRotateSpeed={0.003}
                                dotColor="rgba(100, 180, 255, ALPHA)"
                                arcColor="rgba(100, 180, 255, 0.5)"
                                markerColor="rgba(0, 240, 255, 1)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
