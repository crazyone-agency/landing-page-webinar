import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { WebinarRegistration } from "@shared/schema";

export function useRegistration() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const registerToWebinar = async (registrationData: WebinarRegistration) => {
    setIsPending(true);
    try {
      const response = await apiRequest(
        "POST", 
        "/api/webinar/register", 
        registrationData
      );
      
      const data = await response.json();
      
      toast({
        title: "Registrazione completata!",
        description: "Ti abbiamo inviato una email di conferma.",
        variant: "default",
      });
      
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      
      toast({
        title: "Errore di registrazione",
        description: "Si è verificato un errore durante la registrazione. Riprova più tardi.",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { registerToWebinar, isPending };
}
