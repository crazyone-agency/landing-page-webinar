import { motion } from "framer-motion";
import { courseSteps, brandColors } from "@/lib/course-utils";

export default function CourseStepsSection() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="percorso">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: brandColors.primary }}>
            IL VIAGGIO PER ESPRIMERE IL TUO POTENZIALE IN 5 TAPPE
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {courseSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div 
                className="w-24 h-24 mb-6 rounded-full flex items-center justify-center text-4xl"
                style={{ backgroundColor: brandColors.primary, color: brandColors.white }}
              >
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>
                {step.title}
              </h3>
              
              <p className="text-gray-700">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0" style={{ transform: 'translateY(-50%)' }}></div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full opacity-30 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 translate-y-1/3 -translate-x-1/3"></div>
    </section>
  );
}