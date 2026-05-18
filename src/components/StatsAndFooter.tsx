import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import Hls from 'hls.js';
import { Mail, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';

export function Stats() {
  return (
    <section className="bg-bg py-24 md:py-32 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {[
            { value: "20+", label: "Years Experience" },
            { value: "95+", label: "Projects Done" },
            { value: "200%", label: "Satisfied Clients" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-5xl md:text-7xl font-display italic text-text-primary mb-4">{stat.value}</div>
              <p className="text-xs text-muted uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(source);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
        }
    }

    // Marquee GSAP
    gsap.to(".marquee-item", {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "none",
    });
  }, []);

  return (
    <footer className="relative bg-bg pt-24 md:pt-32 pb-12 overflow-hidden">
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40 brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center">
        {/* Marquee */}
        <div className="w-full overflow-hidden mb-24 md:mb-32">
          <div className="flex whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="marquee-item text-4xl md:text-8xl font-display italic text-text-primary/10 uppercase tracking-tighter px-4">
                BUILDING THE FUTURE •&nbsp;
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-display italic leading-[0.9] text-text-primary mb-12">
            Let's work <span className="underline decoration-stroke underline-offset-16">together</span>
          </h2>
          
          <a 
            href="mailto:josiahjohnmark9@gmail.com" 
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full liquid-glass transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <Mail className="relative z-10 w-5 h-5 text-text-primary" />
            <span className="relative z-10 text-lg font-medium text-text-primary">josiahjohnmark9@gmail.com</span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-stroke flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <a href="#" className="text-muted hover:text-text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
             <a href="#" className="text-muted hover:text-text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
             <a href="#" className="text-muted hover:text-text-primary transition-colors"><Dribbble className="w-5 h-5" /></a>
             <a href="#" className="text-muted hover:text-text-primary transition-colors"><Github className="w-5 h-5" /></a>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
             <span className="text-[10px] text-muted uppercase tracking-widest">Available for projects</span>
          </div>

          <div className="text-[10px] text-muted uppercase tracking-widest">
            © 2024 Josiah Johnmark — Portfolio
          </div>
        </div>
      </div>
    </footer>
  );
}
