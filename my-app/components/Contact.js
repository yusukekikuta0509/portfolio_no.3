// components/Contact.js
import React, { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission using reCAPTCHA v3
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      alert('reCAPTCHA が利用できません。後ほど再度お試しください。');
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
        throw new Error('メール送信に失敗しました');
      }
      // On success, clear the form and show the modal
      setFormData({ name: '', email: '', message: '' });
      setShowModal(true);
      setCountdown(10);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('お問い合わせの送信に失敗しました。後ほど再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  // Modal countdown & auto-close
  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowModal(false);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showModal]);

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact</h2>
      <p className="contact-subtitle">
        お仕事のご連絡はこちらからお願いします。
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="お名前"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="お問い合わせ内容 (500文字以内)"
          maxLength="500"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit" disabled={loading}>
          送信
        </button>
      </form>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <p>
              お問い合わせが正常に送信されました。<br />
              基本、送信後は2～3営業日以内に yusukekikuta.05@gmail.com よりご返信いたしますのでお待ちください。
            </p>
            <p>{countdown}秒後に自動で閉じます。</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .contact-section {
          padding: 50px 20px;
          background: #ffffff;
          position: relative;
          text-align: center;
          font-family: 'Noto Sans JP', sans-serif;
          margin-top: 50px;
        }
        .contact-title {
          font-size: 2rem;
          margin-bottom: 10px;
          font-family: 'Yu Gothic', 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif;
        }
        .contact-subtitle {
          margin-bottom: 30px;
          font-size: 1.2rem;
        }
        .contact-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-form input,
        .contact-form textarea {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }
        .contact-form button {
          padding: 12px;
          background: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background 0.3s;
        }
        .contact-form button:hover {
          background: #555;
        }
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(128, 128, 128, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #555;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          font-size: 1rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Contact;
