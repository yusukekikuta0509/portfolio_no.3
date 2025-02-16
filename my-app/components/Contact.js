// components/ContactButtonSection.js
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactButtonSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact-button" style={{ padding: '50px 20px', textAlign: 'center' }}>
      <Link href="/contact" legacyBehavior>
        <a>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {t('contactButtonText', 'Contact Us')}
          </motion.button>
        </a>
      </Link>
    </section>
  );
};

export default ContactButtonSection;
