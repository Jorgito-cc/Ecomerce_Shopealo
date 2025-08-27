import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export const TopHeader = () => {
  const [language, setLanguage] = useState<string>('English');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const languages: string[] = ['Español','Italiano', 'English'];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <header className="bg-black text-white w-full py-2 px-4 md:px-8 flex justify-between items-center text-sm">
      {/* Texto principal (centrado en mobile, justificado en desktop) */}
      <div className="w-full text-center md:text-left md:w-auto">
        <span>
          Rebajas de verano en todos los trajes de baño y envío exprés gratuito - de 50%!{' '}
          <a href="#" className="underline font-semibold hover:text-red-400 transition-colors">
            ¡Compra ahora!
          </a>
        </span>
      </div>

      {/* Selector de idioma (oculto en móviles pequeños si quieres) */}
      <div className="relative hidden sm:flex items-center ml-4">
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="mr-1">{language}</span>
          <ChevronDownIcon
            className={`h-4 w-4 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul className="absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-lg w-32 z-20">
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  lang === language ? 'font-semibold' : ''
                }`}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};
