import { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <nav className="w-full z-50 p-8"> 
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <img src="/finedu-logo-black.svg" alt="Finedu Logo" className="block dark:hidden h-8" />
          <img src="/finedu-logo.svg" alt="Finedu Logo" className="hidden dark:block h-8" />
          <span className="font-bold text-2xl text-black dark:text-white">Finedu</span>
        </div>
 
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;