import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";

export default function CourseHeroSection() {
  const scrollToInquiry = () => {
    const element = document.getElementById('corso-contatti');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-20 px-4 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      
      <div className="container relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="text-lg md:text-xl font-medium uppercase tracking-wider text-yellow-400 mb-2">
            PERCORSO FORMATIVO in
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            SVILUPPO PERSONALE
          </h1>
          
          <h3 className="text-xl md:text-2xl italic font-medium mb-8 text-gray-200">
            Sprigiona il tuo potenziale e migliora la tua qualità di vita
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/20">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">OBIETTIVO PRINCIPALE</h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              Insegnarti i metodi e le tecniche (scientificamente validate) delle 5 human skills, 
              per sprigionare il tuo potenziale ed elevare i tuoi livelli di qualità di vita in 
              termini di soddisfazione e realizzazione, nei contesti personali e lavorativi.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button 
            size="lg" 
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold px-8 py-6 text-lg" 
            onClick={scrollToInquiry}
          >
            RICHIEDI MAGGIORI INFORMAZIONI
          </Button>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
      />
    </section>
  );
}