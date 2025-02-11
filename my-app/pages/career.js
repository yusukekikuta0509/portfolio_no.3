// pages/career.js
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

export default function Career() {
  const { language } = useLanguage();
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>{language === 'en' ? 'Career & Introduction' : '経歴・自己紹介'}</h2>
        <p>
          {language === 'en'
            ? 'This is a brief overview of my career and introduction.'
            : 'こちらは私の経歴と自己紹介の概要です。'}
        </p>
      </div>
    </Layout>
  );
}
