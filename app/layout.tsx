import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '艾莫音乐 - 听你想听',
  description: '艾莫音乐官方网站，提供海量正版音乐、高品质音质、个性化推荐。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
