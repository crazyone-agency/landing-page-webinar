import { motion } from "framer-motion";
import { scientificEvidence, brandColors } from "@/lib/course-utils";

export default function CourseScientificSection() {
  return (
    <section className="py-20 px-4 bg-gray-50" id="perche-funziona">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: brandColors.primary }}>
            PERCHÉ FUNZIONA
          </h2>
          <h3 className="text-xl text-gray-700 mb-6">
            Le evidenze scientifiche alla base di questo Percorso formativo
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Numerose ricerche evidenziano che integrare la sfera emotiva con quella razionale è determinante 
            per ottenere risultati sia nella vita privata sia sul lavoro.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scientificEvidence.map((evidence, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border-l-4"
              style={{ borderColor: brandColors.secondary }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>
                {evidence.title}
              </h3>
              <p className="text-gray-700">
                {evidence.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: brandColors.primary }}>
            Inizia il tuo viaggio verso la tua libertà personale
          </h3>
          <p className="text-xl text-gray-700 mb-2">
            Migliora la tua qualità di vita personale e professionale
          </p>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-50 rounded-full opacity-40 -translate-x-1/2 translate-y-1/3"></div>
    </section>
  );
}