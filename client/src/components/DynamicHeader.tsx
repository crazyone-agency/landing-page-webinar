import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { brandColors } from "@/lib/course-utils";
import { useState, useEffect } from "react";

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToInquiry = () => {
    const element = document.getElementById('offerta-esclusiva');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#010133]/95 backdrop-blur-md shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 text-2xl font-bold text-white cursor-pointer">
                <span style={{ color: brandColors.secondary }}>SG</span>
                <span>People</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/">
              <span className="text-gray-200 hover:text-yellow-400 font-medium cursor-pointer transition-colors duration-300">
                Home
              </span>
            </Link>
            
            <a 
              href="#corso-dettagli" 
              className="text-gray-200 hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              Il Corso
            </a>
            
            <a 
              href="#offerta-speciale" 
              className="text-gray-200 hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              Offerta Speciale
            </a>
            
            <a 
              href="#testimonianze" 
              className="text-gray-200 hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              Testimonianze
            </a>
          </nav>
          
          <div>
            <Button 
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-all duration-300 hidden md:block"
              onClick={scrollToInquiry}
            >
              Richiedi Info
            </Button>
            
            <button className="block md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}