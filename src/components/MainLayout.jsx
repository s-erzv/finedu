import { useState, useEffect } from 'react';
import Dock from './Dock/Dock';
import { VscHome, VscBook, VscGraph, VscFile, VscAccount } from "react-icons/vsc";
import { FaSun, FaMoon } from "react-icons/fa";

export default function MainLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => (window.location.href = "/home"), 
    },
    {
      icon: <VscBook size={18} />,
      label: "Lessons",
      onClick: () => (window.location.href = "/lessons"),
    },
    {
      icon: <VscGraph size={18} />,
      label: "Tools",
      onClick: () => (window.location.href = "/tools"),
    },
    {
      icon: <VscFile size={18} />,
      label: "Articles",
      onClick: () => (window.location.href = "/articles"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => (window.location.href = "/profile"),
    },
    {
      icon: isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />,
      label: isDarkMode ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    }
  ];

  return (
    // Mengubah warna latar belakang light mode menjadi abu-abu terang (gray-100)
    <div className="bg-gray-100 dark:bg-gray-950 flex flex-col h-screen overflow-hidden">
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="w-[98vw] h-[95vh] bg-white dark:bg-gray-800 rounded-3xl shadow-lg flex flex-col p-8">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </main>

      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}