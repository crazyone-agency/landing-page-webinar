import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addEventToCalendar } from "@/lib/calendar";
import { Link } from "wouter";

interface ThankYouModalProps {
  email: string;
  onClose: () => void;
}

export default function ThankYouModal({ email, onClose }: ThankYouModalProps) {
  const handleAddToCalendar = () => {
    addEventToCalendar();
  };
  
  // Simuliamo che il webinar è già avvenuto se oggi è dopo il 10 maggio 2025
  const webinarDate = new Date(2025, 4, 10, 11, 30); // 10 maggio 2025, 11:30
  const isAfterWebinar = new Date() > webinarDate;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-8 max-w-md mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-2xl text-green-600" size={28} />
            </div>
            <h3 className="font-poppins font-bold text-xl text-[#010133] mb-2">
              Grazie per la tua iscrizione!
            </h3>
            <p className="text-gray-600 mb-6">
              Abbiamo inviato un'email di conferma a{" "}
              <span className="font-semibold">{email}</span> con i dettagli del webinar e il link per partecipare.
            </p>
            
            {isAfterWebinar ? (
              <div className="mb-6 bg-[#010133] text-white p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Offerta Speciale</h4>
                <p className="mb-3">
                  Il webinar è terminato, ma puoi ancora accedere allo Smart Revolution Sprint a un prezzo esclusivo!
                </p>
                <Link href="/offerta-speciale">
                  <span className="inline-block bg-[#F8C112] text-[#010133] font-bold px-5 py-2 rounded cursor-pointer">
                    Scopri l'Offerta <ArrowRight className="inline ml-1" size={16} />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="mb-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-700 text-sm mb-2">
                    Aggiungi il webinar al tuo calendario per non perderlo!
                  </p>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={handleAddToCalendar}
                      className="bg-[#F8C112] hover:bg-yellow-500 text-[#010133] font-semibold px-4 py-2 rounded-md flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Scarica il file ICS
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 text-gray-600 text-sm">
                  <p><strong>Link Zoom:</strong> https://us06web.zoom.us/j/86248568208</p>
                  <p><strong>ID riunione:</strong> 862 4856 8208</p>
                  <p><strong>Passcode:</strong> 559597</p>
                </div>
              </div>
            )}
            
            <Button
              onClick={onClose}
              className="bg-[#010133] hover:bg-opacity-90 transition duration-300 text-white font-semibold px-6 py-2 rounded-md"
            >
              Chiudi
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
