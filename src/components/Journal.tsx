import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const entries = [
  {
    title: "Structuring modern web apps",
    category: "Architecture",
    time: "5 min read",
    date: "MAR 2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    title: "Building scalable API systems",
    category: "Engineering",
    time: "8 min read",
    date: "FEB 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    title: "The future of serverless deployment",
    category: "Tech",
    time: "12 min read",
    date: "JAN 2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    title: "React Server Components explained",
    category: "Frontend",
    time: "6 min read",
    date: "DEC 2023",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Recent thoughts</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display leading-[1.1] text-text-primary mb-6">
              The <span className="italic">journal</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              Sharing my experience and insights on design and digital products.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 group relative rounded-full px-6 py-3 text-sm font-medium liquid-glass text-text-primary overflow-hidden">
            <div className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              View all posts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 group"
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke">
                <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] text-muted tracking-widest uppercase">{entry.category}</span>
                  <div className="w-1 h-1 rounded-full bg-stroke" />
                  <span className="text-[10px] text-muted tracking-widest uppercase">{entry.time}</span>
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-medium text-text-primary truncate pr-4 group-hover:text-blue-200 transition-colors">
                  {entry.title}
                </h3>
              </div>

              <div className="hidden sm:block text-right pr-4">
                <span className="text-[10px] text-muted tracking-widest uppercase block mb-1">Date</span>
                <span className="text-xs font-medium text-text-primary">{entry.date}</span>
              </div>

              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-stroke flex items-center justify-center shrink-0 group-hover:bg-text-primary transition-colors">
                <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-bg transition-colors -rotate-45" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
