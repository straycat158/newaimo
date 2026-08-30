import type {Metadata} from 'next';
import MaterialElements from '@/components/material-elements';
import ThemeProvider from '@/components/theme-provider';
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
            __html: `(function(){try{var saved=localStorage.getItem('aimo-theme');var dark=saved?saved==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=dark?'dark':'light';var root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme;var cached=localStorage.getItem('aimo-theme-tokens');if(cached){var parsed=JSON.parse(cached);if(parsed&&parsed.mode===theme&&parsed.tokens){Object.keys(parsed.tokens).forEach(function(name){root.style.setProperty(name,parsed.tokens[name]);});}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <MaterialElements />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
