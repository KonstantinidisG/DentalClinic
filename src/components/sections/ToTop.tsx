"use client";

import { useEffect, useState } from "react";

export default function ToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 350);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Πάνω"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-3 bottom-22 z-50 w-11 h-11 rounded-full bg-white text-black font-bold grid place-items-center sm:bottom-3"
    >
    ↑
    </button>
  );
}
