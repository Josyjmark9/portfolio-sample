import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const explorationItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600", rotation: -5, y: 100 },
  { id: 2, image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=600", rotation: 8, y: -50 },
  { id: 3, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600", rotation: -12, y: 150 },
  { id: 4, image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600", rotation: 4, y: 0 },
  { id: 5, image: "https://images.unsplash.com/photo-1627398240411-ee143ab45a90?auto=format&fit=crop&q=80&w=600", rotation: -8, y: 200 },
  { id: 6, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600", rotation: 10, y: -100 },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Pinning the center content
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: content,
      pinSpacing: false,
    });

    // Column Parallax
    const cards = gsap.utils.toArray<HTMLElement>('.parallax-card');
    cards.forEach((card) => {
      const speed = card.dataset.speed || 0.1;
      gsap.fromTo(card, 
        { y: 0 },
        {
          y: -500 * Number(speed),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg overflow-hidden pt-32">
      {/* Pinned Center Content */}
      <div ref={contentRef} className="h-screen w-full flex flex-col items-center justify-center relative z-10 pointer-events-none">
        <div className="text-center px-4 max-w-lg pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-[1px] bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display leading-[1.1] text-text-primary mb-8">
            Visual <span className="italic underline decoration-stroke underline-offset-8">playground</span>
          </h2>
          <p className="text-muted text-sm md:text-base mb-10 leading-relaxed">
            Side projects, visual experiments, and unfinished ideas that fuel my daily work.
          </p>
          
          <button className="inline-flex items-center gap-3 px-6 py-3 rounded-full liquid-glass text-text-primary group overflow-hidden relative">
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 text-sm font-medium">Follow on Dribbble</span>
            <ExternalLink className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Parallax Cards */}
      <div className="absolute inset-0 top-0 pointer-events-none max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 h-full gap-x-12 md:gap-x-40">
          {/* Column 1 */}
          <div className="space-y-[40vh] pt-[20vh]">
            {explorationItems.slice(0, 3).map((item, idx) => (
              <div 
                key={item.id}
                className="parallax-card relative aspect-square max-w-[320px] mx-auto pointer-events-auto group cursor-pointer"
                data-speed={0.2 + idx * 0.1}
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <div className="absolute inset-0 bg-surface rounded-2xl overflow-hidden border border-stroke shadow-2xl">
                  <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-bg/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest font-medium">View Exploration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-[40vh] pt-[60vh]">
            {explorationItems.slice(3, 6).map((item, idx) => (
              <div 
                key={item.id}
                className="parallax-card relative aspect-square max-w-[320px] mx-auto pointer-events-auto group cursor-pointer"
                data-speed={0.15 + idx * 0.05}
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <div className="absolute inset-0 bg-surface rounded-2xl overflow-hidden border border-stroke shadow-2xl">
                  <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-bg/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest font-medium">View Exploration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
