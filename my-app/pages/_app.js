// pages/_app.js
import { body_font, display_font } from '../lib/fonts';
import '../styles/globals.css';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import MobileWarning from '../components/MobileWarning';

function AppContent({ Component, pageProps }) {
  const { language } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language} // 言語が変わるとキーが変わるので再描画
        initial={{ filter: 'blur(8px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        exit={{ filter: 'blur(8px)', opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${body_font.variable} ${display_font.variable}`}>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <LanguageProvider>
        <Component {...pageProps} />
        <MobileWarning />
      </LanguageProvider>
    </GoogleReCaptchaProvider>
    </div>
  );
}

export default MyApp;
