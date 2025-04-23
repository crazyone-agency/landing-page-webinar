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

export default function CourseInquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const { sendCourseInquiry, isPending } = useCourseInquiry();
  const { toast } = useToast();
  
  const form = useForm<CourseInquiry>({
    resolver: zodResolver(courseInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
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
    <section className="py-20 px-4 bg-blue-50" id="corso-contatti">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: brandColors.primary }}>
              Richiedi maggiori informazioni
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Sei interessato a questo percorso formativo e desideri saperne di più?
                Compila il modulo con i tuoi dati e le tue domande.
              </p>
              
              <p className="text-lg text-gray-700">
                Un nostro esperto ti contatterà entro 12 ore per fornirti tutte le informazioni
                di cui hai bisogno e rispondere ad ogni tuo dubbio.
              </p>
              
              <div className="flex items-center p-4 bg-blue-100 rounded-lg" style={{ backgroundColor: `${brandColors.primary}10` }}>
                <div className="mr-4 text-blue-600" style={{ color: brandColors.primary }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Il tuo percorso verso la trasformazione personale inizia con una semplice richiesta di informazioni.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-green-500 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4" style={{ color: brandColors.primary }}>
                  Richiesta inviata con successo!
                </h3>
                
                <p className="text-lg text-gray-700 mb-6">
                  Grazie per il tuo interesse. Ti risponderemo entro 12 ore al massimo
                  per fornirti tutte le informazioni sul percorso formativo.
                </p>
                
                <Button
                  className="font-medium"
                  style={{ backgroundColor: brandColors.primary }}
                  onClick={() => setSubmitted(false)}
                >
                  Invia un'altra richiesta
                </Button>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary }}>
                  Compila il modulo
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome e cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Inserisci il tuo nome completo" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="La tua email" type="email" {...field} />
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
                          <FormLabel>Telefono</FormLabel>
                          <FormControl>
                            <Input placeholder="Il tuo numero di telefono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>La tua richiesta (opzionale)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Scrivi qui le tue domande o richieste specifiche" 
                              className="min-h-[120px]"
                              {...field} 
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
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Accetto la registrazione e il trattamento dei miei dati in base al{" "}
                              <a 
                                href="https://sgpeople.it/privacy-policy/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                                style={{ color: brandColors.primary }}
                              >
                                Regolamento Europeo 679/2016
                              </a>{" "}
                              per la Protezione dei Dati Personali.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full py-6 text-lg font-medium"
                      style={{ backgroundColor: brandColors.primary }}
                    >
                      {isPending ? "Invio in corso..." : "Invia richiesta"}
                    </Button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      Tutti i campi sono obbligatori tranne il messaggio
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}