// components/LanguageToggle.js
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'inherit',
        fontSize: '1rem'
      }}
    >
      {language === 'en' ? '日本語' : 'English'}
    </button>
  );
};

export default LanguageToggle;
