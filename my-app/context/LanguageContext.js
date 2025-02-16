// context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'ja');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
      .then(() => {
        setLanguage(lng);
      })
      .catch(err => console.error("Error changing language:", err));
  };

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
