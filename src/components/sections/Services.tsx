import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Bolt,
  ShieldCheck,
  Baby,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Καθαρισμός & Έλεγχος",
    desc: "Προληπτικός καθαρισμός, φθορίωση, στοματική υγιεινή.",
    Icon: Stethoscope,
  },
  {
    title: "Λεύκανση",
    desc: "Ασφαλής λεύκανση στο ιατρείο ή/και στο σπίτι.",
    Icon: Sparkles,
  },
  {
    title: "Σφραγίσματα",
    desc: "Αισθητικά σύνθετα ρητίνης με υψηλή αντοχή.",
    Icon: Wrench,
  },
  {
    title: "Ενδοδοντία",
    desc: "Σύγχρονη αντιμετώπιση και προσεκτική αποκατάσταση.",
    Icon: ShieldCheck,
  },
  {
    title: "Εμφυτεύματα",
    desc: "Πλάνο αποκατάστασης με συνεργασίες όπου χρειάζεται.",
    Icon: Bolt,
  },
  {
    title: "Παιδοδοντία",
    desc: "Ήπια προσέγγιση για παιδιά και γονείς.",
    Icon: Baby,
  },
];

type StatProps = {
  value: number;
  suffix?: string;
  title: string;
  subtitle: string;
  decimals?: number;
  colorClassName?: string;
};

function AnimatedStat({
  value,
  suffix = "",
  title,
  subtitle,
  decimals = 0,
  colorClassName = "text-cyan-400",
}: StatProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1600;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [hasStarted, value]);

  const displayValue =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <div ref={ref} className="text-center">
      <div
        className={`text-5xl font-extrabold tracking-tight md:text-6xl ${colorClassName}`}
      >
        {displayValue}
        <span className="ml-1 text-sm align-top text-white/80">{suffix}</span>
      </div>

      <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
        {title}
      </div>

      <p className="mt-2 text-sm text-white/45">{subtitle}</p>
    </div>
  );
}

export default function Services({ motionKey }: { motionKey: number }) {
  return (
    <section
      id="services"
      className="min-h-svh grid items-center px-4 py-16 bg-slate-950 bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)] text-white"
    >
      <motion.div
        key={motionKey}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 25,
          delay: 0.2,
        }}
        className="mx-auto w-full max-w-6xl"
      >
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Υπηρεσίες
        </h2>

        <p className="mt-2 text-center text-white/65">
          Τα πιο συχνά αιτήματα με διαφάνεια και ποιότητα.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6.5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                  <Icon className="h-4 w-4 text-white/80" aria-hidden="true" />
                </div>

                <div>
                  <div className="font-bold leading-tight">{title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16 md:mt-20"
        >
          <div className="mx-auto h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="mt-8 text-center">
            <p className="text-[16px] uppercase tracking-[0.28em] text-white/70">
              ΦΡΟΝΤΙΔΑ ΠΟΥ ΦΑΙΝΕΤΑΙ ΣΤΟΥΣ ΑΡΙΘΜΟΥΣ
            </p>
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <AnimatedStat
              value={5}
              suffix="+"
              title="ΧΡΟΝΙΑ ΕΜΠΕΙΡΙΑΣ"
              subtitle="Σταθερή ποιότητα και ανθρώπινη προσέγγιση"
              colorClassName="bg-gradient-to-r from-[#225080] to-[#225080] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            />

            <AnimatedStat
              value={1000}
              suffix="+"
              title="ΑΣΘΕΝΕΙΣ"
              subtitle="Εμπιστεύτηκαν τη φροντίδα και τη συνέπειά μας"
              colorClassName="bg-gradient-to-r from-[#225080] to-[#225080] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            />

            <AnimatedStat
              value={5}
              suffix="★"
              title="ΑΞΙΟΛΟΓΗΣΗ"
              subtitle="Υψηλή ικανοποίηση και θετική εμπειρία"
              decimals={1}
              colorClassName="bg-gradient-to-r from-[#225080] to-[#225080] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
