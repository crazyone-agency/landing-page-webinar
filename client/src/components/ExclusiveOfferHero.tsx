import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";
import OfferCountdown from "./OfferCountdown";
import {webinarEndDate} from "@/lib/utils.ts";

export default function ExclusiveOfferHero() {
  const scrollToInquiry = () => {
    const element = document.getElementById('offerta-esclusiva');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const today = new Date();
  const endOffer = new Date(webinarEndDate.getTime());
  endOffer.setHours(endOffer.getHours() + 48);
  const isOffer = today >= webinarEndDate && today < endOffer;

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
            {isOffer &&
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-yellow-400 text-blue-900 font-medium">
              Offerta Esclusiva Post-Webinar
            </div>
            }

            {isOffer ? (
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  <span className="block">SCONTO ESCLUSIVO 50%</span>
                  <span className="text-yellow-400">SUL PERCORSO COMPLETO</span>
                </h1>
            ) : (
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  <span className="block">ACQUISTA ORA</span>
                  <span className="text-yellow-400">IL PERCORSO COMPLETO</span>
                </h1>
            )}

            {isOffer ? (
                <p className="text-xl text-gray-200 mb-8">
                  Solo per chi ha già acquistato il workshop
                  <span className="font-semibold text-yellow-300"> Smart Revolution Sprint </span>
                  a 37€ e vuole completare il percorso di trasformazione.
                </p>
            ) : (
                <p className="text-xl text-gray-200 mb-8">
                  Per intraprendere il tuo percorso di trasformazione e rivoluzione.
                </p>
            )}

            {/* Countdown Timer - Mobile Only */}
            {isOffer &&
            <div className="mb-8 lg:hidden">
              <OfferCountdown />
            </div>
            }

            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold px-8 py-6 text-lg" 
                onClick={scrollToInquiry}
              >
                SCOPRI L'OFFERTA
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-semibold px-8 py-6 text-lg" 
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
              <div className="hidden lg:block mb-6">
                <OfferCountdown />
              </div>
              
              <div className="mb-6">
                <div className="text-white text-lg mb-1">Prezzo originale</div>
                <div className="text-4xl font-bold text-white relative inline-block">
                  €8000
                  <div className="h-1 bg-red-500 absolute top-1/2 -left-2 w-[calc(100%+16px)] transform rotate-12"></div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-yellow-400 text-xl mb-1">Prezzo speciale -50%</div>
                <div className="text-6xl font-bold text-yellow-400">€4000</div>
                <div className="text-gray-300 text-sm">IVA inclusa</div>
              </div>
              
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
              
              <div className="text-center">
                <Button 
                  size="lg"
                  className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold py-6 text-lg"
                  onClick={scrollToInquiry}
                >
                  APPROFITTA DELLO SCONTO
                </Button>
                <p className="text-gray-300 text-sm mt-2">Offerta valida solo per chi ha già acquistato Smart Revolution Sprint</p>
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