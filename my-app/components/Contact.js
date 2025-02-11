// components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '50px 20px' }}>
      <h2>Contact</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">Message:</label><br />
          <textarea id="message" name="message" style={{ width: '100%', padding: '8px' }}></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
