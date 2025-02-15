// components/NavBar.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

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
  const { language, toggleLanguage } = useLanguage();

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
          if (entry.target.id === 'about') {
            setHeaderVisible(true);
          }
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
        animate={{ y: headerVisible ? 0 : -150, opacity: headerVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: '#fff',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <div className="section-title">
          <h1
            style={{
              margin: '20px auto 0',
              fontSize: '1.5rem',
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Yusuke Kikuta's Portfolio
          </h1>
        </div>
        <ul
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            fontFamily: "'Josefin Sans', sans-serif"
          }}
        >
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{ margin: '0 15px', cursor: 'pointer' }}
              animate={{ scale: activeSection === item.id ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.li>
          ))}
        </ul>
        <button onClick={toggleLanguage} className="language-toggle">
          {language === 'ja' ? 'EN' : 'JA'}
        </button>
        <style jsx>{`
          .language-toggle {
            background: none;
            border: 1px solid #000;
            padding: 5px 10px;
            font-family: 'Josefin Sans', sans-serif;
            color: #000;
            transition: transform 0.3s;
          }
          .language-toggle:hover {
            transform: scale(1.1);
          }
        `}</style>
      </motion.nav>
    </>
  );
};

export default NavBar;
