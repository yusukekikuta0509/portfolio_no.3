// pages/index.js
import Layout from '../components/Layout';
import HandwritingText from '../components/HandwritingSVG';
import About from '../components/About';
import Career from '../components/Career';
import Skill from '../components/Skill';
import Projects from '../components/ProjectSection';
import Blog from '../components/Blog';
import Event from '../components/Event';
import Company from '../components/Company';
import Contact from '../components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { parseStringPromise } from 'xml2js';

export default function Home({ articles }) {
  return (
    <Layout>
      {/* 各セクションの先頭に id 属性を付与 */}
      <section id="about">
        <HandwritingText />
        <About />
      </section>
      <section id="career">
        <Career />
      </section>
      <section id="skill">
        <Skill />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="blog">
        <Blog articles={articles} />
      </section>
      <section id="event">
        <Event />
      </section>
      <section id="company">
        <Company />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Layout>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {page}
      </motion.div>
    </AnimatePresence>
  );
};

export async function getStaticProps() {
  try {
    const rssUrl = "https://zenn.dev/yusukekikuta/feed";
    const res = await fetch(rssUrl);
    if (!res.ok) {
      throw new Error(`RSSフィードの取得に失敗しました: ${res.status}`);
    }
    const xmlData = await res.text();
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    let items = [];
    if (parsed.rss && parsed.rss.channel && parsed.rss.channel.item) {
      items = parsed.rss.channel.item;
    } else if (parsed.feed && parsed.feed.entry) {
      items = parsed.feed.entry;
    } else {
      console.error("不明なフィード形式です", parsed);
    }
    if (!items) {
      items = [];
    } else if (!Array.isArray(items)) {
      items = [items];
    }
    const articles = items.map((item) => {
      const title = item.title;
      const link =
        typeof item.link === 'object' ? item.link._ || item.link : item.link;
      const summary = item.description || item.summary || '';
      const pubDate = item.pubDate || item.published || item.updated || '';
      let slug = '';
      if (link) {
        const parts = link.split('/');
        slug = parts.pop() || parts.pop();
      }
      return { title, link, summary, pubDate, slug };
    });
    return {
      props: { articles },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: { articles: [] },
      revalidate: 60,
    };
  }
}
