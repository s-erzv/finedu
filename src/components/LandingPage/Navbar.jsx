import { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import ikon Menu dan Close dari lucide-react

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State baru untuk menu

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full z-50 p-8">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <img src="/finedu-logo-black.svg" alt="Finedu Logo" className="block dark:hidden h-8" />
          <img src="/finedu-logo.svg" alt="Finedu Logo" className="hidden dark:block h-8" />
          <span className="font-bold text-2xl text-black dark:text-white">Finedu</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium text-gray-800 dark:text-gray-200">
          <Link to="/" className="hover:text-[--primary] transition-colors">Home</Link>
          <a href="#about" className="hover:text-[--primary] transition-colors">About</a>
          <a href="#features" className="hover:text-[--primary] transition-colors">Features</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300"
          >
            <div
              className={`flex items-center justify-center w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
                isDarkMode ? 'translate-x-7 text-yellow-400' : 'translate-x-0 text-gray-700'
              }`}
            >
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </div>
          </button>
 
          <Link 
            to="/home"
            className="hidden md:block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Get started
          </Link>
          
          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black dark:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-center space-y-4 text-lg font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <Link onClick={toggleMenu} to="/" className="hover:text-[--primary] transition-colors">Home</Link>
          <a onClick={toggleMenu} href="#about" className="hover:text-[--primary] transition-colors">About</a>
          <a onClick={toggleMenu} href="#features" className="hover:text-[--primary] transition-colors">Features</a>
          <Link 
            onClick={toggleMenu}
            to="/home"
            className="w-full text-center bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;