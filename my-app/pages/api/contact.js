import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { name, email, message } = req.body;

    // 必須フィールドのチェック
    if (!name || !email || !message) {
      return res.status(400).json({ error: '必須フィールドが不足しています' });
    }
    // メッセージは500文字以内
    if (message.length > 500) {
      return res.status(400).json({ error: 'メッセージは500文字以内で入力してください' });
    }

    // Nodemailer のトランスポート作成（Gmail を使用する例）
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // 例: youraccount@gmail.com
        pass: process.env.GMAIL_PASS, // Gmail のアプリパスワードなど
      },
    });

    const mailOptions = {
      from: email, // 送信者は入力されたメールアドレス
      to: 'yusukekikuta.05@gmail.com', // 送信先
      subject: '企業様のお問い合わせ',
      text: `お問い合わせが届きました。\n\n【名前】 ${name}\n【メール】 ${email}\n\n【メッセージ】\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'メールの送信に失敗しました' });
  }
}
