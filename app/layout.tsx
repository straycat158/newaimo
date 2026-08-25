import type {Metadata} from 'next';
import MaterialElements from '@/components/material-elements';
import 'material-symbols/rounded.css';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: '艾莫音乐 - 现在就开始听',
  description: '艾莫音乐，让播放、发现与收藏回到最舒服的节奏。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('aimo-theme');var dark=saved?saved==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=dark?'dark':'light';document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <MaterialElements />
        {children}
      </body>
    </html>
  );
}
