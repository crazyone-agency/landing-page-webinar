import { useEffect } from "react";
import DynamicHeader from "@/components/DynamicHeader";
import ExclusiveOfferHero from "@/components/ExclusiveOfferHero";
import ExclusiveOfferDetails from "@/components/ExclusiveOfferDetails";
import ExclusiveOfferInquiryForm from "@/components/ExclusiveOfferInquiryForm";
import ExclusiveOfferTestimonials from "@/components/ExclusiveOfferTestimonials";
import CourseBioSection from "@/components/CourseBioSection";
import CourseFaqSection from "@/components/CourseFaqSection";
import CourseFooter from "@/components/CourseFooter";

export default function CoursePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#010133' }}>
      <DynamicHeader />
      <main className="flex-grow">
        <ExclusiveOfferHero />
        <ExclusiveOfferDetails />
        <ExclusiveOfferTestimonials />
        <CourseBioSection />
        <CourseFaqSection />
        <ExclusiveOfferInquiryForm />
      </main>
      <CourseFooter />
    </div>
  );
}