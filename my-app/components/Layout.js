// components/Layout.js
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main style={{ marginTop: '100px' }}>{/* ヘッダー分の余白（100pxに合わせる） */}
        {children}
      </main>
      <footer style={{ textAlign: 'center', padding: '20px' }}>
        <p>© 2025 yusukekikuta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
