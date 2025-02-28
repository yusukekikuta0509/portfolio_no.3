"use client"; 
// Next.js (App Router) でクライアント側の処理を行うコンポーネントの場合は先頭に "use client" を書く

import React, { useState, useEffect } from "react";
import Image from "next/image";

// イベントデータ
const events = [
  {
    id: 1,
    title: 'React19の新機能「Actions」で\n状態管理をシンプルに',
    description:
      'React 19の新機能「Actions」\nを使って状態管理をシンプルにする方法を紹介しました。',
    image: '/react19.png',
    url: 'https://zenn.dev/yusukekikuta/articles/1a3a47632264c0',
  },
  {
    id: 2,
    title: 'Music Theory vs Counterpoint in Algorithms',
    description: '音楽理論とアルゴリズムの親和性について登壇しました。',
    image: '/zenncafe.jpg',
    url: 'https://zenn.dev/yusukekikuta/articles/fc9248d773bc9d',
  },
  // 他のイベントデータを追加してもOK
];

export default function Event() {
  // 現在表示しているスライドのインデックス
  const [currentIndex, setCurrentIndex] = useState(0);

  // 4秒ごとに次のスライドへ切り替え（最後までいったら先頭に戻る）
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000);

    // コンポーネントがアンマウントされるときにインターバルを解除
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="event" className="event-section">
      <h2 className="section-title">Event</h2>

      {/* フェード切り替えのコンテナ。サイズは任意で変更可能です */}
      <div className="relative w-full max-w-4xl h-[600px] mx-auto">
        {/* イベント数だけループを回し、現在のインデックスのものだけをフェードイン表示 */}
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="event-card">
                {/* 画像が存在する場合のみ表示 */}
                {event.image && (
                  <div className="event-card-image">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={300}
                      style={{ objectFit: "cover" }}
                      className="border-4 border-black rounded-xl"
                    />
                  </div>
                )}
                <h3 className="event-card-title" style={{ whiteSpace: "pre-wrap" }}>
                  {event.title}
                </h3>
                <p className="event-card-description" style={{ whiteSpace: "pre-wrap" }}>
                  {event.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        .event-section {
          padding: 50px 20px;
          background-color: #f7f7f7;
          position: relative;
        }
        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }
        .event-card {
          /* カード全体のデザイン */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 40px;
          margin: 0 auto;
          width: 100%;
          height: 100%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .event-card-image {
          margin-bottom: 15px;
        }
        .event-card-title {
          font-family: "Helvetica Neue", "Yu Gothic", sans-serif;
          color: #333;
          margin-bottom: 10px;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .event-card-description {
          font-family: "Helvetica Neue", "Yu Gothic", sans-serif;
          color: #666;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
