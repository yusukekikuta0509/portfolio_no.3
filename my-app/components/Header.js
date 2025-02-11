// components/Header.js
import NavBar from './NavBar';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  return (
    <div className='english'>
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc'
      }}
    >
      {/* サイトロゴ等を配置する場合はここに挿入 */}
      <div></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <NavBar />
        <LanguageToggle />
      </div>
    </header>
    </div>
  );
};

export default Header;
