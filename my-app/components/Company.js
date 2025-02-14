import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  {
    id: 1,
    name: 'Company A',
    logo: '/companyA.png', // public/companyA.png に配置
    url: 'https://companyA.com',
  },
  {
    id: 2,
    name: 'Company B',
    logo: '/companyB.png',
    url: 'https://companyB.com',
  },
  {
    id: 3,
    name: 'Company C',
    logo: '/companyC.png',
    url: 'https://companyC.com',
  },
  // 必要に応じて企業情報を追加
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
      <div className="company-logos" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
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
    </motion.section>
  );
};

export default Company;
