import { motion } from "framer-motion";
import { courseAudience, learningSteps, brandColors } from "@/lib/course-utils";
import { Button } from "@/components/ui/button";

export default function CourseAudienceSection() {
  const scrollToInquiry = () => {
    const element = document.getElementById('corso-contatti');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-900 text-white relative" id="a-chi-e-rivolto">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://sgpeople.it/wp-content/uploads/2023/11/pexels-pixabay-2166-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Who is this for section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: brandColors.secondary }}>
              A CHI È RIVOLTO QUESTO PERCORSO FORMATIVO
            </h2>
            
            <ul className="space-y-4">
              {courseAudience.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="mr-4 mt-1 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg">{item}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Learning steps section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8" style={{ color: brandColors.secondary }}>
              IL TUO APPRENDIMENTO IN 3 SEMPLICI PASSI
            </h2>
            
            <div className="space-y-8">
              {learningSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: brandColors.secondary }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: brandColors.secondary, color: brandColors.primary }}
            onClick={scrollToInquiry}
          >
            RICHIEDI MAGGIORI INFORMAZIONI
          </Button>
        </motion.div>
      </div>
    </section>
  );
}