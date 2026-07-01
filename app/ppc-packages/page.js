"use client";
import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { Check, X, Info, Flame, Shield, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

const plans = [
  {
    name: "PPC Essential",
    desc: "Perfect for local services and small businesses looking to run small search campaigns.",
    monthlyPrice: 349,
    originalMonthlyPrice: 399,
    yearlyPrice: 3940,
    originalYearlyPrice: 3990,
    setupFee: 150,
    originalSetupFee: 200,
    badge: "Startup Tier",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/10",
    popular: false,
  },
  {
    name: "PPC Advanced",
    desc: "Ideal for growing brands targeting leads across search platforms.",
    monthlyPrice: 549,
    originalMonthlyPrice: 599,
    yearlyPrice: 5940,
    originalYearlyPrice: 5990,
    setupFee: 300,
    originalSetupFee: 350,
    badge: "Best Seller",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400",
    glowColor: "shadow-emerald-500/20",
    popular: true,
  },
  {
    name: "PPC Professional",
    desc: "Designed for established brands seeking advanced multi-network campaigns.",
    monthlyPrice: 749,
    originalMonthlyPrice: 799,
    yearlyPrice: 7940,
    originalYearlyPrice: 7990,
    setupFee: 450,
    originalSetupFee: 500,
    badge: "Multi-Platform Choice",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-violet-500/10",
    popular: false,
  },
  {
    name: "PPC Enterprise",
    desc: "National or e-commerce scaling campaign budgets requiring extensive display/remarketing structures.",
    monthlyPrice: 949,
    originalMonthlyPrice: 999,
    yearlyPrice: 9940,
    originalYearlyPrice: 9990,
    setupFee: 700,
    originalSetupFee: 750,
    badge: "Market Leader",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
    popular: false,
  }
];

const comparisonCategories = [
  {
    category: "PPC Core Parameters",
    features: [
      { name: "Setup Fee", tooltip: "One-time onboarding campaign design and keyword grouping configurations.", values: ["$150", "$300", "$450", "$700"], originalValues: ["$200", "$350", "$500", "$750"] },
      { name: "10 Days Free Trial!", tooltip: "Complimentary setup trial monitoring optimization before committing.", values: [true, true, true, true] },
      { name: "Advertising Budget /month", tooltip: "Recommended monthly budget ranges spent directly on ad networks.", values: ["$500 - $2999", "$3000 - $4999", "$5000 - $7500", "$7500 - $10000"] },
      { name: "Full Optimizations per month", tooltip: "Number of full tactical reviews and negative keyword filtering cycles.", values: ["1 Optimization", "2 Optimizations", "3 Optimizations", "5 Optimizations"] },
      { name: "Ad Groups Configured", tooltip: "Number of categorized keyword thematic groupings built.", values: ["Up to 5", "Up to 10", "Up to 20", "Up to 40"] },
      { name: "Ads per Ad Group", tooltip: "Written ad copy variations mapped for testing search response.", values: ["Up to 2 (No A/B)", "Up to 3 (No A/B)", "Up to 4 Ads", "Up to 6 Ads"] },
      { name: "Target Keywords", tooltip: "Number of high-intent search phrases targeted in campaigns.", values: ["Up to 50", "Up to 100", "Up to 200", "Up to 750"] },
      { name: "Negative Keywords", tooltip: "Filtering search keywords that trigger ads to prevent wasted budget.", values: [true, true, true, true] },
      { name: "Conversion Tracking", tooltip: "GA4 event mapping measuring form entries, calls, or sales.", values: [true, true, true, true] },
      { name: "Monthly Reporting", tooltip: "Monthly summary audits detailing impressions, CTR, CPC, and conversion ROI.", values: [true, true, true, true] },
      { name: "Ad Networks supported", tooltip: "Targeted platforms displaying search or social placements.", values: ["Google", "Google", "Google, Yahoo & LinkedIn", "Google, Yahoo, Facebook & LinkedIn"] },
      { name: "Mobile Ads", tooltip: "Custom mobile device extensions targeting phone users.", values: [false, false, false, true] },
      { name: "Call Extensions", tooltip: "Direct phone contact buttons configured beneath search listings.", values: [true, true, true, true] },
      { name: "Sitelink Extensions", tooltip: "Deep-linking subpages below core ads to boost CTR.", values: [true, true, true, true] },
      { name: "Remarketing Campaigns", tooltip: "Re-serving banners to past web traffic to drive return visits.", values: [false, true, true, true] },
      { name: "Monthly Conference Calls", tooltip: "Strategy calls detailing metrics performance review.", values: [false, true, true, true] },
      { name: "Display/Image Ads", tooltip: "Custom graphic banner creations deployed across network display targets.", values: [false, false, false, "Up to 2 / month"] },
    ]
  }
];

const comprehensiveFeatures = [
  {
    title: "Conversion Tracking",
    desc: "Assess every click's success through precise measurements and analytics.",
    icon: <Shield size={24} className="text-primary" />
  },
  {
    title: "Negative Keywords",
    desc: "Filter out unqualified visitors and eliminate wasted ad spend.",
    icon: <Flame size={24} className="text-accent-green" />
  },
  {
    title: "Monthly Reporting",
    desc: "Crystal clear view of your campaign's performance metrics.",
    icon: <Info size={24} className="text-yellow-400" />
  },
  {
    title: "Mobile Ads",
    desc: "Connect with your audience seamlessly on all mobile devices.",
    icon: <Check size={24} className="text-purple-400" />
  },
  {
    title: "Call & Sitelink Extensions",
    desc: "Foster direct interaction and increase engagement rates.",
    icon: <Shield size={24} className="text-blue-400" />
  },
  {
    title: "Remarketing",
    desc: "Re-engage potential buyers who have visited your website.",
    icon: <Flame size={24} className="text-emerald-400" />
  },
  {
    title: "Display/Image Ads",
    desc: "Up to 2 custom ads monthly to enhance brand visibility.",
    icon: <Info size={24} className="text-cyan-400" />
  },
  {
    title: "Monthly Strategy Calls",
    desc: "Discuss results, tactics, and explore new opportunities.",
    icon: <Check size={24} className="text-indigo-400" />
  }
];

const partnerBenefits = [
  "Personalized campaigns meticulously built around your specific business goals and target audience.",
  "Professional management across Google, Facebook, Instagram, LinkedIn, and Yahoo platforms.",
  "Transparent and affordable PPC plans with no hidden fees or surprise charges.",
  "Data-driven optimization strategies for achieving the highest possible conversion rates.",
  "Dedicated support team providing monthly strategy discussions and ongoing consultation."
];

const faqs = [
  {
    question: "What is included in AgileDigitalEdge PPC packages?",
    answer: "The packages include campaign setup, keyword research, ad creation, conversion tracking, negative keyword filtering, remarketing setup, sitelink/call extensions, and detailed reporting."
  },
  {
    question: "How do I choose the right PPC package?",
    answer: "Choose depending on your monthly ad spend budget. PPC Essential is ideal for local services spending $500-$2999/mo on search keywords. PPC Advanced supports ad budgets up to $4999/mo with remarketing. Professional and Enterprise scale budgets up to $10,000/mo and manage campaigns across Google, Yahoo, Facebook, and LinkedIn."
  },
  {
    question: "Can I upgrade my PPC package later?",
    answer: "Yes, as your ad budget grows, you can seamlessly scale your package to accommodate more ad groups, keywords, and networks. Our team handles transition configurations with no downtime."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we provide a 10-day complimentary trial across all packages. This includes onboarding campaign structures and keyword mapping to let you experience our optimization strategies before committing."
  },
  {
    question: "Which platforms are supported in each package?",
    answer: "Essential and Advanced support Google Ads. Professional adds Yahoo and LinkedIn. Enterprise adds Google, Yahoo, Facebook, and LinkedIn for complete multi-network campaigns."
  },
  {
    question: "How is campaign success measured?",
    answer: "Success is monitored via conversion rates, click-through rates (CTR), cost-per-acquisition (CPA), and overall return on ad spend (ROAS). All data is compiled in GA4 and sent in monthly reports."
  },
  {
    question: "Are display and image ads included?",
    answer: "Yes, the PPC Enterprise package includes up to 2 custom graphic display/image banner designs per month deployed across display network targets."
  },
  {
    question: "Can AgileDigitalEdge manage campaigns for small businesses?",
    answer: "Absolutely. We specialize in configuring local search campaigns on tighter budgets, optimizing negative keywords, and local targeting to ensure high conversion rates."
  },
  {
    question: "Do you provide monthly reports?",
    answer: "Yes, all plans include monthly reporting. We send detailed updates analyzing click rates, conversion costs, and recommendations for ad budget changes."
  },
  {
    question: "How quickly can I start generating leads?",
    answer: "PPC campaigns launch immediately after creation and approvals (typically 3-5 business days). Once active, you will begin seeing search clicks and inbound leads within 24 to 48 hours."
  }
];

export default function PpcPackages() {
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
            Pay-Per-Click Marketing Campaigns
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent animate-pulse">
            PPC Packages
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
            Depending on your company&apos;s objectives, we have four different and flexible PPC packages. The use of a 10-day complimentary trial is included in all packages to allow you to test our skilled PPC campaign management before making a commitment.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {plans.map((plan) => {
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
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-500 text-lg line-through font-semibold">${plan.originalMonthlyPrice}</span>
                      <span className="text-5xl font-extrabold text-white tracking-tight">${plan.monthlyPrice}</span>
                    </div>
                  </div>
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
              Dive deep into technical specifications and features included in each PPC package.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-6 px-6 font-semibold text-white text-base w-[30%]">Plan Specifications</th>
                  {plans.map((p) => {
                    return (
                      <th key={p.name} className="py-6 px-6 font-bold text-center w-[17.5%]">
                        <div className="flex flex-col items-center">
                          <span className="text-white text-sm uppercase tracking-wider">{p.name}</span>
                          <span className="text-accent-green font-bold text-base mt-1">
                            ${p.monthlyPrice}/mo
                          </span>
                        </div>
                      </th>
                    );
                  })}
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

        {/* Section: AgileDigitalEdge PPC Services Grid */}
        <div className="mb-24 rounded-3xl p-8 md:p-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border border-white/10">
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-green bg-emerald-500/10 border border-emerald-500/20 inline-block mb-4">
              Premium PPC Solutions
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              AgileDigitalEdge PPC Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform Your Digital Advertising with Expert PPC Management &amp; Data-Driven Strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comprehensiveFeatures.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner Section */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Why Partner with AgileDigitalEdge?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Our PPC marketing agency is laser-focused on lead generation and maximizing your return on investment. AgileDigitalEdge delivers unmatched value through:
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-white/[0.01] border border-white/5">
            {partnerBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <p className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our Pay-Per-Click management agreements.</p>
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
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Join hundreds of businesses that trust AgileDigitalEdge to manage their PPC campaigns and drive measurable results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?plan=PPC%20Advanced"
              className="px-8 py-4 bg-primary rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.03] text-base"
            >
              Start 10 Days Free Trial
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
