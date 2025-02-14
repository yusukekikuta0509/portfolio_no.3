import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = ({ articles = [] }) => {
  console.log('Articles in Blog component:', articles);

  return (
    <section id="blog" className="py-32 bg-gray-100 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-2xl p-10 mx-4 w-full max-w-3xl text-black transition-all duration-500">
        <h2 className="text-4xl mb-6 text-center">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="border-t border-gray-300 pt-4"
            >
              <h3 className="text-2xl mb-2">{article.title}</h3>
              <p className="mb-2" dangerouslySetInnerHTML={{ __html: article.summary }} />
              <p className="text-sm text-gray-500 mb-2">
                {new Date(article.pubDate).toLocaleDateString('ja-JP')}
              </p>
              <Link href={`/blog/${article.slug}`} legacyBehavior>
                <a className="text-gray-800 hover:underline">Read More</a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {articles.length === 0 && (
        <p className="text-center text-gray-600">記事がありません。</p>
      )}
    </section>
  );
};

export default Blog;
