import { useEffect } from "react";
import { useLocation } from "wouter";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicHeader from "@/components/DynamicHeader";
import ExclusiveOfferHero from "@/components/ExclusiveOfferHero";
import ExclusiveOfferDetails from "@/components/ExclusiveOfferDetails";
import ExclusiveOfferTestimonials from "@/components/ExclusiveOfferTestimonials";
import CourseBioSection from "@/components/CourseBioSection";
import CourseFaqSection from "@/components/CourseFaqSection";
import CourseFooter from "@/components/CourseFooter";
import { isCourseOfferExpired } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CoursePage() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Verifica se l'offerta è scaduta
  const isOfferExpired = isCourseOfferExpired();
  
  const handleCheckoutClick = () => {
    toast({
      title: "Redirect al pagamento",
      description: "Ti stiamo reindirizzando alla pagina di pagamento",
    });
    navigate("/checkout?product=course");
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Setup del redirect a Stripe dopo il form
  useEffect(() => {
    if (typeof window.setupStripeRedirect === 'function') {
      window.setupStripeRedirect('/checkout?product=course');
    }
  }, []);

  // Funzione per scorrere alla sezione dell'offerta
  const scrollToOfferSection = () => {
    const offerSection = document.getElementById('offerta-esclusiva');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#010133' }}>
      <DynamicHeader />
      <main className="flex-grow">
        <ExclusiveOfferHero 
          onRequestInfo={scrollToOfferSection} 
          isOfferExpired={isOfferExpired}
          onBuyNow={handleCheckoutClick}
        />
        <ExclusiveOfferDetails />
        <ExclusiveOfferTestimonials />
        <CourseBioSection />
        <CourseFaqSection />
        
        {/* Sezione acquisto corso */}
        <section 
          className="py-24 px-4 relative" 
          style={{ backgroundColor: '#0a0a2e' }}
          id="offerta-esclusiva"
        >
          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Approfitta ora dell'<span className="text-yellow-400">offerta esclusiva</span>
              </h2>
            </div>
            
            {!isOfferExpired && (
              <div className="max-w-xl mx-auto mb-8">
                <Button 
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#010133] font-bold text-lg px-6 py-5 rounded-md flex items-center justify-center gap-2 mb-4"
                  onClick={handleCheckoutClick}
                >
                  <CreditCard className="w-5 h-5" />
                  ACQUISTA ORA - €3.998
                </Button>
                <p className="text-center text-gray-300 text-sm">Pagamento sicuro con carta di credito/debito</p>
              </div>
            )}
            
            <div className="max-w-xl mx-auto">
              <p className="text-white text-center mb-4">Clicca sul pulsante sopra per procedere al pagamento sicuro</p>
            </div>
          </div>
        </section>
      </main>
      <CourseFooter />
    </div>
  );
}