// components/NavBar.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'skill', label: 'Skill' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'event', label: 'Event' },
  { id: 'company', label: 'Company' },
  { id: 'contact', label: 'Contact' },
];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [sticky, setSticky] = useState(false);

  // About セクションに達したら navbar を固定（sticky）状態にする
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const handleScroll = () => {
      // about セクションの上端の位置（画面上部からの距離）
      const threshold = aboutSection.offsetTop;
      if (window.pageYOffset >= threshold) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // 初回実行
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 各セクションが画面に表示された際の activeSection 更新（IntersectionObserver を利用）
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        {/* Josefin Sans の読み込み */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <motion.nav
        className="navbar"
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: sticky ? 0 : -150, opacity: sticky ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          backgroundColor: '#fff',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          transition: 'all 0.8s ease-out',
        }}
      >
        {/* 左側：サイトタイトル */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '1.5rem',
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Yusuke Kikuta's Portfolio
          </h1>
        </div>

        {/* 中央：ナビゲーションメニュー */}
        <div className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '20px',
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  transform: activeSection === item.id ? 'scale(1.3)' : 'scale(1)',
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* 右側：言語切替ボタン */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSwitcher />
        </div>
      </motion.nav>
    </>
  );
};

export default NavBar;
