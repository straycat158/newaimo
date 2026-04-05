import type {Metadata} from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import './globals.css'; // Global styles

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
});

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: '艾莫音乐 - 听你想听',
  description: '艾莫音乐官方网站，提供海量正版音乐、高品质音质、个性化推荐。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
