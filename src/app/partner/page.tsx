"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Sprout, Heart, ArrowRight, Network, TrendingUp, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PartnerExperience() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(
      ".reveal-up",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".opportunity-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <main className="bg-bewell-ivory overflow-hidden">
      
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bewell-text">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/network.png"
            alt="Futuristic Community Network"
            fill
            className="object-cover mix-blend-screen"
            priority
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-7xl font-medium text-white tracking-tight mb-6"
          >
            Share Wellness. <br /> Grow Together.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-xl text-white/80 font-light leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            A modern, elegant rewards ecosystem. Every customer has the opportunity to build a community, share trusted products, and create a supplemental income stream.
          </motion.p>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto opportunity-grid">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-up">
          <h2 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6">Customer to Partner</h2>
          <h3 className="text-4xl font-medium text-bewell-text mb-6">A natural progression of trust.</h3>
          <p className="text-xl text-bewell-muted font-light leading-relaxed">
            The BeWell Partner Program is not about aggressive sales. It's about organically sharing the lifestyle improvements you've already experienced.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-bewell-green/20 -z-10"></div>
          
          {[
            { icon: Heart, step: "01", title: "Experience", desc: "Start as a customer. Discover the profound impact our pure, botanical products have on your daily well-being." },
            { icon: Globe, step: "02", title: "Share organically", desc: "Recommend BeWell to friends and family through personalized digital links and authentic conversations." },
            { icon: TrendingUp, step: "03", title: "Earn & Grow", desc: "Receive transparent commissions on every order placed through your network, building a sustainable income." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm reveal-up border border-black/5 relative">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-bewell-green text-white rounded-full flex items-center justify-center font-medium text-lg shadow-lg">
                {item.step}
              </div>
              <div className="mt-4 mb-6">
                <item.icon className="w-8 h-8 text-bewell-gold" />
              </div>
              <h4 className="text-2xl font-medium text-bewell-text mb-4">{item.title}</h4>
              <p className="text-bewell-muted font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Ecosystem Section */}
      <section className="py-32 bg-bewell-text relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none">
           <Image src="/images/human_connection.png" alt="Collaborative Growth" fill className="object-cover mix-blend-overlay" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl">
            <Network className="w-10 h-10 text-bewell-gold mb-8 reveal-up" />
            <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 reveal-up">
              Passive community commerce, redefined.
            </h2>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-6 reveal-up">
              We've stripped away the complexity. Our digital-first partner dashboard tracks your ecosystem growth in real-time, offering insights, community engagement tools, and clear rewards tracking.
            </p>
            <ul className="space-y-6 mb-12 reveal-up text-white/80 font-light">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-bewell-gold mt-2"></div>
                <p>No monthly minimums or inventory required.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-bewell-gold mt-2"></div>
                <p>Customer retention tracked and rewarded indefinitely.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-bewell-gold mt-2"></div>
                <p>Access to leadership and wellness coaching retreats.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center px-6 reveal-up">
        <h2 className="text-4xl md:text-5xl font-medium text-bewell-text mb-8">
          Ready to build your ecosystem?
        </h2>
        <p className="text-xl text-bewell-muted font-light max-w-2xl mx-auto mb-10">
          Join a collective of individuals dedicated to improving their lives and the lives of those around them.
        </p>
        <Link href="/dashboard" className="inline-block bg-bewell-green text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-bewell-text transition-colors shadow-lg hover:shadow-xl">
          Apply to the Partner Program
        </Link>
      </section>

    </main>
  );
}
