import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: '艾莫音乐 - 现在就开始听',
  description: '艾莫音乐，让播放、发现与收藏回到最舒服的节奏。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
