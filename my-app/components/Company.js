// components/Company.js
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const companies = [
  // 例として1社分のデータを追加（必要に応じて追加してください）
  
];

const Company = () => {
  return (
    <motion.section
      id="company"
      className="company-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ padding: '50px 20px', backgroundColor: '#fff' }}
    >
      <h2 className="section-title">Company</h2>
      {companies.length > 0 ? (
        <div
          className="company-logos"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {companies.map((company) => (
            <a key={company.id} href={company.url} target="_blank" rel="noopener noreferrer">
              <div style={{ width: '150px', position: 'relative' }}>
                <Image
                  src={company.logo}
                  alt={company.name}
                  layout="responsive"
                  width={150}
                  height={100} // 高さは画像に合わせて調整してください
                  objectFit="contain"
                />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
          For business inquiries, please use the contact form!
        </p>
      )}
    </motion.section>
  );
};

export default Company;
