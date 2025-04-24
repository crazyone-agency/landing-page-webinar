import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* SG People Group Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/07/cropped-favicon-SG-PEOPLE-192x192.png" 
                alt="SG People Logo" 
                className="h-10 w-auto" 
              />
              <span className="font-poppins font-semibold text-[#010133]">SG People Group</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/corso-sviluppo-personale">
            <span className="text-[#010133] hover:text-[#F8C112] transition duration-300 font-medium text-sm cursor-pointer">
              Percorso Sviluppo Personale
            </span>
          </Link>
          
          <Link href="#register-now">
            <span className="hidden md:block bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-semibold px-4 py-2 rounded-md shadow-sm text-sm cursor-pointer">
              Riserva il tuo posto
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
