import { Phone, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowActions(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={[
        "fixed bottom-3 left-3 right-3 z-50 grid grid-cols-2 gap-2 sm:hidden",
        "transition-all duration-300",
        showActions
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <a
        href="tel:+306909591450"
        aria-label="Κλήση"
        className="grid h-12 place-items-center rounded-2xl bg-white/95 font-semibold text-slate-950 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white"
      >
        <Phone className="h-5 w-5" strokeWidth={2} />
      </a>

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=39.624467663877724,22.39640757081439"
        target="_blank"
        rel="noreferrer"
        aria-label="Οδηγίες"
        className="grid h-12 place-items-center rounded-2xl bg-white/95 font-semibold text-slate-950 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white"
      >
        <Navigation className="h-5 w-5" strokeWidth={2} />
      </a>
    </div>
  );
}
