import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addEventToCalendar } from "@/lib/calendar";

interface ThankYouModalProps {
  email: string;
  onClose: () => void;
}

export default function ThankYouModal({ email, onClose }: ThankYouModalProps) {
  const handleAddToCalendar = () => {
    addEventToCalendar();
  };

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
            <div className="mb-6">
              <button
                onClick={handleAddToCalendar}
                className="text-[#010133] font-semibold flex items-center justify-center mx-auto"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Aggiungi al calendario
              </button>
            </div>
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
