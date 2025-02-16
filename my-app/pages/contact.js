// pages/contact.js
import React, { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const ContactPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // 入力変更ハンドリング
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // メールアドレスのバリデーション
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // フォーム送信ハンドリング（reCAPTCHA v3 を使用）
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 名前チェック（100文字以内）
    if (formData.name.length > 100) {
      alert(t('nameTooLong', 'お名前は100文字以内で入力してください。'));
      return;
    }
    // メールアドレスチェック
    if (!isValidEmail(formData.email)) {
      alert(t('emailInvalid', '正しいメールアドレスを入力してください。'));
      return;
    }
    // お問い合わせ内容チェック（1000文字以内）
    if (formData.message.length > 1000) {
      alert(t('messageLengthError', 'お問い合わせ内容は1000文字以内で入力してください。'));
      return;
    }

    if (!executeRecaptcha) {
      alert(t('recaptchaUnavailable', 'reCAPTCHA が利用できません。後ほど再度お試しください。'));
      return;
    }
    const token = await executeRecaptcha('contact_form');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken: token }),
      });
      if (!res.ok) {
        throw new Error(t('sendFailed', 'メール送信に失敗しました'));
      }
      // 送信成功時：フォームクリアとモーダル表示
      setFormData({ name: '', email: '', message: '' });
      setShowModal(true);
      setCountdown(10);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('sendError', 'お問い合わせの送信に失敗しました。後ほど再度お試しください。'));
    } finally {
      setLoading(false);
    }
  };

  // モーダルのカウントダウン＆自動リダイレクト
  useEffect(() => {
    let timer;
    if (showModal) {
      // 画面スクロールは固定（背景固定）
      document.body.style.overflow = 'hidden';
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // モーダル表示中は自動でトップページへリダイレクト
            router.push('/');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'auto';
    };
  }, [showModal, router]);

  return (
    <section id="contact-page" className="contact-page">
      <div className="container">
        {/* 楕円形ボタンの代わりとして、ここではページタイトルとしてシンプルなUIを採用 */}
        <h1 className="page-title">{t('contactTitle', 'Contact')}</h1>
        <p className="contact-subtitle">
          {t('contactSubtitle', 'お仕事のご連絡はこちらからお願いします。')}
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder={t('namePlaceholder', 'お名前')}
            required
            maxLength="100"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder={t('emailPlaceholder', 'メールアドレス')}
            required
            
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder={t('messagePlaceholder', 'お問い合わせ内容 (最大1000文字)')}
            maxLength="1000"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" disabled={loading}>
            {t('submitButton', '送信')}
          </button>
        </form>
      </div>

      {/* ローディングアニメーション（動的なスピナー GIF を使用） */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">{t('loadingText', 'Sending...')}</p>
        </div>
      )}

      {/* モーダル表示（送信完了後、トップページに自動遷移する旨のメッセージ付き） */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-message">
              {t('modalSuccess', 'お問い合わせが正常に送信されました。自動でトップページに戻ります。')}
            </p>
            <p className="modal-countdown">
              {countdown} {t('modalCountdown', '秒後に自動で閉じます。')}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .contact-page {
          padding: 50px 20px;
          background: #ffffff;
          text-align: center;
          font-family: 'Josefin Sans', sans-serif;
          position: relative;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
        .page-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          margin-top: 70px;
        }
        .contact-subtitle {
          margin-bottom: 30px;
          font-size: 1.2rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        .contact-form input,
        .contact-form textarea {
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .contact-form button {
          padding: 12px;
          background: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .contact-form button:hover {
          background: #555;
        }
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(128, 128, 128, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .spinner {
          width: 60px;
          height: 60px;
          background: url('/spinner.gif') no-repeat center center;
          background-size: contain;
          margin-bottom: 15px;
        }
        .loading-text {
          font-size: 1.2rem;
          color: #333;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          padding: 30px 40px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          font-size: 1rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .modal-message {
          margin-bottom: 15px;
          line-height: 1.5;
        }
        .modal-countdown {
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;
