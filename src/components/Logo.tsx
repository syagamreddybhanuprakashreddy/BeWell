import { Dancing_Script, Inter } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <span className={`${dancingScript.className} text-4xl leading-none`}>
          BeWell
        </span>
        {/* Leaf cluster above the 'e' */}
        <div className="absolute -top-3 left-[35%] flex items-end justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 -rotate-45 -mr-1">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mb-1">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 rotate-45 -ml-1">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </div>
      </div>
      
      {/* Tagline */}
      <div className={`flex items-center gap-1.5 mt-1 ${inter.className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 rotate-90 opacity-80">
          <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
        </svg>
        <span className="text-[0.45rem] tracking-[0.2em] font-semibold uppercase whitespace-nowrap">
          Good for you, naturally
        </span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 -rotate-90 opacity-80">
          <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
        </svg>
      </div>
    </div>
  );
}
