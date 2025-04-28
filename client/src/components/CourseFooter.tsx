import { Link } from "wouter";
import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";

export default function CourseFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 text-white relative" style={{ backgroundColor: '#060621' }}>
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-blue-800/50"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <div className="flex items-center space-x-2 text-2xl font-bold mb-4 cursor-pointer">
                <span style={{ color: brandColors.secondary }}>SG</span>
                <span className="text-white">People</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Sviluppa il tuo potenziale attraverso l'approccio scientifico dei piccoli passi.
              Offerta esclusiva per chi ha già intrapreso il percorso con Smart Revolution Sprint.
            </p>
            
            <div className="p-4 border border-blue-800/50 rounded-lg bg-blue-900/20 mb-6">
              <h3 className="text-yellow-400 font-semibold mb-2">Esclusiva per te:</h3>
              <p className="text-white font-bold text-2xl mb-1">-50% sul Percorso Completo</p>
              <p className="text-gray-300 text-sm">Se hai acquistato lo Smart Revolution Sprint a €37</p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/sgpeople.it" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/sgpeople.it/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/sgpeople/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-yellow-400">
              Collegamenti Rapidi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <a href="#corso-dettagli" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Il Percorso
                </a>
              </li>
              <li>
                <a href="#offerta-esclusiva" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Offerta Esclusiva
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2 text-yellow-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  FAQ
                </a>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-800/30 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Prossimo webinar:</h4>
              <p className="text-gray-300 mb-3">18 Maggio 2025 - Rivoluzione a piccoli passi</p>
              <Link href="/">
                <span className="text-yellow-400 hover:text-yellow-300 text-sm cursor-pointer flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Registrati ora
                </span>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-yellow-400">
              Contattaci
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-yellow-400 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">Email:</p>
                  <a 
                    href="mailto:info@sgpeople.it" 
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    info@sgpeople.it
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-yellow-400 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">Telefono:</p>
                  <a 
                    href="tel:+393206834979" 
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    +39 320 683 4979
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-yellow-400 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">Indirizzo:</p>
                  <p className="text-white">Via Mazzini 1, 24019 Bergamo (BG)</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-800/40 text-center">
          <p className="text-gray-400">
            © {currentYear} SG People Group. Tutti i diritti riservati.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <a 
              href="https://sgpeople.it/privacy-policy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="https://sgpeople.it/cookie-policy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}