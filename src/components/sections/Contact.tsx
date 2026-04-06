import { motion, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Navigation,
  Phone,
  CalendarClock,
} from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {Marker, NavigationControl} from "react-map-gl/maplibre";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const mapReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

type OpenStatus = {
  open: boolean;
  label: string;
};

function fmt(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function getOpenStatus(): OpenStatus {
  const now = new Date();
  const day = now.getDay(); // 0 Sun, 1 Mon ... 6 Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const schedule: Record<number, { start: number; end: number } | null> = {
    0: null, // Κυριακή
    1: { start: 10 * 60, end: 18 * 60 }, // Δευτέρα
    2: { start: 13 * 60, end: 21 * 60 }, // Τρίτη
    3: { start: 10 * 60, end: 18 * 60 }, // Τετάρτη
    4: { start: 13 * 60, end: 21 * 60 }, // Πέμπτη
    5: { start: 10 * 60, end: 18 * 60 }, // Παρασκευή
    6: null, // Σάββατο
  };

  const today = schedule[day];

  if (today && currentMinutes >= today.start && currentMinutes < today.end) {
    return {
      open: true,
      label: `Ανοιχτά τώρα · Κλείνουμε στις ${fmt(today.end)}`,
    };
  }

  if (today && currentMinutes < today.start) {
    return {
      open: false,
      label: `Κλειστά τώρα · Ανοίγουμε σήμερα στις ${fmt(today.start)}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (day + offset) % 7;
    const nextSchedule = schedule[nextDay];
    if (nextSchedule) {
      const dayNames = [
        "Κυριακή",
        "Δευτέρα",
        "Τρίτη",
        "Τετάρτη",
        "Πέμπτη",
        "Παρασκευή",
        "Σάββατο",
      ];

      return {
        open: false,
        label: `Κλειστά τώρα · Ανοίγουμε ${dayNames[nextDay]} στις ${fmt(
          nextSchedule.start
        )}`,
      };
    }
  }

  return {
    open: false,
    label: "Κλειστά τώρα",
  };
}

export default function Contact() {
  const { open, label } = getOpenStatus();

  return (
    <section
      id="contact"
      className="min-h-svh grid items-center px-4 py-16 bg-slate-950 bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)] text-white"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-6xl grid gap-8"
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-extrabold text-3xl tracking-tight">Επικοινωνία</h2>
          <p className="text-white/65 mt-3 max-w-2xl mx-auto leading-relaxed">
            Καλέστε μας ή δείτε οδηγίες. Απαντάμε άμεσα και σας εξυπηρετούμε
            σύμφωνα με το ωράριο λειτουργίας.
          </p>
        </motion.div>

        {/* Status + Hours */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-md ${
              open
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-red-400/30 bg-red-400/10 text-red-300"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                open ? "bg-emerald-400" : "bg-red-400"
              } ${open ? "animate-pulse" : ""}`}
            />
            {label}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md">
            <CalendarClock className="h-4 w-4 text-white/70" />
            Δευ - Τετ - Παρ 10:00 - 18:00 · Τρι - Πεμ 13:00 - 21:00
          </div>
        </motion.div>

        {/* Premium map card */}
        <motion.div variants={mapReveal}>
          <div className="relative rounded-[28px] border border-white/10 bg-white/4 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden">
            {/* subtle premium glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_180px_at_20%_0%,rgba(110,231,255,0.14),transparent_55%),radial-gradient(600px_180px_at_80%_0%,rgba(167,139,250,0.14),transparent_55%)]" />

            <div className="relative overflow-hidden rounded-[22px] border border-white/10 h-115">

            <Map
            initialViewState={{
                longitude: 22.4178,
                latitude: 39.6467,
                zoom: 15,
                pitch: 35,
                bearing: -8
            }}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            style={{ width: "100%", height: "100%" }}
            >
            <NavigationControl position="top-right" />

            <Marker longitude={22.4178} latitude={39.6467} anchor="bottom">
                <div className="rounded-full border border-white/20 bg-slate-900 p-2 shadow-xl backdrop-blur-md">
                <MapPin className="h-5 w-5 text-cyan-300" />
                </div>
            </Marker>

            </Map>
            </div>

            {/* floating info badge */}
            <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-slate-950/70 backdrop-blur-xl px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] max-w-[320px]">
              <div className="font-semibold text-sm">Οδοντιατρείο Thomas Gousoulis</div>
              <div className="text-white/65 text-xs mt-1 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Καραολή & Δημητρίου 47, Νεάπολη, Λάρισα
              </div>

            </div>
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={container}
          className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3"
        >
          {[
            {
              icon: Phone,
              label: "Τηλέφωνο",
              value: "+30 690 959 1450",
              href: "tel:+306909591450",
            },
            {
              icon: Mail,
              label: "Email",
              value: "info@smilecare.gr",
              href: "mailto:info@smilecare.gr",
            },
            {
              icon: Navigation,
              label: "Οδηγίες",
              value: "Άνοιγμα στους Χάρτες",
              href: "https://www.google.com/maps/search/?api=1&query=%CE%9A%CE%B1%CF%81%CE%B1%CE%BF%CE%BB%CE%AE%20%26%20%CE%94%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%AF%CE%BF%CF%85%2047,%20%CE%9D%CE%B5%CE%AC%CF%80%CE%BF%CE%BB%CE%B7,%20%CE%9B%CE%AC%CF%81%CE%B9%CF%83%CE%B1",
            },
          ].map(({ icon: Icon, label, value, href }) => {
            const card = (
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    <Icon className="h-5 w-5 text-white/85" aria-hidden="true" />
                  </div>

                  <div>
                    <div className="font-semibold leading-tight">{label}</div>
                    <div className="text-white/60 text-sm mt-1 leading-relaxed wrap-break-word">
                      {value}
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div key={label} variants={fadeUp}>
                {href ? (
                  <a
                    href={href}
                    target={label === "Οδηγίες" ? "_blank" : undefined}
                    rel={label === "Οδηγίες" ? "noreferrer" : undefined}
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}