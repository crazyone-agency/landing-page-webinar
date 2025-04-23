import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";

export default function CourseBioSection() {
  return (
    <section className="py-20 px-4 relative" id="corso-dettagli" style={{ backgroundColor: '#080826' }}>
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute left-0 top-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bio-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="100%" height="100%" fill="#070723"/>
              <path d="M-10,30 l60,-60 M-10,70 l100,-100 M30,-10 l60,60" stroke={`${brandColors.secondary}15`} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bio-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Il <span className="text-yellow-400">Percorso Formativo</span> e chi lo guida
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto my-6"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-b from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-8 rounded-lg border border-blue-700/30 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                  Dott. Salvatore Garufi
                </h2>
                <h3 className="text-lg text-gray-300 italic">
                  Psicologo ed esperto di Comunicazione Smart
                </h3>
              </div>
              
              <div className="text-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  PERCHÉ È VITALE ESPRIMERE IL TUO POTENZIALE
                </h3>
                <p className="mb-4">
                  Esprimere il tuo potenziale è cruciale per migliorare la qualità della tua vita. 
                  Sviluppare le tue capacità latenti genera realizzazione, alimenta l'ambizione e 
                  favorisce una crescita costante.
                </p>
                <p className="mb-4">
                  Sul piano psicologico, rafforza l'autostima, riduce lo stress e migliora la tua 
                  capacità di superare le sfide.
                </p>
                <p className="mb-4">
                  A livello neurobiologico, attivi la plasticità cerebrale acquisendo nuove abilità 
                  e coltivando la creatività, accrescendo apprendimento e adattabilità.
                </p>
                <p>
                  L'impegno continuo nello sviluppare il tuo potenziale promuove soddisfazione personale, 
                  benessere psicofisico e relazioni più solide.
                </p>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-yellow-400/10 blur-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-yellow-400/10 blur-2xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/11/Foto-Ufficiale.png" 
                alt="Dott. Salvatore Garufi" 
                className="w-full object-cover rounded-lg"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="border-l-4 border-yellow-400 pl-4 py-2">
                  <p className="italic text-gray-200 text-lg">
                    "Il vero cambiamento non avviene con grandi rivoluzioni, ma attraverso piccoli passi costanti e consapevoli. Questa è la vera rivoluzione."
                  </p>
                  <p className="font-bold text-yellow-400 mt-2">— Salvatore Garufi</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-400 opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-2 border-yellow-400 -translate-x-4 translate-y-4"></div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800/60">
                <div className="text-yellow-400 font-bold text-2xl">10.000+</div>
                <div className="text-gray-300">Professionisti formati</div>
              </div>
              <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800/60">
                <div className="text-yellow-400 font-bold text-2xl">15+</div>
                <div className="text-gray-300">Anni di esperienza</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}