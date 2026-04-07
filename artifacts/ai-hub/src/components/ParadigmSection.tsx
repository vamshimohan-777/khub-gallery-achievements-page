import { motion } from "framer-motion";
import { Paradigm } from "../data/paradigms";

export function ParadigmSection({ paradigm, index }: { paradigm: Paradigm; index: number }) {
  const Icon = paradigm.icon;
  const isEven = index % 2 === 0;

  return (
    <section 
      id={paradigm.id}
      className="min-h-[100dvh] py-32 relative flex items-center"
      style={{
        background: `radial-gradient(circle at ${isEven ? '0%' : '100%'} 50%, ${paradigm.color}10 0%, rgba(10,12,24,0) 50%)`
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}>
          
          {/* Content Side */}
          <div className="flex-1 w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div 
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border bg-black/40 backdrop-blur-md mb-8"
                style={{ borderColor: `${paradigm.color}40`, color: paradigm.color }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wider uppercase">{paradigm.id.replace('-', ' ')}</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
                {paradigm.name}
              </h2>
              
              <p className="text-xl md:text-2xl font-light mb-8 opacity-90" style={{ color: paradigm.color }}>
                {paradigm.tagline}
              </p>
              
              <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-12">
                {paradigm.description}
              </p>
            </motion.div>
          </div>

          {/* Cards Side */}
          <div className="flex-1 w-full relative z-10">
            <div className="grid gap-6">
              {paradigm.topics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:bg-white/[0.05] transition-colors"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `linear-gradient(45deg, transparent, ${paradigm.color})` }}
                  />
                  <div 
                    className="w-2 h-full absolute left-0 top-0"
                    style={{ backgroundColor: paradigm.color }}
                  />
                  <h3 className="text-xl font-semibold text-white mb-2 ml-4 group-hover:translate-x-1 transition-transform">{topic.title}</h3>
                  <p className="text-white/60 ml-4">{topic.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}