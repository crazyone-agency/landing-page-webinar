import { Link } from "wouter";
import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import { socialLinks } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#010133] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex md:justify-between mb-6">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#010133] font-bold">
                  SG
                </div>
                <span className="font-poppins font-semibold">SG People Group</span>
              </div>
              <p className="text-sm text-gray-300 max-w-xs">
                Aiutiamo le persone a realizzare il loro potenziale attraverso strategie pratiche basate su neuroscienze e psicologia.
              </p>
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
          
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} SG People Group. Tutti i diritti riservati.</p>
            <div className="mt-2 space-x-4">
              <Link href="#privacy">
                <a className="hover:text-white transition-colors">Privacy Policy</a>
              </Link>
              <Link href="#terms">
                <a className="hover:text-white transition-colors">Termini e Condizioni</a>
              </Link>
              <Link href="#contact">
                <a className="hover:text-white transition-colors">Contatti</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
