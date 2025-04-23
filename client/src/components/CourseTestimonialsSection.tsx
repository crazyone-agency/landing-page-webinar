import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials, brandColors } from "@/lib/course-utils";

export default function CourseTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 px-4 bg-white" id="testimonianze">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: brandColors.primary }}>
            Alcune recensioni dei nostri studenti
          </h2>
          <p className="text-lg text-gray-600">Reali, di persone reali.</p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </motion.div>
        
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-2 border-dashed" style={{ borderColor: `${brandColors.secondary}50` }}></div>
          
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full">
                  <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                      <div className="mb-6">
                        <svg className="w-12 h-12 text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                        </svg>
                      </div>
                      
                      <blockquote className="text-lg text-gray-700 italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center" style={{ backgroundColor: brandColors.primary, color: brandColors.white }}>
                          <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold" style={{ color: brandColors.primary }}>{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-yellow-400" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Vai alla testimonianza ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 flex justify-between z-10 pointer-events-none">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 pointer-events-auto"
              aria-label="Testimonianza precedente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 pointer-events-auto"
              aria-label="Prossima testimonianza"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}