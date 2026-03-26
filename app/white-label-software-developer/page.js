"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Code2, Briefcase, Building,
  CheckCircle2, ShieldCheck, Users, MessageSquare, TrendingUp,
  FolderOpen, Handshake, AppWindow, Wand2, Layers, ArrowRight, Bot,
  HeartPulse, Factory, ShoppingBag, Database, Monitor, FileCode2, Network,
  ClipboardList, UserPlus, PlayCircle, PackageCheck, HeadphonesIcon,
  User, Users2, Box, CheckSquare, ChevronDown, Mail, Phone, Calendar, Send,
  Landmark, PlaneTakeoff, GraduationCap, Building2, Truck, Smartphone, CloudLightning
} from "lucide-react";

const partners = [
  { icon: Globe, title: "Digital Marketing Agencies", desc: "Need robust backend and web development support for complex client campaigns and platforms." },
  { icon: Code2, title: "Software Companies", desc: "Looking to extend their engineering teams to clear project backlogs and deliver faster." },
  { icon: Briefcase, title: "IT Consulting Firms", desc: "Need reliable partners to implement enterprise CMS, CRM, and ERP solutions for their clients." },
  { icon: Building, title: "Enterprises", desc: "Seeking custom platforms and AI integration without the overhead of hiring a massive internal IT department." }
];

const reasonsList = [
  "Expand service offerings instantly without new hires",
  "Deliver complex software projects faster",
  "Access experienced enterprise developers",
  "Reduce development costs significantly",
  "Maintain complete brand ownership with clients",
  "Scale up or down based on project demand"
];

const features = [
  { icon: ShieldCheck, title: "Brand Ownership", desc: "All work is delivered entirely under your brand — your clients never know about Agile Digital Edge." },
  { icon: Users, title: "Dedicated Teams", desc: "Developers work exclusively on your projects with full dedication and context." },
  { icon: MessageSquare, title: "Transparent Process", desc: "Clear communication, agile workflows, and real-time project visibility at all times." },
  { icon: TrendingUp, title: "Scalable Capacity", desc: "Instantly scale team size up or down based on your project pipeline and requirements." }
];

const services = [
  { icon: FolderOpen, title: "White Label CMS Development", desc: "Enterprise CMS implementation, migration, customization, and performance optimization.", tags: ["Optimizely", "Sanity"] },
  { icon: Handshake, title: "White Label CRM Development", desc: "Advanced CRM solutions including Salesforce customization, CRM integrations, and custom builds.", tags: ["Salesforce", "Custom CRM", "Analytics"] },
  { icon: Code2, title: "White Label Custom Software", desc: "Scalable enterprise software, SaaS applications, workflow automation, and business platforms.", tags: ["SaaS", "Automation", "Portals"] },
  { icon: AppWindow, title: "Web Application Development", desc: "Modern web platforms using .NET Core, React, Next.js, Angular — fast, secure, and built to scale.", tags: [".NET Core", "ReactJS", "Next.js"] },
  { icon: Wand2, title: "White Label AI Solutions", desc: "Custom AI chatbots, AI-powered applications, intelligent automation tools, and AI agents.", tags: ["AI Chatbots", "AI Agents", "Automation"] },
  { icon: Layers, title: "Headless CMS Development", desc: "Modern API-driven content platforms delivering omnichannel experiences across web and mobile.", tags: ["Headless", "Sanity", "Contentful"] }
];

const industries = [
  { icon: Landmark, title: "Finance & Fintech", color: "from-blue-600 to-indigo-500", text: "text-blue-400", list: ["Payment Gateways", "Banking Portals", "Trading Platforms"] },
  { icon: HeartPulse, title: "Healthcare", color: "from-emerald-500 to-teal-500", text: "text-emerald-400", list: ["Patient Portals", "Telemedicine Systems", "Hospital Management"] },
  { icon: ShoppingBag, title: "Retail & E-Commerce", color: "from-orange-500 to-rose-500", text: "text-orange-400", list: ["Custom Storefronts", "Inventory Management", "Omnichannel Apps"] },
  { icon: Building2, title: "Real Estate", color: "from-cyan-500 to-blue-500", text: "text-cyan-400", list: ["Property Portals", "CRM Integration", "Facility Management"] },
  { icon: Truck, title: "Logistics", color: "from-amber-500 to-orange-500", text: "text-amber-400", list: ["Fleet Tracking", "Warehouse Management", "Route Optimization"] },
  { icon: GraduationCap, title: "EdTech", color: "from-purple-500 to-pink-500", text: "text-purple-400", list: ["E-Learning Portals", "Student LMS", "Virtual Classrooms"] },
  { icon: Factory, title: "Manufacturing", color: "from-slate-400 to-slate-600", text: "text-slate-300", list: ["Production Monitoring", "Quality Control Apps", "ERP Platforms"] },
  { icon: PlaneTakeoff, title: "Travel", color: "from-sky-400 to-blue-500", text: "text-sky-400", list: ["Booking Engines", "PMS Systems", "Itinerary Builders"] }
];

const techStack = [
  { title: "BACKEND", icon: Database, color: "from-blue-500 to-indigo-500", text: "text-blue-400", tech: [".NET Core", "Node.js", "PHP / Laravel", "Python"] },
  { title: "FRONTEND", icon: Monitor, color: "from-cyan-400 to-emerald-400", text: "text-cyan-400", tech: ["React / Next.js", "Angular", "Vue.js", "JavaScript"] },
  { title: "MOBILE APPS", icon: Smartphone, color: "from-purple-500 to-pink-500", text: "text-purple-400", tech: ["React Native", "Flutter", "iOS / Swift", "Android"] },
  { title: "CMS & E-COM", icon: FileCode2, color: "from-orange-500 to-rose-500", text: "text-orange-400", tech: ["Shopify Apps", "WordPress", "Optimizely", "Sanity"] },
  { title: "CRM & ERP", icon: Network, color: "from-fuchsia-500 to-violet-500", text: "text-fuchsia-400", tech: ["Salesforce", "SAP B1", "ZOHO ERP", "HubSpot"] },
  { title: "CLOUD & AI", icon: CloudLightning, color: "from-emerald-400 to-teal-500", text: "text-emerald-400", tech: ["AWS / Azure", "Docker", "AI Chatbots", "LLM Agents"] }
];

const processSteps = [
  { icon: ClipboardList, step: "1", title: "Requirement Discussion", desc: "Agile Digital Edge understands your technical requirements, project scope, and delivery timeline." },
  { icon: UserPlus, step: "2", title: "Dedicated Team Setup", desc: "Experienced developers are carefully selected and assigned based on your project needs." },
  { icon: PlayCircle, step: "3", title: "Agile Development", desc: "Agile Digital Edge's engineers work within your development processes, tools, and communication channels." },
  { icon: PackageCheck, step: "4", title: "White Label Delivery", desc: "All code, documentation, and deliverables are provided entirely under your brand identity." },
  { icon: HeadphonesIcon, step: "5", title: "Ongoing Support", desc: "Continuous improvements, maintenance releases, and feature development as you grow." }
];

const engagementModels = [
  { icon: User, title: "Dedicated Developer", desc: "Hire one or more developers working exclusively on your projects.", features: ["Full-time resource", "Works in your timezone", "Integrates with team", "Monthly model"], cta: "Hire a Developer", popular: false },
  { icon: Users2, title: "Dedicated Team", desc: "Scale with a complete offshore engineering team — developers, QA, and lead.", features: ["Full engineering squad", "Scrum workflow", "Tech lead included", "Scalable size"], cta: "Build a Team", popular: true },
  { icon: Box, title: "Project-Based", desc: "End-to-end delivery for a clearly defined software project with fixed scope.", features: ["Fixed scope", "Milestone delivery", "Documentation", "White label"], cta: "Start a Project", popular: false }
];

const faqs = [
  { q: "What is white label software development?", a: "White label software development is a partnership model where Agile Digital Edge builds the software and you sell it entirely under your agency's brand. Your clients interact only with you, and you maintain complete ownership of the client relationship." },
  { q: "Why do digital agencies use offshore white label development partners?", a: "Agencies partner with Agile Digital Edge to scale development capacity instantly without the massive overhead of hiring local in-house talent. It allows them to access specialized enterprise developers, heavily increase profit margins, and deliver complex projects much faster." },
  { q: "Can your developers collaborate directly with our internal team?", a: "Absolutely. Agile Digital Edge's developers seamlessly integrate into your existing workflows, natively using your internal communication tools (Slack, Teams, etc.), version control systems, and agile tracking processes." },
  { q: "How do agencies maintain strict client confidentiality in white label partnerships?", a: "Agile Digital Edge operates under an ironclad Non-Disclosure Agreement (NDA). If desired, our developers will use your agency's email addresses (@yourdomain.com), appear as your direct employees in any required client meetings, and maintain absolute stealth." }
];

export default function WhiteLabelSoftwareDeveloper() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    teamSize: '',
    services: [],
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      const response = await fetch('/api/white-label-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: formData.country,
          teamSize: formData.teamSize,
          services: formData.services.join(', '),
          message: formData.message
        }),
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: false });
        setFormData({ name: '', email: '', company: '', country: '', teamSize: '', services: [], message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, success: false, error: true });
      setTimeout(() => setStatus(prev => ({ ...prev, error: false })), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 selection:bg-emerald-500/30 overflow-hidden">

      <div className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">White Label Partnership</span>
              </div>

              <h1 className="text-4xl sm:text-4xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                Scale With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 xl:leading-[1.2]">
                  Agile Digital Edge
                </span>
                <br />
                In Stealth.
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-medium">
                The trusted offshore development partner for elite digital agencies. Agile Digital Edge builds complex <strong className="text-white">CMS, CRM, Website, Mobile apps, Shopify apps and AI apps</strong> entirely under your brand. No overhead. Infinite scale.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => document.getElementById('partnership-application')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  Partner Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById('engineering-arsenal')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-colors backdrop-blur-sm"
                >
                  Capabilities
                </button>
              </div>

              {/* Badges/Tags underneath */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 mt-6">
                {["US • UK • UAE", "Enterprise CMS", "AI Solutions"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Innovation Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 relative perspective-1000 h-full flex items-center justify-center mt-12 lg:mt-0"
            >
              <div className="relative w-full max-w-2xl aspect-square md:aspect-[4/3] flex items-center justify-center max-sm:scale-[0.85]">

                {/* Back glowing orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

                {/* Main floating Glass Card - Central Hub */}
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-20 w-[95%] sm:w-[85%] bg-[#080808]/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                  {/* Glossy top highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-white tracking-tight">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Bot className="w-5 h-5 text-emerald-400" />
                      </div>
                      Stealth Delivery Engine
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-white tracking-wider border border-white/5">LIVE</span>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: "AI & Autonomous Agents", pct: "98%", stroke: "from-blue-400 to-purple-500" },
                      { label: "Next.js / React Ecosystem", pct: "95%", stroke: "from-cyan-400 to-emerald-400" },
                      { label: "Wordpress / WooCommerce Ecosystem", pct: "95%", stroke: "from-cyan-400 to-emerald-400" },
                      { label: "Shopify App Development", pct: "95%", stroke: "from-green-400 to-red-400" },
                      { label: "Enterprise CMS & CRM", pct: "90%", stroke: "from-orange-400 to-rose-400" },
                      { label: "Cloud & DevOps", pct: "85%", stroke: "from-fuchsia-400 to-violet-500" },
                    ].map((item, i) => (
                      <div key={i} className="relative group/bar">
                        <div className="flex justify-between text-xs mb-1.5 font-bold uppercase tracking-wider">
                          <span className="text-slate-300 group-hover/bar:text-white transition-colors">{item.label}</span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r group-hover/bar:from-white group-hover/bar:to-white transition-colors">{item.pct}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.pct }}
                            transition={{ duration: 1.5, delay: 1 + (i * 0.2), ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${item.stroke} rounded-full relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[100%] animate-[shimmer_2s_infinite]"></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub cards overlay */}
                  <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
                    <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 text-center">
                      <div className="text-2xl font-black text-white">400+</div>
                      <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Apps built</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 text-center">
                      <div className="text-2xl font-black text-white">40+</div>
                      <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Engineers</div>
                    </div>
                    <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 text-center flex flex-col justify-center items-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">100% NDA</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Labels / Tech Tabs */}
                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-6 left-2 sm:-left-4 lg:-left-6 max-sm:scale-75 origin-top-left bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex flex-col items-center justify-center border border-orange-500/30">
                    <FileCode2 className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">CMS Stack</div>
                    <div className="text-sm text-white font-black leading-none">Wordpress</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -bottom-2 sm:-bottom-6 right-2 sm:-right-4 lg:-right-8 max-sm:scale-75 origin-bottom-right bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex flex-col items-center justify-center border border-cyan-500/30">
                    <AppWindow className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Frontend</div>
                    <div className="text-sm text-white font-black leading-none">React & Next.js</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-6 sm:-bottom-14 left-2 sm:left-6 lg:left-16 max-sm:scale-75 origin-bottom-left bg-gradient-to-br from-rose-500/20 to-orange-500/20 backdrop-blur-xl border border-rose-500/30 px-5 py-2.5 rounded-full shadow-lg z-10 flex items-center gap-2"
                >
                  <Network className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-bold text-white tracking-wide">Agile Teams</span>
                </motion.div>

                {/* Additional floating tag for innovation */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-1/2 -right-4 sm:-right-12 lg:-right-24 -translate-y-1/2 max-sm:scale-75 origin-right bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 hidden sm:flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex flex-col items-center justify-center border border-purple-500/30">
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Backend</div>
                    <div className="text-sm text-white font-black leading-none">.NET & Node</div>
                  </div>
                </motion.div>

                {/* Background decorative code block or card to add depth */}
                <motion.div
                  animate={{ rotateX: [10, 15, 10], rotateY: [-10, -5, -10] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-12 -right-4 w-[90%] h-[80%] bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/5 rounded-3xl z-0 transform origin-bottom-right"
                >
                  <div className="p-8 opacity-40">
                    <div className="h-4 w-1/3 bg-white/20 rounded mb-5"></div>
                    <div className="h-4 w-full bg-white/10 rounded mb-3"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded mb-3"></div>
                    <div className="h-4 w-4/6 bg-white/10 rounded mb-8"></div>
                    <div className="h-4 w-1/4 bg-white/20 rounded mb-5"></div>
                    <div className="h-4 w-full bg-white/10 rounded mb-3"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded mb-3"></div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </section>


        {/* --- ELITE 'WHO WE PARTNER WITH' --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10 overflow-hidden">

          <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none z-0"></div>

          <div className="relative z-10 text-center mb-24 max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              Strategic Alliances
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
            >
              Built for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-lg">
                Industry Leaders
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
            >
              Strategic alliances that empower growth and technical excellence. Agile Digital Edge provides the elite, silent engine behind your most ambitious client projects.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
            {partners.map((partner, i) => {
              const theme = [
                { color: "cyan", glow: "from-cyan-400 to-blue-500", text: "text-cyan-400", borderHover: "group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]", inner: "bg-cyan-500/10" },
                { color: "fuchsia", glow: "from-fuchsia-400 to-purple-500", text: "text-fuchsia-400", borderHover: "group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]", inner: "bg-fuchsia-500/10" },
                { color: "amber", glow: "from-amber-400 to-orange-500", text: "text-amber-400", borderHover: "group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]", inner: "bg-amber-500/10" },
                { color: "emerald", glow: "from-emerald-400 to-teal-500", text: "text-emerald-400", borderHover: "group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]", inner: "bg-emerald-500/10" }
              ][i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative bg-[#050505] rounded-[2.5rem] p-8 md:p-12 border border-white/20 ${theme.borderHover} transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden isolate`}
                >
                  {/* Dynamic corner ambient glow */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${theme.glow} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}></div>

                  {/* Horizontal animated tracking laser */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out opacity-20`}></div>

                  {/* Decorative Blueprint Matrix Grid inside card */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity [mask-image:linear-gradient(to_bottom,black,transparent)] z-0"></div>

                  <div className="relative flex flex-col xl:flex-row gap-8 items-start mb-12 z-10">
                    <div className="relative isolate shrink-0">
                      {/* Exploding icon aura */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${theme.glow} blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                      <div className="w-20 h-20 bg-[#111] border border-white/10 rounded-3xl flex items-center justify-center relative z-10 group-hover:-rotate-12 transition-transform duration-500 shadow-2xl overflow-hidden">
                        <partner.icon className={`w-10 h-10 ${theme.text} transition-colors duration-500 drop-shadow-lg scale-110`} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-3xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all z-10 tracking-tight leading-none xl:mt-2">
                        {partner.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-medium">
                        {partner.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 text-slate-500 text-[10px] font-black tracking-widest uppercase group-hover:text-white transition-colors duration-500 z-10 mt-auto pt-6 border-t border-white/5">
                    <span className={`px-4 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 ${theme.text} group-hover:border-current ${theme.inner} transition-all duration-500 select-none`}>
                      Alliance Tier One
                    </span>
                    <div className="ml-auto w-10 h-10 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-slate-500 group-hover:border-current group-hover:text-white bg-[#111] transition-all duration-500 shadow-lg">
                      <ArrowRight className="w-4 h-4 group-hover:-translate-y-px group-hover:translate-x-px transition-transform" />
                    </div>
                  </div>

                </motion.div>
              )
            })}
          </div>

        </section>


        {/* --- PREMIUM WHY CHOOSE US --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden border-t border-white/5">

          <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold tracking-widest uppercase mb-8 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
            >
              <ShieldCheck className="w-4 h-4" /> The White Label Advantage
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter"
            >
              Why Elite Agencies <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-500 drop-shadow-lg">
                Choose Agile Digital Edge
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            >
              Expand technical capabilities without inflating operational costs. A reliable agile partner allows you to deliver sophisticated platforms while you focus purely on growth.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">

            {/* Left large stats/reasons panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative group isolate"
            >
              {/* Outer Glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-fuchsia-600 rounded-[2.5rem] opacity-20 group-hover:opacity-50 blur-xl transition-opacity duration-700"></div>

              <div className="h-full w-full bg-[#050505]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">

                {/* Decorative mesh */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                  <TrendingUp className="text-orange-400 w-8 h-8" />
                  Key Benefits
                </h3>

                <ul className="space-y-6 relative z-10">
                  {reasonsList.map((reason, i) => (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      key={i}
                      className="flex items-start gap-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.4)] mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-200 font-medium text-[15px] leading-relaxed">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right side bento features */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative isolate h-full"
                >
                  {/* Card Neon Glow */}
                  <div className={`absolute -inset-[2px] bg-gradient-to-br ${i % 2 === 0 ? 'from-rose-500 to-orange-500' : 'from-violet-500 to-fuchsia-500'} rounded-[2.2rem] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
                  <div className={`absolute -inset-[2px] bg-gradient-to-br ${i % 2 === 0 ? 'from-rose-500 to-orange-500' : 'from-violet-500 to-fuchsia-500'} rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Card Main Body */}
                  <div className="h-full bg-[#0a0a0a] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col items-start z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">

                    {/* Hover inner gradient flare */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-rose-500/10 to-transparent' : 'from-fuchsia-500/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                    <div className="relative mb-8">
                      {/* Aura glowing spot */}
                      <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-orange-500/20' : 'bg-fuchsia-500/20'} blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      <div className="w-16 h-16 bg-[#171717] border border-white/10 rounded-2xl flex items-center justify-center relative z-10 shadow-xl group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
                        <feature.icon className={`w-8 h-8 ${i % 2 === 0 ? 'text-orange-400' : 'text-fuchsia-400'}`} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all z-10 leading-tight">
                      {feature.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed z-10 flex-grow font-medium">
                      {feature.desc}
                    </p>

                    {/* Animated Fill Line */}
                    <div className="mt-8 w-12 h-1 bg-white/10 rounded-full overflow-hidden z-10">
                      <div className={`h-full w-0 bg-gradient-to-r ${i % 2 === 0 ? 'from-orange-400 to-rose-500' : 'from-fuchsia-400 to-violet-500'} group-hover:w-full transition-all duration-700 ease-out`}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>


        {/* --- PREMIUM EPIC SERVICES --- */}
        <section id="engineering-arsenal" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10 overflow-hidden">

          {/* Background Ambient Warm Radiance */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[conic-gradient(at_top_center,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-orange-500/20 to-rose-500/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(217,70,239,0.2)]"
            >
              Enterprise Capabilities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
            >
              Our Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-600 drop-shadow-lg">
                Arsenal
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Comprehensive software development expertise delivered flawlessly, silently, and entirely under your brand identity.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {services.map((service, i) => {
              const theme = [
                { from: "from-orange-500", to: "to-rose-500", text: "text-orange-400", bgLight: "group-hover:bg-orange-500/10", borderLight: "group-hover:border-orange-500/50", glow: "from-orange-500 to-rose-500" },
                { from: "from-fuchsia-500", to: "to-violet-500", text: "text-fuchsia-400", bgLight: "group-hover:bg-fuchsia-500/10", borderLight: "group-hover:border-fuchsia-500/50", glow: "from-fuchsia-500 to-violet-500" },
                { from: "from-rose-400", to: "to-orange-500", text: "text-rose-400", bgLight: "group-hover:bg-rose-500/10", borderLight: "group-hover:border-rose-500/50", glow: "from-rose-400 to-orange-500" },
                { from: "from-violet-500", to: "to-fuchsia-500", text: "text-violet-400", bgLight: "group-hover:bg-violet-500/10", borderLight: "group-hover:border-violet-500/50", glow: "from-violet-500 to-fuchsia-500" },
                { from: "from-amber-400", to: "to-orange-500", text: "text-amber-400", bgLight: "group-hover:bg-amber-500/10", borderLight: "group-hover:border-amber-500/50", glow: "from-amber-400 to-orange-500" },
                { from: "from-pink-500", to: "to-rose-500", text: "text-pink-400", bgLight: "group-hover:bg-pink-500/10", borderLight: "group-hover:border-pink-500/50", glow: "from-pink-500 to-rose-500" }
              ][i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="group relative isolate h-full"
                >
                  {/* Soft Ambient Colored Shadow Layer */}
                  <div className={`absolute -inset-3 bg-gradient-to-br ${theme.glow} rounded-[2.6rem] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 z-0`}></div>

                  <div className="relative h-full bg-[#080808]/80 backdrop-blur-3xl border border-white/10 group-hover:border-white/40 rounded-[2.4rem] p-8 md:p-10 flex flex-col z-10 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-500">

                    {/* Top inner gradient wash on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${theme.from}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                    {/* Internal ambient corner glow */}
                    <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${theme.glow} rounded-full blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}></div>

                    <div className="relative mb-10 flex justify-between items-start z-10">
                      <div className="relative isolate">
                        {/* Exploding icon aura */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${theme.glow} blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

                        <div className="w-16 h-16 bg-[#111] border border-white/10 group-hover:border-white/30 rounded-2xl flex items-center justify-center relative z-10 group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500 shadow-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                          <service.icon className={`w-8 h-8 ${theme.text} transition-colors duration-500 drop-shadow-lg`} />
                        </div>
                      </div>
                      {/* Massive typorgraphic index watermark */}
                      <div className="text-white/10 font-black text-6xl tracking-tighter group-hover:text-white/20 transition-colors duration-500 select-none">
                        0{i + 1}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all z-10">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 mb-8 leading-relaxed z-10 font-medium flex-grow">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 relative z-10 w-full">
                      {service.tags.map((tag, tInfo) => (
                        <span
                          key={tInfo}
                          className={`px-3 py-1.5 bg-[#0a0a0a] rounded-xl text-[11px] font-bold text-slate-400 border border-white/10 ${theme.borderLight} ${theme.bgLight} group-hover:text-white transition-all duration-300 uppercase tracking-wider`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent -translate-x-[150%] translate-y-[150%] group-hover:translate-x-[150%] group-hover:-translate-y-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none z-20"></div>

                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* --- PREMIUM INDUSTRY SOLUTIONS --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-4 block"
            >
              Industry Solutions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
            >
              Industry-Specific <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Software Solutions
              </span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative h-full bg-[#050505] backdrop-blur-3xl border border-white/10 hover:border-white/20 rounded-[2rem] p-6 lg:p-8 overflow-hidden transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-2xl"
              >
                {/* Huge Background Icon */}
                <ind.icon className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] group-hover:opacity-10 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-700 ease-in-out pointer-events-none" />

                {/* Soft ambient color bloom */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ind.color} blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full`}></div>

                <div className="relative mb-8 z-10 w-max isolation">
                  <div className={`absolute inset-0 bg-gradient-to-r ${ind.color} blur-xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                  <div className={`w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors shadow-xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]`}>
                    <ind.icon className={`w-6 h-6 ${ind.text} transition-all duration-500 drop-shadow-lg group-hover:scale-110`} />
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-6 tracking-tight relative z-10">{ind.title}</h3>
                <ul className="space-y-3 relative z-10">
                  {ind.list.map((item, j) => (
                    <li key={j} className="flex gap-3 items-center text-slate-400 font-medium text-sm group-hover:text-slate-300 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PREMIUM TECH STACK --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="text-center mb-20">
            <motion.span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4 block">TECHNOLOGY STACK</motion.span>
            <motion.h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Expertise</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#050505]/80 backdrop-blur-3xl border border-white/10 hover:border-white/30 rounded-[2rem] p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] overflow-hidden h-full flex flex-col"
              >
                {/* Immersive Corner Glow */}
                <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${cat.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`}></div>

                {/* 1px Edge Light on Hover */}
                <div className={`absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                <div className="flex items-center gap-5 mb-8 relative z-10 border-b border-white/5 pb-6">
                  <div className={`w-14 h-14 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-2xl flex flex-col items-center justify-center border border-white/10 group-hover:border-white/30 shadow-xl transition-all duration-500`}>
                    <cat.icon className={`w-6 h-6 ${cat.text} group-hover:scale-110 drop-shadow-md transition-transform duration-500`} />
                  </div>
                  <h3 className="font-black text-xl text-white tracking-tight uppercase">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10 flex-grow content-start">
                  {cat.tech.map((t, j) => (
                    <div
                      key={j}
                      className="group/tech flex items-center gap-3 text-slate-300 font-bold p-3.5 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-white/20 hover:bg-[#111] transition-all cursor-default text-xs lg:text-sm shadow-sm"
                    >
                      <div className={`w-2 h-2 rounded-full bg-white/10 group-hover/tech:bg-current ${cat.text} transition-colors duration-300 shadow-sm group-hover/tech:shadow-[0_0_8px_currentColor]`}></div>
                      <span className="truncate group-hover/tech:text-white transition-colors">{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- HOW OUR PROCESS WORKS --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.span className="text-rose-400 font-bold tracking-widest text-sm uppercase mb-4 block">OUR PROCESS</motion.span>
            <motion.h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
              How Agile Digital Edge's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 drop-shadow-lg">Partnership Works</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-6 relative mt-10">

            {processSteps.map((step, i) => {
              const stepThemes = [
                { glow: "from-rose-500 to-pink-500", wash: "from-rose-500/10" },
                { glow: "from-rose-500 to-orange-500", wash: "from-rose-500/10" },
                { glow: "from-orange-500 to-amber-500", wash: "from-orange-500/10" },
                { glow: "from-amber-500 to-yellow-500", wash: "from-amber-500/10" },
                { glow: "from-yellow-500 to-emerald-500", wash: "from-yellow-500/10" },
              ];
              const theme = stepThemes[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-[#050505] backdrop-blur-3xl border border-white/10 hover:border-white/30 rounded-[2rem] p-6 pt-12 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] transition-all flex flex-col items-center text-center h-full z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                >
                  {/* Floating Step Badge */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#080808] border border-white/10 group-hover:border-white/40 flex items-center justify-center shadow-2xl transition-all duration-500 z-20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-full blur-xl opacity-20 group-hover:opacity-70 transition-opacity duration-500`}></div>
                    <div className="absolute inset-[1.5px] bg-[#111] rounded-full z-10 transition-colors duration-500 group-hover:bg-[#0a0a0a]"></div>
                    <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br ${theme.glow} relative z-20 group-hover:scale-110 transition-transform duration-500`}>
                      {step.step}
                    </span>
                  </div>

                  {/* Inner Gradient Wash on Hover */}
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${theme.wash} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-[2rem] pointer-events-none z-0`}></div>

                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all leading-tight relative z-10">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm font-medium leading-relaxed relative z-10 w-full group-hover:text-slate-300 transition-colors duration-300 flex-grow">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- ENGAGEMENT MODELS --- */}
        <section className="pb-32 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="text-center mb-20">
            <motion.span className="text-fuchsia-400 font-bold tracking-widest text-sm uppercase mb-4 block">ENGAGEMENT MODELS</motion.span>
            <motion.h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6">
              Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-500">Models</span>
            </motion.h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Choose the collaboration model that fits your agency's exact needs.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {engagementModels.map((model, i) => (
              <motion.div key={i} className={`relative bg-[#050505] rounded-[2.5rem] p-8 md:p-12 border transition-transform duration-500 flex flex-col h-full ${model.popular ? 'border-fuchsia-500/60 shadow-[0_0_50px_rgba(217,70,239,0.15)] lg:-translate-y-4 hover:scale-[1.02]' : 'border-white/10 hover:border-white/20 hover:-translate-y-2 lg:mt-4'} group isolate`}>

                {model.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-full shadow-lg z-20">Most Popular</div>
                )}

                {model.popular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent pointer-events-none rounded-[2.5rem]"></div>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border shadow-xl transition-transform group-hover:scale-110 ${model.popular ? 'bg-gradient-to-br from-fuchsia-500 to-violet-600 border-white/20 text-white' : 'bg-[#111] border-white/10 text-slate-300 group-hover:text-white'}`}>
                  <model.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{model.title}</h3>
                <p className="text-slate-400 mb-8 border-b border-white/10 pb-8 font-medium leading-relaxed">{model.desc}</p>

                <ul className="space-y-5 mb-10 relative z-10 flex-grow">
                  {model.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-4 text-slate-300 font-bold">
                      <div className={`w-5 h-5 rounded flex justify-center items-center shrink-0 ${model.popular ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-white/5 text-slate-400'}`}>
                        <CheckSquare className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex justify-center items-center gap-3 transition-all mt-auto ${model.popular ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-[1.03]' : 'bg-[#111] border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}>
                  {model.cta} <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PREMIUM FAQ SECTION --- */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

            <div className="lg:col-span-5 relative z-10">
              <motion.span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-4 block">FAQ</motion.span>
              <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
                Frequently <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">Asked Questions</span>
              </motion.h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Everything you need to know about Agile Digital Edge's elite white label development partnership model, stealth practices, and engineering capabilities.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-[#050505] border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-white/5 hover:border-white/10'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg text-white group"
                  >
                    <span className="group-hover:text-cyan-400 transition-colors pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-400 leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- PREMIUM CONTACT PARTNERSHIP SECTION --- */}
        <section id="partnership-application" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
          <div className="bg-[#050505] border border-white/5 rounded-[3rem] p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]">

            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-600/10 via-emerald-600/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">

              {/* Left Column (Info) */}
              <div className="lg:col-span-5 flex flex-col justify-center max-lg:pt-8">
                <div className="inline-flex px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] w-max">START YOUR PARTNERSHIP</div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight">
                  Start Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">White Label</span> <br />
                  Partnership
                </h2>

                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Partner with experienced offshore developers to fundamentally scale your agency's capabilities. Deliver monumental projects, grow profit margins, and maintain complete brand ownership.
                </p>

                <ul className="space-y-4 mb-12">
                  {["Deliver high-end projects without hiring overhead", "Exponentially increase agency profit margins", "Access enterprise CMS & custom software experts", "100% Dedicated offshore development teams"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300 font-medium select-none">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 mb-10">
                  <a href="mailto:hello@agiledigitaledge.com" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-bold">hello@agiledigitaledge.com</span>
                  </a>
                  <a href="tel:+918810227237" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-bold">+91 88102 27237</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 font-bold text-white py-4 rounded-xl transition-all flex justify-center items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" /> Schedule a Call
                  </button>
                  <button className="flex-1 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 font-bold text-white py-4 rounded-xl transition-all flex justify-center items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp
                  </button>
                </div>
              </div>

              {/* Right Column (Form) */}
              <div className="lg:col-span-7">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden">

                  {/* Subtle inner form glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[60px] pointer-events-none rounded-full"></div>

                  <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Partnership Application</h3>

                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full mt-1 bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Work Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@agency.com"
                          className="w-full mt-1 bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Digital Agency"
                        className="w-full mt-1 bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2 relative">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Country</label>
                        <div className="relative mt-1">
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium appearance-none"
                          >
                            <option value="">Select Country</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="UAE">Middle East (UAE)</option>
                            <option value="Australia">Australia</option>
                            <option value="Other">Other region</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Estimated Team Size</label>
                        <div className="relative mt-1">
                          <select
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            className="w-full bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium appearance-none"
                          >
                            <option value="">Select Size</option>
                            <option value="1-2 Developers">1-2 Developers</option>
                            <option value="3-5 Developers">3-5 Developers</option>
                            <option value="6-10 Developers">6-10 Developers</option>
                            <option value="10+ Dedicated Team">10+ Dedicated Team</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Services Interested In</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {["CMS Development", "CRM / ERP", "Custom Web Apps", "Web Apps", "Shopify Apps", "React / Next.js", "AI Agents & Chatbots", "Dedicated Offshore Team"].map((tag, i) => (
                          <div
                            key={i}
                            onClick={() => toggleService(tag)}
                            className={`px-4 py-2 rounded-xl border text-[10px] font-black cursor-pointer transition-all uppercase tracking-wider select-none ${formData.services.includes(tag)
                              ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                              : 'bg-[#111] border-white/10 text-slate-400 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400'
                              }`}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Project Details / Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your project scale, timeline, and partnership requirements..."
                        className="w-full mt-1 bg-[#111] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <button
                        disabled={status.loading}
                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex justify-center items-center gap-3 transition-all ${status.loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.01]'
                          }`}
                      >
                        {status.loading ? 'Sending...' : 'Discuss Partnership'} <Send className="w-4 h-4" />
                      </button>
                    </div>

                    <AnimatePresence>
                      {status.success && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold text-center"
                        >
                          Inquiry sent successfully! We will contact you shortly.
                        </motion.div>
                      )}
                      {status.error && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm font-bold text-center"
                        >
                          Error sending inquiry. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
