// components/NavBar.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // About セクション到達後、固定表示
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const threshold = aboutSection.offsetTop;
    const handleScroll = () => {
      if (window.pageYOffset >= threshold) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 各セクションの表示状況を IntersectionObserver で監視
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
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // モバイルメニューが開いていたら閉じる
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar-container">
      {/* ナビバー本体：PC用レイアウトは md: 以降で表示 */}
      <motion.nav
        className="navbar fixed top-0 left-0 right-0 h-20 bg-white z-[1000] shadow flex items-center justify-between px-5"
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: headerVisible ? 0 : -150, opacity: headerVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center w-full">
          {/* タイトル：常に表示 */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-josefin">
              Yusuke Kikuta&apos;s Portfolio
            </h1>
          </div>
          {/* PC用ナビ： md: で表示、モバイルでは非表示 */}
          <div className="hidden md:flex md:items-center md:space-x-5 ml-auto">
            <ul className="flex list-none m-0 p-0 gap-5 font-josefin">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  style={{
                    transform: activeSection === item.id ? 'scale(1.3)' : 'scale(1)',
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="ml-5">
              <LanguageSwitcher />
            </div>
          </div>
          {/* モバイル用ハンバーガーメニュー： md: で非表示 */}
          <div className="flex md:hidden ml-auto">
            <button onClick={toggleMobileMenu} className="p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* モバイル用メニューオーバーレイ（AnimatePresence を追加） */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-[1100] flex flex-col items-center justify-start pt-10"
            initial={{ opacity: 0, y: '-20%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-20%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* 閉じるボタン */}
            <button onClick={toggleMobileMenu} className="absolute top-5 right-5 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* 縦並びのナビゲーションリスト */}
            <ul className="flex flex-col gap-5 list-none m-0 p-0 text-2xl font-josefin">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  style={{
                    transform: activeSection === item.id ? 'scale(1.3)' : 'scale(1)',
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            {/* 言語切替ボタン */}
            <div className="mt-10">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
