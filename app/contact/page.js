"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.consent) {
    //   setStatus({
    //     type: "error",
    //     message: "Please agree to the privacy policy to continue.",
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! We'll be in touch.",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
          consent: false,
        });
      } else {
        setStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="pt-46 pb-20 min-h-screen relative overflow-hidden"
    >
      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3 contact-anim">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let&apos;s Talk
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Is your website collecting dust on page two of Google? It&apos;s
              time to change that. Let&apos;s connect and make it happen.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <Mail />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-400">hello@agiledigitaledge.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary shrink-0">
                  <Phone />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                  <p className="text-gray-400">+91 88102 27237</p>
                  <p className="text-gray-400">+(561) 327-7682</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent-blue shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-400">
                    Tower A, Urbtech Trade Centre, A-319, Noida, Uttar Pradesh
                    201301
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 contact-anim">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Full Name"
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Services
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Branding">Branding</option>
                    <option value="SEO">SEO</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Budget
                    </option>
                    <option value="< $5k">&lt; $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $20k">$10k - $20k</option>
                    <option value="$20k - $50k">$20k - $50k</option>
                    <option value="> $50k">&gt; $50k</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"
                  rows="4"
                  className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder-gray-500"
                ></textarea>
              </div>

              <div className="mb-8 flex items-start">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  id="consent"
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="consent"
                  className="ml-3 text-xs text-gray-400 leading-relaxed"
                >
                  By checking this box, you agree to receive SMS messages from
                  Agile Digital Edge related to conversation purposes. You may
                  reply STOP to opt out at any time. Reply HELP for assistance.
                  Messages and data rates may apply. Message frequency will
                  vary, please visit our{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {status && (
                <div
                  className={`mb-6 text-center text-sm font-medium ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] flex justify-center items-center group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
