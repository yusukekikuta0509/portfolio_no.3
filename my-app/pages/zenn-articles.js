import React from 'react';
import Blog from '../components/Blog';
import { parseStringPromise } from 'xml2js';

export default function ZennArticlesPage({ articles }) {
  console.log('Articles in ZennArticlesPage:', articles);
  return <Blog articles={articles} />;
}

export async function getStaticProps() {
  try {
    console.log('Process.env.NEXT_PUBLIC_RSS_URL:', process.env.NEXT_PUBLIC_RSS_URL);
    
    const rssUrl = process.env.NEXT_PUBLIC_RSS_URL;
    if (!rssUrl) {
      throw new Error('NEXT_PUBLIC_RSS_URL 環境変数が設定されていません。');
    }
    
    console.log('Fetching RSS from:', rssUrl);
    const res = await fetch(rssUrl);
    if (!res.ok) {
      throw new Error(`RSSフィードの取得に失敗しました: ${res.status}`);
    }
    
    const xmlData = await res.text();
    console.log('Fetched XML (first 200 chars):', xmlData.slice(0, 200));
    
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    console.log('Parsed XML object:', parsed);

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
    
    const articles = items.map((item) => {
      const title = item.title;
      const link = typeof item.link === 'object' ? item.link._ || item.link : item.link;
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
