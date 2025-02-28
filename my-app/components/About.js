// components/About.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <section id="about" className="py-12 px-4 padding-bottom-12">
      <div className="max-w-5xl mx-auto flex flex-row justify-center items-center gap-8">
        {/* 画像コンテナに固定サイズと flex-shrink-0 を追加 */}
        <motion.div 
          className="about-rounded-md relative overflow-hidden w-64 h-64 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/yusuke.JPG" 
            alt="Profile Image" 
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </motion.div>
        <div className="flex-1">
          <h2 className="section-title">{t('sectionTitleAbout')}</h2>
          <p className="text-gray-800 text-xl">
            {t('aboutOverview')}
          </p>
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: expanded ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600 text-lg">
              {t('aboutDetail')}
            </p>
          </motion.div>
          <div className="flex items-center space-x-4 mt-4 ">
            <a 
              href="https://github.com/yusukekikuta0509" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaGithub size={40} />
            </a>
          </div>
          <button 
            onClick={toggleExpanded}
            className="mt-4 px-6 py-3 bg-black text-white rounded transition-colors hover:bg-gray-800 text-lg"
          >
            {expanded ? t('showLess') : t('showMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
