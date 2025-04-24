import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Funzione globale per integrare ActiveCampaign con Stripe
// Questa funzione sarà chiamata quando l'utente completa il form
// e farà il redirect alla pagina di checkout
declare global {
  interface Window {
    setupStripeRedirect: (redirectPath: string) => void;
    redirectToPayment: (userData: any) => void;
  }
}

window.setupStripeRedirect = function(redirectPath: string) {
  window.redirectToPayment = function(userData: any) {
    console.log('Redirect al pagamento con dati:', userData);
    window.location.href = redirectPath;
  };
};

createRoot(document.getElementById("root")!).render(<App />);
