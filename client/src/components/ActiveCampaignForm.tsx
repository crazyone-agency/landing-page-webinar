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

export default function ActiveCampaignForm({ id = "registration-form" }: ActiveCampaignFormProps) {
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
    
    const submitButton = formRef.current.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.setAttribute('disabled', 'true');
      submitButton.classList.add('processing');
    }

    // Recupera i dati dal form
    const formData = new FormData(formRef.current);
    const email = formData.get('email') as string;
    
    // Salva l'email per il modale di ringraziamento
    setUserEmail(email);
    
    // Invia i dati a ActiveCampaign
    fetch('https://salvatoregarufi.activehosted.com/proc.php', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      // Mostra il modale di ringraziamento
      setShowThankYou(true);
      
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
    <div id={id} className="mb-10">
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