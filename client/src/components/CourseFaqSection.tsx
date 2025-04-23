import { motion } from "framer-motion";
import { faqs, brandColors } from "@/lib/course-utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseFaqSection() {
  return (
    <section className="py-20 px-4 relative" id="faq" style={{ backgroundColor: '#0c0c2a' }}>
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute left-0 top-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={`${brandColors.secondary}20`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-dots)" />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Domande <span className="text-yellow-400">Frequenti</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Risposte alle domande più comuni sul Percorso Formativo in Sviluppo Personale e 
            sull'offerta esclusiva per i partecipanti al webinar.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-blue-800/60 rounded-lg overflow-hidden bg-blue-900/30 backdrop-blur-sm shadow-lg"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-semibold group">
                    <span className="text-white group-hover:text-yellow-400 transition-colors">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 border-t border-blue-800/60">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center p-8 bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm rounded-xl border border-blue-700/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Hai altre domande sul percorso formativo?
          </h3>
          <p className="text-gray-300 mb-6">
            Siamo qui per aiutarti a prendere la decisione migliore per il tuo futuro.
            Compila il form di contatto e riceverai una risposta entro 12 ore.
          </p>
          <a 
            href="#offerta-esclusiva" 
            className="inline-block px-8 py-4 rounded-md font-medium transition-all duration-300 bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:shadow-lg"
          >
            Richiedi Informazioni
          </a>
        </motion.div>
      </div>
    </section>
  );
}