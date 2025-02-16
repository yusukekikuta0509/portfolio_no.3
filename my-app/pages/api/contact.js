// pages/api/contact.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true', // 'true' の文字列に注意
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      // 固定の送信元アドレスを使用する
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      // ユーザーのメールアドレスを replyTo に設定する
      replyTo: email,
      to: 'yusukekikuta.05@gmail.com',
      subject: '企業様のお問い合わせ',
      text: `【お名前】 ${name}\n【メールアドレス】 ${email}\n【お問い合わせ内容】\n${message.slice(0, 500)}`,
      html: `<p><strong>お名前:</strong> ${name}</p>
             <p><strong>メールアドレス:</strong> ${email}</p>
             <p><strong>お問い合わせ内容:</strong></p>
             <p>${message.slice(0, 500)}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
