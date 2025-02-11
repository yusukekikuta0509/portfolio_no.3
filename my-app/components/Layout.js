// components/Layout.js
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main style={{ marginTop: '60px' }}>{/* 固定ヘッダー分の余白 */}
        {children}
      </main>
      <footer style={{ textAlign: 'center', padding: '20px' }}>
        <p>© 2025 yusukekikuta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
