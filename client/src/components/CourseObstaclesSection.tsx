import { motion } from "framer-motion";
import { courseObstacles, brandColors } from "@/lib/course-utils";
import { Button } from "@/components/ui/button";

export default function CourseObstaclesSection() {
  const scrollToInquiry = () => {
    const element = document.getElementById('corso-contatti');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-50" id="problemi">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: brandColors.primary }}>
            COSA TI STA IMPEDENDO DI ESPRIMERE IL TUO POTENZIALE?
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseObstacles.map((obstacle, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-t-4 h-full flex flex-col"
              style={{ borderColor: brandColors.primary }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.primary }}>
                {obstacle.title}
              </h3>
              <p className="text-gray-700 flex-grow">
                {obstacle.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
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