import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";
import OfferCountdown from "./OfferCountdown";

export default function ExclusiveOfferDetails() {
  return (
    <section className="py-24 px-4 relative" style={{ backgroundColor: '#0a0a2e' }} id="offerta-speciale">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute left-0 top-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
              <rect width="100%" height="100%" fill="#080826"/>
              <path d="M-10,30 l60,-60 M-10,70 l100,-100 M30,-10 l60,60" stroke={`${brandColors.secondary}20`} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Perché questa <span className="text-yellow-400">offerta esclusiva</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Crediamo nel potere dei piccoli passi e nel premiare chi ha già iniziato 
            il percorso con noi. Per questo offriamo uno sconto speciale a chi ha già 
            acquisito lo Smart Revolution Sprint.
          </p>
          
          {/* Countdown and urgency messages - Mobile/tablet */}
          <div className="mt-8 md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <OfferCountdown className="max-w-md mx-auto" />
              <p className="text-yellow-300 font-medium mt-4">
                L'offerta scade il 12 maggio 2025 alle 11:30!
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border border-yellow-400/20 rounded-lg p-8 bg-gradient-to-b from-blue-900/40 to-blue-800/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Dal Workshop al Percorso Completo
              </h3>
              
              <p className="text-gray-300 mb-6">
                Hai partecipato al workshop <strong className="text-yellow-300">Smart Revolution Sprint</strong> e hai apprezzato 
                il nostro approccio? Il Percorso Formativo in Sviluppo Personale è il passo 
                successivo del tuo viaggio, un'immersione completa che ti permetterà di:
              </p>
              
              <ul className="space-y-4">
                {[
                  "Consolidare e approfondire gli strumenti appresi nel workshop",
                  "Accedere a tecniche avanzate per lo sviluppo del potenziale personale",
                  "Ricevere coaching e supporto personalizzato",
                  "Applicare le metodologie in contesti personali e professionali con risultati duraturi",
                  "Entrare a far parte della community esclusiva di SG People"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  >
                    <div className="mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-xs">
                        ✓
                      </div>
                    </div>
                    <p className="text-gray-200">{item}</p>
                  </motion.li>
                ))}
              </ul>
              
              {/* Countdown - Desktop/Large devices */}
              <div className="mt-8 hidden md:block lg:hidden">
                <OfferCountdown />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border border-blue-500/20 rounded-lg p-8 bg-gradient-to-b from-blue-900/40 to-blue-800/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Offerta a tempo limitato
              </h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white font-medium">Offerta valida per:</div>
                  <div className="text-yellow-300 font-bold">Solo 10 posti</div>
                </div>
                <div className="w-full h-3 bg-blue-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-[30%]"></div>
                </div>
                <div className="text-gray-400 text-sm mt-1">Solo 3 posti rimasti</div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">Sconto del 50%</strong> sul prezzo normale del percorso formativo, 
                    esclusivamente per chi ha già acquistato lo Smart Revolution Sprint.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">Audit personalizzato gratuito di 30 minuti</strong> con il 
                    Dott. Salvatore Garufi per analizzare le tue sfide specifiche.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">Accesso prioritario</strong> alle future iniziative e workshop 
                    esclusivi organizzati da SG People Group.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-yellow-300 font-medium">Offerta a tempo limitato!</span>
                  </div>
                  
                  <p className="text-white">
                    L'offerta è valida per chi ha già acquistato il workshop "Smart Revolution Sprint" a €37 
                    e scade <span className="text-yellow-300 font-semibold">48 ore dopo la fine del webinar</span> (12 maggio 2025 alle 11:30).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}