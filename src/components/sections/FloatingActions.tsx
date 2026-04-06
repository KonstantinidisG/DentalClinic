import { Phone, Navigation } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-2 gap-2 sm:hidden">
      <a
        href="tel:+306909591450"
        aria-label="Κλήσε"
        className="h-12 rounded-2xl bg-white/95 text-slate-950 font-semibold grid place-items-center shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white"
      >
        <Phone className="h-5 w-5" strokeWidth={2} />
      </a>

      <a
        href="https://wa.me/306909591450"
        target="_blank"
        rel="noreferrer"
        aria-label="Στείλε μήνυμα"
        className="h-12 rounded-2xl bg-white/95 text-slate-950 font-semibold grid place-items-center shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white"
      >
        <Navigation className="h-5 w-5" strokeWidth={2} />
      </a>
    </div>
  );
}
