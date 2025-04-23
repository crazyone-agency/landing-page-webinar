import { motion } from "framer-motion";

export default function ProblemSolutionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.h2 
            className="font-poppins font-bold text-2xl md:text-3xl text-[#010133] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ti senti intrappolato in un ciclo di 'vorrei ma non riesco'?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3 text-[#010133]">😫</div>
              <h3 className="font-semibold mb-2">Procrastinazione</h3>
              <p className="text-sm text-gray-600">Continui a rimandare le attività importanti, sentendoti sopraffatto.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3 text-[#010133]">🤯</div>
              <h3 className="font-semibold mb-2">Overload Mentale</h3>
              <p className="text-sm text-gray-600">Troppe cose da fare, troppa poca energia mentale per gestirle tutte.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3 text-[#010133]">🔄</div>
              <h3 className="font-semibold mb-2">Ciclo del Fallimento</h3>
              <p className="text-sm text-gray-600">Grandi propositi che si infrangono dopo pochi giorni o settimane.</p>
            </div>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            E se esistesse un <span className="font-semibold">metodo scientifico</span> per 'ingannare' il tuo cervello e trasformare la resistenza in azione... con pochi minuti al giorno?
          </motion.p>
          <motion.div 
            className="relative mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-center bg-[#010133] bg-opacity-5 rounded-xl p-6 border border-[#010133] border-opacity-20">
              <div className="mr-6">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-7b06c6dfa3e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Neuroscience concept" 
                  className="rounded-lg w-24 h-24 object-cover shadow-md"
                />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#010133]">La Scienza delle Micro-Azioni Rivelata</h3>
                <p className="text-sm text-gray-600 mt-1">Basato su principi di neuroscienze e psicologia comportamentale, comprovati da studi scientifici.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
