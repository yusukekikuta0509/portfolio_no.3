// pages/zenn-articles.js
import React from 'react';
import Blog from '../components/Blog';
import { parseStringPromise } from 'xml2js';

// ハードコーディングした RSS XML の例
const hardcodedRSS = `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[ Yusuke Kikutaさんのフィード ]]></title>
    <description><![CDATA[ ZennのYusuke Kikutaさん（@yusukekikuta）のRSSフィードです ]]></description>
    <link>https://zenn.dev/yusukekikuta</link>
    <image>
      <url>https://storage.googleapis.com/zenn-user-upload/avatar/e38b66c4d4.jpeg</url>
      <title>Yusuke Kikutaさんのフィード</title>
      <link>https://zenn.dev/yusukekikuta</link>
    </image>
    <generator>zenn.dev</generator>
    <lastBuildDate>Wed, 12 Feb 2025 15:09:30 GMT</lastBuildDate>
    <atom:link href="https://zenn.dev/yusukekikuta/feed" rel="self" type="application/rss+xml"/>
    <language><![CDATA[ ja ]]></language>
    <item>
      <title><![CDATA[ RestfulなAPI設計について考える ]]></title>
      <description><![CDATA[ はじめに ... ここに記事概要の詳細な説明が入ります。 ]]></description>
      <link>https://zenn.dev/yusukekikuta/articles/b7cb70ee7dc715</link>
      <guid isPermaLink="true">https://zenn.dev/yusukekikuta/articles/b7cb70ee7dc715</guid>
      <pubDate>Mon, 10 Feb 2025 01:37:49 GMT</pubDate>
    </item>
    <!-- 必要に応じて他の item を追加 -->
  </channel>
</rss>`;

export default function ZennArticlesPage({ articles }) {
  return <Blog articles={articles} />;
}

export async function getStaticProps() {
  try {
    // ハードコーディングした XML を利用
    const xmlData = hardcodedRSS;
    // explicitArray: false でパース結果をシンプルに
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    console.log("Parsed RSS:", JSON.stringify(parsed, null, 2));

    const channel = parsed.rss.channel;
    let items = channel.item;
    if (!items) {
      items = [];
    } else if (!Array.isArray(items)) {
      items = [items];
    }
    console.log("Items:", items);

    const articles = items.map((item) => ({
      title: item.title,
      link: item.link,
      summary: item.description,
      pubDate: item.pubDate,
      // slug をリンクの末尾から生成（適宜変更）
      slug: item.link.split('/').pop() || 'article'
    }));
    console.log("Articles:", articles);

    return {
      props: { articles },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching/parsing RSS:", error);
    return { props: { articles: [] }, revalidate: 60 };
  }
}
