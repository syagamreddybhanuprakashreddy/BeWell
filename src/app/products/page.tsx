"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = ["Wellness", "Skin Care", "Hair Care", "Nutrition", "Home"];

const products = [
  { id: "1", name: "Restorative Face Serum", category: "Skin Care", price: "₹3,400", image: "/images/detail.png" },
  { id: "2", name: "Organic Healing Balm", category: "Wellness", price: "₹1,800", image: "/images/catalog.png" },
  { id: "3", name: "Daily Greens Powder", category: "Nutrition", price: "₹2,500", image: "/images/wellness.png" },
  { id: "4", name: "Botanical Room Mist", category: "Home", price: "₹1,200", image: "/images/hero.png" },
  { id: "5", name: "Nourishing Hair Oil", category: "Hair Care", price: "₹1,600", image: "/images/skincare.png" },
  { id: "6", name: "Deep Sleep Tincture", category: "Wellness", price: "₹2,100", image: "/images/detail.png" },
];

export default function Catalog() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".product-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <main className="bg-bewell-ivory min-h-screen pt-32 pb-32">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16" ref={headerRef}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-medium text-bewell-text tracking-tight mb-8"
        >
          The Ecosystem
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl text-bewell-muted font-light max-w-2xl leading-relaxed"
        >
          Curated formulations designed to elevate your daily rituals. From inside-out nutrition to surface-level care, discover balance.
        </motion.p>
      </div>

      {/* Sticky Category Nav */}
      <div className="sticky top-20 z-40 bg-bewell-ivory/80 backdrop-blur-md border-y border-black/5 mb-16 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-8 overflow-x-auto no-scrollbar">
          <button className="text-bewell-green font-medium whitespace-nowrap border-b-2 border-bewell-green pb-1">All Products</button>
          {categories.map((cat) => (
            <button key={cat} className="text-bewell-muted hover:text-bewell-text transition-colors whitespace-nowrap font-light pb-1">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 product-grid">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group product-card block">
              <div className="relative aspect-[4/5] bg-bewell-beige rounded-2xl overflow-hidden mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="bg-white/90 backdrop-blur-sm text-bewell-text px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                    View Details
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-bewell-muted mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-bewell-text">{product.name}</h3>
                  <span className="text-bewell-muted">{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
