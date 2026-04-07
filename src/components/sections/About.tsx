import { ShieldCheck, Clock, Award, ScanFace } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const sectionV: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const CARD_W = "max-w-[420px] w-full";

const features = [
  { Icon: Award, t: "5+ χρόνια εμπειρίας", s: "Σταθερή ποιότητα & συνέπεια." },
  {
    Icon: ScanFace,
    t: "Ψηφιακή απεικόνιση",
    s: "Με έμφαση στην ασφάλεια και στην ακρίβεια.",
  },
  { Icon: Clock, t: "Ευέλικτο ωράριο", s: "Ραντεβού με βάση τις ανάγκες σας." },
  {
    Icon: ShieldCheck,
    t: "Εγγύηση υγιεινής & ασφάλειας",
    s: "Αυστηρά πρωτόκολλα απολύμανσης και αποστείρωσης.",
  },
];

export default function About() {
  return (
    <motion.section
      variants={sectionV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="about"
      className="px-4 py-20 bg-slate-950 bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)] text-white"
    >
      <motion.div variants={itemV} className="mx-auto w-full max-w-6xl">
        {/* Title */}
        <h2 className="font-extrabold text-3xl tracking-tight text-center">
          Σχετικά με εμάς
        </h2>

        {/* Centered text */}
        <p className="text-white/65 mt-4 leading-relaxed max-w-2xl mx-auto text-center">
          Στο{" "}
          <span className="font-semibold text-white">
            Οδοντιατρείο Thomas Gousoulis
          </span>{" "}
          συνδυάζουμε σύγχρονη τεχνολογία με ανθρώπινη προσέγγιση. Στόχος μας
          είναι η άνεσή σας, η σωστή ενημέρωση και ένα εξατομικευμένο πλάνο
          φροντίδας.
        </p>

        {/* Two columns centered, same width blocks */}
        <motion.div
          variants={itemV}
          className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-14"
        >
          {/* Left column: 4 cards, same width as photo */}
          <div className={`grid gap-5 self-center ${CARD_W}`}>
            {features.map(({ Icon, t, s }) => (
              <div
                key={t}
                className="group relative rounded-2xl overflow-hidden
                border border-white/10 bg-white/5
                shadow-[0_18px_50px_rgba(0,0,0,0.35)]
                transition hover:-translate-y-0.5 hover:bg-white/6.5 hover:border-white/20"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2
                                 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      <Icon
                        className="h-5 w-5 text-white/85"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <div className="font-semibold leading-tight">{t}</div>
                      <div className="text-white/60 text-sm mt-1 leading-relaxed">
                        {s}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="text-center overflow-hidden
                border rounded-2xl p-4 border-white/10 bg-white/5
                shadow-[0_18px_50px_rgba(0,0,0,0.35)]
                transition hover:-translate-y-0.5 hover:border-[#225080] font-semibold leading-tight"
            >
              <a>ΒΙΟΓΡΑΦΙΚΟ ΣΗΜΕΙΩΜΑ</a>
            </div>
          </div>

          {/* Right column: photo, same width */}
          <div className={`${CARD_W}`}>
            <div
              className="group relative rounded-2xl overflow-hidden
                         border border-white/10 bg-white/6 backdrop-blur-md
                         shadow-[0_18px_55px_rgba(0,0,0,0.45)]
                         transition hover:-translate-y-0.5"
            >
              {/* fixed, mobile-friendly size */}
              <div className="relative w-full aspect-4/5">
                <img
                  src="/dentist.jpg"
                  alt="Θωμάς Γουσούλης - Χειρουργός Οδοντίατρος"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
                />

                {/* premium overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                                bg-linear-to-br from-white/10 via-transparent to-transparent"
                />

                {/* name plate */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/30 backdrop-blur-md p-4">
                  <div className="font-extrabold tracking-tight">
                    Θωμάς Γουσούλης
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    Χειρουργός Οδοντίατρος
                  </div>
                </div>
              </div>

              {/* subtle glow */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition
                              bg-radial from-white/10 via-transparent to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
