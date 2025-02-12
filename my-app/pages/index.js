// pages/index.js
import Layout from '../components/Layout';
import HandwritingText from '../components/HandwritingSVG';
import NavBar from '../components/NavBar';
import About from '../components/About'; // 新規追加
import Career from '../components/Career';
import Skill from '../components/Skill';
import Projects from '../components/ProjectSection';
import Blog from '../components/Blog';
import Event from '../components/Event';
import Contact from '../components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      <NavBar />
      <HandwritingText />
      <About />        {/* ここに About セクションを追加 */}
      <Career />
      <Skill />
      <Projects />
      <Blog />
      <Event />
      <Contact />
    </Layout>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {page}
      </motion.div>
    </AnimatePresence>
  );
};
