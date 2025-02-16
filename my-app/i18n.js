// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sectionTitleAbout: "About Me",
      sectionTitleCareer: "Career",
      aboutOverview: "Hello! I'm a freelance engineer specializing in front-end development.",
      aboutDetail: "Originally, I was a music college student, but after enrolling, I re-evaluated my career and began programming in earnest. I had a passion for music theory, and through that, I rediscovered my inherent strength in logical thinking. Following an internship, I launched my career as a freelance engineer.",
      showMore: "Show More",
      showLess: "Show Less",
      sectionTitleCareer: "Career",
      careerItems: [
        { year: "2005", description: "Born in Saitama Prefecture" },
        { year: "2013", description: "Encountered the trumpet and began to study music professionally" },
        { year: "2018", description: "Enrolled in an integrated junior and senior high school" },
        { year: "2021", description: "Studied music at a high school specialized in music" },
        { year: "Spring 2024", description: "Enrolled in Nihon University College of Art and started living independently, feeling a disconnect between music and work" },
        { year: "June 2024", description: "Started learning programming on my own" },
        { year: "November 2024", description: "Got accepted into an engineering internship and took a leave from college" },
        { year: "Present", description: "Dropped out of college and began working as a freelance engineer on commissioned projects" }
      ],
      sectionTitleProjects: "Work & Projects",
      viewDetails: "View Details",
      viewMore: "View More",
      projects: {
        automationTool: {
          title: "Building an automation tool",
          description: "Development of an automation tool with AI text correction using Python."
        },
        weatherApp: {
          title: "Weather App",
          description: "Creation of a weather forecast Web App that retrieves real-time weather information."
        },
        scrapingTool: {
          title: "Scraping Tool",
          description: "Development and operation of a tool that scrapes various indicators in the DeFi domain."
        },
        blockchainWallet: {
          title: "Blockchain Wallet",
          description: "Development and deployment of a blockchain wallet supporting Solflare, Phantom, and MetaMask."
        },
        emocBooks: {
          title: "EmoBooks",
          description: "Deployed 'EmoBooks' that recommends books based on your current mood using the Google Books API."
        },
        financialModelingPrep: {
          title: "Financial Modeling Prep",
          description: "Developed an application for filtering financial data fetched via API as a trial for an internship."
        }
      },
      contactTitle: "Contact",
      contactSubtitle: "For business inquiries, please contact us here.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Email Address",
      messagePlaceholder: "Your Message (500 to 1000 characters)",
      submitButton: "Send",
      nameTooLong: "Please keep your name within 100 characters.",
      emailInvalid: "Please enter a valid email address.",
      messageLengthError: "Message must be between 500 and 1000 characters.",
      recaptchaUnavailable: "reCAPTCHA is currently unavailable. Please try again later.",
      sendFailed: "Failed to send email.",
      sendError: "There was an error sending your message. Please try again later.",
      modalSuccess: "Your message has been sent successfully. We will reply from yusukekikuta.05@gmail.com within 2-3 business days.",
      modalCountdown: " seconds until automatically closed."
    
      
    }
  },
  ja: {
    translation: {
      sectionTitleAbout: "About Me",
      sectionTitleCareer: "経歴",
      aboutOverview: "初めまして！フリーランスエンジニアの菊田佑輔です。主にフロントエンド開発を手がけています。",
      aboutDetail: "元々は音大生でしたが、入学後にキャリアの再設計を行いプログラミングを本格的に始めました。音楽理論が好きだった私は、論理的思考が好きという本質的な自分の強みを再認識し、エンジニアとしてのキャリアをインターン経験の後にフリーランスとしてスタートしました。",
      showMore: "もっと知りたい...!",
      showLess: "閉じる",
      sectionTitleCareer: "Career",
      careerItems: [
        { year: "2005年", description: "埼玉県に誕生" },
        { year: "2013年", description: "トランペットに出会い専門的に音楽を学ぶ" },
        { year: "2018年", description: "中高一貫の中学校に進学" },
        { year: "2021年", description: "音楽科の高校で音楽を専門的に学ぶ" },
        { year: "2024年 春", description: "日本大学芸術学部音楽学科に進学。同時期に一人暮らしを始め、音楽と仕事の両立に違和感を覚える" },
        { year: "2024年 6月", description: "プログラミングの学習を独学で開始" },
        { year: "2024年 11月", description: "エンジニアインターンに合格して大学を休学" },
        { year: "現在", description: "大学は退学してフリーランスエンジニアとして、業務委託の案件を受託" }
      ],
      sectionTitleProjects: "Work & Projects",
      viewDetails: "詳細を見る",
      viewMore: "もっと見る",
      projects: {
        automationTool: {
          title: "Building an automation tool",
          description: "Pythonを使用したAI文面添削機能搭載の自動化ツールの開発"
        },
        weatherApp: {
          title: "Weather App",
          description: "最新の天気情報をリアルタイムに取得した天気予報WebAppの作成"
        },
        scrapingTool: {
          title: "Scraping Tool",
          description: "DeFi領域における各種指標データをスクレイピングし、Google Sheetsに自動反映するツールの開発とAWSでのサーバー運用、Slackへの通知機能の実装"
        },
        blockchainWallet: {
          title: "Blockchain Wallet",
          description: "Solflare, Phantom, MetaMaskに対応し、Deposit, Withdrawal機能を実装したブロックチェーンウォレットの開発とAWSでのデプロイ"
        },
        emocBooks: {
          title: "EmoBooks",
          description: "Google Books APIを使用して、絵文字選択で今の気分の本を推薦する『EmoBooks』をデプロイ"
        },
        financialModelingPrep: {
          title: "Financial Modeling Prep",
          description: "株式会社ValueGlance様のインターンの試験として、財務データをAPIからFetchし、ユーザーがフィルタリングできるアプリケーションを開発"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ja", // 初期言語（サーバー・クライアント共通）
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // SSR 時に suspense を使わない
    },
    debug: false,
  });

export default i18n;
