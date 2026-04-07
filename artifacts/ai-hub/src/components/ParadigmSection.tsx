import { motion } from "framer-motion";
import { Paradigm } from "../data/paradigms";

export function ParadigmSection({ paradigm, index }: { paradigm: Paradigm; index: number }) {
  const Icon = paradigm.icon;
  const [hero, ...gallery] = paradigm.photos;

  return (
    <section
      id={paradigm.id}
      className="relative py-24"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${paradigm.color}12 0%, transparent 60%)`
      }}
    >
      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-6 lg:mx-16 rounded-3xl overflow-hidden mb-14"
        style={{ height: 380 }}
      >
        <img
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark gradient over image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, rgba(5,7,20,0.88) 0%, rgba(5,7,20,0.55) 50%, ${paradigm.color}22 100%)`
          }}
        />
        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
          style={{ background: paradigm.color }}
        />
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 self-start"
            style={{ borderColor: `${paradigm.color}60`, background: `${paradigm.color}18` }}
          >
            <Icon className="w-4 h-4" style={{ color: paradigm.color }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: paradigm.color }}>
              {paradigm.name}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            {paradigm.tagline}
          </h2>
          <p className="text-white/60 max-w-2xl text-base leading-relaxed">
            {paradigm.description}
          </p>
        </div>
      </motion.div>

      <div className="mx-6 lg:mx-16 grid lg:grid-cols-[1fr_1.4fr] gap-10">

        {/* ── Achievements timeline ── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: paradigm.color }}
          >
            Key Achievements
          </motion.h3>
          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-px"
              style={{ background: `linear-gradient(to bottom, ${paradigm.color}60, transparent)` }}
            />
            <div className="space-y-6">
              {paradigm.achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 mt-1 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{
                        background: `${paradigm.color}22`,
                        border: `1.5px solid ${paradigm.color}80`,
                        color: paradigm.color,
                      }}
                    >
                      {a.year.slice(2)}
                    </div>
                  </div>
                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-4 border"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest" style={{ color: paradigm.color }}>
                        {a.year}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">{a.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Photo gallery ── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: paradigm.color }}
          >
            Gallery
          </motion.h3>
          {/* Masonry-style 2+2+1 grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Row 1: two equal */}
            {gallery.slice(0, 2).map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl overflow-hidden"
                style={{ height: 160 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
            {/* Row 2: tall left + two stacked right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden row-span-2"
              style={{ height: 328 }}
            >
              <img
                src={gallery[2]?.src}
                alt={gallery[2]?.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
            <div className="flex flex-col gap-3">
              {gallery.slice(3, 5).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
                  className="rounded-xl overflow-hidden flex-1"
                  style={{ height: 155 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Section divider */}
      <div
        className="mx-16 mt-20 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${paradigm.color}30, transparent)` }}
      />
    </section>
  );
}
