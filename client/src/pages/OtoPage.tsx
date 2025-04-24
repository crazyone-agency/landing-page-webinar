import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, CreditCard, Download, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn, isSpecialOfferExpired } from "@/lib/utils";
import { OtoActiveCampaignForm } from "@/components/OtoActiveCampaignForm";
import PriceDisplay from "@/components/PriceDisplay";
import SpecialOfferCountdown from "@/components/SpecialOfferCountdown";
import { useToast } from "@/hooks/use-toast";

export default function OtoPage() {
  // Controlla se l'offerta è scaduta
  const isOfferExpired = isSpecialOfferExpired();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const handleCheckoutClick = () => {
    toast({
      title: "Redirect al pagamento",
      description: "Ti stiamo reindirizzando alla pagina di pagamento",
    });
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#010133] text-white pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              OFFERTA SPECIALE A TEMPO LIMITATO
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#F8C112]">Smart Revolution Sprint</span>
              <br />Un Esclusivo Workshop di 60 Minuti con Salvatore Garufi
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
              Sblocca strategie pratiche per trasformare le tue abitudini e massimizzare il tuo potenziale in soli 60 minuti
            </p>
            
            {/* Countdown Timer */}
            <div className="mb-6">
              <SpecialOfferCountdown />
            </div>
            
            {/* Price display */}
            <PriceDisplay type="offer" className="mb-6" />
            
            {/* ActiveCampaign Form */}
            <div className="max-w-xl mx-auto">
              <OtoActiveCampaignForm />
            </div>
          </div>
          
          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Clock className="h-12 w-12 text-[#F8C112]" />,
                title: "Workshop di 60 Minuti",
                description: "Un'esperienza di apprendimento concentrata e di alto impatto"
              },
              {
                icon: <Download className="h-12 w-12 text-[#F8C112]" />,
                title: "Accesso Immediato",
                description: "Inizia subito dopo l'acquisto, senza attese"
              },
              {
                icon: <Gift className="h-12 w-12 text-[#F8C112]" />,
                title: "Bonus Esclusivo",
                description: "Accesso allo sconto del 50% sul percorso completo"
              }
            ].map((highlight, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
              >
                <div className="mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-300">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Workshop Content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#010133]">
            Cosa Imparerai nel <span className="text-[#F8C112]">Smart Revolution Sprint</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Identificare e Superare i Blocchi Mentali",
                description: "Tecniche pratiche per riconoscere e superare le limitazioni che ti impediscono di crescere"
              },
              {
                title: "Creare Routine di Successo",
                description: "Come strutturare abitudini quotidiane che supportano i tuoi obiettivi più ambiziosi"
              },
              {
                title: "Gestire l'Energia, Non Solo il Tempo",
                description: "Strategie per ottimizzare i tuoi livelli di energia e massimizzare la produttività"
              },
              {
                title: "Mindset di Crescita Accelerata",
                description: "Trasformare le sfide in opportunità attraverso un approccio mentale proattivo"
              },
              {
                title: "Piano d'Azione Personalizzato",
                description: "Crea il tuo piano strategico per implementare immediatamente quanto appreso"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-[#F8C112] rounded-full p-2 mt-1 shrink-0">
                  <Check className="h-5 w-5 text-[#010133]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#010133] mb-1">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            {/* Price display */}
            <PriceDisplay type="offer" className="mb-6" />
            
            {isOfferExpired ? (
              <p className="mt-4 text-sm text-gray-500">
                <Clock className="inline-block mr-1 h-4 w-4" /> 
                L'offerta speciale è scaduta. Prezzo attuale: €397
              </p>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                <Clock className="inline-block mr-1 h-4 w-4" /> 
                Offerta valida solo per 60 minuti dopo il webinar
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Bonus Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#010133] text-white rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="inline-block bg-[#F8C112] text-[#010133] px-4 py-1 rounded-full text-sm font-bold mb-4">
                BONUS ESCLUSIVO
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Accesso Privilegiato al Percorso Completo
              </h2>
              <p className="text-xl">
                Acquistando lo Smart Revolution Sprint, ottieni l'accesso esclusivo a uno <span className="font-bold text-[#F8C112]">sconto del 50%</span> sul percorso formativo completo "Sviluppo Personale" del valore di €8,000
              </p>
            </div>
            
            <PriceDisplay type="course" />
            
            <div className="text-center">
              <Link href="/corso-sviluppo-personale">
                <span className="inline-block bg-white hover:bg-gray-100 text-[#010133] font-bold text-lg px-6 py-3 rounded-md cursor-pointer transition">
                  Scopri di più sul percorso completo
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#010133]">
            Cosa Dicono i Partecipanti
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Marco Bianchi",
                role: "Imprenditore",
                content: "Lo Smart Revolution Sprint mi ha fornito esattamente quello che cercavo: strategie concrete che ho potuto implementare immediatamente. Il ritorno sull'investimento è stato immediato.",
                rating: 5
              },
              {
                name: "Laura Rossi",
                role: "Manager",
                content: "In soli 60 minuti ho acquisito strumenti che mi hanno permesso di rivoluzionare la mia routine quotidiana. La chiarezza e l'efficacia dei contenuti è impressionante.",
                rating: 5
              },
              {
                name: "Giovanni Verdi",
                role: "Libero Professionista",
                content: "Inizialmente ero scettico riguardo a quanto potessi imparare in un'ora, ma sono rimasto piacevolmente sorpreso. Contenuti di qualità e immediatamente applicabili.",
                rating: 5
              },
              {
                name: "Francesca Neri",
                role: "Coach",
                content: "Il workshop è strutturato in modo da massimizzare l'apprendimento in poco tempo. Ho apprezzato particolarmente il piano d'azione personalizzato alla fine.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#F8C112] text-[#F8C112]" />
                  ))}
                </div>
                <p className="my-4 text-gray-700 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-[#010133]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4 bg-[#010133] text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trasforma il Tuo Potenziale in <span className="text-[#F8C112]">Soli 60 Minuti</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Non perdere questa opportunità unica. Lo Smart Revolution Sprint è disponibile a questo prezzo speciale solo per un tempo limitato.
          </p>
          
          <div className="mb-8">
            {/* Special Offer Countdown */}
            <div className="mb-6">
              <SpecialOfferCountdown />
            </div>
            
            {/* Price display */}
            <PriceDisplay type="offer" className="mb-6" />
            
            {/* ActiveCampaign Form */}
            <div className="max-w-xl mx-auto">
              <OtoActiveCampaignForm />
            </div>
          </div>
          
          <div className="text-sm text-gray-300 max-w-xl mx-auto mt-6">
            <p>
              Acquistando ora, riceverai l'accesso immediato allo Smart Revolution Sprint e
              al bonus esclusivo: uno sconto del 50% sul percorso formativo completo.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}