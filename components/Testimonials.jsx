"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "The custom Shopify app they built automated our entire inventory sync process. We've saved countless hours every week.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Jenkins",
    role: "Shopify Store Owner",
  },
  {
    text: "Their full-stack expertise helped us migrate from a legacy system to a modern Next.js architecture seamlessly.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Chen",
    role: "CTO",
  },
  {
    text: "Exceptional attention to detail on our e-commerce redesign. Our conversion rates jumped by 40% within the first month.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Rodriguez",
    role: "Marketing Director",
  },
  {
    text: "They understood our complex requirements for a custom payment gateway integration and delivered a secure, robust solution.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Park",
    role: "Technical Lead",
  },
  {
    text: "The speed and performance of the new web application are incredible. It handles our high traffic volume without a hitch.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Jessica Thompson",
    role: "Startup Founder",
  },
  {
    text: "A true partner in our digital transformation. Their insights into Shopify's ecosystem helped us leverage hidden features.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Olivia Patel",
    role: "E-commerce Manager",
  },
  {
    text: "Professional, communicative, and technically brilliant. The React dashboard they built is intuitive and powerful.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Robert Wilson",
    role: "Product Manager",
  },
  {
    text: "We needed a custom plugin for our detailed product customization, and they nailed it. Our customers love the new interface.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sophia Martinez",
    role: "Business Owner",
  },
  {
    text: "From the initial wireframes to the final deployment, the web development process was transparent and efficient.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "James O'Connor",
    role: "Digital Strategist",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-transparent py-20 relative overflow-hidden">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-center text-gray-400 text-lg">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialsColumn = (props) => {
  const { className, testimonials, duration } = props;

  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg max-w-xs w-full hover:bg-white/10 transition-colors duration-300"
                key={i}
              >
                <div className="text-gray-300 mb-6 leading-relaxed">
                  &quot;{text}&quot;
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full border border-white/10"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-white tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 text-gray-400 text-sm tracking-tight mt-1">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;
