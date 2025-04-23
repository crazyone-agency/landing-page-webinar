import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* SG People Group Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#010133] flex items-center justify-center text-white font-bold">
              SG
            </div>
            <span className="font-poppins font-semibold text-[#010133]">SG People Group</span>
          </div>
        </div>
        <Link href="#register-now">
          <a className="hidden md:block bg-[#F8C112] hover:bg-yellow-500 transition duration-300 text-[#010133] font-semibold px-4 py-2 rounded-md shadow-sm text-sm">
            Riserva il tuo posto
          </a>
        </Link>
      </div>
    </header>
  );
}
