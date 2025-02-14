import Layout from '../components/Layout';
import HandwritingText from '../components/HandwritingSVG';
import NavBar from '../components/NavBar';
import About from '../components/About';
import Career from '../components/Career';
import Skill from '../components/Skill';
import Projects from '../components/ProjectSection';
import Blog from '../components/Blog';
import Event from '../components/Event';
import Company from '../components/Company'; // 追加
import Contact from '../components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { parseStringPromise } from 'xml2js';

export default function Home({ articles }) {
  console.log('Articles in Home:', articles);
  return (
    <Layout>
      <NavBar />
      <HandwritingText />
      <About />
      <Career />
      <Skill />
      <Projects />
      <Blog articles={articles} />
      <Event />
      <Company /> {/* Company セクションを Event の後に追加 */}
      <Contact />
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
    // ハードコードした Zenn の RSS フィード URL を指定
    const rssUrl = "https://zenn.dev/yusukekikuta/feed";
    console.log('Fetching RSS from:', rssUrl);

    // RSS フィードを取得
    const res = await fetch(rssUrl);
    if (!res.ok) {
      throw new Error(`RSSフィードの取得に失敗しました: ${res.status}`);
    }
    const xmlData = await res.text();
    console.log('Fetched XML (first 200 chars):', xmlData.slice(0, 200));

    // XML をオブジェクトにパース（explicitArray: false でシンプルに）
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    console.log('Parsed XML object:', parsed);

    // RSS（または Atom）形式に応じて記事アイテムを取得
    let items = [];
    if (parsed.rss && parsed.rss.channel && parsed.rss.channel.item) {
      console.log("RSS形式が検出されました");
      items = parsed.rss.channel.item;
    } else if (parsed.feed && parsed.feed.entry) {
      console.log("Atom形式が検出されました");
      items = parsed.feed.entry;
    } else {
      console.error("不明なフィード形式です", parsed);
    }

    if (!items) {
      items = [];
    } else if (!Array.isArray(items)) {
      items = [items];
    }

    // 各記事アイテムから必要な情報を抽出
    const articles = items.map((item) => {
      const title = item.title;
      const link =
        typeof item.link === 'object'
          ? item.link._ || item.link
          : item.link;
      const summary = item.description || item.summary || '';
      const pubDate = item.pubDate || item.published || item.updated || '';
      let slug = '';
      if (link) {
        const parts = link.split('/');
        slug = parts.pop() || parts.pop();
      }
      return { title, link, summary, pubDate, slug };
    });
    
    console.log('Extracted articles:', articles);

    return {
      props: { articles },
      revalidate: 60, // 60秒ごとに再生成
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: { articles: [] },
      revalidate: 60,
    };
  }
}
