import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

type Review = {
  name: string;
  rating: number; // 1-5
  text: string;
  date?: string;
};

const reviews: Review[] = [
  { name: "HYGGE NAILSTYLE", rating: 5, text: "Άψογος επαγγελματίας !! Από την πρώτη στιγμή ένιωσα απόλυτη ασφάλεια! Πολυ προσεκτικός , σχολαστικός και με πραγματικό ενδιαφέρον για τον ασθενή .Ο χώρος είναι πεντακάθαρος, σύγχρονος και πολύ ευχάριστος, ενώ το προσωπικό ευγενικό και εξυπηρετικό. Η εμπειρία μου ήταν απόλυτα θετική και το αποτέλεσμα άψογο.", date: "πριν 1 μήνα" },
  { name: "Ευαγγελία Μ.", rating: 5, text: " Εξαιρετικός γιατρός. Δείχνει πραγματικό ενδιαφέρον σε κάθε περιστατικό και εμπνέει απόλυτη εμπιστοσύνη. Ο χώρος είναι μοντέρνος, άνετος και από τα πιο άρτια εξοπλισμένα ιατρεία που έχω συναντήσει. Το προσωπικό είναι ευγενικό, εξυπηρετικό και αποπνέει επαγγελματισμό. Μια συνολικά άψογη εμπειρία, τον συστήνω ανεπιφύλακτα. ", date: "πριν 5 μήνες" },
  { name: "Αντώνις Σ.", rating: 5, text: "ΠΈνας εξαιρετικός οδοντίατρος . Ευχάριστος άνθρωπος και πολύ εξυπηρετικός . Τον επισκέπτομαι απο τα Τρίκαλα γιατί έχω εμπιστοσύνη στην ποιοτική του δουλειά !!", date: "πριν 1 χρόνο" },
  { name: "Θεοδώρα Σ..", rating: 5, text: "Εξαιρετικός οδοντίατρος, υπηρεσίες σε προσιτές τιμές και ποιοτικά προϊόντα! Προσωπικά ενθουσιαστικά από το αποτέλεσμα της λεύκανσης στο σπίτι!.", date: "πριν 1 χρόνο" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} στα 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-300" : "text-white/20"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function GoogleReviewsMarquee({
  speed = 60, // px/sec
  cardWidth = 420,
}: {
  speed?: number;
  cardWidth?: number;
}) {
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);


  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentWidth(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (isPaused || contentWidth === 0) return;

    const dx = (speed * delta) / 1000;
    const current = x.get();
    let next = current - dx;

    if (Math.abs(next) >= contentWidth) next = 0;
    x.set(next);
  });

  return (
    // ✅ padding αριστερά/δεξιά ώστε να μην “κολλάει”
    <div className="px-4 sm:px-6 bg-slate-950 text-white">
      {/* ✅ centered title */}
      <div className="text-center mb-6">
        <div className="text-white/70 text-sm">Αξιολογήσεις</div>
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Τι λένε οι ασθενείς μας στο Google
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
          <span className="text-yellow-300">★</span>
          5.0 <span className="text-white/40">·</span> Google Reviews
        </div>
      </div>

      {/* ✅ bg inherited (no extra background), μόνο glass container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-linear-to-r from-transparent via-slate-950/60 to-transparent opacity-0" />
        {/* καλύτερο fade: χρησιμοποιούμε overlay με backdrop-like */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-linear-to-r from-slate-950/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-linear-to-l from-slate-950/70 to-transparent z-10" />

        {/* λίγο εσωτερικό padding ώστε να “αναπνέει” */}
        <div className="py-3">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div style={{ x }} className="flex gap-4 px-3 sm:px-5 will-change-transform">
              {/* first set (measure) */}
              <div ref={contentRef} className="flex gap-4">
                {reviews.map((r, idx) => (
                  <ReviewCard
                    key={`a-${idx}`}
                    r={r}
                    cardWidth={cardWidth}
                    onHoverChange={setIsPaused}
                  />
                ))}
              </div>

              {/* clone */}
              <div className="flex gap-4" aria-hidden="true">
                {reviews.map((r, idx) => (
                  <ReviewCard
                    key={`b-${idx}`}
                    r={r}
                    cardWidth={cardWidth}
                    onHoverChange={setIsPaused}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

function ReviewCard({
  r,
  cardWidth,
  onHoverChange,
}: {
  r: Review;
  cardWidth: number;
  onHoverChange: (v: boolean) => void;
}) {
  return (
    <div
      className="shrink-0"
      style={{ width: cardWidth }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div
        className="group relative rounded-2xl overflow-hidden
                   border border-white/10 bg-white/6 backdrop-blur-md p-4
                   shadow-[0_18px_55px_rgba(0,0,0,0.35)]
                   transition hover:-translate-y-0.5 hover:border-white/20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                        bg-linear-to-br from-white/10 via-transparent to-transparent" />

        <div className="flex items-start justify-between gap-3">
          <div className="font-semibold leading-tight">{r.name}</div>
          <Stars rating={r.rating} />
        </div>

        <p className="text-white/65 text-sm leading-relaxed mt-2 line-clamp-3">
          {r.text}
        </p>

        {r.date && <div className="text-white/40 text-xs mt-3">{r.date}</div>}
      </div>
    </div>
  );
}