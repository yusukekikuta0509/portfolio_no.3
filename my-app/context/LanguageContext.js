// contexts/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext({
  language: 'ja',
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ja');
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ja' ? 'en' : 'ja'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
