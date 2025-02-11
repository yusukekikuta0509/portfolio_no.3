// pages/contact.js
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>{language === 'en' ? 'Contact' : 'お問い合わせ'}</h2>
        <form>
          <div style={{ marginBottom: '10px' }}>
            <label>{language === 'en' ? 'Name' : '名前'}</label>
            <br />
            <input type="text" name="name" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>{language === 'en' ? 'Email' : 'メール'}</label>
            <br />
            <input type="email" name="email" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>{language === 'en' ? 'Message' : 'メッセージ'}</label>
            <br />
            <textarea name="message" style={{ width: '100%', padding: '8px' }}></textarea>
          </div>
          <button type="submit">{language === 'en' ? 'Send' : '送信'}</button>
        </form>
      </div>
    </Layout>
  );
}
