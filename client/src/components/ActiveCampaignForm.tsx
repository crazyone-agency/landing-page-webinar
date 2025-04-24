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
      // Puliamo eventuali form precedenti
      formContainerRef.current.innerHTML = '';
      
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
      
      // Osserviamo il DOM per rilevare quando il form è completamente caricato
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const formElements = formContainerRef.current?.querySelectorAll('._form_3 ._form-content');
            if (formElements && formElements.length > 0) {
              // Il form è stato caricato, possiamo fermare l'observer
              observer.disconnect();
              
              // Aggiungiamo una classe personalizzata per applicare stili aggiuntivi
              formContainerRef.current?.classList.add('form-loaded');
            }
          }
        }
      });
      
      // Avviamo l'osservazione
      observer.observe(formContainerRef.current, { childList: true, subtree: true });
      
      // Cleanup
      return () => {
        document.removeEventListener('activecampaign:formSubmitSuccess', handleSuccess);
        observer.disconnect();
        if (formContainerRef.current) {
          formContainerRef.current.innerHTML = '';
        }
      };
    }
  }, [onRegistrationSuccess]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={formContainerRef} 
        className="activecampaign-form-container p-4 rounded-lg"
      >
        {/* Il form di ActiveCampaign sarà inserito dinamicamente qui */}
      </div>
      
      <div className="mt-2 text-center">
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