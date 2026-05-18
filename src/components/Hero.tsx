import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const roles = ["Full Stack Dev", "Web Developer", "Software Eng", "Creator"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
    }

    // Role cycle
    const roleInterval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2000);

    // Scroll listener for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP Entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".name-reveal", { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
      .to(".blur-in", { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0, 
        duration: 1, 
        stagger: 0.1 
      }, "-=0.8");

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div className={cn(
          "inline-flex items-center rounded-full px-2 py-2 transition-all duration-300 liquid-glass",
          isScrolled && "scale-95"
        )}>
          {/* Logo */}
          <div className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-bg border border-stroke overflow-hidden transition-transform hover:scale-110 cursor-pointer">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 font-display italic text-[13px] text-text-primary">JJ</div>
          </div>

          <div className="hidden md:block w-px h-5 bg-stroke mx-2" />

          {/* Nav Links */}
          <div className="flex gap-1">
            {["Home", "Work", "Resume"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs sm:text-sm font-medium rounded-full px-3 sm:px-4 py-1.5 sm:py-2 liquid-glass-tab"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-stroke mx-2" />

          {/* Contact Button */}
          <button className="group relative text-xs sm:text-sm font-medium rounded-full px-4 py-2 overflow-hidden liquid-glass">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center gap-1 text-text-primary">
              Say hi <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p className="text-xs text-muted uppercase tracking-[0.3em] mb-8 blur-in">
          COLLECTION '26
        </motion.p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 name-reveal">
          Josiah Johnmark
        </h1>
        <div className="text-lg md:text-xl text-text-primary/70 mb-8 blur-in">
          A <span className="font-display italic text-text-primary h-8 inline-flex items-center min-w-[100px] justify-center relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center animate-role-fade-in"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span> lives in Chicago.
        </div>
        <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-12 blur-in leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="flex flex-wrap justify-center gap-4 blur-in">
          <button className="group relative rounded-full text-sm font-medium px-8 py-3.5 liquid-glass hover:scale-105 transition-transform text-text-primary overflow-hidden border-transparent">
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10">See Works</span>
          </button>
          <button className="group relative rounded-full text-sm font-medium px-8 py-3.5 liquid-glass transition-all hover:scale-105 overflow-hidden text-text-primary border-transparent">
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 accent-gradient animate-scroll-down origin-top" />
        </div>
      </div>
    </section>
  );
}
