import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 py-12 px-14 mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/finedu-logo-black.svg" alt="Finedu Logo" className="block dark:hidden h-8 w-auto" />
              <img src="/finedu-logo.svg" alt="Finedu Logo" className="hidden dark:block h-8 w-auto" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">Finedu</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              Making financial education easy and fun for students.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Lessons</a></li>
              <li><a href="#" className="hover:underline">Tools</a></li>
              <li><a href="#" className="hover:underline">Articles</a></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Help & Support</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Contact Us</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: <a href="mailto:hello@finedu.com" className="hover:underline">hello@finedu.com</a></li>
              <li>Phone: <a href="tel:+6281234567890" className="hover:underline">+62 812-3456-7890</a></li>
              <li>Address: Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
          <p>&copy; 2024 Finedu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;