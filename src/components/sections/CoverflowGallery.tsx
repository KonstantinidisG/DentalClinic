import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, TouchEvent } from "react";
import { motion } from "framer-motion";

type GalleryItem = {
  id: number;
  src: string;
  title: string;
  description: string;
};

type CardStyle = CSSProperties & {
  pointerEvents: "auto" | "none";
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/dentist.jpg",
    title: "Ο χώρος μας",
    description:
      "Σχεδιασμένος για ηρεμία, άνεση και μία premium εμπειρία φροντίδας.",
  },
  {
    id: 2,
    src: "/dentist2.jpg",
    title: "Σύγχρονος εξοπλισμός",
    description:
      "Τεχνολογία και λεπτομέρεια που υποστηρίζουν ασφάλεια και ακρίβεια.",
  },
  {
    id: 3,
    src: "/dentist.jpg",
    title: "Αισθητική προσέγγιση",
    description:
      "Καθαρό, φυσικό και ισορροπημένο αποτέλεσμα με έμφαση στη λεπτομέρεια.",
  },
  {
    id: 4,
    src: "/dentist2.jpg",
    title: "Άνεση σε κάθε επίσκεψη",
    description:
      "Ένα περιβάλλον που κάνει την εμπειρία πιο ευχάριστη και ξεκούραστη.",
  },
  {
    id: 5,
    src: "/dentist.jpg",
    title: "Εμπιστοσύνη & φροντίδα",
    description:
      "Ανθρώπινη προσέγγιση, διαφάνεια και σταθερή ποιότητα σε κάθε στάδιο.",
  },
];

const SWIPE_THRESHOLD = 50;
const AUTO_SPEED = 0.0032;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeUpSoft = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CoverflowGallery() {
  const [position, setPosition] = useState<number>(2);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const total = galleryItems.length;
  const activeIndex = ((Math.round(position) % total) + total) % total;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const normalizeOffset = (index: number, currentPosition: number): number => {
    let offset = index - currentPosition;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
  };

  const nextSlide = (): void => {
    setPosition((prev) => prev + 1);
  };

  const prevSlide = (): void => {
    setPosition((prev) => prev - 1);
  };

  const goToSlide = (index: number): void => {
    setPosition(index);
  };

  useEffect(() => {
    if (isPaused || isDragging) return;

    const animate = () => {
      setPosition((prev) => {
        const next = prev + AUTO_SPEED;
        return next >= total ? next - total : next;
      });

      animationRef.current = window.requestAnimationFrame(animate);
    };

    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging, total]);

  const cardStyles = useMemo<CardStyle[]>(() => {
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;

    return galleryItems.map((_, index) => {
      const offset = normalizeOffset(index, position);

      if (isMobile) {
        if (Math.abs(offset) < 0.5) {
          return {
            transform: "translateX(0px) scale(1) rotateY(0deg)",
            zIndex: 30,
            opacity: 1,
            filter: "blur(0px)",
            pointerEvents: "auto",
          };
        }

        if (offset > 0.5 && offset < 1.5) {
          return {
            transform: "translateX(68%) scale(0.82) rotateY(-18deg)",
            zIndex: 20,
            opacity: 0.45,
            filter: "blur(0.8px)",
            pointerEvents: "auto",
          };
        }

        if (offset < -0.5 && offset > -1.5) {
          return {
            transform: "translateX(-68%) scale(0.82) rotateY(18deg)",
            zIndex: 20,
            opacity: 0.45,
            filter: "blur(0.8px)",
            pointerEvents: "auto",
          };
        }

        return {
          transform: "translateX(0px) scale(0.65)",
          zIndex: 0,
          opacity: 0,
          filter: "blur(2px)",
          pointerEvents: "none",
        };
      }

      if (Math.abs(offset) < 0.5) {
        return {
          transform: "translateX(0px) scale(1) rotateY(0deg)",
          zIndex: 40,
          opacity: 1,
          filter: "blur(0px)",
          pointerEvents: "auto",
        };
      }

      if (offset < -0.5 && offset > -1.5) {
        return {
          transform: "translateX(-290px) scale(0.88) rotateY(28deg)",
          zIndex: 30,
          opacity: 0.82,
          filter: "blur(0px)",
          pointerEvents: "auto",
        };
      }

      if (offset > 0.5 && offset < 1.5) {
        return {
          transform: "translateX(290px) scale(0.88) rotateY(-28deg)",
          zIndex: 30,
          opacity: 0.82,
          filter: "blur(0px)",
          pointerEvents: "auto",
        };
      }

      if (offset < -1.5 && offset > -2.5) {
        return {
          transform: "translateX(-520px) scale(0.72) rotateY(38deg)",
          zIndex: 20,
          opacity: 0.35,
          filter: "blur(1.5px)",
          pointerEvents: "auto",
        };
      }

      if (offset > 1.5 && offset < 2.5) {
        return {
          transform: "translateX(520px) scale(0.72) rotateY(-38deg)",
          zIndex: 20,
          opacity: 0.35,
          filter: "blur(1.5px)",
          pointerEvents: "auto",
        };
      }

      return {
        transform: "translateX(0px) scale(0.5)",
        zIndex: 0,
        opacity: 0,
        filter: "blur(2px)",
        pointerEvents: "none",
      };
    });
  }, [normalizeOffset, position]);

  const getClientX = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ): number => {
    if ("touches" in e) {
      return e.touches[0]?.clientX ?? currentXRef.current;
    }

    return e.clientX;
  };

  const handlePointerDown = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ): void => {
    setIsDragging(true);
    setIsPaused(true);

    const clientX = getClientX(e);
    startXRef.current = clientX;
    currentXRef.current = clientX;
  };

  const handlePointerMove = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ): void => {
    if (!isDragging) return;
    currentXRef.current = getClientX(e);
  };

  const handlePointerUp = (): void => {
    if (!isDragging) return;

    const diff = currentXRef.current - startXRef.current;

    if (diff > SWIPE_THRESHOLD) {
      prevSlide();
    } else if (diff < -SWIPE_THRESHOLD) {
      nextSlide();
    }

    setIsDragging(false);

    window.setTimeout(() => {
      setIsPaused(false);
    }, 200);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white bg-[radial-gradient(700px_260px_at_50%_25%,rgba(110,231,255,0.10),transparent_70%),radial-gradient(700px_260px_at_50%_60%,rgba(167,139,250,0.08),transparent_70%)]"
    >
      <motion.div variants={fadeUp} className="mb-12 text-center md:mb-16">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/45 md:text-xs">
          Gallery Experience
        </p>
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Ο χώρος και η εμπειρία μας
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.3 }}
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto flex h-97.5 w-full items-center justify-center overflow-hidden md:h-130"
        style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div className="pointer-events-none absolute bottom-8 h-16 w-[70%] rounded-full bg-black/30 blur-2xl md:bottom-10" />

        {galleryItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(index)}
              className="absolute overflow-hidden rounded-[28px] border-none outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={cardStyles[index]}
              aria-label={item.title}
            >
              <div
                className={[
                  "group relative overflow-hidden rounded-[28px] border backdrop-blur-xl transition-all duration-500",
                  "w-60 md:w-[320px]",
                  isActive
                    ? "border-white/20 bg-white/10 "
                    : "border-white/10 bg-white/5 ",
                ].join(" ")}
              >
                <div className="absolute inset-0 rounded-[28px] bg-linear-to-b from-white/8 to-transparent opacity-80" />

                <img
                  src={item.src}
                  alt={item.title}
                  className={[
                    "h-75 w-full object-cover transition-all duration-500 md:h-105",
                    isActive ? "scale-100" : "scale-[1.02]",
                    "group-hover:scale-[1.03]",
                  ].join(" ")}
                  draggable={false}
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#050816]/90 via-[#050816]/18 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-left  md:p-6">
                  <div className="mb-2 inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70 md:text-[11px]">
                    Premium Care
                  </div>
                  <h3 className="text-lg font-semibold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/70 md:text-[15px]">
                    {item.description}
                  </p>
                </div>

                <div
                  className={[
                    "pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-500",
                    isActive
                      ? "opacity-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                      : "opacity-0",
                  ].join(" ")}
                />
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-[#0b1433]/65 p-3 text-white/85 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10 md:left-6 md:p-4"
          aria-label="Προηγούμενο"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/15 bg-[#0b1433]/65 p-3 text-white/85 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10 md:right-6 md:p-4"
          aria-label="Επόμενο"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </motion.div>

      <motion.div
        variants={fadeUpSoft}
        transition={{ delay: 0.2 }}
        className="mt-10 text-center md:mt-12"
      >
        <div className="mx-auto max-w-2xl">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            {galleryItems[activeIndex].title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/65 md:text-base">
            {galleryItems[activeIndex].description}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 md:mt-8">
          {galleryItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={[
                  "h-2.5 rounded-full transition-all duration-500",
                  isActive
                    ? "w-8 bg-white shadow-[0_0_18px_rgba(255,255,255,0.35)]"
                    : "w-2.5 bg-white/28 hover:bg-white/50",
                ].join(" ")}
                aria-label={`Μετάβαση στο slide ${index + 1}`}
              />
            );
          })}
        </div>

        <div className="mt-8 text-xs uppercase tracking-[0.28em] text-white/35 md:mt-10">
          Swipe • Click • Explore
        </div>
      </motion.div>
    </motion.section>
  );
}
