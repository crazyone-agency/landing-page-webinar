import { motion } from "framer-motion";
import { Link } from "wouter";
import CountdownTimer from "./CountdownTimer";
import { webinarDate } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="bg-[#010133] text-white py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-[#F8C112] text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
              WEBINAR GRATUITO | 10 MAGGIO
            </span>
            <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              Trasforma la tua Routine (e i tuoi Risultati) con{" "}
              <span className="text-[#F8C112]">5 Minuti al Giorno</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Il webinar gratuito dove Salvatore Garufi ti insegna il protocollo neuroscientifico per battere la procrastinazione e l'overload mentale, un piccolo passo alla volta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="#register-now">
                <span className="inline-block w-full bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-bold px-6 py-3 rounded-md text-center shadow-lg animate-pulse-slow cursor-pointer">
                  Riserva il Tuo Posto Gratuito Ora!
                </span>
              </Link>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F8C112]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Solo per i primi 20 iscritti</span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-gray-200">
                <span className="font-bold text-[#F8C112]">Più di 1200+ professionisti</span> già formati con il metodo SG People
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-[#F8C112] rounded-lg blur-sm"></div>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gruppo di lavoro con Salvatore Garufi" 
                className="relative rounded-lg w-full max-w-md mx-auto shadow-xl"
              />
              <div className="absolute top-4 right-4 bg-[#F8C112] text-[#010133] font-bold text-sm px-3 py-1 rounded-full shadow-md">
                <CountdownTimer targetDate={webinarDate} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
