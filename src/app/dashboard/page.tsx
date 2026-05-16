"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Package, Heart, RefreshCcw, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <main className="bg-bewell-ivory min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm sticky top-32">
              <div className="w-16 h-16 bg-bewell-beige rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-medium text-bewell-green">AM</span>
              </div>
              <h2 className="text-xl font-medium text-bewell-text mb-1">Ananya Mehta</h2>
              <p className="text-sm text-bewell-muted font-light mb-8">Member since 2024</p>

              <nav className="flex flex-col gap-2">
                {[
                  { id: "orders", label: "My Orders", icon: Package },
                  { id: "subscriptions", label: "Subscriptions", icon: RefreshCcw },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "profile", label: "Profile", icon: User },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                      activeTab === tab.id 
                        ? "bg-bewell-green/10 text-bewell-green font-medium" 
                        : "text-bewell-muted hover:bg-black/5 hover:text-bewell-text"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 mt-4 transition-colors text-left">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === "orders" && (
                <div>
                  <h1 className="text-3xl font-medium text-bewell-text mb-8">Recent Orders</h1>
                  <div className="space-y-6">
                    {[1, 2].map((order) => (
                      <div key={order} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                        <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
                          <div>
                            <p className="text-sm text-bewell-muted mb-1">Order #BW-{1040 + order}</p>
                            <p className="font-medium text-bewell-text">May 12, 2026</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block bg-bewell-green/10 text-bewell-green text-xs px-3 py-1 rounded-full font-medium mb-1">Delivered</span>
                            <p className="font-medium text-bewell-text">₹5,900</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-bewell-beige relative overflow-hidden">
                              <Image src="/images/detail.png" alt="Item" fill className="object-cover" />
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-bewell-beige relative overflow-hidden">
                              <Image src="/images/catalog.png" alt="Item" fill className="object-cover" />
                            </div>
                          </div>
                          <button className="text-sm font-medium text-bewell-green hover:text-bewell-text transition-colors flex items-center gap-1">
                            View Details <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab !== "orders" && (
                <div className="bg-white p-12 rounded-3xl border border-black/5 shadow-sm text-center h-[50vh] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-bewell-beige rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-bewell-muted" />
                  </div>
                  <h3 className="text-2xl font-medium text-bewell-text mb-2">Nothing to see here yet.</h3>
                  <p className="text-bewell-muted font-light mb-8 max-w-md mx-auto">Your {activeTab} will appear here once you start exploring the BeWell ecosystem.</p>
                  <button className="bg-bewell-green text-white px-8 py-3 rounded-full font-medium hover:bg-bewell-text transition-colors">
                    Explore Ecosystem
                  </button>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
