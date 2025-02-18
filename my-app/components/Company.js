// components/Company.js
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const companies = [
  {
    id: 1,
    name: 'A.I Consulting',
    logo: '/Logo.png',
    url: 'https://aiconsulting.co.jp/',
  },
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
      <p
        style={{
          textAlign: 'center',
          padding: '40px',
          fontSize: '24px',
          marginBottom: '20px',
          fontFamily: "'Josefin Sans', sans-serif",
        }}
      >
        Partner Companies
      </p>
      
      {companies.length > 0 ? (
        <div
          className="company-logos flex justify-center gap-10 flex-wrap"
        >
          {companies.map((company) => (
            <a key={company.id} href={company.url} target="_blank" rel="noopener noreferrer">
              {/* ここで Tailwind のレスポンシブクラスを使用してサイズを変更 */}
              <div className="relative w-64 md:w-[400px]">
                <Image
                  src={company.logo}
                  alt={company.name}
                  layout="responsive"
                  width={150}
                  height={260}
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
