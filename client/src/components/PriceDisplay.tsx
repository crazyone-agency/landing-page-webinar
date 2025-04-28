import { motion } from "framer-motion";
import { isSpecialOfferExpired, isCourseOfferExpired } from "@/lib/utils";

interface PriceDisplayProps {
  type: "offer" | "course";
  className?: string;
}

export default function PriceDisplay({ type, className = "" }: PriceDisplayProps) {
  // Verifica se l'offerta è scaduta
  const isExpired = type === "offer" 
    ? isSpecialOfferExpired() 
    : isCourseOfferExpired();
  
  if (type === "offer") {
    // Mostra il prezzo dell'offerta speciale
    return (
      <div className={`${className}`}>
        {isExpired ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="bg-[#F8C112] rounded-lg p-4 border-2 border-white text-[#010133]">
              <span className="text-sm font-medium">Prezzo attuale:</span>
              <p className="text-3xl font-bold">€397</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
              <span className="text-gray-300 text-sm line-through">Prezzo Normale:</span>
              <p className="text-2xl font-bold text-gray-300 line-through">€397</p>
            </div>
            <div className="bg-[#F8C112] rounded-lg p-4 border-2 border-white text-[#010133]">
              <span className="text-sm font-medium">Prezzo Esclusivo:</span>
              <p className="text-3xl font-bold">€37</p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // Mostra il prezzo del corso
    return (
      <div className={`${className}`}>
        {isExpired ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="bg-[#F8C112] rounded-lg p-4 border-2 border-white text-[#010133]">
              <span className="text-sm font-medium">Prezzo attuale:</span>
              <p className="text-3xl font-bold">€7.998</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
              <span className="text-gray-300 text-sm line-through">Prezzo Normale:</span>
              <p className="text-3xl font-bold text-gray-300 line-through">€7.998</p>
            </div>
            <div className="text-4xl font-bold text-[#F8C112]">→</div>
            <div className="bg-[#F8C112] rounded-lg p-6 border-2 border-white text-[#010133] text-center">
              <span className="text-sm font-medium">Prezzo Esclusivo:</span>
              <p className="text-3xl font-bold">€3.998</p>
              <p className="text-sm mt-1">Solo per chi acquista lo Sprint</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}