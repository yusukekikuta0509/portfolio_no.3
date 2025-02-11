// pages/projects/[slug].js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// プロジェクトデータ（本来は外部ソースから取得することが望ましい）
const projects = [
  {
    id: 1,
    title: "Building an automation tool",
    description: "Pythonを使用してtoBの自動化ツールの作成",
    hasImage: false,
    slug: "automation-tool"
  },
  {
    id: 2,
    title: "Weather App",
    description: "天気予報WebAppの作成",
    image: "/App.png",
    hasImage: true,
    link: "https://yusukekikuta0509.github.io/yusukewether/project/index.html",
    slug: "weather-app"
  },
  {
    id: 3,
    title: "Scraping Tool",
    description: "DeFi領域における各種指標データのスクレイピングの開発と運用",
    hasImage: false,
    slug: "scraping-tool"
  },
  {
    id: 4,
    title: "Blockchain Wallet",
    description: "Solflare, Phantom, MetaMaskに対応したブロックチェーンウォレット接続機能の実装。",
    image: "/DeFi.png",
    hasImage: true,
    slug: "blockchain-wallet"
  },
  {
    id: 5,
    title: "EmoBooks",
    description: "Google Books APIを使用して、今の気分の本を推薦する『EmoBooks』をデプロイしました。",
    image: "/emo.png",
    hasImage: true,
    link: "https://mood-recomendation-onla.vercel.app/",
    slug: "emobooks"
  },
  {
    id: 6,
    title: "麻雀点数計算",
    description: "ReactとTailWindを使用して、麻雀の点数計算を自動で行うアプリを作成しました。",
    image: "/majan.png",
    hasImage: true,
    slug: "mahjong-score"
  },
  {
    id: 7,
    title: "Financial Modeling Prep",
    description: "株式会社ValueGlance様のインターンの試験として財務データフィルタリングアプリケーションを開発しました。",
    image: "/apple.png",
    hasImage: true,
    link: "https://apple-ctb8.vercel.app/",
    slug: "financial-modeling-prep"
  },
  {
    id: 8,
    title: "SwiftDeploy",
    description: "Vercelを使用して自動デプロイを実現する『SwiftDeploy』をリリースしました。",
    hasImage: false,
    link: "https://webapp-khaki-ten.vercel.app/",
    slug: "swiftdeploy"
  },
  {
    id: 9,
    title: "BlockChain App",
    description: "Deposit機能などがあるブロックチェーン取引所アプリケーションの開発。",
    hasImage: false,
    link: "https://webapp-khaki-ten.vercel.app/",
    slug: "blockchain-app"
  }
];

const ProjectDetail = ({ project }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
      <p className="text-lg mb-4">{project.description}</p>
      {project.hasImage && project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-6 py-2 rounded-full mr-4"
        >
          View Project
        </a>
      )}
      <Link href="/#projects" className="mt-8 inline-block bg-black text-white px-6 py-2 rounded-full">
        Back to Projects
      </Link>
    </div>
  );
};

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

ProjectDetail.getLayout = (page) => page;

export default ProjectDetail;
