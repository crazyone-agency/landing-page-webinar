import { Link } from "wouter";
import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { socialLinks } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#010133] text-white py-8 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              <span className="text-[#F8C112]">SG</span> <span className="text-white">people</span>
            </h2>
          </div>
          
          <div className="md:flex md:justify-between mb-6">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-3">
                <img 
                  src="https://sgpeople.it/wp-content/uploads/2024/04/logo_white_transparent_SGP.png" 
                  alt="SG People Logo" 
                  className="h-16 w-auto" 
                />
              </div>
              <p className="text-sm text-gray-300 max-w-xs">
                Aiutiamo le persone a realizzare il loro potenziale attraverso strategie pratiche basate su neuroscienze e psicologia.
              </p>
            </div>
            
            <div className="md:flex md:space-x-8">
              <div className="mb-6 md:mb-0">
                <h3 className="font-semibold mb-3">Contatti</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Mail size={14} className="mr-2" />
                    <a href="mailto:info@sgpeople.it" className="hover:text-[#F8C112]">info@sgpeople.it</a>
                  </li>
                  <li className="flex items-center">
                    <Phone size={14} className="mr-2" />
                    <a href="tel:+393206834979" className="hover:text-[#F8C112]">+39 320 683 4979</a>
                  </li>
                  <li className="flex items-center">
                    <MapPin size={14} className="mr-2" />
                    <span>Via Mazzini 1, 24019 Bergamo (BG)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Seguici</h3>
                <div className="flex space-x-4">
                  <a href={socialLinks.facebook} className="text-white hover:text-[#F8C112] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Facebook size={20} />
                  </a>
                  <a href={socialLinks.linkedin} className="text-white hover:text-[#F8C112] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={20} />
                  </a>
                  <a href={socialLinks.instagram} className="text-white hover:text-[#F8C112] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram size={20} />
                  </a>
                  <a href={socialLinks.youtube} className="text-white hover:text-[#F8C112] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} SG People Group - H.B.D. Srl | P.IVA: IT 04539190167</p>
            <div className="mt-2 space-x-4">
              <Link href="#privacy">
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </Link>
              <Link href="#terms">
                <span className="hover:text-white transition-colors cursor-pointer">Termini e Condizioni</span>
              </Link>
              <Link href="#contact">
                <span className="hover:text-white transition-colors cursor-pointer">Contatti</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pulsante di prenotazione fluttuante */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <a 
          href="#registration"
          className="bg-[#F8C112] hover:bg-yellow-400 text-[#010133] font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-all transform hover:scale-105"
        >
          <span>Riserva il tuo posto</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
