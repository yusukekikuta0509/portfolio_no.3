// components/Layout.js
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main style={{ marginTop: '20px' }}>{/* ナビバー分の余白（例：120px） */}
        {children}
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', fontFamily: "'Josefin Sans', sans-serif",  }}>
        <p>© 2025 yusukekikuta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
