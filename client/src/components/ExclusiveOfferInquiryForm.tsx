import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCourseInquiry } from "@/hooks/use-course-inquiry";
import { courseInquirySchema, type CourseInquiry } from "@shared/schema";
import { brandColors } from "@/lib/course-utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function ExclusiveOfferInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const { sendCourseInquiry, isPending } = useCourseInquiry();
  const { toast } = useToast();
  
  const form = useForm<CourseInquiry>({
    resolver: zodResolver(courseInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "Sono interessato all'offerta speciale -50% sul Percorso Formativo in Sviluppo Personale",
      gdprConsent: false,
    },
  });
  
  const onSubmit = async (data: CourseInquiry) => {
    try {
      await sendCourseInquiry(data);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.",
        variant: "destructive",
      });
    }
  };

  return (
    <section 
      className="py-24 px-4 relative" 
      style={{ backgroundColor: '#0a0a2e' }}
      id="offerta-esclusiva"
    >
      {/* Background shape */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm rounded-2xl border border-yellow-400/20 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div 
              className="p-8 md:p-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Approfitta ora dell'<span className="text-yellow-400">offerta esclusiva</span>
                </h2>
                <p className="text-gray-300">
                  Compila il modulo per ricevere maggiori informazioni sull'offerta speciale 
                  -50% sul Percorso Formativo in Sviluppo Personale, riservata a chi ha già 
                  acquistato lo Smart Revolution Sprint.
                </p>
              </div>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-lg bg-blue-700/30 text-center"
                >
                  <div className="text-yellow-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">Richiesta inviata con successo!</h3>
                  <p className="text-gray-300 mb-4">
                    Ti contatteremo entro 12 ore per fornirti tutti i dettagli sull'offerta esclusiva 
                    e per rispondere alle tue domande.
                  </p>
                  
                  <Button 
                    className="bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                    onClick={() => setSubmitted(false)}
                  >
                    Invia un'altra richiesta
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Nome e cognome</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Inserisci il tuo nome completo" 
                              {...field} 
                              className="border-blue-500/30 bg-blue-900/30 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="La tua email" 
                              type="email" 
                              {...field} 
                              className="border-blue-500/30 bg-blue-900/30 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Telefono</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Il tuo numero di telefono" 
                              {...field} 
                              className="border-blue-500/30 bg-blue-900/30 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Note aggiuntive (opzionale)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="min-h-[100px] border-blue-500/30 bg-blue-900/30 text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gdprConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-blue-900"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-300">
                              Accetto la registrazione e il trattamento dei miei dati in base al{" "}
                              <a 
                                href="https://sgpeople.it/privacy-policy/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-yellow-400 underline"
                              >
                                Regolamento Europeo 679/2016
                              </a>{" "}
                              per la Protezione dei Dati Personali.
                            </FormLabel>
                            <FormMessage className="text-yellow-300" />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full py-6 text-lg font-semibold bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                    >
                      {isPending ? "Invio in corso..." : "RICHIEDI INFORMAZIONI SULL'OFFERTA"}
                    </Button>
                    
                    <p className="text-sm text-center text-gray-400">
                      Ti risponderemo entro 12 ore lavorative con tutti i dettagli
                    </p>
                  </form>
                </Form>
              )}
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="h-full w-full bg-gradient-to-br from-blue-900 to-blue-700 hidden lg:block">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-blue-600/30"></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-12 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Il valore dell'offerta esclusiva:
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="bg-blue-800/40 rounded-lg p-4 border-l-4 border-yellow-400">
                          <h4 className="font-bold text-white mb-1">Percorso Formativo Completo</h4>
                          <p className="text-gray-300 text-sm">5 moduli per trasformare la tua vita personale e professionale</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-gray-400">Valore</span>
                            <span className="text-yellow-400 font-bold">€8.000</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-800/40 rounded-lg p-4 border-l-4 border-yellow-400">
                          <h4 className="font-bold text-white mb-1">Audit Personalizzato (30 min)</h4>
                          <p className="text-gray-300 text-sm">Sessione one-to-one con il Dott. Salvatore Garufi</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-gray-400">Valore</span>
                            <span className="text-yellow-400 font-bold">€150</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-800/40 rounded-lg p-4 border-l-4 border-yellow-400">
                          <h4 className="font-bold text-white mb-1">Materiale Didattico Esclusivo</h4>
                          <p className="text-gray-300 text-sm">Manuali, workbook e risorse digitali</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-gray-400">Valore</span>
                            <span className="text-yellow-400 font-bold">€350</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-800/60 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-200">Valore Totale:</span>
                        <span className="text-yellow-400 font-bold text-xl">€8.500</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-200">Il Tuo Prezzo Special:</span>
                        <span className="text-yellow-400 font-bold text-2xl">Solo €4.000</span>
                      </div>
                      
                      <div className="mt-3 text-center">
                        <div className="px-4 py-2 bg-yellow-400/20 rounded-md text-yellow-300 text-sm">
                          OFFERTA VALIDA SOLO PER CHI HA GIÀ ACQUISTATO "SMART REVOLUTION SPRINT"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}