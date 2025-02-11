// pages/event.js
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

export default function Event() {
  const { language } = useLanguage();
  const events = [
    {
      id: 1,
      title: language === 'en' ? 'Event 1' : 'イベント 1',
      description: language === 'en'
        ? 'Description for Event 1'
        : 'イベント1の説明'
    },
    {
      id: 2,
      title: language === 'en' ? 'Event 2' : 'イベント 2',
      description: language === 'en'
        ? 'Description for Event 2'
        : 'イベント2の説明'
    },
    {
      id: 3,
      title: language === 'en' ? 'Event 3' : 'イベント 3',
      description: language === 'en'
        ? 'Description for Event 3'
        : 'イベント3の説明'
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>{language === 'en' ? 'Events' : 'イベント'}</h2>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {events.map(event => (
            <div
              key={event.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '300px'
              }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
