"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, X, Info, Flame, Shield, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Pricing data containing both USD and GBP
const plans = [
  {
    name: "SEO Essential",
    desc: "Perfect for local services and small businesses looking to establish search engine visibility.",
    monthlyPriceUSD: 349,
    originalMonthlyPriceUSD: 399,
    monthlyPriceGBP: 269,
    originalMonthlyPriceGBP: 319,
    yearlyPriceUSD: 4738,
    originalYearlyPriceUSD: 4788,
    yearlyPriceGBP: 3779,
    originalYearlyPriceGBP: 3829,
    badge: "Local Starter",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/10",
    popular: false,
  },
  {
    name: "SEO Advanced",
    desc: "Ideal for growing brands looking to capture local search rankings and analyze competitors.",
    monthlyPriceUSD: 649,
    originalMonthlyPriceUSD: 699,
    monthlyPriceGBP: 509,
    originalMonthlyPriceGBP: 559,
    yearlyPriceUSD: 8338,
    originalYearlyPriceUSD: 8388,
    yearlyPriceGBP: 6659,
    originalYearlyPriceGBP: 6709,
    badge: "Best Seller",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400",
    glowColor: "shadow-emerald-500/20",
    popular: true,
  },
  {
    name: "SEO Professional",
    desc: "Designed for established brands seeking Generative Engine Optimization (GEO) and AI chat readiness.",
    monthlyPriceUSD: 949,
    originalMonthlyPriceUSD: 999,
    monthlyPriceGBP: 749,
    originalMonthlyPriceGBP: 799,
    yearlyPriceUSD: 11938,
    originalYearlyPriceUSD: 11988,
    yearlyPriceGBP: 9539,
    originalYearlyPriceGBP: 9589,
    badge: "AI & GEO Ready",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-violet-500/10",
    popular: false,
  },
  {
    name: "SEO Enterprise",
    desc: "Ultimate scale campaigns for national or enterprise e-commerce portals requiring full optimization.",
    monthlyPriceUSD: 1449,
    originalMonthlyPriceUSD: 1499,
    monthlyPriceGBP: 1149,
    originalMonthlyPriceGBP: 1199,
    yearlyPriceUSD: 17938,
    originalYearlyPriceUSD: 17988,
    yearlyPriceGBP: 14339,
    originalYearlyPriceGBP: 14389,
    badge: "Market Leader",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
    popular: false,
  }
];

const tabList = [
  { id: "core", label: "Core Features" },
  { id: "on-page", label: "On-Page SEO" },
  { id: "off-page", label: "Off-Page SEO" },
  { id: "social", label: "Social Media" },
  { id: "reports", label: "Reports" },
  { id: "support", label: "Support" }
];

const comparisonCategories = [
  {
    id: "core",
    category: "Core Features & AI Optimization",
    features: [
      { name: "Keywords Targeted", tooltip: "Number of high-intent search terms tracked and optimized.", values: ["25 Keywords", "40 Keywords", "60 Keywords", "100 Keywords"] },
      { name: "Quality Backlinks (Monthly)", tooltip: "High-DA backlink acquisitions earned for domain authority.", values: ["30 Links", "50 Links", "70 Links", "100 Links"] },
      { name: "Landing Pages Created", tooltip: "Custom design landing templates mapped for target keywords.", values: ["5 Pages", "10 Pages", "15 Pages", "30 Pages"] },
      { name: "G.E.O (Generative Engine Optimization)", tooltip: "Optimize content to render inside Google's AI Overviews.", values: [false, false, true, true] },
      { name: "A.E.O (Answer Engine Optimization)", tooltip: "Structuring pages to reply directly to schema questions.", values: [false, false, true, true] },
      { name: "Voice Search Optimization", tooltip: "Target conversational voice queries (Siri, Alexa, Google).", values: [false, false, true, true] },
      { name: "PAA (People Also Ask) Targeting", tooltip: "Optimizing header copy to rank on Google PAA dropdown panels.", values: [false, false, true, true] },
      { name: "Optimized for ChatGPT / Gemini", tooltip: "Structure semantic text vectors matching AI citation crawlers.", values: [false, false, true, true] },
      { name: "Google Business Profile", tooltip: "Local business verification listing, citation and optimization setup.", values: [false, true, true, true] },
      { name: "Pre-Optimization Website Analysis", tooltip: "Technical diagnostics crawling search ranking issues.", values: [true, true, true, true] },
      { name: "Competitor Analysis", tooltip: "Auditing competitor search volume, keywords and layout hooks.", values: [false, true, true, true] },
      { name: "Keyword Research & Analysis", tooltip: "Analyzing keyword volume, CPC, difficulty and intent map.", values: [true, true, true, true] },
      { name: "Conversational Optimization", tooltip: "Optimizing long-tail question patterns matching semantic intent.", values: [true, true, true, true] },
      { name: "Content Audit for AI-Readiness", tooltip: "Evaluating reading indices and factual clarity for AI LLMs.", values: [true, true, true, true] },
      { name: "Baseline Ranking Reports", tooltip: "Initial ranking snapshot taken before launching campaigns.", values: [true, true, true, true] },
      { name: "Duplicate Content Analysis", tooltip: "Auditing site duplication conflicts to prevent ranking penalties.", values: [false, true, true, true] },
      { name: "Google Penalty Auditing", tooltip: "Auditing spam backlinks to recover from algorithmic drops.", values: [false, true, true, true] },
      { name: "Backlink Profile Analysis", tooltip: "Analyzing the authority score and spam flags of existing links.", values: [false, true, true, true] },
    ]
  },
  {
    id: "on-page",
    category: "On-Page Optimization",
    features: [
      { name: "Canonical", tooltip: "Setting canonical tags to solve duplicate page conflicts.", values: [true, true, true, true] },
      { name: "Website Responsive", tooltip: "Verifying layout adjusts dynamically to all screen formats.", values: [true, true, true, true] },
      { name: "Title Tag Optimization", tooltip: "Optimizing page titles to improve search indexing relevance.", values: [true, true, true, true] },
      { name: "Meta Tags Optimization", tooltip: "Writing rich descriptions targeted for click-through rate.", values: [true, true, true, true] },
      { name: "Heading Tags Optimization", tooltip: "Structuring H1-H6 headers logically to match keywords.", values: [true, true, true, true] },
      { name: "Image ALT Tags Optimization", tooltip: "Describing product images in HTML for search index mapping.", values: [true, true, true, true] },
      { name: "Content Optimization", tooltip: "Edits to keyword densities and semantic contexts.", values: [true, true, true, true] },
      { name: "SEO Friendly URL Setup", tooltip: "Cleaning URL paths for easier readability by bots.", values: [true, true, true, true] },
      { name: "Site Navigation, 404, Broken Links, Speed, etc.", tooltip: "General technical checks resolving broken paths and visual load blocks.", values: [true, true, true, true] },
      { name: "Google Search Console & Analytics Setup", tooltip: "Configuring sitemaps tracking user activity variables.", values: [true, true, true, true] },
      { name: "Hyperlink Optimization", tooltip: "Optimizing internal and external links layout.", values: [false, false, true, true] },
      { name: "FAQ & How-To content strategy", tooltip: "Creating instructional FAQ layouts capturing long-tail query answers.", values: [false, false, false, true] },
      { name: "Schema markup for FAQ, HowTo, Local Business, Products", tooltip: "Writing structured schemas indexing rich snippets.", values: [false, false, false, true] },
      { name: "Semantic SEO & Topic Cluster Optimization", tooltip: "Grouping related search concepts to establish industry authority.", values: [false, false, false, true] },
      { name: "Conversational keyword research", tooltip: "Researching conversational question queries for voice searches.", values: [false, false, false, true] },
      { name: "On-Site Blog Posting (Monthly)", tooltip: "Writing and posting optimized blogs on your CMS directly.", values: ["2 Posts", "3 Posts", "4 Posts", "5 Posts"] },
    ]
  },
  {
    id: "off-page",
    category: "Off-Page Optimization",
    features: [
      { name: "Search Engine Submission (Manual)", tooltip: "Submitting new URLs manually inside webmaster tools.", values: [true, true, true, true] },
      { name: "Article Writing", tooltip: "Writing unique copy for publishing on offsite blogs.", values: ["1", "2", "3", "4"] },
      { name: "Article Submission", tooltip: "Acquiring backlinks by publishing articles on directory platforms.", values: ["1", "2", "3", "4"] },
      { name: "Article Marketing", tooltip: "Sharing and promoting articles across document databases.", values: ["3", "3", "4", "8"] },
      { name: "Classified Submissions", tooltip: "Posting localized ads in citation directories.", values: ["4", "6", "8", "10"] },
      { name: "Business Listings", tooltip: "NAP verification submissions on listing indexes.", values: ["2", "3", "4", "5"] },
      { name: "Blog Creation (One-Time)", tooltip: "Setting up dedicated off-site blog assets.", values: ["1", "2", "3", "4"] },
      { name: "Blog Writing", tooltip: "Writing blog copy for off-site link profiles.", values: ["1", "2", "3", "4"] },
      { name: "Blog Posting", tooltip: "Publishing blog posts to link profiles regularly.", values: ["1", "2", "3", "4"] },
      { name: "Blog Marketing", tooltip: "Promoting off-site blog assets to increase page rank indicators.", values: ["4", "4", "6", "8"] },
      { name: "Third-Party Blog Pinging", tooltip: "Pinging search bots to accelerate index capture of link paths.", values: [true, true, true, true] },
      { name: "PDF Posting", tooltip: "Uploading informational PDFs containing link anchors.", values: [true, true, true, true] },
      { name: "Image Sharing", tooltip: "Publishing custom graphical assets to image databases.", values: ["1", "2", "3", "4"] },
      { name: "Social Bookmarking", tooltip: "Submitting paths to social networks to signal crawl activity.", values: ["3", "5", "8", "12"] },
      { name: "Profile Creation", tooltip: "Setting up profile credentials on niche portals.", values: ["3", "4", "4", "5"] },
      { name: "Product Listing (eCommerce)", tooltip: "Syncing product details and images to commercial indexes.", values: ["1", "2", "3", "4"] },
      { name: "Video Marketing", tooltip: "Posting promotional clips to video search engines.", values: ["3", "4", "6", "8"] },
      { name: "OSB Marketing", tooltip: "Submitting link metrics and profiles to directory nodes.", values: ["2", "4", "6", "8"] },
      { name: "Quora Q&A", tooltip: "Answering relevant customer questions on Quora with backlink citations.", values: ["1", "2", "3", "4"] },
      { name: "Guest Posts", tooltip: "High-value articles published on third-party niche blogs.", values: ["2", "3", "4", "6"] },
      { name: "Infographic Submission", tooltip: "Submitting infographics with linking attributes.", values: [false, "1", "2", "3"] },
      { name: "Micro Blogging", tooltip: "Shorter post distribution to blogging networks.", values: [false, "1", "2", "3"] },
      { name: "Press Release (Paid)", tooltip: "Distributing PR content across news outlets.", values: [false, "1", "1", "2"] },
      { name: "Monthly FAQ Blog Posts", tooltip: "Publishing detailed question-answering blog formats.", values: [false, false, false, true] },
      { name: "Voice-friendly content writing", tooltip: "Optimizing text styles for audio search readers.", values: [false, false, false, true] },
      { name: "Content refresh for GEO visibility", tooltip: "Updating posts to rank inside generative AI citations.", values: [false, false, false, true] },
      { name: "Reddit Posting", tooltip: "Sharing helpful details on Reddit communities.", values: [false, "1", "2", "3"] },
      { name: "Web 2.0 Submission", tooltip: "Constructing high-quality mini sites on Web 2.0 networks.", values: [false, false, "1", "2"] },
      { name: "PPT Submission", tooltip: "Formatting and listing slides on sharing databases.", values: [false, "1", "2", "3"] },
    ]
  },
  {
    id: "social",
    category: "Social Media Optimization",
    features: [
      { name: "Facebook", tooltip: "Custom design posts published to your Facebook feed.", values: [false, "4 Posts/mo", "8 Posts/mo", "16 Posts/mo"] },
      { name: "Instagram", tooltip: "Content updates and graphic cards posted to Instagram.", values: [false, "4 Posts/mo", "8 Posts/mo", "16 Posts/mo"] },
      { name: "Twitter", tooltip: "Micro-blog updates and post links shared on Twitter.", values: [false, "4 Posts/mo", "8 Posts/mo", "16 Posts/mo"] },
      { name: "LinkedIn", tooltip: "Professional business updates shared on your LinkedIn profile.", values: [false, "4 Posts/mo", "8 Posts/mo", "16 Posts/mo"] },
    ]
  },
  {
    id: "reports",
    category: "Reporting & Analytics",
    features: [
      { name: "Monthly SEO & Keywords Ranking Report", tooltip: "General ranking tracking updates sent every month.", values: [true, true, true, true] },
      { name: "Bi-Monthly SEO & Keywords Ranking Report", tooltip: "Bi-weekly mid-month ranking audits.", values: [false, true, true, true] },
      { name: "Weekly SEO & Keywords Ranking Report", tooltip: "Weekly status sheets analyzing ranking performance shifts.", values: [false, false, true, true] },
      { name: "Daily SEO & Keywords Ranking Report", tooltip: "Daily rank scans showing search trends dynamically.", values: [false, false, false, true] },
    ]
  },
  {
    id: "support",
    category: "Customer Support",
    features: [
      { name: "Email & Phone", tooltip: "Direct phone and email contact routes for prompt support.", values: [true, true, true, true] },
      { name: "Dedicated Project Manager", tooltip: "Assigned project manager coordinating strategy and deliverables.", values: [false, true, true, true] },
      { name: "Monthly Progress Virtual Meeting", tooltip: "Monthly review meeting checking progress and planning milestones.", values: [true, true, true, true] },
      { name: "Weekly Progress Virtual Meeting", tooltip: "Weekly sync meeting to discuss active sprint optimizations.", values: [false, false, true, true] },
    ]
  }
];

const faqs = [
  {
    question: "Do you provide monthly SEO packages?",
    answer: "Yes. We provide monthly SEO packages/retainers. You can pay for your ongoing SEO services each month depending on your package."
  },
  {
    question: "Do you offer SEO packages for small businesses?",
    answer: "Yes. Our SEO Essential package is specifically created to match the budgets and scaling goals of small services and local startups looking to rank."
  },
  {
    question: "What are your SEO reporting capabilities?",
    answer: "We send out detailed monthly performance summaries tracking keyword rank progress, visitor volume gains, link audits, and goal tracking. Our Professional and Enterprise clients also receive a live Looker Studio dashboard."
  },
  {
    question: "Can you handle local SEO?",
    answer: "Yes, local SEO is standard starting from the Advanced package. We claim NAP citations, optimize your Google Business Profile, build local directories, and target geographical query tags."
  },
  {
    question: "Do you offer one-time SEO services?",
    answer: "While we can conduct one-off audit setups, search algorithms change and competitors acquire backlinks continuously. SEO is an ongoing strategy, which is why we suggest monthly packages."
  },
  {
    question: "How long does it take to see SEO results?",
    answer: "Most campaigns show initial search impressions and query rankings within 3 to 6 months. High-competition keywords in crowded industries can take 6 to 12 months."
  },
  {
    question: "Do you provide content creation for SEO?",
    answer: "Yes, our team creates keyword-focused copy, article drafts, and landing pages designed to fulfill search intent and rank efficiently on Google."
  },
  {
    question: "Can you optimize e-commerce websites?",
    answer: "Yes, we handle e-commerce SEO audits including Product structured schemas, checkout flow velocity checks, navigation index cleanups, and category optimization."
  },
  {
    question: "Do you offer link-building services?",
    answer: "Yes, high-quality guest blogging, citation building, bookmarking, and local business listing setups are included in all packages to drive domain rating."
  }
];

export default function SeoPackages() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
  const [currency, setCurrency] = useState("USD"); // "USD" or "GBP"
  const [activeTab, setActiveTab] = useState("core");
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

  const getPlanPrice = (plan) => {
    const isYearly = billingCycle === "yearly";
    const isUSD = currency === "USD";

    if (isYearly) {
      return {
        total: isUSD ? plan.yearlyPriceUSD : plan.yearlyPriceGBP,
        original: isUSD ? plan.originalYearlyPriceUSD : plan.originalYearlyPriceGBP,
        symbol: isUSD ? "$" : "£",
        suffix: "/yr",
        saving: isUSD
          ? plan.originalYearlyPriceUSD - plan.yearlyPriceUSD
          : plan.originalYearlyPriceGBP - plan.yearlyPriceGBP,
        monthlyAvg: Math.round(((isUSD ? plan.yearlyPriceUSD : plan.yearlyPriceGBP) / 12) * 100) / 100
      };
    }

    return {
      total: isUSD ? plan.monthlyPriceUSD : plan.monthlyPriceGBP,
      original: isUSD ? plan.originalMonthlyPriceUSD : plan.originalMonthlyPriceGBP,
      symbol: isUSD ? "$" : "£",
      suffix: "/mo",
      saving: isUSD
        ? plan.originalMonthlyPriceUSD - plan.monthlyPriceUSD
        : plan.originalMonthlyPriceGBP - plan.monthlyPriceGBP
    };
  };

  const currentCategory = comparisonCategories.find((cat) => cat.id === activeTab) || comparisonCategories[0];

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
            SEO Optimization Retainers
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Explore SEO Packages
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Select the Plan That&apos;s Right for You and Get Started
          </p>

          {/* Controls Panel (Toggles) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">

            {/* Billing Switch */}
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-full flex items-center">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${billingCycle === "monthly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${billingCycle === "yearly"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Yearly
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-accent-green text-black animate-pulse">
                  Save 20%+
                </span>
              </button>
            </div>

            {/* Currency Switch */}
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-full flex items-center">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${currency === "USD"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("GBP")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${currency === "GBP"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                GBP (£)
              </button>
            </div>
          </div>

          {/* Annual Upfront Banner */}
          <AnimatePresence mode="wait">
            {billingCycle === "yearly" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 via-accent-green/20 to-primary/20 border border-primary/30 py-3 px-8 rounded-full text-sm font-medium text-white max-w-lg mx-auto"
              >
                <Flame size={16} className="text-accent-green" />
                <span><strong>PAY UPFRONT FOR 10 MONTHS</strong> &amp; GET 12 MONTHS OF SERVICE FREE!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {plans.map((plan) => {
            const pricing = getPlanPrice(plan);

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
                      <span className="text-gray-500 text-lg line-through font-semibold">
                        {pricing.symbol}{pricing.original}
                      </span>
                      <span className="text-5xl font-extrabold text-white tracking-tight">
                        {pricing.symbol}{pricing.total}
                      </span>
                      <span className="text-gray-400 text-sm">{pricing.suffix}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-xs text-gray-400 mt-1">
                        Equivalent to <span className="text-white font-bold">{pricing.symbol}{pricing.monthlyAvg}/mo</span>
                      </p>
                    )}
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
              Select a category tab below to view our granular capabilities.
            </p>
          </div>

          {/* Category Tabs list */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto">
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

          {/* Dynamic Tabbed comparison table */}
          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-6 px-6 font-semibold text-white text-base w-[30%]">
                    {currentCategory.category}
                  </th>
                  {plans.map((p) => {
                    const pricing = getPlanPrice(p);
                    return (
                      <th key={p.name} className="py-6 px-6 font-bold text-center w-[17.5%]">
                        <div className="flex flex-col items-center">
                          <span className="text-white text-sm uppercase tracking-wider">{p.name}</span>
                          <span className="text-accent-green font-bold text-base mt-1">
                            {pricing.symbol}{pricing.total}{pricing.suffix}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {currentCategory.features.map((feat) => (
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Global SEO Features Info Banner */}
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
            <h3 className="text-xl font-bold text-center text-white mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase tracking-wider">
              Included Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">Responsive Web Optimization for mobile formats</span>
              </div>
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">Basic sitemap mapping and search-engine indexation ready</span>
              </div>
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">On-Page semantic HTML structured markup optimization</span>
              </div>
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">Core sitemap compilation and robots index controls</span>
              </div>
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">Custom keyword targeting & long-tail search intent research</span>
              </div>
              <div className="flex items-start gap-4">
                <Check size={18} className="text-accent-green shrink-0 mt-1 stroke-[3]" />
                <span className="text-gray-300 font-medium text-sm leading-relaxed">Google Analytics 4 event tagging configurations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Opt Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Why Opt for AgileDigitalEdge&apos;s SEO Services?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AgileDigitalEdge delivers modern, secure, and conversion-driven optimization that helps businesses grow faster online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <Shield size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Custom SEO Strategy</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Unique, brand-focused campaigns that set you apart.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <Flame size={24} className="text-accent-green" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Conversion-Focused Keywords</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Layouts and metadata crafted to maximize traffic leads.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                <Info size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Affordable Retainers</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Flexible pricing suitable for startups and enterprises.</p>
            </div>
            {/* Center the bottom two cards on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2 lg:col-span-3 lg:w-[67%] lg:mx-auto">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  <Check size={24} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">End-to-End Execution</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Complete organic campaigns from analysis to backlink growth.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  <Shield size={24} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Security &amp; White Hat Tactics</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Ethical, penalty-free backlinking methods that build trust.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our search engine optimization services.</p>
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
            Ready to Build Organic Dominance?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Let&apos;s build a custom search strategy that ranks your brand on page one, captures high-intent traffic, and grows sales retainers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?plan=SEO%20Advanced"
              className="px-8 py-4 bg-primary rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.03] text-base"
            >
              Start Free Audit
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
