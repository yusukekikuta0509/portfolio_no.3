import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // success / error / null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || '送信に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('送信中にエラーが発生しました');
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ padding: '50px 20px', backgroundColor: '#f7f7f7' }}
    >
      <h2 className="section-title">企業様のお問い合わせ</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '8px' }}>お問い合わせ内容（500文字以内）</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength="500"
            rows="6"
            style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
          />
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#666' }}>
            {formData.message.length} / 500
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          送信する
        </button>
        {status && (
          <p style={{ marginTop: '20px', textAlign: 'center', color: status === 'success' ? 'green' : 'red' }}>
            {status === 'success' ? 'お問い合わせを送信しました。' : status}
          </p>
        )}
      </form>
    </motion.section>
  );
};

export default Contact;
