import { useEffect, useRef, useState } from 'react';
import ThankYouModal from '@/components/ThankYouModal';
import { Button } from '@/components/ui/button';
import { addEventToCalendar } from '@/lib/calendar';
import '@/styles/activecampaign-form.css';

interface ActiveCampaignFormProps {
  id?: string;
  onRegistrationSuccess?: (data: any) => void;
  className?: string;
}

export default function ActiveCampaignForm({ id = "registration-form", onRegistrationSuccess, className = "" }: ActiveCampaignFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  // Inserisci il form di ActiveCampaign nel DOM
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.innerHTML = `
<div style="text-align: center;">
  <form method="POST" action="https://salvatoregarufi.activehosted.com/proc.php" id="_form_5_" class="_form _form_5 _inline-form _inline-style " novalidate data-styles-version="5">
    <input type="hidden" name="u" value="5" />
    <input type="hidden" name="f" value="5" />
    <input type="hidden" name="s" />
    <input type="hidden" name="c" value="0" />
    <input type="hidden" name="m" value="0" />
    <input type="hidden" name="act" value="sub" />
    <input type="hidden" name="v" value="2" />
    <input type="hidden" name="or" value="d9f6ea6be36d0a63fd73220fd6d1d029" />
    <div class="_form-content">
      <div class="_form_element _x22201078 _inline-style _clear" >
        <title class="_form-title">
          Partecipa al webinar in regalo per te
        </title>
      </div>
      <div class="_form_element _x33944978 _inline-style _clear" >
        <div class="_html-code">
          <p>
          </p>
        </div>
      </div>
      <div class="_form_element _x68464455 _inline-style " >
        <label for="fullname" class="_form-label">
          Nome Completo<span class="field-required">
          *
        </span>
      </label>
      <div class="_field-wrapper">
        <input type="text" id="fullname" name="fullname" placeholder="Digita il nome" required/>
      </div>
    </div>
    <div class="_form_element _x22778913 _inline-style " >
      <label for="email" class="_form-label">
        Email<span class="field-required">
        *
      </span>
    </label>
    <div class="_field-wrapper">
      <input type="text" id="email" name="email" placeholder="Digita l&#039;email" required/>
    </div>
  </div>
  <div class="_form_element _x65394362 _inline-style " >
    <label for="phone" class="_form-label">
      Telefono
    </label>
    <div class="_field-wrapper">
      <input type="text" id="phone" name="phone" placeholder="Digita il numero di telefono" />
    </div>
  </div>
  <div class="_form_element _x48372010 _inline-style">
    <div class="sms_consent_checkbox">
      <input id="gdpr_consent" name="gdpr_consent" type="checkbox" required />
      <span class="sms_consent_message">Accetto la <a href="https://sgpeople.it/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e acconsento al trattamento dei miei dati personali per le finalità descritte.</span>
    </div>
  </div>
  <div class="_button-wrapper _inline-style">
    <button id="_form_5_submit" class="_submit" type="submit">
      Invia
    </button>
  </div>
  <div class="_clear-element">
  </div>
</div>
<div class="_form-thank-you" style="display:none;">
</div>
</form>
</div>`;

      // Recupera il form dopo che è stato inserito nel DOM
      formRef.current = document.getElementById('_form_5_') as HTMLFormElement;

      // Aggiungi l'event listener per l'invio del form
      if (formRef.current) {
        formRef.current.addEventListener('submit', handleFormSubmit);
      }
    }

    // Pulizia all'unmount
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Verifica la validità del form (campi required)
    const fullNameInput = formRef.current.querySelector('input[name="fullname"]') as HTMLInputElement;
    const emailInput = formRef.current.querySelector('input[name="email"]') as HTMLInputElement;
    const gdprConsentInput = formRef.current.querySelector('input[name="gdpr_consent"]') as HTMLInputElement;
    
    if (!fullNameInput || !fullNameInput.value.trim() || 
        !emailInput || !emailInput.value.trim() || 
        !gdprConsentInput || !gdprConsentInput.checked) {
      // Se i campi obbligatori non sono compilati, mostra un errore browser nativo
      if (!fullNameInput.value.trim()) {
        fullNameInput.setCustomValidity('Per favore inserisci il tuo nome');
      }
      
      if (!emailInput.value.trim()) {
        emailInput.setCustomValidity('Per favore inserisci la tua email');
      }
      
      if (!gdprConsentInput.checked) {
        gdprConsentInput.setCustomValidity('Per continuare devi accettare la Privacy Policy');
      }
      
      // Forza la validazione del browser
      fullNameInput.reportValidity();
      emailInput.reportValidity();
      gdprConsentInput.reportValidity();
      return;
    }
    
    const submitButton = formRef.current.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.setAttribute('disabled', 'true');
      submitButton.classList.add('processing');
    }

    // Recupera i dati dal form
    const formData = new FormData(formRef.current);
    const fullName = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    
    // Verifica che i dati obbligatori ci siano
    if (!fullName || !email) {
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('processing');
      }
      return;
    }
    
    // Salva l'email per il modale di ringraziamento
    setUserEmail(email);
    
    // Dati utente da passare al callback
    const userData = { fullName, email, phone, gdprConsent: true };
    
    // Invia i dati a ActiveCampaign
    fetch('https://salvatoregarufi.activehosted.com/proc.php', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      // Mostra il modale di ringraziamento
      setShowThankYou(true);
      
      // Chiama il callback onRegistrationSuccess se fornito
      if (onRegistrationSuccess && typeof onRegistrationSuccess === 'function') {
        onRegistrationSuccess(userData);
      }
      
      // Reimposta il form
      formRef.current?.reset();
    })
    .catch(error => {
      console.error('Errore invio form:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
      
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('processing');
      }
    });
  };

  const handleCloseModal = () => {
    setShowThankYou(false);
  };

  return (
    <div id={id} className={`mb-10 ${className}`}>
      <div 
        ref={formContainerRef} 
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      ></div>
      
      {showThankYou && (
        <ThankYouModal email={userEmail} onClose={handleCloseModal} />
      )}
    </div>
  );
}