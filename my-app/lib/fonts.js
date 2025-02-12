// fonts.js
import { Noto_Sans_JP } from 'next/font/google'
import { Josefin_Sans } from 'next/font/google'
// Quicksand も必要であれば同様に読み込み可能です
// import { Quicksand } from 'next/font/google'

export const body_font = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--body-font',
  display: 'swap',
})

export const display_font = Josefin_Sans({
  subsets: ['latin'],
  variable: '--display-font',
  display: 'swap',
})
