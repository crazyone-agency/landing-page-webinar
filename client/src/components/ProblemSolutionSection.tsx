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
                  src="https://sgpeople.it/wp-content/uploads/2024/06/brain-science.jpg" 
                  alt="Neuroscience concept" 
                  className="rounded-lg w-24 h-24 object-cover shadow-md"
                />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#010133]">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 mr-2 text-[#F8C112]">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    La Scienza delle Piccole Azioni Rivelata
                  </span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">Basato su principi di neuroscienze e psicologia comportamentale, comprovati da studi scientifici.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
