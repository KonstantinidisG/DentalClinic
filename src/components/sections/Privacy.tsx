import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ShieldCheck, Lock, Database, Mail } from "lucide-react";

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

export default function Privacy() {
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
            <ShieldCheck className="h-4 w-4 text-white/70" />
            Πολιτική Απορρήτου
          </div>
        </motion.div>

        {/* Hero */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <Lock className="h-6 w-6 text-white/85" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Πολιτική Απορρήτου
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-white/65 leading-relaxed">
            Στο <span className="font-semibold text-white">Οδοντιατρείο Thomas Gousoulis</span> σεβόμαστε
            την ιδιωτικότητά σας και φροντίζουμε τα προσωπικά σας δεδομένα να
            αντιμετωπίζονται με υπευθυνότητα και ασφάλεια.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div variants={container} className="grid gap-4">
          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <Database className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">1) Τι δεδομένα συλλέγουμε</h2>
                <ul className="mt-3 grid gap-3 text-sm text-white/65 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    Δεδομένα επικοινωνίας που μας δίνετε εθελοντικά, όπως όνομα,
                    τηλέφωνο και email, όταν επικοινωνείτε μαζί μας.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    Βασικά τεχνικά δεδομένα πλοήγησης, όπως τύπος συσκευής ή
                    φυλλομετρητή, μόνο εφόσον είναι ενεργά τα σχετικά cookies.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardV}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                <ShieldCheck className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">2) Πώς τα χρησιμοποιούμε</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Χρησιμοποιούμε τα δεδομένα αποκλειστικά για να επικοινωνήσουμε μαζί σας,
                  να απαντήσουμε σε ερωτήσεις, να οργανώσουμε ραντεβού τηλεφωνικά και
                  να βελτιώνουμε την εμπειρία χρήσης του ιστότοπου.
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
                <Lock className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">3) Πότε τα μοιραζόμαστε</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Δεν πουλάμε προσωπικά δεδομένα. Μοιραζόμαστε δεδομένα μόνο όταν αυτό
                  είναι απαραίτητο για τεχνική υποστήριξη ή όταν απαιτείται από το νόμο.
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
                <ShieldCheck className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">4) Ασφάλεια & διατήρηση</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Λαμβάνουμε οργανωτικά και τεχνικά μέτρα ώστε τα δεδομένα να παραμένουν
                  ασφαλή. Διατηρούμε δεδομένα μόνο για όσο χρειάζεται για τους παραπάνω σκοπούς
                  ή όπως απαιτείται από την ισχύουσα νομοθεσία.
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
                <Mail className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h2 className="font-bold text-lg">5) Τα δικαιώματά σας & επικοινωνία</h2>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">
                  Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού επεξεργασίας
                  και εναντίωσης όπου εφαρμόζεται. Για ερωτήσεις σχετικά με την πολιτική απορρήτου:
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="mailto:info@smilecare.gr"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/6.5 hover:text-white hover:border-white/20"
                  >
                    <Mail className="h-4 w-4" />
                    info@smilecare.gr
                  </a>

                  <a
                    href="tel:+306909591450"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/6.5 hover:text-white hover:border-white/20"
                  >
                    <ArrowLeft className="h-4 w-4 rotate-135" />
                    +30 690 959 1450
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

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