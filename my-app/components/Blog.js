// components/Blog.js
import Link from 'next/link';
import React from 'react';

const sampleArticles = [
  { id: 1, title: 'Zenn記事タイトル 1', link: 'https://zenn.dev/yourusername/articles/xxxx' },
  { id: 2, title: 'Zenn記事タイトル 2', link: 'https://zenn.dev/yourusername/articles/yyyy' },
  { id: 3, title: 'Zenn記事タイトル 3', link: 'https://zenn.dev/yourusername/articles/zzzz' },
];

const Blog = () => {
  return (
    <section id="blog" style={{ padding: '50px 20px' }}>
      <h2>Blog</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sampleArticles.map((article) => (
          <li key={article.id} style={{ marginBottom: '15px' }}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/blog">View More</Link>
    </section>
  );
};

export default Blog;
