import { useEffect, useState } from "react";
import Intro from "./components/sections/Intro";
import Services from "./components/sections/Services";
import Header from "./components/sections/Header";
import FloatingActions from "./components/sections/FloatingActions";
import ToTop from "./components/sections/ToTop";
import About from "./components/sections/About";
import GoogleReviewsMarquee from "./components/sections/GoogleReviewsMarquee";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privacy from "./components/sections/Privacy";
import Cookies from "./components/sections/Cookies";
import Faq from "./components/sections/Faq";
import CoverflowGallery from "./components/sections/CoverflowGallery";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showIntro]);

  const [servicesKey, setServicesKey] = useState(0);
  const handleEnter = () => {
    setIsExiting(true);

    setServicesKey((k) => k + 1);
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });

    // διάρκεια animation (πρέπει να ταιριάζει με CSS)
    setTimeout(() => {
      setShowIntro(false);
    }, 700);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN SITE */}
        <Route
          path="/"
          element={
            <main className="relative min-h-screen overflow-x-hidden bg-[#071a3a] text-white">
              <div className="relative z-10">
                {showIntro && (
                  <Intro onEnter={handleEnter} isExiting={isExiting} />
                )}
                {!showIntro && <Header />}
                <Services motionKey={servicesKey} />
                <CoverflowGallery />
                <About />
                <GoogleReviewsMarquee speed={60} cardWidth={420} />
                <Contact />
                <Footer />
                <FloatingActions />
                <ToTop />
              </div>
            </main>
          }
        />
        {/* PRIVACY PAGE */}
        <Route path="/privacy" element={<Privacy />} />
        {/* COOKIES PAGE */}
        <Route path="/cookies" element={<Cookies />} />
        {/* COOKIES PAGE */}
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}
