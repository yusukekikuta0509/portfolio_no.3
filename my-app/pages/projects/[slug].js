// pages/projects/[slug].js
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

// プロジェクトデータ（必要に応じて各プロジェクトに techStack プロパティを追加）
const projects = [
  {
    id: 1,
    title: "Building an automation tool",
    description:
      "Pythonを使用したAI文面添削機能搭載の自動化ツールの開発",
    techStack: "Python, Selenium, BeautifulSoup, Pandas, OpenAI API, Google Sheets API",
    hasImage: false,
    slug: "automation-tool"
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "最新の天気情報をリアルタイムに取得した天気予報WebAppの作成。",
    techStack: "HTML, CSS, JavaScript, API",
    hasImage: false,
    slug: "weather-app"
  },
  {
    id: 3,
    title: "Scraping Tool",
    description:
      "DeFi領域における各種指標データをスクレイピングし、Google Sheetsに自動で反映するツールの開発とAWSでのサーバー運用、Slackへの通知機能の実装。",
    techStack: "Python, AWS, SlackAPI, Google Sheets API",
    hasImage: false,
    slug: "scraping-tool"
  },
  {
    id: 4,
    title: "Blockchain Wallet",
    description:
      "Solflare, Phantom, MetaMaskに対応し、実際にDeposit, Withdrawalを行う機能を実装したブロックチェーンウォレットの開発とAWSでのデプロイ",
    techStack: "React, Next.js, TailwindCSS, Web3.js AWS",
    hasImage: false,
    slug: "blockchain-wallet"
  },
  {
    id: 5,
    title: "EmoBooks",
    description:
      "Google Books APIを使用して、絵文字を選択して今の気分の本を推薦する『EmoBooks』をデプロイしました。",
      techStack: "React, TailwindCSS, Google Books API",
      hasImage: false,
    slug: "emobooks"
  },
  {
    id: 6,
    title: "Financial Modeling Prep",
    description:
      "株式会社ValueGlance様のインターンの試験としてフルスタックに財務データをAPIからFetchしてそれをユーザーがフィルタリングできるようにしたアプリケーションを開発しました。",
      techStack: "React, TailwindCSS, FastAPI, Financial Modeling Prep API",
      hasImage: false,
    slug: "financial-modeling-prep"
  },
  
];

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { notFound: true };
  }
  return { props: { project } };
}

const ProjectDetail = ({ project }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-white py-16 px-4"
    >
      {/* タイトル：大きく中央寄せ */}
      <h1 className="text-5xl text-center mb-8">{project.title}</h1>
      
      <div className="max-w-3xl w-full bg-gray-50 p-8 rounded-lg shadow-lg">
        {project.hasImage && project.image && (
          <div className="relative w-full h-64 mb-6">
            <Image 
              src={project.image} 
              alt={project.title} 
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
            />
          </div>
        )}
        
        {/* 技術スタックセクション */}
        <section className="mb-6">
          <h2 className="text-3xl  mb-4">Technology Stack</h2>
          <p className="text-lg text-gray-700">
            {project.techStack ? project.techStack : "技術スタックの情報はありません。"}
          </p>
        </section>
        
        {/* 詳細セクション */}
        <section className="mb-6">
          <h2 className="text-3xl  mb-4">Description</h2>
          <p className="text-lg text-gray-700 whitespace-pre-line">
            {/* <br>タグを利用して改行を反映するため、HTML をパースするか、単純に whitespace-pre-line を利用 */}
            {project.description}
          </p>
        </section>
        
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-800 transition"
          >
            View Project
          </a>
        )}
        
        <div className="mt-8">
        <Link href="/#projects" className="text-gray-800 hover:underline text-lg">
            Back to Projects
          </Link>

        </div>
      </div>
    </motion.div>
  );
};

ProjectDetail.getLayout = (page) => page;

export default ProjectDetail;
