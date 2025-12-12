import React from 'react';
import { FaRocket, FaChartLine } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="text-center text-white mb-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-3">
        <FaRocket className="text-5xl md:text-6xl animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Smart Lead Automation System
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2">
        <FaChartLine className="text-xl opacity-80" />
        <p className="text-lg md:text-xl opacity-90">
          Enrich leads with nationality predictions
        </p>
      </div>
    </header>
  );
};

export default Header;

