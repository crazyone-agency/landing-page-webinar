import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { brandColors } from "@/lib/course-utils";

export default function CourseHeader() {
  const scrollToInquiry = () => {
    const element = document.getElementById('corso-contatti');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
                <span style={{ color: brandColors.primary }}>SG</span>
                <span style={{ color: brandColors.secondary }}>People</span>
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#percorso" 
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Il Percorso
            </a>
            <a 
              href="#a-chi-e-rivolto" 
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              A Chi è Rivolto
            </a>
            <a 
              href="#testimonianze" 
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Testimonianze
            </a>
            <a 
              href="#perche-funziona" 
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Perché Funziona
            </a>
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              FAQ
            </a>
          </nav>
          
          <div>
            <Button 
              className="bg-primary text-white hover:bg-primary/90 hidden md:block"
              style={{ backgroundColor: brandColors.primary }}
              onClick={scrollToInquiry}
            >
              Richiedi Info
            </Button>
            
            <button className="block md:hidden text-gray-800">
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