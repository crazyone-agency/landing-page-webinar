import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";
import { CreditCard } from "lucide-react";
import OfferCountdown from "./OfferCountdown";
import PriceDisplay from "./PriceDisplay";

interface ExclusiveOfferHeroProps {
  onRequestInfo?: () => void;
  isOfferExpired?: boolean;
  onBuyNow?: () => void;
}

export default function ExclusiveOfferHero({ onRequestInfo, isOfferExpired = false, onBuyNow }: ExclusiveOfferHeroProps) {
  const scrollToInquiry = () => {
    if (onRequestInfo) {
      onRequestInfo();
    } else {
      const element = document.getElementById('offerta-esclusiva');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-20 px-4 overflow-hidden"
      style={{ backgroundColor: brandColors.primary }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: brandColors.secondary }}
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
        style={{ backgroundColor: brandColors.secondary }}
        animate={{ 
          x: [0, 70, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-yellow-400 text-blue-950 font-medium">
              {isOfferExpired ? "Percorso Formativo Completo" : "Offerta Esclusiva Post-Webinar"}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {!isOfferExpired ? (
                <>
                  <span className="block">SCONTO ESCLUSIVO 50%</span>
                  <span className="text-yellow-400">SUL PERCORSO COMPLETO</span>
                </>
              ) : (
                <>
                  <span className="block">PERCORSO FORMATIVO</span>
                  <span className="text-yellow-400">IN SVILUPPO PERSONALE</span>
                </>
              )}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8">
              {!isOfferExpired ? (
                <>
                  Solo per chi ha già acquistato il workshop 
                  <span className="font-semibold text-yellow-300"> Smart Revolution Sprint </span> 
                  a 37€ e vuole completare il percorso di trasformazione.
                </>
              ) : (
                <>
                  Un esclusivo percorso di formazione con 
                  <span className="font-semibold text-yellow-300"> Salvatore Garufi </span> 
                  per sbloccare il tuo pieno potenziale personale e professionale.
                </>
              )}
            </p>
            
            {/* Countdown Timer - Mobile Only */}
            <div className="mb-8 lg:hidden">
              <OfferCountdown />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-950 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg"
                onClick={scrollToInquiry}
              >
                {!isOfferExpired ? "SCOPRI L'OFFERTA" : "RICHIEDI INFORMAZIONI"}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-yellow-400 text-yellow-600 hover:bg-yellow-100/50 hover:text-white font-semibold px-8 py-6 text-lg transition-all"
              >
                VEDI I DETTAGLI DEL CORSO
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-lg border border-yellow-400/30">
              {/* Countdown Timer - Desktop */}
              {!isOfferExpired && (
                <div className="hidden lg:block mb-6">
                  <OfferCountdown />
                </div>
              )}
              
              {/* Price display */}
              {isOfferExpired ? (
                <div className="mb-6">
                  <div className="text-white text-lg mb-1">Prezzo del corso</div>
                  <div className="text-6xl font-bold text-yellow-400">€7.998</div>
                  <div className="text-gray-300 text-sm">IVA inclusa</div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-white text-lg mb-1">Prezzo originale</div>
                    <div className="text-4xl font-bold text-white relative inline-block">
                      €7998
                      <div className="h-1 bg-red-500 absolute top-1/2 -left-2 w-[calc(100%+16px)] transform rotate-12"></div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-yellow-400 text-xl mb-1">Prezzo speciale -50%</div>
                    <div className="text-6xl font-bold text-yellow-400">€3998</div>
                    <div className="text-gray-300 text-sm">IVA inclusa</div>
                  </div>
                </>
              )}
              
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/40 rounded-lg mb-6">
                <h3 className="text-yellow-400 font-semibold text-lg mb-2">Bonus inclusi:</h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-start">
                    <svg className="text-yellow-400 h-5 w-5 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Audit gratuito di 30 minuti</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-yellow-400 h-5 w-5 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Materiale didattico esclusivo</span>
                  </li>
                  <li className="flex items-start text-yellow-300 font-semibold">
                    <svg className="text-yellow-400 h-5 w-5 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Solo 10 posti disponibili</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center space-y-3">
                {!isOfferExpired && onBuyNow && (
                  <Button 
                    size="lg"
                    className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold py-6 text-lg flex items-center justify-center gap-2"
                    onClick={onBuyNow}
                  >
                    <CreditCard className="w-5 h-5" />
                    ACQUISTA ORA
                  </Button>
                )}
                
                <Button 
                  size="lg"
                  className={`w-full ${!isOfferExpired && onBuyNow ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-400 hover:bg-yellow-300'} text-white font-semibold py-6 text-lg`}
                  onClick={scrollToInquiry}
                >
                  {!isOfferExpired ? "APPROFITTA DELLO SCONTO" : "RICHIEDI INFORMAZIONI"}
                </Button>
                
                {!isOfferExpired && (
                  <p className="text-gray-300 text-sm mt-2">Offerta valida solo per chi ha già acquistato Smart Revolution Sprint</p>
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-yellow-400/20 backdrop-blur-sm -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-yellow-400/10 backdrop-blur-sm -z-10"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <button 
          onClick={scrollToInquiry}
          className="text-white opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Scorri verso il basso"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}