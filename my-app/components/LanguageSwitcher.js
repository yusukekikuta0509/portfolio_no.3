// components/LanguageSwitcher.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    if (language === 'ja') {
      changeLanguage('en');
    } else {
      changeLanguage('ja');
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '1rem',
        cursor: 'pointer',
      }}
    >
      {language === 'ja' ? 'English' : 'Japanese'}
    </motion.button>
  );
};

export default LanguageSwitcher;
