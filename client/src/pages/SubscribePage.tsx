import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DynamicHeader from '@/components/DynamicHeader';
import CourseFooter from '@/components/CourseFooter';
import { motion } from "framer-motion";
import { isCourseOfferExpired } from '@/lib/utils';
import { useLocation } from 'wouter';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/corso-sviluppo-personale?payment=success`,
      },
    });

    if (error) {
      toast({
        title: "Pagamento Fallito",
        description: error.message || "Si è verificato un errore durante il pagamento. Riprova.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement className="my-6" />
      <button
        disabled={!stripe || isSubmitting}
        className="w-full py-3 bg-[#F8C112] text-[#010133] font-bold rounded-md hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isSubmitting ? "Elaborazione..." : "Completa Pagamento"}
      </button>
    </form>
  );
};

export default function SubscribePage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(4000);
  const { toast } = useToast();
  
  const isExpired = isCourseOfferExpired();
  
  useEffect(() => {
    // Se l'offerta è scaduta, aggiorna il prezzo a quello intero
    if (isExpired) {
      setAmount(8000);
    }
    
    // Create PaymentIntent as soon as the page loads
    setIsLoading(true);
    apiRequest("POST", "/api/create-payment-intent", { amount })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Errore",
            description: "Impossibile inizializzare il pagamento. Riprova più tardi.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Errore di connessione",
          description: "Si è verificato un errore nel contattare il server. Riprova più tardi.",
          variant: "destructive",
        });
        console.error("Payment error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [amount, isExpired, toast]);

  const [_, navigate] = useLocation();
  
  useEffect(() => {
    if (!clientSecret && !isLoading) {
      navigate("/corso-sviluppo-personale");
    }
  }, [clientSecret, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#010133' }}>
      <DynamicHeader />
      
      <div className="flex-grow py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
          >
            <div className="text-center mb-4">
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/06/cropped-sg-people-group-ok-01.png" 
                alt="SG People Logo" 
                className="h-14 w-auto mx-auto mb-4" 
              />
              <h1 className="text-2xl md:text-3xl font-bold text-[#010133] mb-1">
                Completa la tua iscrizione
              </h1>
              <p className="text-gray-500">Manca solo un ultimo passaggio</p>
            </div>
            
            <div className="border bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#010133]">Percorso Formativo in Sviluppo Personale</h2>
                <span className="font-bold text-lg text-[#010133]">€{amount}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {isExpired 
                  ? "Percorso completo con Salvatore Garufi" 
                  : "Percorso completo con Salvatore Garufi"}
              </p>
              
              {!isExpired && (
                <div className="mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs inline-block">
                  Sconto 50% 
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-[#F8C112] border-t-transparent rounded-full" aria-label="Loading" />
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <SubscribeForm />
              </Elements>
            ) : (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                Si è verificato un errore nell'inizializzazione del pagamento. Riprova più tardi.
              </div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                I pagamenti sono gestiti in modo sicuro da Stripe
              </p>
              <div className="flex justify-center mt-3 space-x-2">
                <img src="https://cdn.jsdelivr.net/gh/Sooova/Payment-Logos/Rounded/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://cdn.jsdelivr.net/gh/Sooova/Payment-Logos/Rounded/Mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="https://cdn.jsdelivr.net/gh/Sooova/Payment-Logos/Rounded/AMEX.svg" alt="American Express" className="h-6" />
              </div>
              <p className="mt-4">
                Proseguendo, accetti i nostri <a href="#" className="text-blue-600 hover:underline">Termini e Condizioni</a> e la nostra <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <CourseFooter />
    </div>
  );
};