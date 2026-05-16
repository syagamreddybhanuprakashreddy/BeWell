"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, Leaf, ShieldCheck, Beaker } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [added, setAdded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll(".animate-up");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-bewell-ivory min-h-screen">
      
      {/* Top Banner Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-8">
        <Link href="/products" className="inline-flex items-center text-bewell-muted hover:text-bewell-text transition-colors gap-2 text-sm uppercase tracking-widest font-semibold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Ecosystem
        </Link>
      </div>

      {/* Main Product Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 mb-32">
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden sticky top-28">
          <Image src="/images/detail.png" alt="Restorative Face Serum" fill className="object-cover" priority />
        </div>
        
        <div className="pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-bewell-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-bewell-muted font-light">128 Reviews</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-medium text-bewell-text mb-4 leading-tight">Restorative Face Serum</h1>
            <p className="text-2xl text-bewell-muted font-light mb-8">₹3,400</p>
            
            <p className="text-lg text-bewell-muted font-light leading-relaxed mb-10">
              A concentrated blend of botanical oils designed to deeply nourish, restore elasticity, and leave your skin with a luminous, healthy glow. Formulated with organic ingredients hand-harvested for maximum potency.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 border border-black/10 rounded-xl p-4">
                <Leaf className="w-6 h-6 text-bewell-green" />
                <span className="text-bewell-text">100% Organic Ingredients</span>
              </div>
              <div className="flex items-center gap-4 border border-black/10 rounded-xl p-4">
                <ShieldCheck className="w-6 h-6 text-bewell-green" />
                <span className="text-bewell-text">Dermatologist Tested</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`w-full py-5 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                added ? "bg-bewell-green-light text-white" : "bg-bewell-green text-white hover:bg-bewell-text"
              }`}
            >
              {added ? <><Check className="w-5 h-5" /> Added to Cart</> : "Add to Cart"}
            </button>
            
            <p className="text-center text-sm text-bewell-muted mt-4 font-light">Free shipping on orders over ₹5,000</p>
          </motion.div>
        </div>
      </div>

      {/* Storytelling Section */}
      <section className="bg-bewell-beige py-32 rounded-[3rem] mx-4 mb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-medium text-bewell-text mb-8 animate-up">
                Nature's intelligence,<br /> bottled.
              </h2>
              <p className="text-xl text-bewell-muted font-light leading-relaxed mb-6 animate-up">
                We believe that the best skincare doesn't come from a lab, but from the earth. Our Restorative Serum is cold-pressed to retain the vital nutrients of every petal and seed.
              </p>
              <ul className="space-y-4 animate-up">
                <li className="flex items-start gap-4">
                  <Beaker className="w-6 h-6 text-bewell-gold shrink-0 mt-1" />
                  <p className="text-bewell-text"><strong className="font-medium">Jasmine Extract:</strong> Evens skin tone and provides deep hydration.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Leaf className="w-6 h-6 text-bewell-gold shrink-0 mt-1" />
                  <p className="text-bewell-text"><strong className="font-medium">Rosehip Oil:</strong> Rich in Vitamin A to promote cell turnover.</p>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden animate-up">
              <Image src="/images/skincare.png" alt="Ingredients" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
