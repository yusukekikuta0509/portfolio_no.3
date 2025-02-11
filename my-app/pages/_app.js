// pages/_app.js
import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';

function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <LanguageProvider>
      {getLayout(<Component {...pageProps} />)}
    </LanguageProvider>
  );
}

export default MyApp;
