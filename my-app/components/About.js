// components/About.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

const About = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <section id="about" className="py-12 px-4 padding-bottom-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* プロフィール画像（ホバーでわずかに拡大） */}
        <motion.div 
          className="w-48 h-48 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/yusuke.jpeg" 
            alt="Profile Image" 
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </motion.div>

        {/* 自己紹介エリア */}
        <div className="flex-1">
          <h2 className="text-6xl  mb-4 text-gray-900 text-center`">
            About Me
          </h2>
          
            {/* 常に表示される概要テキスト */}
            <p className="text-gray-800 text-xl">
              初めまして！フリーランスエンジニアの菊田佑輔です。
              <br /> ReactとNext.jsを中心にフロントエンド開発を行っています。
              <br />趣味は音楽鑑賞と読書です。
            </p>
            {/* 詳細テキストは常にレンダリング、clipPath で下側だけ露出 */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: expanded ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-gray-600 text-lg">
                元々は音楽大学生だった私ですが、音楽理論が好きなことから、プログラミングに興味を持ち、
                <br />独学でプログラミングを始めました。現在は、フロントエンド開発に特化していますが、
                <br />バックエンドやインフラなどの分野にも興味を持っており、幅広いスキルを持っています。
                <br />まだまだ経験が浅いですが、持ち前の自走力と技術のキャッチアップの速度を武器に
                <br />これからも成長していきたいと思っています。
                <br />よろしくお願いします！
              </p>
            </motion.div>
          

          {/* リンクアイコン */}
          <div className="flex items-center space-x-4 mt-4">
            <a 
              href="https://github.com/yusukekikuta0509" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaGithub size={28} />
            </a>
          </div>

          {/* 「もっと知りたい...!」ボタン（黒背景、白文字、モノトーンデザイン） */}
          <button 
            onClick={toggleExpanded}
            className="mt-4 px-6 py-3 bg-black text-white rounded transition-colors hover:bg-gray-800 text-lg"
          >
            もっと知りたい...!
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
