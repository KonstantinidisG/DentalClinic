import { motion, type Variants } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import {Link} from "react-router-dom";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="
        relative px-4 pt-8 pb-8
        bg-slate-950
        text-white
      "
    >
      
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="
          mx-auto max-w-6xl
          border-t border-white/10
          pt-8
          grid gap-8
          md:grid-cols-[1.2fr_0.9fr_0.9fr] bg-slate-950 text-white
        "
      >
        {/* Brand */}
        <motion.div variants={fadeUp} className="space-y-4">
          <div>
            <div className="font-semibold text-xl">
              Οδοντιατρείο Thomas Gousoulis
            </div>
            <div className="text-white/60 text-sm mt-1">
              Χειρουργός Οδοντίατρος • Λάρισα
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/thomas.gousoulis"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/6.5 hover:border-white/20 transition"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4 text-white/80" />
            </a>

            <a
              href="https://www.instagram.com/thomasgousoulis"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/6.5 hover:border-white/20 transition"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4 text-white/80" />
            </a>
          </div>
        </motion.div>

        {/* Useful */}
        <motion.div variants={fadeUp} className="space-y-4">
          <div className="font-semibold text-sm tracking-wide text-white/90">
            Χρήσιμα
          </div>

          <nav className="flex flex-col gap-2 text-sm text-white/65">
            <Link to="/privacy" className="hover:text-white transition">
              Πολιτική Απορρήτου
            </Link>
            <Link to="/cookies" className="hover:text-white transition">
              Cookies
            </Link>
            <Link to="/faq" className="hover:text-white transition">
              FAQ
            </Link>
          </nav>
        </motion.div>

        {/* Hours */}
        <motion.div variants={fadeUp} className="space-y-4">
          <div className="font-semibold text-sm tracking-wide text-white/90">
            Ωράριο
          </div>

          <div className="space-y-2 text-sm text-white/65">
            <div className="flex justify-between gap-4">
              <span>Δευ - Τετ - Παρ</span>
              <span>10:00 - 18:00</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Τρι - Πεμ</span>
              <span>13:00 - 21:00</span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Σαβ - Κυρ</span>
              <span className="text-white/40">Κλειστά</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* bottom row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="
          max-w-6xl mx-auto
          mt-8 pt-5
          border-t border-white/10
          flex flex-col md:flex-row md:items-center md:justify-between
          gap-3
          text-xs text-white/50
        "
      >
        <div>© {year} Thomas Gousoulis. All rights reserved.</div>

        <div className="md:max-w-130 md:text-right">
          Το περιεχόμενο είναι ενημερωτικό και δεν υποκαθιστά
          ιατρική εξέταση ή διάγνωση.
        </div>
      </motion.div>
    </footer>
  );
}




