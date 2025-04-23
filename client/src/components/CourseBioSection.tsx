import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";

export default function CourseBioSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: brandColors.primary }}>
                Dott. Salvatore Garufi
              </h2>
              <h3 className="text-lg text-gray-600 italic">
                Psicologo ed esperto di Comunicazione Smart
              </h3>
            </div>
            
            <div className="prose lg:prose-lg">
              <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>
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
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/11/Foto-Ufficiale.png" 
                alt="Dott. Salvatore Garufi" 
                className="w-full h-full object-cover"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-400 opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-2 border-yellow-400 -translate-x-4 translate-y-4"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}