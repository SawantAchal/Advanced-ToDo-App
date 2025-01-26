import React from 'react';
import { FiMenu, FiSearch, FiGrid, FiList, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';
import Logo from '../../assets/logo.jpg';

const Navbar = ({ onMenuClick, isGridView, onViewToggle }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-amber-200 dark:bg-gray-800 border-b dark:border-gray-800">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg"
        >
          <FiMenu className="w-6 h-6 dark:text-white" />
        </button>
        <img src={Logo} alt="DoIt Logo" className="h-8" />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg">
          <FiSearch className="w-6 h-6 dark:text-white" />
        </button>
        <button 
          onClick={onViewToggle}
          className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg"
        >
          {isGridView ? (
            <FiList className="w-6 h-6 dark:text-white" />
          ) : (
            <FiGrid className="w-6 h-6 dark:text-white" />
          )}
        </button>
        <button 
          onClick={toggleDarkMode}
          className="p-2 hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-lg"
        >
          {darkMode ? (
            <FiSun className="w-6 h-6 text-white" />
          ) : (
            <FiMoon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;