import { useEffect, useRef } from 'react';
import { WebinarRegistration } from '@shared/schema';

interface ActiveCampaignFormProps {
  onRegistrationSuccess: (registration: WebinarRegistration) => void;
  className?: string;
}

export function ActiveCampaignForm({ onRegistrationSuccess, className = "" }: ActiveCampaignFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aggiungiamo gli script di ActiveCampaign e inizializziamo il form
    if (formContainerRef.current && formRef.current) {
      // Creiamo un div nascosto con la classe "_form_3" richiesta da ActiveCampaign
      const hiddenContainer = document.createElement('div');
      hiddenContainer.className = '_form_3';
      hiddenContainer.style.display = 'none';
      formContainerRef.current.appendChild(hiddenContainer);

      // Inizializziamo il form personalizzato con ActiveCampaign
      if (typeof window !== 'undefined' && window.initActiveCampaignForm) {
        // Success callback quando il form viene inviato
        const onSuccess = (data: { fullName: string; email: string; phone: string }) => {
          // Convertiamo i dati nel formato WebinarRegistration
          const registration: WebinarRegistration = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || '',
            gdprConsent: true
          };
          
          // Chiamiamo il callback di successo
          onRegistrationSuccess(registration);
        };

        // Inizializziamo il form ActiveCampaign con il nostro form personalizzato
        window.initActiveCampaignForm('form.ac-form', onSuccess);
      }
    }

    // Cleanup
    return () => {
      if (formContainerRef.current) {
        const hiddenDiv = formContainerRef.current.querySelector('._form_3');
        if (hiddenDiv) {
          hiddenDiv.remove();
        }
      }
    };
  }, [onRegistrationSuccess]);

  return (
    <div ref={formContainerRef} className={className}>
      <form
        ref={formRef}
        className="ac-form space-y-4"
        method="POST"
        action="https://salvatoregarufi.activehosted.com/proc.php"
      >
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome*</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
            placeholder="Il tuo nome completo"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
            placeholder="La tua email"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#010133] focus:border-transparent"
            placeholder="Il tuo numero di telefono"
          />
        </div>
        
        <div className="mb-4 flex items-start">
          <input
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            required
            className="mr-2 mt-1 h-4 w-4 text-[#010133] focus:ring-[#010133] border-gray-300 rounded"
          />
          <label htmlFor="gdprConsent" className="text-sm text-gray-600">
            Acconsento al trattamento dei miei dati personali come descritto nella <a href="#privacy-policy" className="text-[#010133] underline">Privacy Policy</a>. I tuoi dati non saranno mai condivisi con terze parti.
          </label>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            id="_form_3_submit"
            className="w-full bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-bold px-6 py-6 rounded-md text-center shadow-md"
          >
            Riserva il Mio Posto Ora
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg> 
            I tuoi dati sono al sicuro. Non facciamo spam.
          </p>
        </div>
      </form>
    </div>
  );
}

// Aggiungiamo questa definizione per TypeScript
declare global {
  interface Window {
    initActiveCampaignForm: (
      formSelector: string,
      onSuccess?: (data: { fullName: string; email: string; phone: string }) => void
    ) => void;
  }
}