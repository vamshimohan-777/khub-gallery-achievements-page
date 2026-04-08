import * as React from "react";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Achievement, Paradigm, Photo } from "../data/paradigms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ParadigmSection({ paradigm }: { paradigm: Paradigm }) {
  const Icon = paradigm.icon;
  const [hero, ...gallery] = paradigm.photos;
  const [hoveredAchievementKey, setHoveredAchievementKey] = React.useState<string | null>(null);
  const [detailAchievement, setDetailAchievement] = React.useState<Achievement | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = React.useState<Photo | null>(null);

  return (
    <section
      id={paradigm.id}
      className="relative py-24"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${paradigm.color}08 0%, transparent 60%)`
      }}
    >
      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-6 lg:mx-16 rounded-3xl overflow-hidden mb-14 shadow-2xl shadow-primary/5"
        style={{ height: 380 }}
      >
        <img
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Theme-aware gradient over image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, var(--foreground) 0%, var(--foreground)/0.6 50%, ${paradigm.color}33 100%)`,
            mixBlendMode: 'multiply',
            opacity: 0.85
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, rgba(0,0,0,0.4) 0%, transparent 100%)`
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 self-start backdrop-blur-md"
            style={{ borderColor: `${paradigm.color}60`, background: `${paradigm.color}22` }}
          >
            <Icon className="w-4 h-4" style={{ color: paradigm.color }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: paradigm.color }}>
              {paradigm.name}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            {paradigm.tagline}
          </h2>
          <p className="text-white/80 max-w-2xl text-base leading-relaxed">
            {paradigm.description}
          </p>
          <a
            href={paradigm.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Visit paradigm site
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
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
              {paradigm.achievements.map((a, i) => {
                const key = `${paradigm.id}-${i}`;
                const showHoverPreview = hoveredAchievementKey === key;
                return (
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
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg"
                        style={{
                          background: `var(--background)`,
                          border: `2px solid ${paradigm.color}`,
                          color: paradigm.color,
                        }}
                      >
                        {a.year.slice(2)}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-expanded={showHoverPreview}
                      aria-haspopup="dialog"
                      onMouseEnter={() => setHoveredAchievementKey(key)}
                      onMouseLeave={() => setHoveredAchievementKey(null)}
                      onFocus={() => setHoveredAchievementKey(key)}
                      onBlur={() => setHoveredAchievementKey(null)}
                      onClick={() => setDetailAchievement(a)}
                      className="flex-1 rounded-2xl border p-4 text-left shadow-sm backdrop-blur-sm transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      style={{
                        background: "var(--card)/0.5",
                        borderColor: showHoverPreview ? `${paradigm.color}55` : "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-bold tracking-widest"
                          style={{ color: paradigm.color }}
                        >
                          {a.year}
                        </span>
                      </div>
                      <h4 className="text-foreground font-bold text-sm">{a.title}</h4>
                      <AnimatePresence initial={false}>
                        {showHoverPreview && (
                          <motion.div
                            key="preview"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 text-xs leading-snug text-muted-foreground line-clamp-1">
                              {a.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
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
                className="rounded-xl overflow-hidden shadow-md"
                style={{ height: 160 }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(photo)}
                  className="relative block h-full w-full overflow-hidden border-0 p-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`View larger: ${photo.alt}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </button>
              </motion.div>
            ))}
            {/* Row 2: tall left + two stacked right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden row-span-2 shadow-md"
              style={{ height: 328 }}
            >
              {gallery[2] ? (
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(gallery[2])}
                  className="relative block h-full w-full overflow-hidden border-0 p-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`View larger: ${gallery[2].alt}`}
                >
                  <img
                    src={gallery[2].src}
                    alt={gallery[2].alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </button>
              ) : null}
            </motion.div>
            <div className="flex flex-col gap-3">
              {gallery.slice(3, 5).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
                  className="rounded-xl overflow-hidden flex-1 shadow-md"
                  style={{ height: 155 }}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxPhoto(photo)}
                    className="relative block h-full w-full overflow-hidden border-0 p-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`View larger: ${photo.alt}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </button>
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

      <Dialog open={detailAchievement !== null} onOpenChange={(o) => !o && setDetailAchievement(null)}>
        <DialogContent
          className="max-w-2xl rounded-2xl border-2 sm:rounded-2xl"
          style={{ borderColor: detailAchievement ? `${paradigm.color}40` : undefined }}
        >
          {detailAchievement && (
            <DialogHeader>
              <span
                className="mb-2 inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest"
                style={{
                  background: `${paradigm.color}22`,
                  color: paradigm.color,
                }}
              >
                {detailAchievement.year}
              </span>
              <DialogTitle className="pr-8 text-left text-2xl leading-tight">
                {detailAchievement.title}
              </DialogTitle>
              <DialogDescription className="text-left text-base leading-relaxed text-muted-foreground">
                {detailAchievement.details}
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={lightboxPhoto !== null} onOpenChange={(o) => !o && setLightboxPhoto(null)}>
        <DialogContent className="max-w-[min(56rem,calc(100vw-2rem))] border-0 bg-transparent p-2 shadow-none sm:rounded-2xl">
          {lightboxPhoto && (
            <>
              <DialogTitle className="sr-only">Gallery image: {lightboxPhoto.alt}</DialogTitle>
              <div className="overflow-hidden rounded-xl bg-background">
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.alt}
                  className="max-h-[85vh] w-full object-contain"
                />
                {lightboxPhoto.alt ? (
                  <p className="border-t border-border px-4 py-3 text-center text-sm text-muted-foreground">
                    {lightboxPhoto.alt}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
