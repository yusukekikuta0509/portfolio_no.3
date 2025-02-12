// components/ProjectSection.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "Building an automation tool",
    description:
      "Pythonを使用してtoBの自動化ツールの作成",
    hasImage: false,
    slug: "automation-tool"
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "天気予報WebAppの作成",
    image: "/App.png",
    hasImage: true,
    link: "https://yusukekikuta0509.github.io/yusukewether/project/index.html",
    slug: "weather-app"
  },
  {
    id: 3,
    title: "Scraping Tool",
    description:
      "DeFi領域における各種指標データのスクレイピングの開発と運用",
    hasImage: false,
    slug: "scraping-tool"
  },
  {
    id: 4,
    title: "Blockchain Wallet",
    description:
      "Solflare, Phantom, MetaMaskに対応したブロックチェーンウォレット接続機能の実装。",
    image: "/DeFi.png",
    hasImage: true,
    slug: "blockchain-wallet"
  },
  {
    id: 5,
    title: "EmoBooks",
    description:
      "Google Books APIを使用して、今の気分の本を推薦する『EmoBooks』をデプロイしました。",
    image: "/emo.png",
    hasImage: true,
    link: "https://mood-recomendation-onla.vercel.app/",
    slug: "emobooks"
  },
  {
    id: 6,
    title: "Financial Modeling Prep",
    description:
      "株式会社ValueGlance様のインターンの試験として財務データフィルタリングアプリケーションを開発しました。",
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

const ProjectSection = ({ lang = 'en' }) => {
  const [expanded, setExpanded] = useState(false);
  const initialCount = 3;
  const visibleProjects = expanded ? projects : projects.slice(0, initialCount);

  return (
    <section id="projects" className="py-32 bg-gray-100 flex flex-col items-center">
      <motion.div
        layout
        className={`bg-white rounded-xl shadow-2xl p-10 mx-4 w-full max-w-3xl text-black transition-all duration-500 ${lang === 'ja' ? 'japanese' : 'english'}`}
        style={{ overflow: 'hidden' }}
      >
        <h2 className="text-4xl  mb-6">Works & Projects</h2>
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
              <h3 className="text-2xl  mb-2">{proj.title}</h3>
              <p className="mb-2">{proj.description}</p>
              <Link href={`/projects/${proj.slug}`} className="text-gray-800 hover:underline">
                View Details
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
            View More
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectSection;
