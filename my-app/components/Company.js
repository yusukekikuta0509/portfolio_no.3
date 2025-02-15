// components/Company.js
import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  
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
              <img
                src={company.logo}
                alt={company.name}
                style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
          お仕事のご依頼はコンタクトフォームからお願いします。
        </p>
      )}
    </motion.section>
  );
};

export default Company;
