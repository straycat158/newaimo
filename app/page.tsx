import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import {
  ArrowRight,
  Download,
  Headphones,
  Library,
  ListMusic,
  Monitor,
  Music,
  Radio,
  Smartphone,
  Sparkles,
  User,
} from 'lucide-react';
import Sidebar from '@/components/sidebar';
import ShowcaseReveal from '@/components/showcase-reveal';
import FadeIn from '@/components/fade-in';

const downloadUrl = 'https://wwamd.lanzouw.com/iSq98440sjxe';

function getMilestones() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'milestones.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const milestones: Array<{ version: string; date: string; title: string; desc: string; updates: string[] }> = [];
    let current: (typeof milestones)[number] | undefined;

    fileContents.split(/\r?\n/).forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      if (/^v\d+(?:\.\d+)+\|/.test(trimmedLine)) {
        const [version = '', date = '', title = '', desc = ''] = trimmedLine.split('|');
        current = { version: version.trim(), date: date.trim(), title: title.trim(), desc: desc.trim(), updates: [] };
        milestones.push(current);
        return;
      }

      if (current) {
        current.updates.push(trimmedLine.replace(/^\d+\.\s*/, ''));
      }
    });

    return milestones;
  } catch {
    return [];
  }
}

const features = [
  {
    icon: Headphones,
    title: '沉浸播放',
    desc: '更清晰的播放层级，让封面、歌词与控制区保持舒适距离。',
  },
  {
    icon: Radio,
    title: '轻量发现',
    desc: '推荐、歌单与新歌信息用更柔和的容器呈现，不打断浏览节奏。',
  },
  {
    icon: Library,
    title: '有序收藏',
    desc: '收藏内容重新归类，喜欢的歌曲、专辑与歌单都更容易找到。',
  },
];

const interfaceCards = [
  { icon: ListMusic, title: '播放队列', desc: '下一首、循环模式、播放进度保持一眼可读。' },
  { icon: Sparkles, title: '动态歌词', desc: '用轻量动画承载情绪，而不是制造干扰。' },
  { icon: Music, title: '音乐档案', desc: '把收藏和历史沉淀成真正属于你的音乐空间。' },
];

export default function Home() {
  const milestones = getMilestones();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffbff] text-[#1d1b20] antialiased">
      <Sidebar />

      <header className="sticky top-0 z-50 border-b border-[#e7e0ec] bg-[#fffbff]/86 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
          <Link href="#hero" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.35rem] bg-[#6750a4] text-white shadow-md shadow-[#6750a4]/20">
              <Music className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold tracking-tight md:text-xl">艾莫音乐</span>
              <span className="hidden text-xs font-medium tracking-[0.18em] text-[#79747e] sm:block">AIMO MUSIC</span>
            </span>
          </Link>

          <nav className="hidden rounded-full bg-[#f3edf7] p-1 text-sm font-semibold text-[#625b71] md:flex">
            <Link className="rounded-full bg-[#eaddff] px-5 py-2.5 text-[#21005d]" href="#hero">首页</Link>
            <Link className="rounded-full px-5 py-2.5 transition hover:bg-white hover:text-[#21005d]" href="#features">特性</Link>
            <Link className="rounded-full px-5 py-2.5 transition hover:bg-white hover:text-[#21005d]" href="#screenshots">界面</Link>
            <Link className="rounded-full px-5 py-2.5 transition hover:bg-white hover:text-[#21005d]" href="#download">下载</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#download"
              className="hidden rounded-full bg-[#6750a4] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5d4799] sm:inline-flex"
            >
              下载
            </Link>
            <button aria-label="用户中心" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3edf7] text-[#49454f] transition hover:bg-[#eaddff]">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="relative px-3 pb-10 pt-4 md:px-6 md:pb-16 md:pt-6">
          <div className="md3-hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" />

          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <FadeIn className="md3-card relative overflow-hidden rounded-[2rem] bg-[#f3edf7] p-6 md:rounded-[2.25rem] md:p-9 lg:min-h-[590px]">
              <div className="absolute right-6 top-6 hidden rounded-full bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#6750a4] md:block">
                MATERIAL DESIGN 3
              </div>

              <div className="flex min-h-[470px] flex-col justify-between gap-10">
                <div>
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-2 text-xs font-bold tracking-[0.16em] text-[#21005d]">
                    <Sparkles className="h-4 w-4" />
                    让每一次播放都更顺手
                  </div>

                  <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-[#1d1b20] sm:text-5xl md:text-6xl lg:text-7xl">
                    把喜欢的音乐，
                    <span className="text-[#6750a4]">留在触手可及的地方。</span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#625b71] md:text-xl md:leading-9">
                    艾莫音乐让播放、发现与收藏回到最舒服的节奏。打开应用，找到想听的歌，然后沉浸其中。
                  </p>
                </div>

                <div className="grid gap-3 sm:flex">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shine-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6750a4] px-6 py-3 text-base font-bold text-white shadow-lg shadow-[#6750a4]/20 transition hover:-translate-y-0.5 hover:bg-[#5d4799] active:scale-95"
                  >
                    <Download className="h-5 w-5" />
                    下载 Android 版 · 密码 50p5
                  </a>
                  <Link
                    href="#screenshots"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-bold text-[#6750a4] shadow-sm transition hover:-translate-y-0.5 active:scale-95"
                  >
                    查看界面
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
              <FadeIn delay={0.08} className="md3-card rounded-[2rem] bg-[#eaddff] p-5 md:rounded-[2.25rem] md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-[#6750a4]">NOW PLAYING</p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-[#21005d]">Aimo Music</h2>
                    <p className="mt-2 text-sm leading-6 text-[#625b71]">动态色 · 圆角容器 · Material Motion</p>
                  </div>
                  <span className="flex h-16 w-16 items-center justify-center rounded-[1.45rem] bg-white/70 text-[#6750a4]">
                    <Headphones className="h-8 w-8" />
                  </span>
                </div>

                <div className="mt-8 rounded-[1.5rem] bg-white/60 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#79747e]">
                    <span>Pure Night</span>
                    <span>02:36</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#cac4d0]">
                    <div className="h-full w-[62%] rounded-full bg-[#6750a4]" />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.16} className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#e8def8] shadow-xl shadow-[#6750a4]/10 md:rounded-[2.25rem] lg:min-h-[410px]">
                <Image
                  src="/screenshots/screen-1.png"
                  alt="艾莫音乐播放界面"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21005d]/82 via-[#6750a4]/10 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white md:p-8">
                  <p className="text-xs font-bold tracking-[0.18em] text-white/70">APP PREVIEW</p>
                    <h3 className="mt-3 text-3xl font-black tracking-tight">先看见你熟悉的播放体验。</h3>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="features" className="px-3 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="mb-8 max-w-3xl md:mb-11">
              <p className="mb-3 text-xs font-black tracking-[0.22em] text-[#6750a4]">CORE EXPERIENCE</p>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl lg:text-6xl">把时间留给音乐，把操作交给直觉。</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625b71] md:text-base">
                从播放到收藏，每个常用动作都保持清晰、轻快，不让多余的界面打断你的聆听。
              </p>
            </FadeIn>

            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature, index) => (
                <FadeIn
                  key={feature.title}
                  delay={index * 0.08}
                  className="md3-card group rounded-[2rem] bg-[#f7f2fa] p-6 transition hover:-translate-y-1 md:p-7"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#eaddff] text-[#6750a4] transition group-hover:scale-105">
                      <feature.icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#6750a4]">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight md:text-2xl">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#625b71]">{feature.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <ShowcaseReveal />

        <section id="design" className="px-3 py-10 md:px-6 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <FadeIn className="md3-card rounded-[2rem] bg-[#f7f2fa] p-6 md:rounded-[2.25rem] md:p-9">
              <p className="mb-3 text-xs font-black tracking-[0.22em] text-[#6750a4]">DESIGN SYSTEM</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">清晰的界面，让音乐自然成为主角。</h2>
              <div className="mt-8 grid gap-3">
                {interfaceCards.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] bg-white p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[1.1rem] bg-[#eaddff] text-[#6750a4]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#625b71]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#d0bcff] md:rounded-[2.25rem] lg:min-h-[520px]">
              <Image
                src="https://picsum.photos/seed/aimo-material-clean/1200/900"
                alt="Material Design 3"
                fill
                className="object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21005d]/80 via-[#6750a4]/20 to-transparent" />
              <div className="absolute bottom-0 max-w-2xl p-7 text-white md:p-10">
                <p className="text-xs font-bold tracking-[0.18em] text-white/70">MATERIAL MOTION</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">每一次反馈，都恰到好处。</h3>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="milestones" className="px-3 py-10 md:px-6 md:py-16">
          <FadeIn className="mx-auto max-w-5xl rounded-[2rem] bg-[#f3edf7] p-6 md:rounded-[2.25rem] md:p-9">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-black tracking-[0.22em] text-[#6750a4]">UPDATES</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">一路更新，只为更好地听歌。</h2>
            </div>

            <div className="space-y-3">
              {milestones.map((item, index) => (
                <FadeIn
                  key={`${item.version}-${item.title}`}
                  delay={index * 0.04}
                  y={14}
                  className="grid gap-3 rounded-[1.5rem] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md md:grid-cols-[150px_1fr] md:p-6"
                >
                  <div>
                    <p className="text-xl font-black text-[#6750a4]">{item.version}</p>
                    <p className="mt-1 text-xs font-bold tracking-[0.14em] text-[#79747e]">{item.date}</p>
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    {item.desc && <p className="mt-2 text-sm leading-7 text-[#625b71]">{item.desc}</p>}
                    {item.updates.length > 0 && (
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#625b71] md:grid-cols-2">
                        {item.updates.map((update) => (
                          <li key={update} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6750a4]" />
                            <span>{update}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="download" className="px-3 pb-4 pt-6 md:px-6 md:pb-6 md:pt-8">
          <FadeIn className="mx-auto overflow-hidden rounded-[2rem] bg-[#1d1b20] text-white md:rounded-[2.5rem]">
            <div className="relative mx-auto grid max-w-7xl gap-8 p-7 md:p-12 lg:grid-cols-[1fr_0.78fr] lg:p-16">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#6750a4]/50 blur-3xl" />
              <div className="absolute -bottom-28 left-8 h-80 w-80 rounded-full bg-[#d0bcff]/25 blur-3xl" />

              <div className="relative z-10">
                <p className="mb-4 text-xs font-black tracking-[0.22em] text-[#d0bcff]">DOWNLOAD</p>
                <h2 className="text-4xl font-black tracking-[-0.06em] md:text-7xl">现在，就开始听。</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-xl md:leading-9">
                  下载 Android 版艾莫音乐，把喜欢的歌和播放体验一起带走。
                </p>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine-button mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d0bcff] px-6 py-3 text-base font-black text-[#21005d] transition hover:-translate-y-0.5 hover:bg-[#eaddff] active:scale-95 sm:w-auto"
                >
                  <Download className="h-5 w-5" />
                  下载 Android 版 · 密码 50p5
                </a>
              </div>

              <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { icon: Smartphone, name: 'Android 版', desc: '立即开始播放', link: downloadUrl },
                  { icon: Monitor, name: 'PC 版', desc: '桌面端体验即将到来', status: '即将推出', link: '#' },
                ].map((platform) => (
                  platform.status ? (
                    <div key={platform.name} className="relative rounded-[1.75rem] bg-white/10 p-6 opacity-75">
                      <span className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70">{platform.status}</span>
                      <platform.icon className="h-7 w-7" />
                      <h3 className="mt-8 text-xl font-black">{platform.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{platform.desc}</p>
                    </div>
                  ) : (
                    <a key={platform.name} href={platform.link} target="_blank" rel="noopener noreferrer" className="rounded-[1.75rem] bg-white/12 p-6 transition hover:-translate-y-1 hover:bg-white/16 active:scale-95">
                      <platform.icon className="h-7 w-7" />
                      <h3 className="mt-8 text-xl font-black">{platform.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{platform.desc}</p>
                    </a>
                  )
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-[#e7e0ec] px-4 py-10 text-[#625b71] md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[1.2rem] bg-[#eaddff] text-[#6750a4]">
              <Music className="h-4 w-4" />
            </span>
            <div>
              <p className="font-black text-[#1d1b20]">艾莫音乐</p>
              <p className="text-xs font-bold tracking-[0.16em]">Aimo Music</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="https://amstudios.dpdns.org" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#6750a4]">关于我们</Link>
            <Link href="#" className="transition hover:text-[#6750a4]">用户协议</Link>
            <Link href="#" className="transition hover:text-[#6750a4]">隐私政策</Link>
            <Link href="#" className="transition hover:text-[#6750a4]">联系客服</Link>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-center text-xs md:text-left">© 2026 艾莫音乐 Aimo Music. All rights reserved.</p>
      </footer>
    </div>
  );
}
