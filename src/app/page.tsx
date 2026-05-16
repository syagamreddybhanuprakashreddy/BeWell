"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Leaf, Heart, Sparkles, Users, Droplets } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Floating products follow mouse slightly
      gsap.to(".mouse-parallax", {
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
        ease: "power2.out",
        duration: 1
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // Advanced Text Reveals
    const splitTexts = document.querySelectorAll(".cinematic-text");
    splitTexts.forEach((text) => {
      gsap.fromTo(
        text,
        { y: 100, opacity: 0, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: text,
            start: "top 90%",
          },
        }
      );
    });

    // Pinned Storytelling Sequence
    if (storyRef.current && imageStackRef.current) {
      const storyImages = gsap.utils.toArray('.story-image') as HTMLElement[];
      const storyTexts = gsap.utils.toArray('.story-text') as HTMLElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          pin: true,
          start: "top top",
          end: "+=3000",
          scrub: 1,
        }
      });

      storyTexts.forEach((text, i) => {
        if (i > 0) {
          tl.to(storyImages[i - 1], { opacity: 0, scale: 1.1, duration: 1 }, i * 2)
            .to(storyImages[i], { opacity: 1, scale: 1, duration: 1 }, i * 2)
            .to(storyTexts[i - 1], { opacity: 0, y: -50, duration: 1 }, i * 2)
            .fromTo(text, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, i * 2);
        }
      });
    }

    // Parallax on Ecosystem Cards
    const cards = document.querySelectorAll('.ecosystem-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ecosystem-container",
            start: "top 80%",
          },
          delay: i * 0.2
        }
      );
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const heroScale = useTransform(smoothScrollY, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothScrollY, [0, 0.2], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, 0.2], [0, -100]);

  return (
    <main ref={containerRef} className="bg-[#faf9f6] text-[#2c3329] overflow-hidden selection:bg-[#8a9a86] selection:text-white">
      
      {/* Custom Cursor Overlay */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#8a9a86] pointer-events-none z-[100] hidden md:block mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#1a3b2b] pointer-events-none z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 1000, damping: 40 }}
      />

      {/* SECTION 1 — CINEMATIC BRIGHT HERO */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-[#f3ede3] via-[#faf9f6] to-[#faf9f6]">
        {/* Ambient Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
           {[...Array(15)].map((_, i) => (
             <motion.div 
               key={i}
               className="absolute w-2 h-2 rounded-full bg-[#8a9a86]"
               initial={{ 
                 x: Math.random() * 100 + "vw", 
                 y: Math.random() * 100 + "vh",
                 opacity: Math.random() * 0.5 + 0.2
               }}
               animate={{ 
                 y: [null, "-100vh"],
                 x: [null, Math.random() * 50 - 25 + "vw"]
               }}
               transition={{ 
                 duration: Math.random() * 20 + 10,
                 repeat: Infinity,
                 ease: "linear"
               }}
             />
           ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center z-10 relative">
          <motion.div style={{ y: textY, opacity: heroOpacity }} className="pt-12 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-[#8a9a86]/20 text-[#2c4c3b] text-sm font-medium mb-10 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#c5a975]" /> Cinematic Wellness Experience
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 text-[#1a3b2b] leading-[1.05]">
              <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>Better Life</motion.span></span>
              <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>for Everyone.</motion.span></span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl text-[#5c6356] font-light leading-relaxed mb-12 max-w-lg"
            >
              Premium wellness, skincare, and lifestyle products designed to elevate your daily ritual.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/products" className="group relative overflow-hidden bg-[#1a3b2b] text-white px-10 py-5 rounded-full text-lg font-medium flex items-center justify-center gap-3 shadow-[0_10px_40px_-10px_rgba(26,59,43,0.5)]">
                <span className="relative z-10 flex items-center gap-2">Explore Ecosystem <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-[#2c5440] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="relative h-[70vh] w-full mouse-parallax flex justify-center items-center"
          >
            {/* Soft glowing orb behind product */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-radial from-white to-transparent rounded-full opacity-60 blur-3xl mix-blend-overlay"></div>
            
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/bright_hero.png"
                alt="Premium organic skincare floating"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#8a9a86]">Scroll</span>
          <div className="w-[1px] h-12 bg-[#8a9a86]/30 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#1a3b2b]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — PINNED STORYTELLING EXPERIENCES */}
      <section ref={storyRef} className="h-screen w-full flex items-center bg-[#faf9f6] overflow-hidden relative border-t border-[#f3ede3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[70vh] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5" ref={imageStackRef}>
            <Image src="/images/bright_lifestyle.png" alt="Morning Routine" fill className="object-cover story-image opacity-100" />
            <Image src="/images/bright_product.png" alt="Ingredients" fill className="object-cover story-image opacity-0 scale-110" />
            <Image src="/images/catalog.png" alt="Clean Home" fill className="object-cover story-image opacity-0 scale-110" />
          </div>

          <div className="relative h-[50vh] flex flex-col justify-center">
            {/* Story 1 */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full story-text opacity-100">
              <Leaf className="w-10 h-10 text-[#8a9a86] mb-8" />
              <h2 className="text-5xl font-medium text-[#1a3b2b] leading-[1.1] mb-6">Elevate your daily ritual.</h2>
              <p className="text-xl text-[#5c6356] font-light leading-relaxed">
                We believe that self-care should be an effortless aesthetic experience. Formulations that integrate seamlessly into your busy life, bringing moments of calm and clarity.
              </p>
            </div>
            
            {/* Story 2 */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full story-text opacity-0">
              <Droplets className="w-10 h-10 text-[#c5a975] mb-8" />
              <h2 className="text-5xl font-medium text-[#1a3b2b] leading-[1.1] mb-6">Nature's finest architecture.</h2>
              <p className="text-xl text-[#5c6356] font-light leading-relaxed">
                Hand-harvested botanicals cold-pressed to retain their natural potency. Every ingredient is ethically sourced, scientifically proven, and luxuriously crafted.
              </p>
            </div>

            {/* Story 3 */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full story-text opacity-0">
              <Heart className="w-10 h-10 text-[#8a9a86] mb-8" />
              <h2 className="text-5xl font-medium text-[#1a3b2b] leading-[1.1] mb-6">Safe for your sanctuary.</h2>
              <p className="text-xl text-[#5c6356] font-light leading-relaxed">
                Complete transparency. From our pure skincare lines to our home essentials, everything is completely free from synthetic disruptions. True wellness, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTERACTIVE PRODUCT ECOSYSTEM */}
      <section className="py-40 bg-[#f3ede3] relative rounded-t-[4rem] -mt-10 z-20 ecosystem-container overflow-hidden">
        {/* Soft glowing ambient backgrounds */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/40 to-transparent pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24 relative z-10">
          <span className="inline-block py-2 px-6 rounded-full border border-[#c5a975]/30 text-[#c5a975] text-xs font-semibold tracking-[0.2em] uppercase mb-8 cinematic-text">
            The Collection
          </span>
          <h3 className="text-5xl md:text-7xl font-medium text-[#1a3b2b] cinematic-text tracking-tight">Curated Ecosystem.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {[
            { title: "Skin Care", desc: "Hydrating serums and cleansers.", img: "/images/detail.png", delay: 0 },
            { title: "Nutrition", desc: "Daily support for modern life.", img: "/images/wellness.png", delay: 0.2 },
            { title: "Home", desc: "Safe essentials for your sanctuary.", img: "/images/catalog.png", delay: 0.4 }
          ].map((item, i) => (
            <Link href={`/products/${i + 1}`} key={i} className="group block ecosystem-card perspective-[1000px]">
              <div className="bg-[#faf9f6]/80 backdrop-blur-xl p-5 rounded-[2.5rem] transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_-15px_rgba(26,59,43,0.1)] border border-white">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 bg-[#f3ede3] shadow-inner">
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating View Text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="bg-white/90 text-[#1a3b2b] px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm">View Details</span>
                  </div>
                </div>
                <div className="px-4 pb-2 text-center">
                  <h4 className="text-3xl font-medium text-[#1a3b2b] mb-3">{item.title}</h4>
                  <p className="text-[#5c6356] font-light text-lg">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4 — IMMERSIVE COMMUNITY CONNECTION */}
      <section className="py-40 bg-white relative overflow-hidden">
        {/* Parallax background abstract pattern */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0.5, 1], [-150, 150]) }}
          className="absolute -right-[20%] top-[10%] w-[60%] h-[80%] opacity-5 pointer-events-none"
        >
           <Image src="/images/network.png" alt="Pattern" fill className="object-cover" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 md:order-1 relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-[#8a9a86]/20">
            <motion.div
              style={{ scale: useTransform(scrollYProgress, [0.6, 1], [1.2, 1]) }}
              className="w-full h-full"
            >
              <Image src="/images/human_connection.png" alt="Community connection" fill className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 border border-white/20 rounded-[3rem] z-10 pointer-events-none"></div>
          </div>

          <div className="order-1 md:order-2">
            <div className="w-20 h-20 bg-[#f3ede3] rounded-3xl flex items-center justify-center mb-10 cinematic-text rotate-3 shadow-inner">
              <Users className="w-10 h-10 text-[#8a9a86]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-medium text-[#1a3b2b] leading-[1.05] mb-8 cinematic-text tracking-tight">
              Share wellness. <br/><span className="text-[#8a9a86]">Grow organically.</span>
            </h2>
            <p className="text-xl text-[#5c6356] font-light leading-relaxed mb-10 cinematic-text">
              We grow through the trusted recommendations of our community. Share the botanical products you naturally love, and build a meaningful earning stream through our beautifully integrated partner ecosystem.
            </p>
            <div className="cinematic-text">
              <Link href="/partner" className="inline-flex items-center gap-3 bg-[#f3ede3] text-[#1a3b2b] px-8 py-5 rounded-full text-lg font-medium hover:bg-[#8a9a86] hover:text-white transition-all duration-300 transform hover:scale-105">
                Explore the Partner Model
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CINEMATIC FINAL REVEAL CTA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a3b2b]">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0.8, 1], [-100, 100]) }}
          className="absolute inset-0 opacity-40 mix-blend-overlay"
        >
          <Image src="/images/bright_hero.png" alt="Background" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3b2b] to-transparent opacity-80"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl cinematic-text">
          <Sparkles className="w-12 h-12 text-[#c5a975] mx-auto mb-10 opacity-80" />
          <h2 className="text-6xl md:text-9xl font-medium text-white tracking-tighter mb-10 leading-none drop-shadow-2xl">
            The Journey <br /> Begins.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <Link href="/products" className="group relative bg-white text-[#1a3b2b] px-12 py-5 rounded-full text-lg font-medium overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               <span className="relative z-10">Start Your Ritual</span>
               <div className="absolute inset-0 bg-[#f3ede3] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></div>
            </Link>
            <Link href="/community" className="text-white hover:text-[#c5a975] font-medium text-lg transition-colors border-b border-transparent hover:border-[#c5a975] pb-1">
              Join the Ecosystem
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
