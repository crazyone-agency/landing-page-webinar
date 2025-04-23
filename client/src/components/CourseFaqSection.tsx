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
    <section className="py-20 px-4 bg-white" id="faq">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: brandColors.primary }}>
            Domande frequenti
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gray-50 hover:bg-gray-100 text-left font-semibold">
                  <span style={{ color: brandColors.primary }}>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600">
            Raccogli maggiori info per soddisfare la tua curiosità già da ora.
            Compila il form con i tuoi dati e tutte le tue eventuali domande.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Riceverai una nostra risposta entro 12 ore al massimo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}