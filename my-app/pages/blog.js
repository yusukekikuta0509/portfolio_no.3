// pages/blog.js
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import Parser from 'rss-parser';

export async function getStaticProps() {
  const parser = new Parser();
  // Zenn の RSS フィード URL（必要に応じてユーザーごとに変更してください）
  const feed = await parser.parseURL('https://zenn.dev/feed');
  // 例として先頭 5 件のみ取得
  const items = feed.items.slice(0, 5);
  return {
    props: { items },
    revalidate: 3600,
  };
}

export default function Blog({ items }) {
  const { language } = useLanguage();
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>{language === 'en' ? 'Blog' : 'ブログ'}</h2>
        <ul>
          {items.map((item) => (
            <li key={item.guid || item.link}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
