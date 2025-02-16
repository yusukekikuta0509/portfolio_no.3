// components/Event.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const events = [
  {
    id: 1,
    title: {
      ja: "React19の新機能「Actions」で\n状態管理をシンプルに",
      en: "Simplifying state management with React 19's new 'Actions' feature",
    },
    description: {
      ja: "React 19の新機能「Actions」\nを使って状態管理をシンプルにする方法を紹介しました。",
      en: "We introduced a method to simplify state management using React 19's new 'Actions' feature.",
    },
    image: '/react19.png',
    url: 'https://zenn.dev/yusukekikuta/articles/1a3a47632264c0', // Zenn 記事へのリンク
  },
  // 今後イベントが増える場合はここにオブジェクトを追加してください
];

const Event = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language; // 'ja' または 'en'

  // 表示するスライド数
  const visibleSlides = events.length >= 3 ? 3 : events.length;
  // 初期の中央インデックス。3枚の場合は中央の1枚目（0-indexed: 1）に設定
  const initialIndex = events.length === 3 ? 1 : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const slideIntervalRef = useRef(null);

  // 自動スライド（4秒ごとに次のカードへ）
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideIntervalRef.current = setInterval(() => {
      goNext();
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  const goPrev = () => {
    const newIndex = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goNext = () => {
    const newIndex = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // 1枚あたりの幅（パーセント）
  const slideWidthPercent = 100 / visibleSlides;
  // 全体の横幅（全カードを並べたときの幅）
  const totalWidthPercent = (events.length * 100) / visibleSlides;

  // 中央寄せのオフセット計算
  let offset = currentIndex * slideWidthPercent;
  if (visibleSlides === 2) {
    offset = currentIndex * slideWidthPercent - (100 - slideWidthPercent) / 2;
  } else if (visibleSlides === 3) {
    offset = currentIndex * slideWidthPercent - slideWidthPercent;
  }
  // 1枚の場合は offset = 0

  return (
    <motion.section
      id="event"
      className="event-section"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* 固定部分は i18n から取得可能なキーで表示（ここでは例として 'sectionTitleEvent' を使用） */}
      <h2 className="section-title">{t('sectionTitleEvent', 'Event')}</h2>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <motion.div
            className="carousel-inner"
            animate={{ x: `-${offset}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: `${totalWidthPercent}%`,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="carousel-item"
                style={{ flex: '0 0 auto', width: `${slideWidthPercent}%`, padding: '0 10px' }}
              >
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="event-card">
                    {event.image && (
                      <div className="event-card-image">
                        <img
                          src={event.image}
                          alt={
                            typeof event.title === 'object'
                              ? event.title[currentLang]
                              : event.title
                          }
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '4px',
                            objectFit: 'cover',
                            marginBottom: '15px',
                          }}
                        />
                      </div>
                    )}
                    <h3
                      className="event-card-title"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {typeof event.title === 'object'
                        ? event.title[currentLang]
                        : event.title}
                    </h3>
                    <p
                      className="event-card-description"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {typeof event.description === 'object'
                        ? event.description[currentLang]
                        : event.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </motion.div>
        </div>
        {events.length > visibleSlides && (
          <>
            <button className="carousel-button prev" onClick={goPrev}>
              {'<'}
            </button>
            <button className="carousel-button next" onClick={goNext}>
              {'>'}
            </button>
          </>
        )}
      </div>
      <style jsx>{`
        .event-section {
          padding: 50px 20px;
          background-color: #f7f7f7;
          position: relative;
        }
        .carousel-container {
          position: relative;
          overflow: hidden;
        }
        .carousel-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .carousel-inner {
          display: flex;
          flex-direction: row;
        }
        .carousel-item {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .event-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s;
        }
        .event-card:hover {
          transform: scale(1.03);
        }
        .event-card-image img {
          width: 100%;
          height: auto;
          border-radius: 4px;
          object-fit: cover;
          margin-bottom: 15px;
        }
        .event-card-title {
          font-family: 'Helvetica Neue', 'Yu Gothic', sans-serif;
          color: #333;
          margin-bottom: 10px;
        }
        .event-card-description {
          font-family: 'Helvetica Neue', 'Yu Gothic', sans-serif;
          color: #666;
        }
        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: #888;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          z-index: 2;
          opacity: 0.8;
          font-size: 1.5rem;
          line-height: 40px;
          text-align: center;
        }
        .carousel-button:hover {
          background-color: #aaa;
        }
        .carousel-button.prev {
          left: 10px;
        }
        .carousel-button.next {
          right: 10px;
        }
      `}</style>
    </motion.section>
  );
};

export default Event;
