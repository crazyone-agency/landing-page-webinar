import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  TargetIcon, 
  BrainCircuitIcon, 
  LightbulbIcon, 
  MapIcon, 
  HourglassIcon 
} from "lucide-react";

export default function WhatYouWillLearnSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-[#F8C112] bg-opacity-20 text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
                COSA IMPARERAI
              </span>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#010133]">
                Scopri come creare trasformazioni concrete nella tua vita quotidiana
              </h2>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="flex" variants={itemVariants}>
              <div className="mr-4 mt-1">
                <div className="bg-[#F8C112] rounded-full w-10 h-10 flex items-center justify-center text-[#010133]">
                  <TargetIcon size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Identificare le 3 micro-azioni più potenti per la TUA situazione</h3>
                <p className="text-gray-600">Imparerai a selezionare le piccole abitudini che avranno l'impatto più significativo sui tuoi risultati personali.</p>
              </div>
            </motion.div>
            
            <motion.div className="flex" variants={itemVariants}>
              <div className="mr-4 mt-1">
                <div className="bg-[#F8C112] rounded-full w-10 h-10 flex items-center justify-center text-[#010133]">
                  <BrainCircuitIcon size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Applicare subito il protocollo SG People per ridurre l'overload mentale</h3>
                <p className="text-gray-600">Strategie concrete per diminuire il sovraccarico cognitivo e recuperare chiarezza mentale.</p>
              </div>
            </motion.div>
            
            <motion.div className="flex" variants={itemVariants}>
              <div className="mr-4 mt-1">
                <div className="bg-[#F8C112] rounded-full w-10 h-10 flex items-center justify-center text-[#010133]">
                  <LightbulbIcon size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Capire la neuroscienza dietro il cambiamento duraturo (spiegata semplice)</h3>
                <p className="text-gray-600">Comprenderai i meccanismi cerebrali che governano le abitudini e come sfruttarli a tuo vantaggio.</p>
              </div>
            </motion.div>
            
            <motion.div className="flex" variants={itemVariants}>
              <div className="mr-4 mt-1">
                <div className="bg-[#F8C112] rounded-full w-10 h-10 flex items-center justify-center text-[#010133]">
                  <MapIcon size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Creare un piano "a prova di fallimento" per raggiungere i tuoi obiettivi</h3>
                <p className="text-gray-600">Un sistema pratico e strutturato per implementare i cambiamenti desiderati senza ricadere nei vecchi schemi.</p>
              </div>
            </motion.div>
            
            <motion.div className="flex md:col-span-2 mt-4" variants={itemVariants}>
              <div className="mr-4 mt-1">
                <div className="bg-[#F8C112] rounded-full w-10 h-10 flex items-center justify-center text-[#010133]">
                  <HourglassIcon size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Smettere di procrastinare sulle cose che contano davvero</h3>
                <p className="text-gray-600">Tecniche pratiche per superare i blocchi mentali che ti impediscono di agire sulle tue priorità più importanti.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="#register-now">
              <span className="inline-block bg-[#010133] hover:bg-opacity-90 transition duration-300 text-white font-bold px-8 py-4 rounded-md text-center shadow-md cursor-pointer">
                Partecipa al Webinar Gratuito
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
