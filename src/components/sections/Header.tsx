import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/55 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="px-4 py-3 flex items-center justify-between">
            {/*logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: 0.3,
                duration: 1,
              }}
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="Λογότυπο οδοντιατρείου"
                className="h-5 w-5 flex items-center justify-center mr-3"
              />
              <span className="text-sm font-bold text-gray-80">
                Thomas Gousoulis
              </span>
            </motion.div>

            {/*desktop nav*/}
            <nav className="lg:flex hidden space-x-8">
              {[
                { label: "Υπηρεσίες", href: "#services" },
                { label: "Σχετικά με εμάς", href: "#about" },
                { label: "Επικοινωνία", href: "#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    delay: 0.5 + index * 0.2,
                  }}
                  className="relative text-gray-80 text-sm transition-colors duration-300 group"
                  href={item.href}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            {/* call button */}
            <motion.button
              initial={{ opacity: 0, x: +50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: 0.3,
                duration: 1,
              }}
              className="lg:flex hidden space-x-8 ml-4 px-4 py-2 text-white rounded-xl"
            >
              Καλέστε μας
            </motion.button>

            {/* mobile menu button*/}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.7 }}
                onClick={toggleMenu}
                className="text-gray-300"
              >
                {isOpen ? (
                  <FiX className="h-4 w-4" />
                ) : (
                  <FiMenu className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {/*mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
      >
        <nav className="flex flex-col space-y-3">
          {[
            { label: "Υπηρεσίες", href: "#services" },
            { label: "Σχετικά με εμάς", href: "#about" },
            { label: "Επικοινωνία", href: "#contact" },
          ].map((item) => (
            <a
              onClick={toggleMenu}
              className="text-gray-300 font-medium py-2"
              key={item.label}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
