import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials, brandColors } from "@/lib/course-utils";

export default function ExclusiveOfferTestimonials() {
  return (
    <section
      id="testimonianze"
      className="py-24 px-4 relative overflow-hidden" 
      style={{ backgroundColor: '#10102f' }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-yellow-400 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 bg-yellow-400 blur-3xl"></div>
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ecco cosa dicono alcuni partecipanti
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Persone come te che hanno completato il percorso formativo e hanno 
            trasformato la loro vita personale e professionale.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-blue-900/60 to-blue-800/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/10 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-yellow-400/60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
              </div>
              
              <blockquote className="text-gray-200 mb-6 leading-relaxed">
                {testimonial.quote}
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.primary, color: brandColors.secondary }}>
                  <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-blue-800/50 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xl text-white font-medium">
            Pronto ad unirti a loro e trasformare la tua vita?
          </p>
          <p className="text-gray-300 mt-2">
            Approfitta dell'offerta esclusiva e inizia il tuo percorso di trasformazione oggi stesso.
          </p>
          
          <div className="flex justify-center mt-6">
            <a 
              href="#offerta-esclusiva" 
              className="inline-flex items-center px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-medium rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300"
            >
              Scopri di più
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}