"use client";
import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { Check, X, Info, Flame, Shield, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// List of comparison features from screenshots
const comparisonCategories = [
  {
    category: "Core Features",
    features: [
      { name: "Setup Fee", tooltip: "One-time initial setup and configuration fee.", values: ["$249", "$349", "$449", "$549"], originalValues: ["$299", "$399", "$499", "$599"] },
      { name: "Website Type", tooltip: "The architecture style of the website.", values: ["Dynamic Website", "Ultra Dynamic Website", "Custom Website", "Ultra Custom Website"] },
      { name: "Website Pages", tooltip: "Number of standard informational pages designed and developed.", values: ["Upto 10 Pages", "Upto 15 Pages", "Upto 30 Pages", "Upto 50 Pages"] },
      { name: "New Logo Design", tooltip: "Custom logo concept design included for your brand.", values: [false, true, true, true] },
      { name: "AI Chat Feature", tooltip: "AI-driven customer chat support widget integrated.", values: [false, true, true, true] },
      { name: "Web Hosting", tooltip: "Premium, ultra-fast hosting setup and support.", values: [true, true, true, true] },
      { name: "Search Engine (SEO) Friendly", tooltip: "Clean markup and structure optimizing search indexability.", values: [true, true, true, true] },
      { name: "Website Pages Content", tooltip: "SEO-optimized copy and layout formatting for page contents.", values: [true, true, true, true] },
      { name: "SEO Keywords Research", tooltip: "Comprehensive keyword target research mapping user intent.", values: [true, true, true, true] },
    ]
  },
  {
    category: "Security & Infrastructure",
    features: [
      { name: "Stock Images", tooltip: "Premium licensed imagery curated for page designs.", values: [true, true, true, true] },
      { name: "Premium Security (SSL)", tooltip: "Secure Sockets Layer certificate encrypting traffic.", values: [true, true, true, true] },
      { name: "Advanced Site Security", tooltip: "Robust security firewalls, anti-malware, and brute-force protection.", values: [false, false, true, true] },
      { name: "Hosted Domain Emails", tooltip: "Personalized professional email addresses on your domain name.", values: ["5", "20", "50", "100"] },
      { name: "Daily Backups", tooltip: "Automated daily point-in-time state backups of website files and databases.", values: [false, true, true, true] },
      { name: "Unlimited Bandwidth", tooltip: "Handles high traffic volumes without throttling constraints.", values: [true, true, true, true] },
      { name: "Unlimited Databases", tooltip: "Create database nodes as required for application needs.", values: [true, true, true, true] },
      { name: "Dedicated Resources", tooltip: "Guaranteed CPU, RAM, and disk resource allocation.", values: [true, true, true, true] },
      { name: "Dedicated IP Address", tooltip: "Isolated IP address distinct from generic shared hosts.", values: [true, true, true, true] },
      { name: "99.9% Uptime Guarantee", tooltip: "SLA-backed hosting uptime reliability assurance.", values: [true, true, true, true] },
      { name: "User-Friendly Admin Panel", tooltip: "CMS dashboard to easily update text, assets, and blog content.", values: [true, true, true, true] },
    ]
  },
  {
    category: "Marketing & Growth Assets",
    features: [
      { name: "Competitors Analysis Report", tooltip: "Audit of competitor keyword, organic visibility, and ranking layouts.", values: [false, false, true, true] },
      { name: "Explainer Video", tooltip: "Custom animation/motion graphics explainer video highlighting services.", values: ["No", "No", "1 Minute", "2 Minutes"] },
      { name: "Customized Contact Forms (Leads)", tooltip: "Bespoke form schemas matching multi-step criteria to gather high-value leads.", values: [false, false, true, true] },
      { name: "Web Maintenance", tooltip: "Hours of technical code edits, performance tuning, and updates.", values: ["50 Hours/year", "75 Hours/year", "100 Hours/year", "200 Hours/year"] },
      { name: "Business Profiles Creation", tooltip: "Citations and listings created on mapping and directory portals.", values: ["5 Profiles", "10 Profiles", "20 Profiles", "30 Profiles"] },
      { name: "Social Media Profile Creation", tooltip: "Setup and branding of Facebook, Instagram, LinkedIn profiles.", values: [false, true, true, true] },
      { name: "Social Media Profile Linking", tooltip: "Integration of links and metadata across assets.", values: [false, true, true, true] },
      { name: "Google Analytics Tracking", tooltip: "Modern GA4 event tracking setup for user journey diagnostics.", values: [true, true, true, true] },
      { name: "Google Search Console Tracking", tooltip: "Sitemap submissions and indexing diagnostics monitoring.", values: [true, true, true, true] },
      { name: "Google eCommerce Tracking", tooltip: "Funnel checkout event tracking mapping sales stats.", values: [false, false, true, true] },
      { name: "Payment Gateway Integration", tooltip: "Secure Stripe, PayPal, or merchant checkout setup.", values: [false, false, true, true] },
    ]
  },
  {
    category: "Support & Reporting",
    features: [
      { name: "Email / Chat Support", tooltip: "Continuous support access for technical queries.", values: [true, true, true, true] },
      { name: "Dedicated Account Manager", tooltip: "Single point-of-contact handling project updates and service requests.", values: [false, false, true, true] },
      { name: "Quarterly Website Progress Report", tooltip: "Diagnostic growth audit summary analyzing traffic and conversions.", values: [false, false, true, true] },
      { name: "Advanced Device Layouts", tooltip: "Fully customizable custom responsiveness for complex layouts.", values: [false, false, false, true] },
    ]
  }
];

const plans = [
  {
    name: "Web Essential",
    desc: "Perfect for startups and local businesses looking for a professional start online.",
    monthlyPrice: 15,
    originalMonthlyPrice: 65,
    yearlyPrice: 949,
    originalYearlyPrice: 999,
    setupFee: 249,
    originalSetupFee: 299,
    badge: "Startup Choice",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/10",
    popular: false,
  },
  {
    name: "Web Advanced",
    desc: "Ideal for growing brands requiring a dynamic website with custom logo design.",
    monthlyPrice: 99,
    originalMonthlyPrice: 149,
    yearlyPrice: 1949,
    originalYearlyPrice: 1999,
    setupFee: 349,
    originalSetupFee: 399,
    badge: "Best Seller",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400",
    glowColor: "shadow-emerald-500/20",
    popular: true,
  },
  {
    name: "Web Professional",
    desc: "Designed for established companies wanting explainer videos and payment gateways.",
    monthlyPrice: 149,
    originalMonthlyPrice: 199,
    yearlyPrice: 2949,
    originalYearlyPrice: 2999,
    setupFee: 449,
    originalSetupFee: 499,
    badge: "Professional choice",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-violet-500/10",
    popular: false,
  },
  {
    name: "Web Enterprise",
    desc: "Enterprise-grade digital infrastructure with complete support, high security, and extensive marketing assets.",
    monthlyPrice: 249,
    originalMonthlyPrice: 299,
    yearlyPrice: 3949,
    originalYearlyPrice: 3999,
    setupFee: 549,
    originalSetupFee: 599,
    badge: "Ultimate Scale",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
    popular: false,
  }
];

const globalCommonFeatures = [
  "Responsive Web Design for desktop, tablet, and mobile",
  "SEO-Friendly Development to improve search visibility",
  "AI Chat Feature for lead generation & visitor engagement",
  "Advanced Security with SSL protection",
  "Custom Contact Forms for easy lead capture",
  "Google Analytics & Search Console Integration",
  "Payment Gateway Integration",
  "Social Media & Business Profile Integration",
  "Web Hosting with Daily Backups",
  "24/7 Support with Dedicated Account Manager"
];

const whyOptCards = [
  {
    title: "Custom Website Design",
    desc: "Unique, brand-focused designs that set you apart.",
    icon: <Shield size={24} className="text-primary" />
  },
  {
    title: "Conversion-Focused Design",
    desc: "Layouts crafted to maximize leads and sales.",
    icon: <Flame size={24} className="text-accent-green" />
  },
  {
    title: "Affordable Packages",
    desc: "Flexible pricing suitable for startups and enterprises.",
    icon: <Info size={24} className="text-yellow-400" />
  },
  {
    title: "End-to-End Development",
    desc: "Complete solutions from design to deployment.",
    icon: <Check size={24} className="text-purple-400" />
  },
  {
    title: "Security & Performance",
    desc: "High-speed hosting with SSL and 99.9% uptime.",
    icon: <Shield size={24} className="text-blue-400" />
  }
];

const faqs = [
  {
    question: "What is included in AgileDigitalEdge web packages?",
    answer: "All the packages consist of personalized website design, optimization for search engines, AI chatbot features, web hosting, SSL encryption, daily backups, and lead generation forms."
  },
  {
    question: "How do I choose the right web package?",
    answer: "Your choice should align with your business scale and digital strategy. The Web Essential package is perfect to establish a web presence for small services. Web Advanced offers custom logo design and daily backups for growing brands. Established enterprises looking for custom development, API/Payment gateways, and explainer animations select the Web Professional or Web Enterprise package."
  },
  {
    question: "Can I upgrade my web package later?",
    answer: "Yes, our websites are designed to be scalable. You can easily upgrade to a higher tier as your traffic and feature requirements increase. The transition is managed smoothly with zero downtime."
  },
  {
    question: "Do you provide ecommerce website development?",
    answer: "Absolutely. We build specialized ecommerce platforms using Next.js, headless React architectures, or full Shopify storefronts. These are custom-configured to connect checkout platforms, payment gateways, and inventory systems."
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Yes. Every single line of code and layout structure we write is fully responsive. Your website will render beautifully and operate smoothly on mobile screens, iPads/tablets, notebooks, and large monitors."
  },
  {
    question: "Is SEO included in the web packages?",
    answer: "Yes, search engine optimization is baked into our layout generation. We write semantic code structures, implement speed loading benchmarks, compile sitemaps, construct page schemas, and connect Google indexing tools."
  },
  {
    question: "Is SEO keyword research part of the packages?",
    answer: "Yes, starting from the Essential package, we conduct custom keyword research. This helps identify high-intent query phrases to construct your headings and content mapping, ensuring your pages address target queries."
  },
  {
    question: "Are UI/UX design services provided by you?",
    answer: "Yes, our team manages the entire UX research, wireframing, layout creation, and visual brand prototyping directly before writing clean code, ensuring design standards align with your vision."
  },
  {
    question: "Will I get to control my website immediately after launching?",
    answer: "Yes. We hand over administrative control of your portal via a user-friendly CMS dashboard, letting you edit text, upload media, post blogs, and update listing parameters without technical knowledge."
  },
  {
    question: "Is website maintenance part of your services?",
    answer: "Yes. All web packages contain monthly/annual maintenance support allocations. You can utilize these hours for custom scripting changes, design adjustments, layout updates, or security configuration maintenance."
  }
];

export default function WebPackages() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
  const [activeFaq, setActiveFaq] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP page intro animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".packages-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".pricing-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Calculate annual rate
  const getPlanPrice = (plan) => {
    if (billingCycle === "yearly") {
      return {
        total: plan.yearlyPrice,
        monthlyAvg: Math.round((plan.yearlyPrice / 12) * 100) / 100,
        saving: plan.originalYearlyPrice - plan.yearlyPrice // $50 saving
      };
    }
    return { total: plan.monthlyPrice };
  };

  const getOriginalPlanPrice = (plan) => {
    if (billingCycle === "yearly") {
      return plan.originalYearlyPrice;
    }
    return plan.originalMonthlyPrice;
  };

  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-black text-white">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent-blue/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 packages-header opacity-0">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-green bg-emerald-500/10 border border-emerald-500/20 inline-block mb-4">
            Exclusive Promo Applied
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Web Design Packages
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Premium, high-performance web development solutions tailored to grow your digital authority.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-full flex items-center">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${billingCycle === "monthly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${billingCycle === "yearly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Yearly Billing
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent-green text-black animate-pulse">
                  Save Big!
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {plans.map((plan) => {
            const pricing = getPlanPrice(plan);
            const originalPrice = getOriginalPlanPrice(plan);

            return (
              <div
                key={plan.name}
                className={`pricing-card opacity-0 rounded-3xl p-8 border flex flex-col relative transition-all duration-500 hover:scale-[1.03] group ${plan.popular
                  ? `${plan.borderColor} bg-white/[0.07] ${plan.glowColor} shadow-xl scale-[1.02]`
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
              >
                {/* Popular Glow / Ribbon */}
                {plan.popular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black bg-gradient-to-r from-accent-green to-primary shadow-lg">
                    {plan.badge}
                  </span>
                )}
                {!plan.popular && (
                  <span className="absolute top-4 right-6 text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
                    {plan.badge}
                  </span>
                )}

                {/* Plan Title */}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{plan.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 h-12 overflow-hidden">{plan.desc}</p>

                {/* Plan Pricing */}
                <div className="mb-6 flex flex-col justify-end">
                  {billingCycle === "monthly" ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        {/* Discount display */}
                        <span className="text-gray-500 text-lg line-through font-semibold">${plan.originalMonthlyPrice}</span>
                        <span className="text-5xl font-extrabold text-white tracking-tight">${plan.monthlyPrice}</span>
                        <span className="text-gray-400 text-sm">/mo</span>
                      </div>
                      {/* <p className="text-xs text-accent-green font-semibold mt-1">✓ Lifetime Discount Applied (-$50/mo)</p> */}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-500 text-lg line-through font-semibold">${originalPrice}</span>
                        <span className="text-5xl font-extrabold text-white tracking-tight">${pricing.total}</span>
                        <span className="text-gray-400 text-sm">/yr</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {/* Equivalent to <span className="text-white font-bold">${pricing.monthlyAvg}/mo</span> */}
                      </p>
                      {/* <p className="text-xs text-accent-green font-semibold mt-1">✓ Lifetime Discount Applied (-$50/yr)</p> */}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 text-center block ${plan.popular
                    ? "bg-gradient-to-r from-primary to-accent-green hover:shadow-lg hover:shadow-accent-green/10 text-black font-bold"
                    : "bg-white/10 hover:bg-white/15 text-white hover:border-white/30 border border-white/5"
                    }`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Compare Features &amp; Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dive deep into technical specifications and features included in each design package to find the perfect fit.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-6 px-6 font-semibold text-white text-base w-[30%]">Plan Specifications</th>
                  {plans.map((p) => (
                    <th key={p.name} className="py-6 px-6 font-bold text-center w-[17.5%]">
                      <div className="flex flex-col items-center">
                        <span className="text-white text-sm uppercase tracking-wider">{p.name}</span>
                        <span className="text-accent-green font-bold text-base mt-1">
                          {billingCycle === "monthly" ? `$${p.monthlyPrice}/mo` : `$${p.yearlyPrice}/yr`}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((category) => (
                  <Fragment key={category.category}>
                    {/* Category Title Row */}
                    <tr className="bg-white/[0.03] border-b border-white/5">
                      <td colSpan={5} className="py-4 px-6 font-bold text-xs uppercase tracking-widest text-primary">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feat) => (
                      <tr key={feat.name} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-300 flex items-center gap-2 group cursor-help">
                          {feat.name}
                          <div className="relative inline-block">
                            <Info size={13} className="text-gray-500 hover:text-white transition-colors" />
                            {/* Hover Tooltip */}
                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-gray-900 border border-white/10 text-xs text-gray-300 p-3 rounded-xl shadow-xl z-50">
                              {feat.tooltip}
                            </div>
                          </div>
                        </td>
                        {feat.values.map((val, idx) => (
                          <td key={idx} className="py-4 px-6 text-center">
                            {typeof val === "boolean" ? (
                              val ? (
                                <div className="flex justify-center text-accent-green">
                                  <Check size={20} className="stroke-[3]" />
                                </div>
                              ) : (
                                <div className="flex justify-center text-red-500/50">
                                  <X size={18} />
                                </div>
                              )
                            ) : (
                              <div className="flex flex-col items-center">
                                {/* Discount details in comparison table */}
                                {feat.name === "Setup Fee" ? (
                                  <div className="flex items-center gap-1.5 justify-center">
                                    <span className="text-xs text-gray-500 line-through">{feat.originalValues[idx]}</span>
                                    <span className="font-bold text-white">{val}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-200 font-semibold">{val}</span>
                                )}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NEW: Included Features (Common to all packages) Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              FEATURES THAT ARE COMMON TO ALL PACKAGES
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every package includes powerful features designed to enhance performance, security, and user experience across all devices.
            </p>
          </div>

          <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-bold text-center text-white mb-8 bg-gradient-to-r from-primary to-accent-green bg-clip-text text-transparent uppercase tracking-wider">
              Included Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {globalCommonFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                  <span className="text-gray-300 font-medium text-sm leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEW: Why Opt for AgileDigitalEdge Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Why Opt for AgileDigitalEdge&apos;s Web Design Services?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AgileDigitalEdge delivers modern, secure, and conversion-driven websites that help businesses grow faster online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyOptCards.slice(0, 3).map((card, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
            {/* Center the bottom two cards on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2 lg:col-span-3 lg:w-[67%] lg:mx-auto">
              {whyOptCards.slice(3).map((card, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our web design services and agreements.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                    : "border-white/5 bg-white/[0.02]"
                    }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className={`w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none transition-colors ${isOpen ? "bg-white/5" : "hover:bg-white/[0.01]"
                      }`}
                  >
                    <span className="font-bold text-white text-base md:text-lg flex items-center gap-3">
                      <span className="text-primary font-extrabold text-lg">.</span>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <span className="text-white text-lg font-bold">×</span>
                    ) : (
                      <span className="text-gray-400 text-lg font-bold">+</span>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="pb-6 px-6 pt-3 text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/5 mt-1 ml-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-t from-primary/10 to-transparent border border-white/5 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-6">
            Ready to Launch Your Premium Site?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Let&apos;s build a stunning digital experience that increases customer trust, ranks on page one of Google, and scales with your business goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?plan=Web%20Advanced"
              className="px-8 py-4 bg-primary rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.03] text-base"
            >
              Start Free Consultation
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 text-base"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
