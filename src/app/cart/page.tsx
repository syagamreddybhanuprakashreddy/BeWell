"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  return (
    <main className="bg-bewell-ivory min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-medium text-bewell-text tracking-tight mb-12">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-black/5 flex flex-col md:flex-row gap-8 items-center shadow-sm">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-bewell-beige">
                <Image src="/images/detail.png" alt="Product" fill className="object-cover" />
              </div>
              <div className="flex-grow w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-bewell-text">Restorative Face Serum</h3>
                  <p className="text-lg text-bewell-text">₹3,400</p>
                </div>
                <p className="text-sm text-bewell-muted font-light mb-6">30ml / 1 fl oz</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-black/10 rounded-full px-4 py-2 gap-4">
                    <button className="text-bewell-muted hover:text-bewell-text">-</button>
                    <span className="text-bewell-text">1</span>
                    <button className="text-bewell-muted hover:text-bewell-text">+</button>
                  </div>
                  <button className="text-bewell-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-black/5 flex flex-col md:flex-row gap-8 items-center shadow-sm">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-bewell-beige">
                <Image src="/images/wellness.png" alt="Product" fill className="object-cover" />
              </div>
              <div className="flex-grow w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-bewell-text">Daily Greens Powder</h3>
                  <p className="text-lg text-bewell-text">₹2,500</p>
                </div>
                <p className="text-sm text-bewell-muted font-light mb-6">250g / 30 servings</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-black/10 rounded-full px-4 py-2 gap-4">
                    <button className="text-bewell-muted hover:text-bewell-text">-</button>
                    <span className="text-bewell-text">1</span>
                    <button className="text-bewell-muted hover:text-bewell-text">+</button>
                  </div>
                  <button className="text-bewell-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <Link href="/products" className="inline-flex items-center text-bewell-green hover:text-bewell-text transition-colors gap-2 font-medium">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-bewell-beige/50 p-8 rounded-3xl sticky top-32">
              <h2 className="text-2xl font-medium text-bewell-text mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-bewell-text font-light border-b border-black/5 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹5,900</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-bewell-green">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-medium text-bewell-text mb-8">
                <span>Total</span>
                <span>₹5,900</span>
              </div>

              <button className="w-full bg-bewell-green text-white py-4 rounded-full text-lg font-medium hover:bg-bewell-text transition-colors flex items-center justify-center gap-2 mb-4">
                Proceed to Checkout <Lock className="w-4 h-4" />
              </button>
              
              <p className="text-center text-xs text-bewell-muted font-light">
                Taxes calculated at checkout. Secure, encrypted payment.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
