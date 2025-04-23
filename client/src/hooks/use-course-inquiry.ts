import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CourseInquiry } from "@shared/schema";

export function useCourseInquiry() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const sendCourseInquiry = async (inquiryData: CourseInquiry) => {
    setIsPending(true);
    try {
      const response = await apiRequest(
        "POST", 
        "/api/course/inquiry", 
        inquiryData
      );
      
      const data = await response.json();
      
      toast({
        title: "Richiesta inviata con successo!",
        description: "Ti risponderemo entro 12 ore.",
        variant: "default",
      });
      
      return data;
    } catch (error) {
      console.error("Course inquiry error:", error);
      
      toast({
        title: "Errore nell'invio della richiesta",
        description: "Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { sendCourseInquiry, isPending };
}