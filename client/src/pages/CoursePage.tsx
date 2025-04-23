import { useEffect } from "react";
import CourseHeader from "@/components/CourseHeader";
import CourseHeroSection from "@/components/CourseHeroSection";
import CourseBioSection from "@/components/CourseBioSection";
import CourseObstaclesSection from "@/components/CourseObstaclesSection";
import CourseStepsSection from "@/components/CourseStepsSection";
import CourseAudienceSection from "@/components/CourseAudienceSection";
import CourseTestimonialsSection from "@/components/CourseTestimonialsSection";
import CourseScientificSection from "@/components/CourseScientificSection";
import CourseFaqSection from "@/components/CourseFaqSection";
import CourseInquirySection from "@/components/CourseInquirySection";
import CourseFooter from "@/components/CourseFooter";

export default function CoursePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <CourseHeader />
      <main className="flex-grow">
        <CourseHeroSection />
        <CourseBioSection />
        <CourseObstaclesSection />
        <CourseStepsSection />
        <CourseAudienceSection />
        <CourseTestimonialsSection />
        <CourseScientificSection />
        <CourseFaqSection />
        <CourseInquirySection />
      </main>
      <CourseFooter />
    </div>
  );
}