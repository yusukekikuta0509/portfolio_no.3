// components/NavBar.js
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="english text-white">
    <nav
      style={{
        display: 'flex',
        gap: '30px',
        padding: '10px 20px',
        position: 'fixed',
        top: 0,
        width: '100%',
        background: '#fff',
        zIndex: 100,
      }}
    >
      <Link href="#home">Home</Link>
      <Link href="#career">Career</Link>
      <Link href="#skill">Skills</Link>
      <Link href="#projects">Projects</Link>
      <Link href="#blog">Blog</Link>
      <Link href="#event">Event</Link>
      <Link href="#contact">Contact</Link>
      
    </nav>
    </div>
  );
};

export default NavBar;
