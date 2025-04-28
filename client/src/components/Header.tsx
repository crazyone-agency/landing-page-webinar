import { Link } from "wouter";

const scrollToRegister = () => {
  const registerSection = document.getElementById('register-now');
  if (registerSection) {
    registerSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* SG People Group Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img 
                src="https://sgpeople.it/wp-content/uploads/2024/06/cropped-sg-people-group-ok-01.png" 
                alt="SG People Logo" 
                className="h-16 w-auto" 
              />
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/corso-sviluppo-personale">
            <span className="text-[#010133] hover:text-[#F8C112] transition duration-300 font-medium cursor-pointer">
              Percorso Sviluppo Personale
            </span>
          </Link>
          
          <button onClick={scrollToRegister}>
            <span className="hidden md:block bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-medium px-4 py-2 rounded-md shadow-sm cursor-pointer">
              Riserva il tuo posto
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
