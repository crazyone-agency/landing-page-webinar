import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProofSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-[#F8C112] bg-opacity-20 text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
                COSA DICONO I PARTECIPANTI
              </span>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#010133]">
                Testimonianze dai nostri clienti
              </h2>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-[#F8C112] flex">
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                </div>
              </div>
              <p className="italic text-gray-700 mb-4">
                "Il metodo di Salvatore ha trasformato il mio approccio al lavoro. Le piccole azioni mi hanno permesso di superare la procrastinazione cronica che mi bloccava da anni."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-medium">MT</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Marco T.</p>
                  <p className="text-sm text-gray-500">Imprenditore</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-[#F8C112] flex">
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                  <Star className="fill-[#F8C112]" size={16} />
                </div>
              </div>
              <p className="italic text-gray-700 mb-4">
                "La spiegazione della neuroscienza dietro i nostri comportamenti, presentata in modo semplice e pratico, mi ha dato gli strumenti per un cambiamento duraturo."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-medium">LM</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Laura M.</p>
                  <p className="text-sm text-gray-500">Professionista HR</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-center font-semibold mb-6">Aziende che si sono affidate a SG People Group</h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {/* Company logos would go here, using gray boxes with text as placeholders */}
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Azienda 1</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Azienda 2</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Azienda 3</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Azienda 4</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
