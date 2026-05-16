"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Sprout, Heart, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Community() {
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
          trigger: ".community-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <main className="bg-bewell-ivory overflow-hidden">
      
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src="/images/community_page.png"
            alt="Modern wellness community"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-7xl font-medium text-white tracking-tight mb-6"
          >
            A Ecosystem of <br /> Shared Value.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-xl text-white/90 font-light leading-relaxed"
          >
            We believe that wellness is not a solo journey. It is meant to be shared, cultivated, and celebrated together.
          </motion.p>
        </div>
      </section>

      {/* The Model */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto community-grid">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-up">
          <h2 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6">Our Philosophy</h2>
          <h3 className="text-4xl font-medium text-bewell-text mb-6">Real trust over traditional marketing.</h3>
          <p className="text-xl text-bewell-muted font-light leading-relaxed">
            Instead of spending millions on conventional advertising, we invest in our customers. We reward you for sharing the products that have transformed your life, creating an organic network of trusted recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Heart, title: "Authentic Sharing", desc: "Share what you genuinely love. No pressure, no quotas. Just honest experiences." },
            { icon: Sprout, title: "Growing Together", desc: "Earn rewards and build a supplemental income stream simply by expanding the community." },
            { icon: Users, title: "Supportive Network", desc: "Join a community of like-minded individuals focused on health, balance, and mutual success." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm reveal-up border border-black/5">
              <div className="w-14 h-14 bg-bewell-beige rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-bewell-green" />
              </div>
              <h4 className="text-2xl font-medium text-bewell-text mb-4">{item.title}</h4>
              <p className="text-bewell-muted font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Call to Action */}
      <section className="py-32 bg-bewell-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium text-bewell-text leading-tight mb-8">
              Become a Brand Partner.
            </h2>
            <p className="text-xl text-bewell-muted font-light leading-relaxed mb-10">
              Integrate BeWell into your lifestyle and turn your passion for wellness into purpose. Gain access to exclusive training, early product releases, and a transparent compensation structure designed for modern living.
            </p>
            <Link href="/dashboard" className="w-fit bg-bewell-green text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-bewell-text transition-colors flex items-center gap-2">
              Apply to Partner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image src="/images/hero.png" alt="Partner Lifestyle" fill className="object-cover" />
          </div>
        </div>
      </section>

    </main>
  );
}
