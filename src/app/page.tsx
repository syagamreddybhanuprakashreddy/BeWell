"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Sparkles, MoveRight } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Pinning the horizontal scroll section
    const pin = gsap.to(horizontalScrollRef.current, {
      x: "-66.66vw",
      ease: "none",
      scrollTrigger: {
        trigger: productRef.current,
        pin: true,
        scrub: 1,
        end: "+=2000",
      },
    });

    // Reveal animations for text elements
    const revealElements = document.querySelectorAll(".reveal-text");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <main className="bg-bewell-ivory overflow-hidden selection:bg-bewell-green selection:text-bewell-ivory">
      
      {/* SECTION 1 — HERO EXPERIENCE */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Modern family enjoying a healthy lifestyle"
            fill
            className="object-cover object-center scale-105 transform transition-transform duration-[20s] hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-bewell-ivory via-transparent to-transparent opacity-80"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight mb-6 drop-shadow-sm"
          >
            Better Life <br /> Begins Here.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover premium products designed to improve everyday living while empowering communities through direct connection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <Link href="/products" className="bg-white text-bewell-green px-8 py-4 rounded-full text-lg font-medium hover:bg-bewell-beige transition-colors flex items-center justify-center gap-2 mx-auto w-fit">
              Explore the Ecosystem <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — MODERN LIFE PROBLEM */}
      <section ref={problemRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-bewell-ivory">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6 reveal-text">The Reality</h2>
            <h3 className="text-4xl md:text-5xl font-medium text-bewell-text leading-tight mb-8 reveal-text">
              Modern living has become a compromise.
            </h3>
            <p className="text-xl text-bewell-muted font-light leading-relaxed mb-6 reveal-text">
              Between the stress of daily routines, the hidden chemicals in our home essentials, and the ever-increasing cost of living, finding balance feels impossible.
            </p>
            <p className="text-xl text-bewell-muted font-light leading-relaxed reveal-text">
              We sacrifice our well-being for convenience. We want better for our families, but the path isn't always clear.
            </p>
          </div>
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden reveal-text">
            <Image
              src="/images/wellness.png"
              alt="Stressful modern life transformation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE BEWELL SOLUTION */}
      <section ref={solutionRef} className="py-32 bg-bewell-green text-bewell-ivory rounded-t-[3rem] -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6 reveal-text">Our Ecosystem</h2>
          <h3 className="text-4xl md:text-6xl font-medium leading-tight mb-8 reveal-text">
            A unified approach to <br /> complete well-being.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12">
          {[
            { icon: Leaf, title: "Pure Botanicals", desc: "Skincare and supplements crafted from the earth's finest organic ingredients." },
            { icon: ShieldCheck, title: "Clean Home", desc: "Household essentials designed to protect your family without harsh chemicals." },
            { icon: HeartHandshake, title: "Community Commerce", desc: "A supportive network where your lifestyle upgrade also creates shared value." }
          ].map((item, i) => (
            <div key={i} className="bg-bewell-green-light/30 p-10 rounded-3xl border border-white/10 backdrop-blur-sm reveal-text hover:bg-bewell-green-light/50 transition-colors">
              <item.icon className="w-10 h-10 text-bewell-gold mb-6" />
              <h4 className="text-2xl font-medium mb-4">{item.title}</h4>
              <p className="text-white/70 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — PRODUCT STORYTELLING (Horizontal Scroll) */}
      <section ref={productRef} className="h-screen bg-bewell-earth/20 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-bewell-text reveal-text">The Collection</h2>
        </div>
        
        <div className="flex w-[300vw] h-[60vh] px-6 md:px-12 gap-12" ref={horizontalScrollRef}>
          <div className="w-[80vw] h-full relative group rounded-3xl overflow-hidden shrink-0">
            <Image src="/images/skincare.png" alt="Premium Skincare" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-medium mb-2">Restorative Skincare</h3>
              <p className="text-lg font-light opacity-90">Organic textures and herbal wisdom.</p>
            </div>
          </div>
          <div className="w-[80vw] h-full relative group rounded-3xl overflow-hidden shrink-0">
            <Image src="/images/wellness.png" alt="Wellness Supplements" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-medium mb-2">Daily Nutrition</h3>
              <p className="text-lg font-light opacity-90">Formulated for modern vitality.</p>
            </div>
          </div>
          <div className="w-[80vw] h-full relative group rounded-3xl overflow-hidden shrink-0">
            <Image src="/images/hero.png" alt="Home Essentials" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-medium mb-2">Conscious Home</h3>
              <p className="text-lg font-light opacity-90">Clean environments, clear minds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMMUNITY GROWTH ECOSYSTEM */}
      <section className="py-32 bg-bewell-text text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image src="/images/network.png" alt="Ecosystem Network" fill className="object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8 reveal-text text-bewell-gold">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm uppercase tracking-[0.2em] font-semibold">Community-Powered Growth</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-8 reveal-text">
                Every customer can <br /> become a partner.
              </h2>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-6 reveal-text">
                Wellness that rewards connection. We believe that financial empowerment should be accessible to everyone who shares our values. 
              </p>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-10 reveal-text">
                By organically sharing products you trust, you can build a supplemental income stream and foster collaborative growth within your community.
              </p>
              
              <Link href="/partner" className="inline-flex items-center gap-4 text-bewell-gold font-medium text-lg group reveal-text border-b border-bewell-gold pb-2">
                Explore the Partner Opportunity
                <MoveRight className="w-5 h-5 transform transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
            
            <div className="relative">
              {/* Animated Network Graphic Concept */}
              <div className="relative h-[600px] w-full rounded-[2rem] overflow-hidden reveal-text border border-white/10 shadow-2xl">
                <Image src="/images/human_connection.png" alt="Collaborative Growth" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bewell-text/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-bewell-text bg-bewell-beige" />
                      ))}
                    </div>
                    <div>
                      <p className="text-white font-medium">Your Network</p>
                      <p className="text-white/70 text-sm font-light">Growing organically</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — BETTER LIFE ECOSYSTEM & SECTION 7 — TESTIMONIALS */}
      <section className="py-32 bg-bewell-beige relative">
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <h2 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6 reveal-text">The Impact</h2>
          <h3 className="text-4xl md:text-5xl font-medium text-bewell-text leading-tight reveal-text">
            Real stories of <span className="italic font-light">transformation</span>.
          </h3>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-3xl shadow-sm reveal-text">
            <p className="text-2xl text-bewell-text font-light italic leading-relaxed mb-8">
              "Switching our household to BeWell wasn't just about cleaner products. It sparked a total shift in how we approach our daily routines. The quality is simply undeniable."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bewell-earth"></div>
              <div>
                <h4 className="font-medium text-bewell-text">Priya Sharma</h4>
                <p className="text-sm text-bewell-muted">Customer since 2024</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-3xl shadow-sm reveal-text">
            <p className="text-2xl text-bewell-text font-light italic leading-relaxed mb-8">
              "What started as a love for their skincare line organically grew into a supplemental income stream for my family. No pressure, just sharing what I genuinely believe in."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bewell-gold/40"></div>
              <div>
                <h4 className="font-medium text-bewell-text">Anita Desai</h4>
                <p className="text-sm text-bewell-muted">Brand Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CALL TO ACTION */}
      <section className="py-32 bg-bewell-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/hero.png" alt="Background Texture" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 reveal-text">
            Your better life <br /> is waiting.
          </h2>
          <p className="text-xl text-white/80 font-light mb-12 reveal-text">
            Whether you're looking to elevate your daily self-care or seeking a community that empowers your growth, there is a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center reveal-text">
            <Link href="/products" className="bg-white text-bewell-green px-10 py-5 rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300">
              Shop the Collection
            </Link>
            <Link href="/community" className="bg-transparent border border-white/30 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/10 transition-colors duration-300">
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
