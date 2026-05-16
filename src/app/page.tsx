"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Leaf, Heart, Sparkles, Users } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Soft fade up reveal
    const revealElements = document.querySelectorAll(".bright-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    // Elegant parallax on product image
    if (showcaseRef.current) {
      gsap.to(".parallax-product", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  return (
    <main className="bg-[#faf9f6] text-[#2c3329] overflow-hidden selection:bg-[#8a9a86] selection:text-white">
      
      {/* SECTION 1 — BRIGHT HERO */}
      <section ref={heroRef} className="relative min-h-[90vh] w-full flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-[#f3ede3] to-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pt-12 md:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#8a9a86]/20 text-[#4a5c44] text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-[#c5a975]" /> Clean. Organic. Essential.
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-[#1a3b2b] leading-[1.1]">
              Better Life <br /> for Everyone.
            </h1>
            <p className="text-xl text-[#5c6356] font-light leading-relaxed mb-10 max-w-lg">
              Premium wellness, skincare, and lifestyle products designed to support healthier living and stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="bg-[#1a3b2b] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c5440] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/5 hover:shadow-xl">
                Explore Products <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/community" className="bg-white border border-[#d9d0c1] text-[#1a3b2b] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#f3ede3] transition-colors flex items-center justify-center">
                Join Community
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: heroY }}
            className="relative h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <Image
              src="/images/bright_hero.png"
              alt="Premium organic skincare floating"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WELLNESS LIFESTYLE */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 relative h-[600px] rounded-3xl overflow-hidden bright-reveal">
            <Image
              src="/images/bright_lifestyle.png"
              alt="Happy healthy family morning routine"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5">
            <Leaf className="w-8 h-8 text-[#8a9a86] mb-8 bright-reveal" />
            <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 text-[#1a3b2b] bright-reveal">
              Wellness is a daily practice.
            </h2>
            <p className="text-lg text-[#5c6356] font-light leading-relaxed mb-6 bright-reveal">
              We believe that self-care should be effortless and joyful. Our organic formulations integrate seamlessly into your busy life, bringing moments of calm to your morning routine.
            </p>
            <p className="text-lg text-[#5c6356] font-light leading-relaxed bright-reveal">
              From pure botanical cleansers to nutritional support, every product is crafted to nourish you and your family safely.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PRODUCT EXPERIENCE */}
      <section className="py-32 bg-[#f3ede3] rounded-[3rem] mx-4 md:mx-12 my-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
          <h2 className="text-sm uppercase tracking-widest text-[#c5a975] font-semibold mb-4 bright-reveal">The Ecosystem</h2>
          <h3 className="text-4xl md:text-5xl font-medium text-[#1a3b2b] bright-reveal">Curated for your well-being.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12">
          {[
            { title: "Skin Care", desc: "Hydrating serums and gentle cleansers.", img: "/images/detail.png" },
            { title: "Wellness", desc: "Daily nutritional support for modern life.", img: "/images/bright_product.png" },
            { title: "Home", desc: "Safe, clean essentials for your sanctuary.", img: "/images/catalog.png" }
          ].map((item, i) => (
            <Link href={`/products/${i + 1}`} key={i} className="group bright-reveal block">
              <div className="bg-[#faf9f6] p-4 rounded-3xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl shadow-sm border border-black/5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#f3ede3]">
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-4 pb-4">
                  <h4 className="text-2xl font-medium text-[#1a3b2b] mb-2">{item.title}</h4>
                  <p className="text-[#5c6356] font-light">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16 bright-reveal">
           <Link href="/products" className="inline-flex items-center gap-2 text-[#1a3b2b] font-medium border-b border-[#1a3b2b] pb-1 hover:text-[#8a9a86] hover:border-[#8a9a86] transition-colors">
             View Complete Catalog <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      {/* SECTION 4 — COMMUNITY & GROWTH */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl shadow-[#8a9a86]/5 border border-[#8a9a86]/10 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 bright-reveal">
            <div className="w-16 h-16 bg-[#f3ede3] rounded-full flex items-center justify-center mb-8">
              <Users className="w-8 h-8 text-[#8a9a86]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1a3b2b] leading-tight mb-6">
              Share wellness. <br/>Grow together.
            </h2>
            <p className="text-lg text-[#5c6356] font-light leading-relaxed mb-8">
              We grow organically through the trusted recommendations of our community. By sharing the products you already love, you can build a meaningful supplemental income. No pressure, just shared value.
            </p>
            <Link href="/partner" className="bg-[#f3ede3] text-[#1a3b2b] px-8 py-4 rounded-full font-medium hover:bg-[#8a9a86] hover:text-white transition-colors inline-block">
              Learn About Partnering
            </Link>
          </div>
          <div className="flex-1 relative aspect-square w-full rounded-[2rem] overflow-hidden bright-reveal">
            <Image src="/images/human_connection.png" alt="Community connection" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRODUCT STORYTELLING */}
      <section ref={showcaseRef} className="py-32 bg-[#8a9a86] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[700px] w-full rounded-3xl overflow-hidden bright-reveal">
            <Image src="/images/bright_product.png" alt="Herbal infusion serum" fill className="object-cover parallax-product scale-110" />
          </div>
          <div className="bright-reveal">
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-[#f3ede3]">Pure Ingredients</h2>
            <h3 className="text-4xl md:text-6xl font-medium leading-[1.1] mb-8">
              Crafted from nature, perfected by science.
            </h3>
            <p className="text-xl font-light text-white/90 leading-relaxed mb-6">
              Every drop of our Herbal Infusion Serum is packed with hand-harvested calendula and nettle to soothe, repair, and protect your skin's natural barrier.
            </p>
            <ul className="space-y-4 font-light text-white/80">
              <li className="flex items-center gap-3"><Heart className="w-5 h-5 text-[#f3ede3]" /> 100% Plant-Based Formulation</li>
              <li className="flex items-center gap-3"><Heart className="w-5 h-5 text-[#f3ede3]" /> Free of Synthetic Fragrances</li>
              <li className="flex items-center gap-3"><Heart className="w-5 h-5 text-[#f3ede3]" /> Cruelty-Free & Dermatologist Tested</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="mb-16 bright-reveal">
          <Heart className="w-10 h-10 text-[#c5a975] mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-light text-[#1a3b2b] leading-relaxed">
             "Finding BeWell completely changed how I look at my family's daily habits. The transparency, the quality, and the community support are truly unmatched."
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4 bright-reveal">
          <div className="w-14 h-14 rounded-full bg-[#f3ede3] relative overflow-hidden">
            <Image src="/images/hero.png" alt="Sarah" fill className="object-cover" />
          </div>
          <div className="text-left">
            <h4 className="font-medium text-[#1a3b2b]">Sarah Jenkins</h4>
            <p className="text-sm text-[#5c6356]">Mother & Brand Partner</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="py-32 bg-[#faf9f6] border-t border-[#f3ede3]">
        <div className="max-w-4xl mx-auto text-center px-6 bright-reveal">
          <h2 className="text-5xl md:text-6xl font-medium text-[#1a3b2b] mb-8">
            Start your better life journey.
          </h2>
          <p className="text-xl text-[#5c6356] font-light mb-12">
            Experience the difference of premium, thoughtfully crafted products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-[#1a3b2b] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#8a9a86] transition-colors shadow-lg">
              Shop Now
            </Link>
            <Link href="/dashboard" className="bg-white border border-[#d9d0c1] text-[#1a3b2b] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#f3ede3] transition-colors">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
