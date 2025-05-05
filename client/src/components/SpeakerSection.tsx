import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";

export default function SpeakerSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/11/Foto-Ufficiale.png" 
                alt="Salvatore Garufi" 
                className="rounded-xl shadow-lg w-full max-w-xs mx-auto"
              />
            </motion.div>
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block bg-[#010133] bg-opacity-10 text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
                IL TUO SPEAKER
              </span>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#010133] mb-4">
                Salvatore Garufi
              </h2>
              <p className="text-gray-700 mb-4">
                Fondatore di SG People Group, psicologo e consulente aziendale con oltre 9 anni di esperienza nell'applicazione delle neuroscienze e della psicologia per il miglioramento personale e professionale.
              </p>
              <p className="text-gray-700 mb-6">
                Salvatore è noto per la sua capacità di tradurre concetti complessi di neuroscienze in strategie pratiche e immediatamente applicabili. Ha formato più di 1200 professionisti con il suo approccio di "Comunicazione Smart", combinando rigore scientifico e pragmatismo.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <CheckCircleIcon className="text-[#010133] mr-2" size={16} />
                  <span className="text-sm">Psicologo</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <CheckCircleIcon className="text-[#010133] mr-2" size={16} />
                  <span className="text-sm">Esperto in Neuroscienze</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <CheckCircleIcon className="text-[#010133] mr-2" size={16} />
                  <span className="text-sm">Formatore</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <CheckCircleIcon className="text-[#010133] mr-2" size={16} />
                  <span className="text-sm">Consulente Aziendale</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
