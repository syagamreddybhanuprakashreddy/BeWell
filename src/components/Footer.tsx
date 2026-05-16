import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-bewell-green text-bewell-ivory pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] mt-[-2rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-1">
          <div className="mb-8 text-white w-fit">
            <Logo />
          </div>
          <p className="text-white/70 font-light leading-relaxed mb-8">
            Better Life for Everyone. A modern wellness and lifestyle ecosystem.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6">Ecosystem</h3>
          <ul className="space-y-4 text-white/70 font-light">
            <li><Link href="/products" className="hover:text-white transition-colors">Skincare</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Nutrition</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Home Essentials</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Lifestyle</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6">Community</h3>
          <ul className="space-y-4 text-white/70 font-light">
            <li><Link href="/community" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/community" className="hover:text-white transition-colors">Partner Program</Link></li>
            <li><Link href="/community" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link href="/community" className="hover:text-white transition-colors">Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-bewell-gold font-semibold mb-6">Stay Connected</h3>
          <p className="text-white/70 font-light mb-4">Join our newsletter for wellness insights.</p>
          <div className="flex border-b border-white/30 pb-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/30"
            />
            <button className="text-bewell-gold hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40 font-light">
        <p>&copy; {new Date().getFullYear()} BeWell Ecosystem. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
