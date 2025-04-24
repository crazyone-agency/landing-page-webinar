import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheckIcon, ClockIcon, UserIcon, LockIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/hooks/use-registration";
import { webinarRegistrationSchema, type WebinarRegistration } from "@shared/schema";

interface RegistrationSectionProps {
  onRegistrationSuccess: (registration: WebinarRegistration) => void;
}

export default function RegistrationSection({ onRegistrationSuccess }: RegistrationSectionProps) {
  const { registerToWebinar, isPending } = useRegistration();

  const form = useForm<WebinarRegistration>({
    resolver: zodResolver(webinarRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gdprConsent: false
    }
  });

  const onSubmit = async (data: WebinarRegistration) => {
    try {
      await registerToWebinar(data);
      onRegistrationSuccess(data);
      form.reset();
    } catch (error) {
      console.error("Error registering to webinar:", error);
    }
  };
  
  // Aggiungi un listener per l'evento di registrazione dal form di ActiveCampaign
  useEffect(() => {
    const handleRegistrationSuccess = (event: any) => {
      const { fullName, email, phone } = event.detail;
      onRegistrationSuccess({
        fullName,
        email,
        phone,
        gdprConsent: true
      });
    };
    
    document.addEventListener('registrationSuccess', handleRegistrationSuccess);
    
    return () => {
      document.removeEventListener('registrationSuccess', handleRegistrationSuccess);
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
                  {/* Active Campaign Form che sostituisce il form originale */}
                  <div id="activecampaign-form-container">
                    <div style={{ textAlign: "center" }}>
                      <form method="POST" action="https://salvatoregarufi.activehosted.com/proc.php" id="_form_3_" className="_form _form_3 _inline-form _inline-style " noValidate data-styles-version="5">
                        <input type="hidden" name="u" value="3" />
                        <input type="hidden" name="f" value="3" />
                        <input type="hidden" name="s" />
                        <input type="hidden" name="c" value="0" />
                        <input type="hidden" name="m" value="0" />
                        <input type="hidden" name="act" value="sub" />
                        <input type="hidden" name="v" value="2" />
                        <input type="hidden" name="or" value="98b33811b4f1cb49214765981dbd8ccd" />
                        <div className="_form-content">
                          <div className="_form_element _x22201078 _inline-style _clear" >
                            <title className="_form-title">
                              Rivoluzione a Piccoli Passi - Webinar Gratuito
                            </title>
                          </div>
                          <div className="_form_element _x33944978 _inline-style _clear" >
                            <div className="_html-code">
                              <p>
                                Iscriviti al webinar gratuito del 10 maggio 2025, dalle 10:00 alle 11:30.
                              </p>
                            </div>
                          </div>
                          <div className="_form_element _x68464455 _inline-style " >
                            <label htmlFor="fullname" className="_form-label">
                              Nome Completo<span className="field-required">*</span>
                            </label>
                            <div className="_field-wrapper">
                              <input type="text" id="fullname" name="fullname" placeholder="Digita il nome" required/>
                            </div>
                          </div>
                          <div className="_form_element _x22778913 _inline-style " >
                            <label htmlFor="email" className="_form-label">
                              Email<span className="field-required">*</span>
                            </label>
                            <div className="_field-wrapper">
                              <input type="text" id="email" name="email" placeholder="Digita l'email" required/>
                            </div>
                          </div>
                          <div className="_form_element _x65394362 _inline-style " >
                            <label htmlFor="phone" className="_form-label">
                              Telefono
                            </label>
                            <div className="_field-wrapper">
                              <input type="text" id="phone" name="phone" placeholder="Digita il numero di telefono" />
                            </div>
                          </div>
                          <div className="_form_element" style={{ margin: "10px 0" }}>
                            <input type="checkbox" id="gdprConsent" name="field[3]" required style={{ marginRight: "10px" }} />
                            <label htmlFor="gdprConsent" style={{ fontSize: "0.85rem" }}>
                              Acconsento al trattamento dei miei dati personali come descritto nella Privacy Policy. I tuoi dati non saranno mai condivisi con terze parti.
                            </label>
                          </div>
                          <div className="_button-wrapper _full_width">
                            <button id="_form_3_submit" className="_submit" type="submit" 
                              style={{ 
                                width: "100%", 
                                backgroundColor: "#F8C112", 
                                color: "#010133", 
                                fontWeight: "bold",
                                padding: "12px",
                                borderRadius: "6px",
                                border: "none",
                                fontSize: "1rem",
                                cursor: "pointer"
                              }}>
                              Riserva il Mio Posto Ora
                            </button>
                          </div>
                        </div>
                        <div className="_form-thank-you" style={{ display: "none" }}></div>
                      </form>
                    </div>
                  </div>
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
