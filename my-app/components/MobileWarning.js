// components/MobileWarning.js
import React, { useState, useEffect } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 画面幅が768px未満ならモバイルと判定
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初回チェック
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <p style={{ fontSize: '1.5rem' }}>現在スマホではご確認いただけません。PCでご確認ください。</p>
      <p style={{ fontSize: '1.5rem' }}>Currently, this site is not available on smartphones. Please view it on a PC.</p>
    </div>
  );
};

export default MobileWarning;
