// components/Career.js
import React from 'react';
import { motion } from 'framer-motion';

const careerData = [
  { year: '2005年', description: '埼玉県に誕生' },
  { year: '2013年', description: 'トランペットに出会い専門的に音楽を学ぶ' },
  { year: '2018年', description: '中高一貫の中学校に進学' },
  { year: '2021年', description: '音楽科の高校で音楽を専門的に学ぶ' },
  {
    year: '2024年 春',
    description:
      '日本大学芸術学部音楽学科に進学。同時期に一人暮らしを始め、音楽と仕事の両立に違和感を覚える',
  },
  { year: '2024年 6月', description: 'プログラミングの学習を独学で開始' },
  { year: '2024年 11月', description: 'エンジニアインターンに合格して大学を休学' },
  { year: '現在', description: '大学は退学してフリーランスエンジニアとして、業務委託の案件を受託' },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, // 各項目の開始間隔（秒）
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Career = () => {
  return (
    <section id="career" style={{ padding: '50px 20px' }}>
      <h2
        className="english"
        style={{ fontSize: '3rem', marginBottom: '30px', textAlign: 'center' }}
      >
        Career
      </h2>
      <div
        className="career-timeline japanese"
        style={{
          position: 'relative',
          marginLeft: '40px',
          paddingLeft: '20px',
          borderLeft: '2px solid #ccc',
        }}
      >
        {/* 背景の縦ライン */}
        <div
          style={{
            position: 'absolute',
            left: '-2px',
            top: 0,
            width: '2px',
            height: '100%',
            background: '#0070f3',
            opacity: 0.3,
          }}
        />
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {careerData.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              style={{ marginBottom: '30px' }}
            >
              <span
                className="year"
                style={{ fontWeight: 'bold', marginRight: '10px' }}
              >
                {item.year}
              </span>
              <span className="description" style={{ fontSize: '1rem' }}>
                {item.description}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Career;
