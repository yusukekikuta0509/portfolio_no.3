// components/Career.js
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Career = () => {
  const { t } = useTranslation();

  // returnObjects: true を指定してキャリア項目を取得
  const careerItems = t('careerItems', { returnObjects: true });
  // 万が一配列でない場合は空配列にフォールバック
  const items = Array.isArray(careerItems) ? careerItems : [];

  return (
    <section id="career" style={{ padding: '50px 20px' }}>
      <h2 className="section-title">{t('sectionTitleCareer')}</h2>
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
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {items.map((item, index) => (
            <motion.li key={index} variants={itemVariants} style={{ marginBottom: '30px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{item.year}</span>
              <span style={{ fontSize: '1rem' }}>{item.description}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Career;
