"use client";
import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { Check, X, Info, Flame, Shield, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

const plans = [
  {
    name: "SMO Essential",
    desc: "Perfect for small businesses starting their social media branding journey.",
    monthlyPrice: 150,
    originalMonthlyPrice: 200,
    badge: "Branding Tier",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/10",
    popular: false,
  },
  {
    name: "SMO Advanced",
    desc: "Ideal for growing brands targeting engagement and sales via promotions.",
    monthlyPrice: 250,
    originalMonthlyPrice: 300,
    badge: "Best Seller",
    borderColor: "border-emerald-400",
    glowColor: "shadow-emerald-500/20",
    popular: true,
  },
  {
    name: "SMO Enterprise",
    desc: "Comprehensive strategy including organic postings, paid ads, and remarketing.",
    monthlyPrice: 350,
    originalMonthlyPrice: 400,
    badge: "Market Leader",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
    popular: false,
  }
];

const tabList = [
  { id: "period", label: "Period*" },
  { id: "organic", label: "Organic Promotion" },
  { id: "paid", label: "Paid Promotion" },
  { id: "remarketing", label: "Remarketing" },
  { id: "activities", label: "SMO Activities" },
  { id: "support", label: "Customer Support" }
];

const comparisonCategories = [
  {
    id: "period",
    category: "Dedicated Project Period",
    features: [
      { name: "No. of Hours per channel", tooltip: "Hours dedicated monthly for managing and optimizing each social channel.", values: ["15 Hours", "40 Hours", "60 Hours"] }
    ]
  },
  {
    id: "organic",
    category: "Organic Promotion Capabilities",
    features: [
      { name: "Competitor analysis", tooltip: "Auditing competitor profiles, hashtag strategies, and post layouts.", values: [true, true, true] },
      { name: "Strategy Formation", tooltip: "Creating custom social posting strategies and tone guides.", values: [true, true, true] },
      { name: "Hashtag creation and promotion", tooltip: "Targeting high-traffic and niche trending hashtags.", values: [true, true, true] },
      { name: "Monthly creative creation", tooltip: "Number of graphic design cards and templates created monthly.", values: ["5 Posts", "8 Posts", "12 Posts"] },
      { name: "Monthly Postings", tooltip: "Number of actual updates posted onto your social feeds.", values: ["5 Posts", "8 Posts", "12 Posts"] },
      { name: "Analytics Tracking", tooltip: "Monitoring impression reach, click metrics, and conversion actions.", values: [true, true, true] },
      { name: "Account Management", tooltip: "Bio optimizations, header updates, and profile configuration.", values: [true, true, true] },
      { name: "Engagement with active communities and groups", tooltip: "Participating in industry-relevant social groups to build brand authority.", values: [true, true, true] },
      { name: "Monthly Reporting", tooltip: "Detailed summary report checking growth patterns and actions.", values: [true, true, true] },
      { name: "Network build-up", tooltip: "Growing target networks and organic profile connection counts.", values: [true, true, true] },
      { name: "Engagement with third-party posts", tooltip: "Interacting with industry posts to widen visual reach.", values: [true, true, true] },
      { name: "Content optimization", tooltip: "Structuring visual titles, captions, and links for search optimization.", values: [true, true, true] }
    ]
  },
  {
    id: "paid",
    category: "Paid Promotion Management",
    features: [
      { name: "Budget Estimate", tooltip: "Estimating required monthly ad spend budgets.", values: [false, true, true] },
      { name: "Setting up campaigns", tooltip: "Creating promotional campaign targets inside social ad managers.", values: [false, true, true] },
      { name: "Ad creative creation", tooltip: "Designing distinct graphic assets specifically for paid social campaigns.", values: [false, true, true] },
      { name: "Daily account optimization", tooltip: "Daily tweaks to ad delivery parameters to lower cost-per-click.", values: [false, true, true] },
      { name: "Setting up sales funnel for conversion objective", tooltip: "Creating targeted ad funnels capturing user leads directly.", values: [false, true, true] },
      { name: "Conversion tracking assisted by Google Analytics", tooltip: "Configuring pixel code integration tracking visitor outcomes.", values: [false, true, true] }
    ]
  },
  {
    id: "remarketing",
    category: "Social Remarketing Structures",
    features: [
      { name: "Creation of audience lists", tooltip: "Grouping past website visitors into remarketing groups.", values: [false, false, true] },
      { name: "Setting up campaigns", tooltip: "Deploying targeted retargeting banners to past visitors.", values: [false, false, true] },
      { name: "Ad creative creation", tooltip: "Designing unique banner card creatives for retargeting.", values: [false, false, true] },
      { name: "Daily account optimization", tooltip: "Daily bid and layout tweaks optimizing conversion rates.", values: [false, false, true] },
      { name: "Setting up sales funnel for conversion objective", tooltip: "Building a secondary funnel capturing return leads.", values: [false, false, true] },
      { name: "Conversion tracking assisted by Google Analytics", tooltip: "Setting up dedicated GA4 tracking variables.", values: [false, false, true] }
    ]
  },
  {
    id: "activities",
    category: "Social Media Optimization Activities",
    features: [
      { name: "Monthly report generation with insights", tooltip: "Review document tracking follower growth, impressions, and clicks.", values: [true, true, true] },
      { name: "Next month's line of action", tooltip: "Providing details of post structures, hashtags, and topics for the upcoming month.", values: [true, true, true] }
    ]
  },
  {
    id: "support",
    category: "Customer Support",
    features: [
      { name: "Email", tooltip: "Direct email contact routes for prompt support.", values: [true, true, true] },
      { name: "Phone", tooltip: "Direct phone contact routes for quick issue resolutions.", values: [true, true, true] },
      { name: "Chat", tooltip: "Direct Slack or WhatsApp chat channels for real-time team response.", values: [true, true, true] }
    ]
  }
];

const faqs = [
  {
    question: "What is included in AgileDigitalEdge SMO packages?",
    answer: "All packages come with services that include organic promotion, paid social campaigns, remarketing, content creation, analytics tracking, and account management."
  },
  {
    question: "How do I choose the right SMO package?",
    answer: "Choosing the right package depends on your business goals and channels. SMO Essential is perfect for organic growth and baseline postings. SMO Advanced adds paid promotion management, while SMO Enterprise introduces comprehensive remarketing campaigns and audience list setup."
  },
  {
    question: "Can AgileDigitalEdge manage all social media platforms?",
    answer: "Yes, we optimize campaigns across all major platforms including Facebook, Instagram, LinkedIn, Twitter (X), Pinterest, and YouTube, depending on where your target audience is most active."
  },
  {
    question: "Is paid promotion included in all SMO packages?",
    answer: "Paid promotion setup, strategy, and daily ad optimization are included in our SMO Advanced and SMO Enterprise packages. It is not included in the Essential package."
  },
  {
    question: "Will campaign performance be tracked by you?",
    answer: "Yes, we monitor all social media metrics including profile visits, click-through rates, impressions, follower growth, and conversions using tracking tags and analytics tools."
  },
  {
    question: "Will you be making content for social media posts?",
    answer: "Absolutely. Our content creation team designs custom visual graphics, captions, and hashtag clusters tailored to your brand voice for monthly publishing."
  },
  {
    question: "Do you provide hashtag strategy services?",
    answer: "Yes, hashtag research, category grouping, and custom campaign hashtag optimization are included in all of our organic promotion strategies."
  },
  {
    question: "Are remarketing campaigns part of the package?",
    answer: "Yes, social retargeting and audience remarketing list setups are included as part of the SMO Enterprise package."
  },
  {
    question: "How often will posts be published?",
    answer: "Post publishing frequency depends on the package: Essential includes 5 posts/mo, Advanced includes 8 posts/mo, and Enterprise includes 12 posts/mo."
  },
  {
    question: "Can I get support if I have questions?",
    answer: "Yes, all plans include email, phone, and chat support. Higher tiers also feature a dedicated SMO account manager and direct WhatsApp/Slack communication channels."
  }
];

export default function SmoPackages() {
  const [activeTab, setActiveTab] = useState("period");
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
            Social Media Optimization Retainers
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            SMO Packages
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
            We provide three SMO packages that are flexible and tailored to achieve various business objectives. Organic growth, paid advertising, and retargeting are some of the options AgileDigitalEdge can offer you the perfect solution for.
          </p>
          <p className="text-base text-accent-green font-bold max-w-2xl mx-auto leading-relaxed">
            Select the Plan That&apos;s Right for You and Get Started
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan) => {
            return (
              <div
                key={plan.name}
                className={`pricing-card opacity-0 rounded-3xl p-8 border flex flex-col relative transition-all duration-500 hover:scale-[1.03] group ${plan.popular
                  ? "border-emerald-400 bg-white/[0.07] shadow-xl shadow-emerald-500/20 scale-[1.02]"
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

        {/* Tabbed Comparison Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">Capabilities &amp; Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Compare detail setups included in each SMO tier. Use the tabs below to browse categories.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 ${activeTab === tab.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-6 px-6 font-semibold text-white text-base w-[40%]">Features</th>
                  {plans.map((p) => (
                    <th key={p.name} className="py-6 px-6 font-bold text-center w-[20%]">
                      <div className="flex flex-col items-center">
                        <span className="text-white text-sm uppercase tracking-wider">{p.name}</span>
                        <span className="text-accent-green font-bold text-base mt-1">
                          ${p.monthlyPrice}/mo
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCategories
                  .filter((cat) => cat.id === activeTab)
                  .map((category) => (
                    <Fragment key={category.id}>
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
                                <span className="text-gray-200 font-semibold">{val}</span>
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
          <div className="mt-4 px-6 text-xs text-gray-400 font-medium italic">
            *If the project is not an eCommerce project, an alternative activity will be provided in place of product listing.
          </div>
        </div>

        {/* Why Choose SMO Optimization Section */}
        <div className="mb-24 rounded-3xl p-8 md:p-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border border-white/10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-green bg-emerald-500/10 border border-emerald-500/20 inline-block mb-4">
              AgileDigitalEdge Value
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Why Choose AgileDigitalEdge for Social Media Optimization?
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="text-white font-bold">Best SMO Company</span> – Providing accurate reporting on engagement and conversions.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="text-white font-bold">Custom SMO Packages</span> – Tailored for small businesses, startups, and enterprises.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="text-white font-bold">Organic + Paid Techniques</span> – Mixed strategy for maximum ROI and reach.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="text-white font-bold">Professional Social Media Management</span> – Complete account handling, creative design, and audience engagement.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="text-white font-bold">Affordable SMO Packages</span> – Clear pricing with no hidden costs or surprises.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-display">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our Social Media Optimization packages.</p>
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
                        <div className="pb-6 px-6 pt-3 text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/5 mt-1 ml-4 font-medium">
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Embark on a Journey of Professional SMO Services
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            The SMO packages offered by AgileDigitalEdge increase your social media presence, interaction, and potential customers. Select a plan, begin branding your business with a carefully planned marketing strategy, and see your business flourish.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?plan=SMO%20Advanced"
              className="px-8 py-4 bg-primary rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.03] text-base"
            >
              Get Your Free SMO Proposal Now
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 text-base"
            >
              See Our Case Studies
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
