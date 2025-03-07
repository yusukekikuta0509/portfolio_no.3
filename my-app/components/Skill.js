// components/Skills.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartCard from './ChartCard';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Skills = () => {
  const categories = {
    "Programming Languages": {
      labels: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'PHP'],
      data: [95, 90, 90, 80, 95, 50],
    },
    "Frameworks": {
      labels: ['React', 'Vite', 'Tailwind CSS', 'Next.js', 'Node.js', 'Framer Motion', 'Django', 'Flask', 'FastAPI'],
      data: [90, 80, 90, 75, 70, 80, 65, 80, 80],
    },
    "AI & Specialized Skills": {
      labels: ['Prompt Engineering', 'AI Integration', 'API Development & Integration'],
      data: [85, 80, 90],
    },
    "Other Skills": {
      labels: ['Git/GitHub', 'Database (PostgreSQL)', 'AWS'],
      data: [90, 65, 90],
    },
  };

  const [activeCategory, setActiveCategory] = useState("Programming Languages");

  const data = {
    labels: categories[activeCategory].labels,
    datasets: [
      {
        label: 'Skill Level (%)',
        data: categories[activeCategory].data,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 薄い黒（モノクロ）
        borderColor: 'rgba(0, 0, 0, 1)',         // 黒
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(0, 0, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#000',
        },
        position: 'top',
      },
      title: {
        display: true,
        text: `Skill Proficiency: ${activeCategory}`,
        color: '#000',
        font: {
          size: 16,
          weight: '700',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(240,240,240,0.9)',
        titleColor: '#000',
        bodyColor: '#000',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Skills',
          color: '#000',
          font: {
            size: 14,
            weight: '700',
          },
        },
        ticks: {
          color: '#000',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Proficiency (%)',
          color: '#000',
          font: {
            size: 22,
            weight: '700',
          },
        },
        ticks: {
          color: '#000',
          font: {
            size: 18,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <section id="skills" className="flex items-center justify-center min-h-screen bg-white py-16 md:py-32">
      <motion.div
        className="max-w-5xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 md:px-8 md:py-4 rounded-full shadow-lg font-medium transition duration-300 transform ${
                activeCategory === category 
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <ChartCard data={data} options={options} />
      </motion.div>
    </section>
  );
};

export default Skills;
