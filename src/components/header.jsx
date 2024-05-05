import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center"> 
          <img src="loupe.png" alt="Loupe" className="w-6 h-6 mr-2" /> 
          <h1 className="text-3xl font-bold">Finder</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Accueil</a></li>
            <li><a href="/adresses" className="hover:text-gray-300">Ajout</a></li>
            <li><a href="#" className="hover:text-gray-300">Détail</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
