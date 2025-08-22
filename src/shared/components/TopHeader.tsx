import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

export const TopHeader = () => {
  const [language, setLanguage] = useState('English');
  const [isOpen, setIsOpen] = useState(false);

  const languages = ['Italiano', 'English'];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <header className="bg-black text-white w-full py-2 flex items-center justify-center relative">
      {/* Texto principal */}
      <div className="flex items-center text-sm">
        <span className="text-center">
          Rebajas de verano en todos los trajes de baño y envío exprés gratuito - de  50%!{' '}
          <a href="#" className="underline font-semibold">
            Compra ahoraa!!1
          </a>
        </span>
      </div>

      {/* Selector de idioma  implemntar a largo plazo el multiidioma*/}
      <div className="absolute right-4 md:right-12">
        <div
          className="relative flex items-center text-sm cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2">{language}</span>
          <ChevronDownIcon
            className={`h-4 w-4 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />

          {/* Dropdown */}
          {isOpen && (
            <ul className="absolute top-6 right-0 bg-white text-black rounded shadow-md w-28 z-10">
              {languages.map((lang) => (
                <li
                  key={lang}
                  className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                    lang === language ? 'font-bold' : ''
                  }`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
