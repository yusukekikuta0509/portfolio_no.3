// pages/_app.js
import { body_font, display_font } from '../lib/fonts'
import '../styles/globals.css' // 他のグローバルスタイル

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${body_font.variable} ${display_font.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
