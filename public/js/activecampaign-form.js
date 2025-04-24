window.cfields = [];
window._show_thank_you = function(id, message, trackcmp_url, email) {
    var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
    form.querySelector('._form-content').style.display = 'none';
    thank_you.innerHTML = message;
    thank_you.style.display = 'block';
    const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
    var visitorObject = window[vgoAlias];
    if (email && typeof visitorObject !== 'undefined') {
        visitorObject('setEmail', email);
        visitorObject('update');
    } else if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
        // Site tracking URL to use after inline form submission.
        _load_script(trackcmp_url);
    }
    if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};

window._show_error = function(id, message, html) {
    var form = document.getElementById('_form_' + id + '_'),
        err = document.createElement('div'),
        button = form.querySelector('button[type="submit"]'),
        old_error = form.querySelector('._form_error');
    if (old_error) old_error.parentNode.removeChild(old_error);
    err.innerHTML = message;
    err.className = '_error-inner _form_error _no_arrow';
    var wrapper = document.createElement('div');
    wrapper.className = '_form-inner _show_be_error';
    wrapper.appendChild(err);
    button.parentNode.insertBefore(wrapper, button);
    var submitButton = form.querySelector('[id^="_form"][id$="_submit"]');
    submitButton.disabled = false;
    submitButton.classList.remove('processing');
    if (html) {
        var div = document.createElement('div');
        div.className = '_error-html';
        div.innerHTML = html;
        err.appendChild(div);
    }
};

window._load_script = function(url, callback, isSubmit) {
    var head = document.querySelector('head'), script = document.createElement('script'), r = false;
    var submitButton = document.querySelector('#_form_3_submit');
    script.charset = 'utf-8';
    script.src = url;
    if (callback) {
        script.onload = script.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                callback();
            }
        };
    }
    script.onerror = function() {
        if (isSubmit) {
            if (script.src.length > 10000) {
                _show_error("3", "Invio non riuscito. Accorcia le risposte e riprova.");
            } else {
                _show_error("3", "Invio non riuscito. Riprova.");
            }
            submitButton.disabled = false;
            submitButton.classList.remove('processing');
        }
    }

    head.appendChild(script);
};

function handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('processing');
    }

    // Recupera i dati dal form
    const fullName = form.querySelector('input[name="fullname"]')?.value || '';
    const email = form.querySelector('input[name="email"]')?.value || '';
    const phone = form.querySelector('input[name="phone"]')?.value || '';
    const gdprConsent = form.querySelector('input[name="gdprConsent"]')?.checked ? 'Si' : 'No';

    // Crea FormData da inviare a ActiveCampaign
    const formData = new FormData();
    formData.append('u', '3');
    formData.append('f', '3');
    formData.append('s', '');
    formData.append('c', '0');
    formData.append('m', '0');
    formData.append('act', 'sub');
    formData.append('v', '2');
    formData.append('or', '9c97d84e4e80e70d6fe1f4a9db0fc97f');

    // Aggiungi i campi del form
    formData.append('fullname', fullName);
    formData.append('email', email);
    formData.append('phone', phone || '');
    formData.append('field[3]', gdprConsent);

    // Invia i dati a ActiveCampaign
    fetch('https://salvatoregarufi.activehosted.com/proc.php', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(response => {
        // Mostra il messaggio di ringraziamento
        const thankYouMessage = `
            <div style="text-align: center;">
                <h3 style="font-weight: bold; margin-bottom: 10px;">Grazie per la tua registrazione!</h3>
                <p>Abbiamo inviato un'email di conferma a <strong>${email}</strong> con tutti i dettagli per partecipare al webinar.</p>
                <p>Controlla la tua casella di posta e salva la data sul tuo calendario!</p>
            </div>`;
        
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = '_form-thank-you';
        thankYouDiv.style.display = 'none';
        form.appendChild(thankYouDiv);
        
        window._show_thank_you('3', thankYouMessage, null, email);
        
        // Evento di conversione personalizzato
        if (typeof window.onRegistrationSuccess === 'function') {
            window.onRegistrationSuccess({ fullName, email, phone });
        }
        
        // Controllo se è presente la funzione di redirect al pagamento
        if (typeof window.redirectToPayment === 'function') {
            setTimeout(() => {
                window.redirectToPayment({ fullName, email, phone });
            }, 2000); // Ritardo di 2 secondi per permettere all'utente di leggere il messaggio
        }
    })
    .catch(error => {
        window._show_error('3', 'Si è verificato un errore durante l\'invio. Riprova più tardi.');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.classList.remove('processing');
        }
    });

    return false;
}

// Funzione da chiamare per inizializzare il form
function initActiveCampaignForm(formSelector, onSuccess, redirectPayment) {
    const form = document.querySelector(formSelector);
    
    if (form) {
        // Aggiungi l'ID nascosto necessario per ActiveCampaign
        const formIdInput = document.createElement('input');
        formIdInput.type = 'hidden';
        formIdInput.name = 'f';
        formIdInput.value = '3';
        form.appendChild(formIdInput);
        
        // Aggiungi eventuali altri campi nascosti necessari
        ['u', 's', 'c', 'm', 'act', 'v', 'or'].forEach((name, index) => {
            const values = ['3', '', '0', '0', 'sub', '2', '9c97d84e4e80e70d6fe1f4a9db0fc97f'];
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = values[index];
            form.appendChild(input);
        });
        
        // Imposta il callback di successo se fornito
        if (onSuccess && typeof onSuccess === 'function') {
            window.onRegistrationSuccess = onSuccess;
        }
        
        // Imposta il redirect al pagamento se fornito
        if (redirectPayment && typeof redirectPayment === 'function') {
            window.redirectToPayment = redirectPayment;
        }
        
        // Aggiungi event listener per la sottomissione del form
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            return handleFormSubmit(form);
        });
    } else {
        console.error('Form non trovato:', formSelector);
    }
}