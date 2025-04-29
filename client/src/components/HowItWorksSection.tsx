import { motion } from "framer-motion";
import { Link } from "wouter";
import { CalendarDaysIcon, ClockIcon, EuroIcon, LaptopIcon, VideoIcon, GiftIcon } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-[#010133] bg-opacity-10 text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
                COME FUNZIONA
              </span>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#010133]">
                Dettagli del webinar
              </h2>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <CalendarDaysIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Data e Ora</h3>
                  <p>10 Maggio 2025, ore 10:00</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <ClockIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Durata</h3>
                  <p>90 minuti (10:00 - 11:30)</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <EuroIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Prezzo</h3>
                  <p>Completamente gratuito</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <LaptopIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Formato</h3>
                  <p>Webinar live online</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <VideoIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Piattaforma</h3>
                  <p>Zoom (riceverai il link via email)</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-[#010133] rounded-full w-12 h-12 flex items-center justify-center text-white">
                    <GiftIcon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Bonus</h3>
                  <p>Workbook gratuito da scaricare</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
