import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import WhatYouWillLearnSection from "@/components/WhatYouWillLearnSection";
import SpeakerSection from "@/components/SpeakerSection";
import SocialProofSection from "@/components/SocialProofSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";
import ThankYouModal from "@/components/ThankYouModal";
import { type WebinarRegistration } from "@shared/schema";

export default function LandingPage() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegistrationSuccess = (registration: WebinarRegistration) => {
    setRegisteredEmail(registration.email);
    setShowThankYouModal(true);
  };

  const handleCloseModal = () => {
    setShowThankYouModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <Header />
      <HeroSection />
      <ProblemSolutionSection />
      <WhatYouWillLearnSection />
      <SpeakerSection />
      <SocialProofSection />
      <HowItWorksSection />
      <RegistrationSection onRegistrationSuccess={handleRegistrationSuccess} />
      <Footer />
      
      {showThankYouModal && (
        <ThankYouModal 
          email={registeredEmail} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
