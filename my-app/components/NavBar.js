// components/NavBar.js
import React, { useState, useEffect } from 'react';
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
  const [headerVisible, setHeaderVisible] = useState(false);

  // About セクション到達後、固定表示（すでに表示済みなら常に表示）
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const threshold = aboutSection.offsetTop;
    const handleScroll = () => {
      if (window.pageYOffset >= threshold) {
        setHeaderVisible(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 各セクションの表示状況の更新（必要なら IntersectionObserver を利用）
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
    }
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: headerVisible ? 0 : -150, opacity: headerVisible ? 1 : 0 }}
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
      }}
    >
      <div className="navbar-left">
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontFamily: "'Josefin Sans', sans-serif",
          }}
        >
          Yusuke Kikuta&apos;s Portfolio
        </h1>
      </div>
      <div className="navbar-center">
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
      <div className="navbar-right">
        <LanguageSwitcher />
      </div>
    </motion.nav>
  );
};

export default NavBar;
