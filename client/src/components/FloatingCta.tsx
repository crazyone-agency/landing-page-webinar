import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra il pulsante dopo aver scrollato di 500px
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link href="#register-now">
            <span className="flex items-center justify-center bg-[#F8C112] hover:bg-[#e0ad0f] transition-all duration-300 text-[#010133] font-bold px-5 py-3 rounded-full shadow-lg cursor-pointer">
              <span className="mr-2">Riserva il tuo posto</span>
              <ArrowRightIcon size={18} />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}