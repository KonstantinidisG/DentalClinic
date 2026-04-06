import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Cookie, ShieldCheck, BarChart3, MapPinned } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Cookies() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)] text-white px-4 py-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl"
      >
        {/* Top bar */}
        <motion.div
          variants={fadeUp}
          className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/6.5 hover:text-white hover:border-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Πίσω
          </a>

          <div className="inline-flex items-center gap-2 text-sm text-white/65">
            <Cookie className="h-4 w-4 text-white/70" />
            Πολιτική Cookies
          </div>
        </motion.div>

        {/* Hero header */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <Cookie className="h-6 w-6 text-white/85" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Πολιτική Cookies
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-white/65 leading-relaxed">
            Τα cookies είναι μικρά αρχεία που αποθηκεύονται στη συσκευή σας και
            βοηθούν έναν ιστότοπο να λειτουργεί σωστά και να βελτιώνει την εμπειρία χρήσης.
            Παρακάτω εξηγούμε τι χρησιμοποιούμε και πώς μπορείτε να τα ελέγξετε.
          </p>
        </motion.div>

        {/* Content cards */}
        <motion.div variants={container} className="grid gap-4">
          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <ShieldCheck className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">1) Απαραίτητα cookies</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Μπορεί να χρησιμοποιούνται cookies που είναι απαραίτητα για βασικές
                  λειτουργίες του ιστότοπου. Χωρίς αυτά, ορισμένες λειτουργίες μπορεί να
                  μη δουλεύουν όπως πρέπει.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <BarChart3 className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">2) Στατιστικά / Ανάλυση</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Ενδέχεται να χρησιμοποιούμε ανώνυμα στατιστικά ώστε να κατανοούμε πώς
                  χρησιμοποιείται ο ιστότοπος και να βελτιώνουμε περιεχόμενο και πλοήγηση.
                  Αυτά ενεργοποιούνται μόνο εφόσον είναι διαθέσιμα και επιτρεπτά σύμφωνα
                  με τις ρυθμίσεις του φυλλομετρητή σας.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <MapPinned className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">3) Cookies τρίτων (π.χ. χάρτης)</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Ο ενσωματωμένος χάρτης μπορεί να θέτει cookies ή να συλλέγει τεχνικά
                  δεδομένα σύμφωνα με τις πολιτικές του παρόχου. Μπορείτε επίσης να δείτε
                  οδηγίες μέσω του αντίστοιχου συνδέσμου “Οδηγίες”.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <Cookie className="h-5 w-5 text-white/85" />
              </div>
              <div className="w-full">
                <h2 className="font-bold text-lg">4) Πώς να τα διαχειριστείτε</h2>

                <ul className="mt-4 grid gap-3 text-sm text-white/65">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    Μπορείτε να διαγράψετε cookies από τις ρυθμίσεις του browser.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    Μπορείτε να μπλοκάρετε cookies ή να επιλέξετε “μόνο απαραίτητα”.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    Η απενεργοποίηση cookies μπορεί να επηρεάσει ορισμένες λειτουργίες.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          variants={fadeUp}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/50 backdrop-blur-md"
        >
          Τελευταία ενημέρωση: Ιανουάριος 2026
        </motion.div>
      </motion.div>
    </main>
  );
}




