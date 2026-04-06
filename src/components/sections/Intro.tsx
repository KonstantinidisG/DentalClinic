import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  onEnter: () => void;
  isExiting: boolean;
};
export default function Intro({ onEnter, isExiting }: Props) {
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const texts: string[] = [
    '"Ένα χαμόγελο μπορεί να σου αλλάξει τη μέρα"',
    '"Χαμογέλα, είναι η γλώσσα που καταλαβαίνουν όλοι"',
    '"Το χαμόγελο είναι η πιο απλή μορφή ευτυχίας"',
    '"Όπου υπάρχει χαμόγελο, υπάρχει ελπίδα"',
    '"Χαμόγελο, η πιο όμορφη καμπύλη του ανθρώπου"',
  ];

  //Typing animation
  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev: number) => (prev + 1) % texts.length);
        } else {
          setDisplayText(
            isDeleting
              ? currentText.substring(0, displayText.length - 1)
              : currentText.substring(0, displayText.length + 1),
          );
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section
      id="top"
      className={[
        "fixed inset-0 z-50 min-h-svh grid place-items-center px-4 py-10 overflow-hidden",
        "bg-slate-950 text-white",
        "transition-all duration-700 ease-in-out",
        isExiting
          ? "opacity-0 scale-[1.02] blur-[2px]"
          : "opacity-100 scale-100 blur-0",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -inset-40 rotate-8 bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)]" />
      </div>
      <div className="relative z-10 text-center grid gap-3 justify-items-center">
        <img
          src="/logo.png"
          alt="Λογότυπο οδοντιατρείου"
          className="py-2.5 w-28 h-auto opacity-95 animate-[fadeUp_700ms_ease_forwards]"
        />

        <div className="font-extrabold text-[clamp(19px,2.4vw,26px)] opacity-0 animate-[fadeUp_700ms_ease_200ms_forwards]">
          Οδοντιατρείο{" "}
          <span className="bg-linear-to-r from-[#41648a] to-[#225080] text-transparent bg-clip-text">
            Thomas Gousoulis
          </span>
        </div>

        <MotionConfig>
          <div className="text-white/70 leading-relaxed text-[clamp(17px,1.7vw,18px)] max-w-2xl min-h-[3.2em] opacity-0 animate-[fadeUp_700ms_ease_320ms_forwards]">
            {displayText.length ? displayText : "\u00A0"}{" "}
            {/*"Ένα χαμόγελο μπορεί να σου αλλάξει τη μέρα" */}
          </div>
        </MotionConfig>
      </div>
      <button
        type="button"
        onClick={onEnter}
        aria-label="Μετάβαση στις υπηρεσίες"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11 h-14 rounded-full border border-white/15 bg-white/5 grid place-items-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-[scrollDot_1.2s_ease-in-out_infinite]" />
      </button>
    </section>
  );
}
