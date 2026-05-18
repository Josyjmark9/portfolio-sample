import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "E-Commerce Platform",
    category: "FULLSTACK — 2024",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]"
  },
  {
    title: "SaaS Dashboard",
    category: "FRONTEND — 2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  {
    title: "API Architecture",
    category: "BACKEND — 2024",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Design System",
    category: "UI/UX — 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]"
  }
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display leading-[1.1] text-text-primary mb-6">
              Featured <span className="italic">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 group relative rounded-full px-6 py-3 text-sm font-medium liquid-glass text-text-primary overflow-hidden">
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              View all work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden bg-surface border border-stroke ${project.span} ${project.aspect}`}
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Halftone Overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm flex items-center justify-center">
                <div className="relative group/pill transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 rounded-full liquid-glass px-6 py-2 overflow-hidden">
                  <div className="absolute inset-0 accent-gradient opacity-20 animate-gradient-shift" />
                  <span className="relative z-10 text-text-primary text-sm font-medium">View — <span className="font-display italic">{project.title}</span></span>
                </div>
              </div>

              {/* Bottom Label (always visible) */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none group-hover:opacity-0 transition-opacity">
                <div>
                  <h3 className="text-xl md:text-2xl font-display italic text-white mb-1">{project.title}</h3>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
