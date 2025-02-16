// components/ProjectSection.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    id: 1,
    key: 'automationTool', // i18n のリソースキー
    hasImage: false,
    slug: "automation-tool"
  },
  {
    id: 2,
    key: 'weatherApp',
    image: "/App.png",
    hasImage: true,
    link: "https://yusukekikuta0509.github.io/yusukewether/project/index.html",
    slug: "weather-app"
  },
  {
    id: 3,
    key: 'scrapingTool',
    hasImage: false,
    slug: "scraping-tool"
  },
  {
    id: 4,
    key: 'blockchainWallet',
    image: "/DeFi.png",
    hasImage: true,
    slug: "blockchain-wallet"
  },
  {
    id: 5,
    key: 'emocBooks',
    image: "/emo.png",
    hasImage: true,
    link: "https://mood-recomendation-onla.vercel.app/",
    slug: "emobooks"
  },
  {
    id: 6,
    key: 'financialModelingPrep',
    image: "/apple.png",
    hasImage: true,
    link: "https://apple-ctb8.vercel.app/",
    slug: "financial-modeling-prep"
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProjectSection = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const initialCount = 3;
  const visibleProjects = expanded ? projects : projects.slice(0, initialCount);

  return (
    <section id="projects" className="py-32 bg-gray-100 flex flex-col items-center">
      <h2 className="section-title">{t('sectionTitleProjects')}</h2>
      <motion.div
        layout
        className={`bg-white rounded-xl shadow-2xl p-10 mx-4 w-full max-w-3xl text-black transition-all duration-500 ${i18n.language === 'ja' ? 'japanese' : 'english'}`}
        style={{ overflow: 'hidden' }}
      >
        <motion.ul
          layout
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {visibleProjects.map((proj) => (
            <motion.li
              key={proj.id}
              variants={itemVariants}
              className="border-t border-gray-300 pt-4"
            >
              <h3 className="text-2xl mb-2">{t(`projects.${proj.key}.title`)}</h3>
              <p className="mb-2">{t(`projects.${proj.key}.description`)}</p>
              <Link href={`/projects/${proj.slug}`} className="text-gray-800 hover:underline">
                {t('viewDetails')}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        {!expanded && projects.length > initialCount && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-8 py-4 rounded-full shadow-md mt-8 transition duration-300"
            onClick={() => setExpanded(true)}
          >
            {t('viewMore')}
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectSection;
