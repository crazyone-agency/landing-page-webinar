import { useEffect, useRef } from 'react';
import { WebinarRegistration } from '@shared/schema';

interface ActiveCampaignFormProps {
  onRegistrationSuccess: (registration: WebinarRegistration) => void;
  className?: string;
}

export function ActiveCampaignForm({ onRegistrationSuccess, className = "" }: ActiveCampaignFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aggiungiamo l'integrazione ufficiale di ActiveCampaign
    if (formContainerRef.current) {
      // Creiamo un div con la classe "_form_3" richiesta da ActiveCampaign
      const formContainer = document.createElement('div');
      formContainer.className = '_form_3';
      formContainerRef.current.appendChild(formContainer);
      
      // Aggiungiamo lo script di ActiveCampaign
      const script = document.createElement('script');
      script.src = 'https://salvatoregarufi.activehosted.com/f/embed.php?id=3';
      script.charset = 'utf-8';
      formContainerRef.current.appendChild(script);
      
      // Aggiungiamo un listener per l'evento di successo
      const handleSuccess = (event: Event) => {
        if ((event as CustomEvent).detail?.email) {
          const data = (event as CustomEvent).detail;
          // Convertiamo i dati nel formato WebinarRegistration
          const registration: WebinarRegistration = {
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            gdprConsent: true
          };
          
          // Chiamiamo il callback di successo
          onRegistrationSuccess(registration);
        }
      };
      
      // Aggiungiamo l'evento personalizzato per il successo del form
      document.addEventListener('activecampaign:formSubmitSuccess', handleSuccess);
      
      // Cleanup
      return () => {
        document.removeEventListener('activecampaign:formSubmitSuccess', handleSuccess);
        if (formContainerRef.current) {
          const formDiv = formContainerRef.current.querySelector('._form_3');
          const scriptElement = formContainerRef.current.querySelector('script[src*="activehosted.com"]');
          
          if (formDiv) formDiv.remove();
          if (scriptElement) scriptElement.remove();
        }
      };
    }
  }, [onRegistrationSuccess]);

  return (
    <div ref={formContainerRef} className={`${className} activecampaign-form-container`}>
      {/* Il form di ActiveCampaign sarà inserito dinamicamente qui */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg> 
          I tuoi dati sono al sicuro. Non facciamo spam.
        </p>
      </div>
    </div>
  );
}