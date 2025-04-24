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
            <h1 className="text-2xl md:text-3xl font-bold text-[#010133] mb-4 text-center">
              Completa la tua iscrizione
            </h1>
            
            <div className="border-b border-gray-200 mb-6 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Percorso Formativo in Sviluppo Personale</h2>
                <span className="font-bold text-lg">€{amount}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {isExpired 
                  ? "Percorso completo con Salvatore Garufi" 
                  : "Percorso completo con Salvatore Garufi (Sconto 50%)"}
              </p>
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
              <p>I pagamenti sono gestiti in modo sicuro da Stripe</p>
              <p className="mt-2">
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