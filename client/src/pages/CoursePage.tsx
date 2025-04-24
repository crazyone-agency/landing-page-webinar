import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicHeader from "@/components/DynamicHeader";
import ExclusiveOfferHero from "@/components/ExclusiveOfferHero";
import ExclusiveOfferDetails from "@/components/ExclusiveOfferDetails";
import ExclusiveOfferInquiryForm from "@/components/ExclusiveOfferInquiryForm";
import ExclusiveOfferTestimonials from "@/components/ExclusiveOfferTestimonials";
import CourseBioSection from "@/components/CourseBioSection";
import CourseFaqSection from "@/components/CourseFaqSection";
import CourseFooter from "@/components/CourseFooter";
import { CourseActiveCampaignForm } from "@/components/CourseActiveCampaignForm";
import { isCourseOfferExpired } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CoursePage() {
  const [showForm, setShowForm] = useState(false);
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Verifica se l'offerta è scaduta
  const isOfferExpired = isCourseOfferExpired();
  
  const handleCheckoutClick = () => {
    toast({
      title: "Redirect al pagamento",
      description: "Ti stiamo reindirizzando alla pagina di pagamento",
    });
    navigate("/subscribe");
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Funzione per mostrare il form al posto dell'inquiry form
  const handleShowForm = () => {
    setShowForm(true);
    
    // Scrolliamo alla sezione del form
    const formSection = document.getElementById('offerta-esclusiva');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#010133' }}>
      <DynamicHeader />
      <main className="flex-grow">
        <ExclusiveOfferHero 
          onRequestInfo={handleShowForm} 
          isOfferExpired={isOfferExpired}
          onBuyNow={handleCheckoutClick}
        />
        <ExclusiveOfferDetails />
        <ExclusiveOfferTestimonials />
        <CourseBioSection />
        <CourseFaqSection />
        
        {/* Mostra il form di ActiveCampaign o l'inquiry form */}
        {showForm ? (
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
                    ACQUISTA ORA - €4.000
                  </Button>
                  <p className="text-center text-gray-300 text-sm">Pagamento sicuro con carta di credito/debito</p>
                </div>
              )}
              
              <div className="max-w-xl mx-auto">
                <CourseActiveCampaignForm />
              </div>
            </div>
          </section>
        ) : (
          <ExclusiveOfferInquiryForm />
        )}
      </main>
      <CourseFooter />
    </div>
  );
}