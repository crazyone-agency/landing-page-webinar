import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import { isSpecialOfferExpired } from '@/lib/utils';
import { useLocation } from 'wouter';

// Definiamo le icone delle carte inline per evitare problemi di percorso
const visaIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
  <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
  <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.146 1.991.146l.466-2.085c0 0-1.358-.499-3.018-.499-3.229 0-4.878 1.592-4.878 3.442 0 2.013 3.94 2.35 3.94 3.55 0 .117-.044.23-.19.499-.292.55-1.758.336-2.732.087l-.337 2.264c0 0 1.279.437 3.394.437 2.732 0 5.446-1.699 5.446-4.471C32.378 22.092 26.369 22.206 26.369 22.206z"/>
</svg>`;

const mastercardIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
  <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
  <path fill="#FFC107" d="M30,24c0,3.314-2.686,6-6,6s-6-2.686-6-6s2.686-6,6-6S30,20.686,30,24"/>
  <path fill="#FF3D00" d="M22.001,24c0,1.1.9,2,2,2s2-.9,2-2-.9-2-2-2S22.001,22.9,22.001,24z"/>
  <path fill="#FF3D00" d="M30,24c0,3.314-2.686,6-6,6s-6-2.686-6-6s2.686-6,6-6S30,20.686,30,24"/>
  <path fill="#FFC107" d="M18,24c0-3.314,2.686-6,6-6s6,2.686,6,6"/>
</svg>`;

const amexIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
  <path fill="#1976D2" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
  <path fill="#FFF" d="M22.255 20.773L24.182 20.773 23.219 18.634zM26.019 20.773L27.946 20.773 26.982 18.634zM39.898 26.591L39.898 26.591 38.029 26.591 37.061 24.507 36.093 26.591 31.96 26.591 31.96 22.288 30.19 26.591 28.247 26.591 26.446 22.209 26.446 26.591 23.286 26.591 23.002 25.714 20.434 25.714 20.152 26.591 16.712 26.591 16.712 20.532 20.238 20.532 21.172 22.797 22.104 20.532 25.921 20.532 25.921 21.805 26.116 21.412 27.414 20.532 31.96 20.532 31.96 21.805 32.154 21.412 33.453 20.532 35.211 20.532 39.897 26.589z"/>
  <path fill="#1976D2" d="M38.395 25.698L40.258 25.698 38.327 23.13 38.395 25.698zM27.945 21.425L29.839 25.698 31.188 25.698 29.302 21.425z"/>
  <path fill="#1976D2" d="M31.187 25.698L33.121 25.698 33.121 24.086 34.59 24.086 34.59 22.838 33.121 22.838 33.121 21.425 31.734 21.425 30.117 23.525 31.187 25.698zM21.719 21.425L20 24.456 21.719 24.456z"/>
  <path fill="#1976D2" d="M23.654 21.425L22.322 24.452 24.989 24.452z"/>
  <path fill="#1976D2" d="M34.591 25.698L36.501 25.698 37.065 24.456 38.393 24.456 38.96 25.698 41.203 25.698 39.094 21.425 37.064 21.425 34.591 25.698z"/>
</svg>`;

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
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

    // Determina l'URL di ritorno in base al prodotto
    const searchParams = new URLSearchParams(window.location.search);
    const productType = searchParams.get('product') || 'workshop';
    
    let returnUrl = `${window.location.origin}/offerta-speciale?payment=success`;
    if (productType === 'course') {
      returnUrl = `${window.location.origin}/corso-sviluppo-personale?payment=success`;
    }
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
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

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(37);
  const [productName, setProductName] = useState("Smart Revolution Sprint");
  const { toast } = useToast();
  
  const isExpired = isSpecialOfferExpired();
  const searchParams = new URLSearchParams(window.location.search);
  const productType = searchParams.get('product') || 'workshop';
  
  useEffect(() => {
    // Se l'offerta è scaduta, aggiorna il prezzo a quello intero
    if (isExpired && productType === 'workshop') {
      setAmount(397);
    }
    
    // Usa l'endpoint specifico per il tipo di prodotto
    let endpoint = "/api/checkout/workshop"; // Default
    
    if (productType === 'course') {
      endpoint = "/api/checkout/course";
      setProductName("Percorso Formativo in Sviluppo Personale");
      setAmount(4000);
    }
    
    // Create PaymentIntent as soon as the page loads
    setIsLoading(true);
    apiRequest("POST", endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret);
          if (data.amount) setAmount(data.amount);
          if (data.productName) setProductName(data.productName);
        } else {
          toast({
            title: "Errore",
            description: data.message || "Impossibile inizializzare il pagamento. Riprova più tardi.",
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
  }, [productType, isExpired, toast]);

  const [_, navigate] = useLocation();
  
  useEffect(() => {
    if (!clientSecret && !isLoading) {
      navigate("/offerta-speciale");
    }
  }, [clientSecret, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#010133]">
      <Header />
      
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
                Completa il tuo acquisto
              </h1>
              <p className="text-gray-500">Manca solo un ultimo passaggio</p>
            </div>
            
            <div className="border bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#010133]" data-accent-fix>{productName}</h2>
                <span className="font-bold text-lg text-[#010133]">€{amount.toLocaleString('it-IT')}</span>
              </div>
              <p className="text-gray-600 text-sm" data-accent-fix>
                {productType === 'workshop' 
                  ? "Workshop esclusivo di 60 minuti con Salvatore Garufi" 
                  : "Percorso formativo completo con Salvatore Garufi"}
              </p>
              
              {(productType === 'workshop' && !isExpired) && (
                <div className="mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs inline-block">
                  Prezzo speciale
                </div>
              )}
              {(productType === 'course') && (
                <div className="mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs inline-block">
                  Sconto 50% sul prezzo originale di €8.000
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-[#F8C112] border-t-transparent rounded-full" aria-label="Loading" />
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <CheckoutForm />
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
              <div className="flex justify-center mt-3 space-x-4">
                <div className="h-8 w-12" dangerouslySetInnerHTML={{__html: visaIcon}} />
                <div className="h-8 w-12" dangerouslySetInnerHTML={{__html: mastercardIcon}} />
                <div className="h-8 w-12" dangerouslySetInnerHTML={{__html: amexIcon}} />
              </div>
              <p className="mt-4">
                Proseguendo, accetti i nostri <a href="#" className="text-blue-600 hover:underline">Termini e Condizioni</a> e la nostra <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};