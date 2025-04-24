import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
                    <span>3 Maggio 2023, ore 18:30</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <ClockIcon className="text-[#F8C112] mr-3" size={20} />
                    <span>60 minuti + 15 minuti di Q&A</span>
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Nome e Cognome</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Il tuo nome completo" 
                              {...field} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="La tua email" 
                              {...field} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Telefono</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Il tuo numero di telefono" 
                              {...field} 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gdprConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              className="mr-2 mt-1 h-4 w-4 text-[#010133] focus:ring-[#010133] border-gray-300 rounded"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              Acconsento al trattamento dei miei dati personali come descritto nella <a href="#" className="text-[#010133] underline">Privacy Policy</a>. I tuoi dati non saranno mai condivisi con terze parti.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-bold px-6 py-6 rounded-md text-center shadow-md"
                        disabled={isPending}
                      >
                        {isPending ? "Registrazione in corso..." : "Riserva il Mio Posto Ora"}
                      </Button>
                    </div>
                  </form>
                </Form>
                
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
