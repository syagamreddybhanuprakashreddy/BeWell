"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MoveRight } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const lifestyleRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up reveal animation for texts
    const revealElements = document.querySelectorAll(".luxury-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    // Horizontal Scroll for Product Showcase
    if (horizontalRef.current) {
      gsap.to(horizontalRef.current, {
        x: "-66.66vw",
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-container",
          pin: true,
          scrub: 1,
          end: "+=2500",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#0a0a0a] text-white overflow-hidden selection:bg-[#0d2b1f] selection:text-[#b39c6d]">
      
      {/* SECTION 1 — CINEMATIC HERO */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="/images/luxury_hero.png"
            alt="Ultra-luxurious wellness products"
            fill
            className="object-cover object-center scale-105 transform transition-transform duration-[30s] hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-6 text-white drop-shadow-2xl">
              Better Life <br /> <span className="font-serif italic text-[#b39c6d]">for Everyone.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Premium wellness, lifestyle, and community-driven growth. Designed for the modern visionary.
            </p>
            <Link href="/products" className="inline-flex items-center gap-4 border border-white/20 bg-white/5 backdrop-blur-md px-10 py-5 rounded-full text-lg text-white hover:bg-white hover:text-black transition-all duration-500 group">
              Explore the Ecosystem <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-white"
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — LIFESTYLE EXPERIENCE */}
      <section ref={lifestyleRef} className="py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#b39c6d] font-semibold mb-8 luxury-reveal">The Philosophy</h2>
            <h3 className="text-5xl md:text-7xl font-light leading-[1.1] mb-10 luxury-reveal">
              Elevate your <br/><span className="font-serif italic text-white/60">daily ritual.</span>
            </h3>
            <p className="text-2xl text-white/50 font-light leading-relaxed mb-8 luxury-reveal">
              True luxury is found in the purity of our ingredients and the intention behind our routines. 
            </p>
            <p className="text-lg text-white/40 font-light leading-relaxed luxury-reveal">
              We merge cutting-edge botanical science with elegant design to create an environment where wellness is not a chore, but an immersive aesthetic experience.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden luxury-reveal shadow-2xl">
            <Image
              src="/images/luxury_lifestyle.png"
              alt="Luxury healthy lifestyle"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-[#0d2b1f] mix-blend-overlay opacity-20"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 5 — IMMERSIVE PRODUCT SHOWCASE (Horizontal Scroll) */}
      <section className="h-screen bg-[#111111] flex flex-col justify-center overflow-hidden horizontal-container relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent h-40 z-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full absolute top-32 z-20">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#b39c6d] font-semibold luxury-reveal">The Collection</h2>
        </div>
        
        <div className="flex w-[300vw] h-[70vh] px-6 md:px-12 gap-12 items-center" ref={horizontalRef}>
          {/* Card 1 */}
          <div className="w-[80vw] h-full relative group shrink-0 border border-white/5 bg-[#0a0a0a] overflow-hidden rounded-sm flex items-center justify-center">
             <Image src="/images/luxury_product.png" alt="Aurelia Serum" fill className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
             <div className="absolute bottom-16 left-16 z-10">
               <h3 className="text-6xl font-light mb-4">Revitalizing Serum</h3>
               <p className="text-xl text-[#b39c6d] font-serif italic mb-8">Skin Care</p>
               <Link href="/products/1" className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors">Discover Formula</Link>
             </div>
          </div>
          {/* Card 2 */}
          <div className="w-[80vw] h-full relative group shrink-0 border border-white/5 bg-[#0a0a0a] overflow-hidden rounded-sm flex items-center justify-center">
             <Image src="/images/skincare.png" alt="Botanical Wash" fill className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
             <div className="absolute bottom-16 left-16 z-10">
               <h3 className="text-6xl font-light mb-4">Botanical Cleanse</h3>
               <p className="text-xl text-[#b39c6d] font-serif italic mb-8">Body Care</p>
               <Link href="/products/2" className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors">Discover Formula</Link>
             </div>
          </div>
          {/* Card 3 */}
          <div className="w-[80vw] h-full relative group shrink-0 border border-white/5 bg-[#0a0a0a] overflow-hidden rounded-sm flex items-center justify-center">
             <Image src="/images/wellness.png" alt="Aura Elixir" fill className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
             <div className="absolute bottom-16 left-16 z-10">
               <h3 className="text-6xl font-light mb-4">Aura Elixir</h3>
               <p className="text-xl text-[#b39c6d] font-serif italic mb-8">Nutrition</p>
               <Link href="/products/3" className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors">Discover Formula</Link>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMMUNITY GROWTH */}
      <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/images/network.png" alt="Network" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#b39c6d] font-semibold mb-8 luxury-reveal">The Ecosystem</h2>
              <h3 className="text-5xl md:text-7xl font-light leading-[1.1] mb-10 luxury-reveal">
                Share wellness. <br/><span className="font-serif italic text-white/60">Grow together.</span>
              </h3>
              <p className="text-2xl text-white/50 font-light leading-relaxed mb-12 luxury-reveal max-w-xl">
                A modern architecture for collaborative commerce. We reward authentic connections, transforming your lifestyle choices into a beautifully designed earning opportunity.
              </p>
              <Link href="/partner" className="inline-flex items-center gap-4 text-[#b39c6d] text-xl group luxury-reveal">
                Enter the Partner Network
                <MoveRight className="w-6 h-6 transform transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
            <div className="flex-1 relative aspect-square w-full rounded-full overflow-hidden luxury-reveal border border-white/10 shadow-[0_0_100px_rgba(13,43,31,0.5)]">
               <Image src="/images/human_connection.png" alt="Collaborative Growth" fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIAL EXPERIENCE */}
      <section className="py-40 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-light leading-snug luxury-reveal text-white/80">
            "It is rare to find a brand that speaks to aesthetics, purity, and financial empowerment with such <span className="font-serif italic text-[#b39c6d]">unapologetic elegance</span>."
          </h2>
          <div className="mt-12 luxury-reveal">
            <p className="text-sm tracking-widest uppercase text-white/40">Isabella M. — Brand Partner</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL EXPERIENCE */}
      <section className="py-40 bg-[#0d2b1f] relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/luxury_hero.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-light text-white mb-10 luxury-reveal">
            The future of wellness <br/> <span className="font-serif italic text-[#b39c6d]">starts with connection.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 luxury-reveal">
            <Link href="/products" className="bg-white text-black px-12 py-5 rounded-sm text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#b39c6d] hover:text-white transition-colors duration-500">
              Shop the Collection
            </Link>
            <Link href="/community" className="bg-transparent border border-white/30 text-white px-12 py-5 rounded-sm text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-colors duration-500">
              Join the Community
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
