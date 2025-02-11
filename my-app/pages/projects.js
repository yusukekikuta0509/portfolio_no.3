// pages/projects.js
import Layout from '../components/Layout';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { language } = useLanguage();
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2>{language === 'en' ? 'Projects' : 'プロジェクト'}</h2>
        <ul>
          <li>
            <Link href="/project1">
              {language === 'en' ? 'Project 1' : 'プロジェクト 1'}
            </Link>
          </li>
          <li>
            <Link href="/project2">
              {language === 'en' ? 'Project 2' : 'プロジェクト 2'}
            </Link>
          </li>
          <li>
            <Link href="/project3">
              {language === 'en' ? 'Project 3' : 'プロジェクト 3'}
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
