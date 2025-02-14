// components/Blog.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
};

const Blog = ({ articles = [] }) => {
  console.log('Articles in Blog component:', articles);
  
  // 最初は2件だけ表示し、View More ボタンで全件表示に切り替え
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll ? articles : articles.slice(0, 2);

  const handleViewMore = () => {
    setShowAll(true);
  };

  return (
    <section id="blog" className="py-32 bg-gray-100 flex flex-col items-center">
      <h2 className="section-title">
            Blogs
          </h2>
      <div className="bg-white rounded-xl shadow-2xl p-10 mx-4 w-full max-w-3xl text-black transition-all duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {visibleArticles.map((article, index) => (
              <motion.div
                key={article.slug || index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-t border-gray-300 pt-4"
              >
                <h3 className="text-2xl mb-2">{article.title}</h3>
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: article.summary }} />
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(article.pubDate).toLocaleDateString('ja-JP')}
                </p>
                {/* 外部リンクとしてZennの記事に遷移する */}
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  Read More
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {articles.length > 2 && !showAll && (
        <button 
          onClick={handleViewMore}
          className="mt-8 px-6 py-3 border border-gray-500 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          View More
        </button>
      )}
      {articles.length === 0 && (
        <p className="text-center text-gray-600">記事がありません。</p>
      )}
    </section>
  );
};

export default Blog;
