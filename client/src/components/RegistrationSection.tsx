import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheckIcon, ClockIcon, UserIcon, LockIcon } from "lucide-react";
import { type WebinarRegistration } from "@shared/schema";
import ActiveCampaignForm from "@/components/ActiveCampaignForm";

interface RegistrationSectionProps {
  onRegistrationSuccess: (registration: WebinarRegistration) => void;
}

export default function RegistrationSection({ onRegistrationSuccess }: RegistrationSectionProps) {
  // Aggiungi un listener per l'evento di registrazione dal form di ActiveCampaign
  useEffect(() => {
    const handleRegistrationSuccess = (event: Event) => {
      if ((event as CustomEvent).detail?.email) {
        const { fullName, email, phone } = (event as CustomEvent).detail;
        onRegistrationSuccess({
          fullName,
          email,
          phone,
          gdprConsent: true
        });
      }
    };
    
    document.addEventListener('activecampaign:formSubmitSuccess', handleRegistrationSuccess);
    
    return () => {
      document.removeEventListener('activecampaign:formSubmitSuccess', handleRegistrationSuccess);
    };
  }, [onRegistrationSuccess]);

  return (
    <section id="register-now" className="py-16 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 bg-[#010133] p-8 text-white">
                <div className="mb-6">
                  <span className="inline-block bg-white text-[#010133] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    REGISTRATI ORA
                  </span>
                  <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
                    Rivoluzione a piccoli passi
                  </h2>
                  <p className="text-gray-200">
                    Iscriviti gratuitamente al webinar e scopri come trasformare la tua vita con micro-azioni quotidiane basate sulla neuroscienza.
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <CalendarCheckIcon className="text-[#F8C112] mr-3" size={20} />
                    <span>10 Maggio 2025, ore 10:00</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <ClockIcon className="text-[#F8C112] mr-3" size={20} />
                    <span>90 minuti (10:00 - 11:30)</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="text-[#F8C112] mr-3" size={20} />
                    <span>Con Salvatore Garufi</span>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className="flex items-start mb-4">
                    <div className="mr-3 mt-1 text-[#F8C112]">✓</div>
                    <p className="text-sm">Riceverai un promemoria 24 ore prima dell'evento</p>
                  </div>
                  <div className="flex items-start mb-4">
                    <div className="mr-3 mt-1 text-[#F8C112]">✓</div>
                    <p className="text-sm">Potrai aggiungere l'evento al tuo calendario personale</p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 text-[#F8C112]">✓</div>
                    <p className="text-sm">Avrai accesso alla registrazione per 48 ore dopo l'evento</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="relative">
                  {/* Active Campaign Form ufficiale */}
                  <ActiveCampaignForm 
                    onRegistrationSuccess={onRegistrationSuccess} 
                    className="w-full"
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    <LockIcon className="inline mr-1" size={14} /> I tuoi dati sono al sicuro. Non facciamo spam.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
