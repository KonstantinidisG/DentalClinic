import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, Plus, Minus, HelpCircle, Phone } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const faqs = [
  {
    q: "Πώς κλείνω ραντεβού;",
    a: "Τα ραντεβού κλείνονται τηλεφωνικά στο +30 690 959 1450. Θα σας προτείνουμε την πρώτη διαθέσιμη ώρα που σας εξυπηρετεί.",
  },
  {
    q: "Τι να περιμένω στην πρώτη επίσκεψη;",
    a: "Γίνεται κλινικός έλεγχος, εκτίμηση αναγκών και συζήτηση για πιθανές επιλογές θεραπείας, με σαφή ενημέρωση για τα βήματα.",
  },
  {
    q: "Κάνετε επείγοντα περιστατικά;",
    a: "Αν υπάρχει πόνος ή επείγον, καλέστε μας. Θα προσπαθήσουμε να σας εξυπηρετήσουμε όσο πιο άμεσα γίνεται, ανάλογα με τη διαθεσιμότητα.",
  },
  {
    q: "Πόσο διαρκεί ένας καθαρισμός;",
    a: "Συνήθως 30–60 λεπτά, ανάλογα με το περιστατικό. Θα σας ενημερώσουμε εκ των προτέρων.",
  },
  {
    q: "Δέχεστε κάρτες/ηλεκτρονική πληρωμή;",
    a: "Ενημερωθείτε τηλεφωνικά για διαθέσιμους τρόπους πληρωμής και τυχόν δόσεις ή πλάνο όπου εφαρμόζεται.",
  },
  {
    q: "Πού βρίσκεστε και πώς έρχομαι;",
    a: "Θα βρείτε χάρτη στη σελίδα Επικοινωνία και κουμπί Οδηγίες. Μπορείτε επίσης να μας καλέσετε για διευκρινίσεις.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <HelpCircle className="h-4 w-4 text-white/70" />
            FAQ
          </div>
        </motion.div>

        {/* Hero */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <HelpCircle className="h-6 w-6 text-white/85" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Συχνές Ερωτήσεις
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-white/65 leading-relaxed">
            Απαντήσεις σε συχνές ερωτήσεις. Για οτιδήποτε επιπλέον, καλέστε μας.
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div variants={container} className="grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.q}
                variants={cardV}
                className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden transition hover:bg-white/6.5 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold leading-tight">{item.q}</span>

                  <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-white/80" />
                    ) : (
                      <Plus className="h-4 w-4 text-white/80" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed border-t border-white/10">
                        <div className="pt-4">{item.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call helper */}
        <motion.div
          variants={fadeUp}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-semibold">Δεν βρήκατε αυτό που ψάχνετε;</div>
              <div className="text-sm text-white/60 mt-1">
                Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες.
              </div>
            </div>

            <a
              href="tel:+306909591450"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/6.5 hover:text-white hover:border-white/20"
            >
              <Phone className="h-4 w-4" />
              +30 690 959 1450
            </a>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}