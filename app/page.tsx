"use client";
import RetroGrid from "@/components/ui/retro-grid";
import HorizontalScroll from "@/components/HorizontalScroll";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const headingFont = { fontFamily: "var(--font-heading), sans-serif" };

/* ─── SLIDE 1 ─ HERO ─────────────────────────────────────── */
function HeroSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-6 select-none">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-400/60 text-xs tracking-[0.5em] uppercase"
        style={headingFont}
      >
        Impianti Elettrici
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white font-bold uppercase leading-none"
        style={{
          ...headingFont,
          fontSize: "clamp(3rem, 10vw, 9rem)",
          textShadow: "0 0 60px rgba(255,230,0,0.25)",
          letterSpacing: "-0.03em",
        }}
      >
        Giubilato
        <br />
        <span
          style={{
            WebkitTextStroke: "2px #ffe600",
            color: "transparent",
          }}
        >
          Cristopher
        </span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-100/40 text-sm tracking-[0.4em] uppercase"
        style={headingFont}
      >
        Impianti &nbsp; Manutenzione &nbsp; Sicurezza
      </motion.p>

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase" style={headingFont}>
          Scorri per esplorare
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-yellow-400/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── SLIDE 2 ─ CHI SIAMO ────────────────────────────────── */
function AboutSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto gap-8 select-none">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-400/60 text-xs tracking-[0.5em] uppercase"
        style={headingFont}
      >
        Chi Siamo
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white font-bold uppercase leading-tight"
        style={{
          ...headingFont,
          fontSize: "clamp(2rem, 6vw, 5rem)",
          textShadow: "0 0 40px rgba(255,230,0,0.2)",
          letterSpacing: "-0.03em",
        }}
      >
        Passione e competenza
        <br />
        <span
          style={{
            WebkitTextStroke: "1.5px #ffe600",
            color: "transparent",
          }}
        >
          dal primo giorno.
        </span>
      </motion.h2>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl font-light"
      >
        Con oltre <span className="text-yellow-400 font-semibold">15 anni di esperienza</span> nel
        settore elettrico, Giubilato Cristopher offre soluzioni su misura per
        privati e aziende. Dal 2009 portiamo professionalità, affidabilità e
        cura del dettaglio in ogni cantiere.
      </motion.p>

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex gap-10 mt-2"
      >
        {[
          { value: "15+", label: "Anni di attività" },
          { value: "500+", label: "Progetti completati" },
          { value: "100%", label: "Clienti soddisfatti" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span
              className="font-bold text-yellow-400"
              style={{ ...headingFont, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
            >
              {stat.value}
            </span>
            <span className="text-white/40 text-xs tracking-widest uppercase" style={headingFont}>
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── SLIDE 3 ─ SERVIZI ──────────────────────────────────── */
const services = [
  { icon: "⚡", title: "Impianti Civili", desc: "Installazione e ristrutturazione di impianti elettrici per abitazioni." },
  { icon: "🏭", title: "Impianti Industriali", desc: "Soluzioni su misura per capannoni, uffici e strutture produttive." },
  { icon: "🏠", title: "Domotica", desc: "Automazione e controllo intelligente della tua casa." },
  { icon: "🔧", title: "Manutenzione", desc: "Interventi rapidi, programmati e di emergenza." },
  { icon: "☀️", title: "Fotovoltaico", desc: "Progettazione e installazione di impianti solari." },
  { icon: "🔒", title: "Sicurezza", desc: "Sistemi di allarme, videosorveglianza e controllo accessi." },
];

function ServiziSlide() {
  return (
    <div className="flex flex-col items-center justify-center px-6 max-w-5xl mx-auto gap-8 select-none">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-400/60 text-xs tracking-[0.5em] uppercase"
        style={headingFont}
      >
        I Nostri Servizi
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white font-bold uppercase leading-tight text-center"
        style={{
          ...headingFont,
          fontSize: "clamp(1.8rem, 5vw, 4rem)",
          textShadow: "0 0 40px rgba(255,230,0,0.2)",
          letterSpacing: "-0.03em",
        }}
      >
        Cosa facciamo
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-2 p-4 md:p-6 rounded-xl border border-yellow-400/10 bg-black/30 backdrop-blur-sm
                       hover:border-yellow-400/40 hover:bg-yellow-400/5 transition-all duration-300 text-center"
          >
            <span className="text-2xl md:text-3xl">{s.icon}</span>
            <span className="text-yellow-400 font-semibold text-sm md:text-base uppercase tracking-wide" style={headingFont}>{s.title}</span>
            <span className="text-white/40 text-xs md:text-sm leading-relaxed">{s.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 4 ─ LAVORI ───────────────────────────────────── */
const projects = [
  { title: "Villa Residenziale", category: "Civile", year: "2024" },
  { title: "Capannone Logistico", category: "Industriale", year: "2023" },
  { title: "Smart Home Padova", category: "Domotica", year: "2024" },
  { title: "Impianto Fotovoltaico 20kW", category: "Fotovoltaico", year: "2023" },
];

function LavoriSlide() {
  return (
    <div className="flex flex-col items-center justify-center px-6 max-w-5xl mx-auto gap-8 select-none">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-400/60 text-xs tracking-[0.5em] uppercase"
        style={headingFont}
      >
        Portfolio
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white font-bold uppercase leading-tight text-center"
        style={{
          ...headingFont,
          fontSize: "clamp(2rem, 6vw, 5rem)",
          textShadow: "0 0 40px rgba(255,230,0,0.2)",
          letterSpacing: "-0.03em",
        }}
      >
        I nostri{" "}
        <span
          className="relative inline-block"
          style={{ WebkitTextStroke: "2px #ffe600", color: "transparent" }}
        >
          lavori
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="group relative overflow-hidden rounded-2xl border border-yellow-400/10 bg-black/50 backdrop-blur-sm
                       hover:border-yellow-400/50 transition-all duration-500 p-5 md:p-6 flex flex-col items-center gap-3
                       hover:shadow-[0_0_30px_rgba(255,230,0,0.08)]"
          >
            <span
              className="font-bold text-yellow-400/10 group-hover:text-yellow-400/25 transition-colors duration-500 absolute top-3 right-4"
              style={{ ...headingFont, fontSize: "3rem", lineHeight: 1 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-yellow-400/50 text-[10px] uppercase tracking-[0.3em] mt-auto text-center" style={headingFont}>
              {p.category}
            </span>
            <span className="text-white font-semibold text-base md:text-lg group-hover:text-yellow-400 transition-colors duration-300 leading-tight text-center" style={headingFont}>
              {p.title}
            </span>
            <span className="text-white/20 text-xs text-center" style={headingFont}>{p.year}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDE 5 ─ CONTATTI ──────────────────────────────────── */
function ContattiSlide() {
  return (
    <div className="flex flex-col items-center justify-center px-6 max-w-3xl mx-auto gap-8 select-none">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-yellow-400/60 text-xs tracking-[0.5em] uppercase"
        style={headingFont}
      >
        Contatti
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white font-bold uppercase leading-tight text-center"
        style={{
          ...headingFont,
          fontSize: "clamp(1.8rem, 5vw, 4rem)",
          textShadow: "0 0 40px rgba(255,230,0,0.2)",
          letterSpacing: "-0.03em",
        }}
      >
        Parliamone
      </motion.h2>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 items-center"
      >
        {[
          { label: "Telefono", value: "+39 333 123 4567", icon: "📞" },
          { label: "Email", value: "info@giubilatocristopher.it", icon: "✉️" },
          { label: "Zona", value: "Padova e provincia", icon: "📍" },
        ].map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-1 group px-6 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-white/5">
            <span className="text-2xl">{c.icon}</span>
            <span className="text-yellow-400/50 text-xs uppercase tracking-widest text-center" style={headingFont}>{c.label}</span>
            <span className="text-white text-lg md:text-xl font-light group-hover:text-yellow-400 transition-colors duration-300 text-center">
              {c.value}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.p
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-white/30 text-xs mt-4"
        style={headingFont}
      >
        &copy; {new Date().getFullYear()} Giubilato Cristopher
      </motion.p>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
const slides = [
  { id: 0, label: "Hero", content: <HeroSlide /> },
  { id: 1, label: "Chi Siamo", content: <AboutSlide /> },
  { id: 2, label: "Servizi", content: <ServiziSlide /> },
  { id: 3, label: "Lavori", content: <LavoriSlide /> },
  { id: 4, label: "Contatti", content: <ContattiSlide /> },
];

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <RetroGrid gridColor="#ffe600" showScanlines glowEffect />
      </div>
      <div className="relative z-10">
        <HorizontalScroll slides={slides} />
      </div>
    </div>
  );
}
