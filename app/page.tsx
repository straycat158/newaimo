import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Search, User, Monitor, Smartphone, Music, Headphones, Radio, Download, ArrowRight, PenTool, Layers, Sparkles } from 'lucide-react';
import Carousel from '@/components/carousel';
import Sidebar from '@/components/sidebar';

function getMilestones() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'milestones.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const lines = fileContents.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
      const [version, date, title, desc] = line.split('|');
      return { 
        version: version?.trim(), 
        date: date?.trim(), 
        title: title?.trim(), 
        desc: desc?.trim() 
      };
    });
  } catch (error) {
    console.error('Error reading milestones.txt:', error);
    return [];
  }
}

export default function Home() {
  const milestones = getMilestones();

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-900">
      <Sidebar />
      {/* Navbar - MD3 Top App Bar */}
      <header className="bg-[#FAFAFA] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-95 transition-transform duration-300 shadow-md">
                <Music className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">艾莫音乐</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-[15px] font-medium">
              <Link href="#" className="px-5 py-2.5 rounded-full bg-zinc-200/50 text-black transition-colors">音乐馆</Link>
              <Link href="#" className="px-5 py-2.5 rounded-full text-zinc-600 hover:bg-zinc-200/50 hover:text-black transition-colors">我的音乐</Link>
              <Link href="#download" className="px-5 py-2.5 rounded-full text-zinc-600 hover:bg-zinc-200/50 hover:text-black transition-colors">客户端</Link>
              <Link href="#" className="px-5 py-2.5 rounded-full text-zinc-600 hover:bg-zinc-200/50 hover:text-black transition-colors">开放平台</Link>
              <Link href="#" className="px-5 py-2.5 rounded-full text-zinc-600 hover:bg-zinc-200/50 hover:text-black transition-colors">VIP</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block group">
              <input
                type="text"
                placeholder="搜索音乐、MV、歌单、用户"
                className="w-72 h-12 pl-12 pr-4 rounded-full bg-zinc-200/50 border-transparent focus:bg-white focus:shadow-md focus:ring-0 transition-all outline-none text-sm placeholder:text-zinc-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-black transition-colors" />
            </div>
            <button className="flex items-center gap-2 md:gap-3 pl-3 pr-1.5 py-1.5 md:pl-4 md:pr-2 md:py-2 rounded-full hover:bg-zinc-200/50 transition-colors active:scale-95">
              <span className="text-sm font-bold hidden sm:block">登录</span>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero / Carousel Section */}
        <section id="hero" className="pt-4 pb-10 md:pb-16 px-4">
          <Carousel />
        </section>

        {/* Features Section - MD3 Cards */}
        <section id="features" className="py-16 md:py-24 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.05)] mx-4 mb-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 tracking-tight">为什么选择艾莫音乐</h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium">海量曲库，极致音质，懂你的个性化推荐</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Headphones, title: '千万正版高品质曲库', desc: '收录千万量级的正版高品质音乐，支持无损音质，让你畅享听觉盛宴。' },
                { icon: Radio, title: '智能推荐算法', desc: '基于先进的AI算法，深度学习你的听歌习惯，每天为你推荐最符合口味的歌曲。' },
                { icon: Music, title: '多终端云同步', desc: '只需一个账号，即可实现手机、电脑、平板等多终端音乐同步，随时随地畅听。' },
              ].map((feature, idx) => (
                <div key={idx} className="group flex flex-col p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-[#F4F4F5] hover:bg-zinc-200 transition-colors duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-black" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{feature.title}</h3>
                  <p className="text-zinc-600 leading-relaxed text-base md:text-lg">{feature.desc}</p>
                  <div className="mt-auto pt-6 md:pt-8">
                    <button className="flex items-center gap-2 text-black font-bold hover:gap-4 transition-all">
                      了解更多 <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Section - Horizontal Scroll */}
        <section id="screenshots" className="py-16 md:py-24 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 tracking-tight">沉浸式界面</h2>
                <p className="text-zinc-500 text-lg md:text-xl font-medium">极简设计，让音乐成为唯一的主角</p>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 font-medium bg-zinc-200/50 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base">
                <Layers className="w-4 h-4 md:w-5 md:h-5" />
                <span>滑动查看更多</span>
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-6 md:gap-8 pb-8 md:pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { title: '播放界面', desc: '纯粹的黑胶质感', image: '/screenshots/screen-1.png' },
                { title: '发现音乐', desc: '探索未知的声音', image: '/screenshots/screen-2.png' },
                { title: '个人主页', desc: '你的音乐DNA', image: '/screenshots/screen-3.png' },
                { title: '动态歌词', desc: '字字句句，声声入耳', image: '/screenshots/screen-4.png' },
              ].map((screen, idx) => (
                <div key={idx} className="min-w-[240px] md:min-w-[340px] snap-center group">
                  <div className="aspect-[9/16] bg-zinc-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-xl border-[8px] md:border-[12px] border-zinc-800 group-hover:-translate-y-2 md:group-hover:-translate-y-4 transition-transform duration-500">
                    <Image 
                      src={screen.image} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={screen.title} 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-6 md:mt-8 text-center">
                    <h4 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{screen.title}</h4>
                    <p className="text-sm md:text-base text-zinc-500 font-medium">{screen.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Story Section - Split Layout */}
        <section id="design" className="py-16 md:py-32 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.05)] mx-4 mb-4">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10">
                <PenTool className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8 tracking-tight leading-tight">设计背后的故事：<br/>回归纯粹，专注聆听</h2>
              <div className="space-y-4 md:space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed">
                <p>
                  在色彩泛滥的数字时代，我们选择了克制。艾莫音乐 3.0 采用纯粹的黑白灰配色，结合 Material Design 3 的空间与层级理念，去除了所有不必要的视觉干扰。
                </p>
                <p>
                  我们相信，音乐本身就是最丰富的色彩。当界面褪去浮华，专辑封面的色彩、音符的跳动才得以真正凸显。这不仅是一次视觉的重塑，更是对“专注聆听”这一初心的回归。
                </p>
                <p>
                  每一个圆角、每一处阴影、每一次点击的涟漪反馈，都经过精心打磨。我们希望艾莫音乐不仅是一个播放器，更是一件精致的数字艺术品。
                </p>
              </div>
              <button className="mt-8 md:mt-12 flex items-center gap-2 md:gap-3 text-black font-bold text-base md:text-lg hover:gap-4 md:hover:gap-5 transition-all border-b-2 border-black pb-1">
                阅读完整设计规范 <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="aspect-[4/5] md:aspect-[4/3] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-100 shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/aimodesign/1000/800?grayscale" 
                  fill 
                  className="object-cover" 
                  alt="Design Story" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section - Vertical Timeline */}
        <section id="milestones" className="py-16 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 md:mb-24">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-200 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 tracking-tight">更新里程碑</h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium">不断进化，只为更好的体验</p>
            </div>
            
            <div className="relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 before:to-transparent space-y-12 md:space-y-16">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row justify-between items-start md:items-center md:odd:flex-row-reverse group">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border-[4px] md:border-[6px] border-[#FAFAFA] bg-black z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-3.5rem)] ml-14 md:ml-0 md:w-[calc(50%-4rem)] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="font-black text-xl md:text-2xl tracking-tight">{item.version}</span>
                      <span className="text-xs md:text-sm font-bold text-zinc-500 bg-zinc-100 px-3 py-1 md:px-4 md:py-1.5 rounded-full">{item.date}</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h4>
                    <p className="text-zinc-500 leading-relaxed text-base md:text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section - MD3 Dark Surface */}
        <section id="download" className="py-20 md:py-32 bg-[#18181B] text-white relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mx-4 mb-4">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <Image
              src="https://picsum.photos/seed/aimobg/1920/1080?grayscale"
              alt="Background"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 md:mb-6 tracking-tight">艾莫音乐，无处不在</h2>
                <p className="text-lg md:text-2xl text-zinc-400 font-medium">下载客户端，享受更流畅、更优质的音乐体验</p>
              </div>
              <a href="https://lz.qaiu.top/lz/ivFQE3j535kb@7yiu" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-zinc-200 active:scale-95 transition-all shadow-lg flex items-center gap-2 md:gap-3 inline-flex">
                <Download className="w-5 h-5 md:w-6 md:h-6" />
                全部下载
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl">
              {[
                { icon: Monitor, name: 'PC 版', desc: 'Windows 10/11', status: '待开发', link: '#' },
                { icon: Smartphone, name: 'Android 版', desc: '各大应用市场', link: 'https://lz.qaiu.top/lz/ivFQE3j535kb@7yiu' },
              ].map((platform, idx) => {
                const Content = (
                  <>
                    {platform.status && (
                      <span className="absolute top-6 right-6 md:top-8 md:right-8 bg-zinc-700 text-zinc-300 text-xs font-bold px-3 py-1 rounded-full">
                        {platform.status}
                      </span>
                    )}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-zinc-700/50 flex items-center justify-center mb-10 md:mb-16 transition-colors duration-300 ${!platform.status ? 'group-hover:bg-white group-hover:text-black' : ''}`}>
                      <platform.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{platform.name}</h3>
                    <p className="text-sm md:text-base text-zinc-400 font-medium">{platform.desc}</p>
                  </>
                );

                return platform.status ? (
                  <button key={idx} className="group flex flex-col items-start p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-800/50 transition-all duration-300 border border-zinc-700/50 text-left relative cursor-not-allowed opacity-80">
                    {Content}
                  </button>
                ) : (
                  <a key={idx} href={platform.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-start p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-800/50 transition-all duration-300 border border-zinc-700/50 text-left relative hover:bg-zinc-800 hover:border-zinc-600 active:scale-95">
                    {Content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#FAFAFA] text-zinc-500 py-12 md:py-16 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg md:rounded-xl flex items-center justify-center">
              <Music className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold text-black tracking-tight">艾莫音乐</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-8 text-sm md:text-base">
            <Link href="https://amstudios.dpdns.org" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">关于我们</Link>
            <Link href="#" className="hover:text-black transition-colors">用户协议</Link>
            <Link href="#" className="hover:text-black transition-colors">隐私政策</Link>
            <Link href="#" className="hover:text-black transition-colors">联系客服</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-200 text-center text-xs md:text-sm">
          <p>© 2026 艾莫音乐 Aimo Music. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
