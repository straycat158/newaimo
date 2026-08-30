import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Sidebar from '@/components/sidebar';
import ShowcaseReveal from '@/components/showcase-reveal';
import FadeIn from '@/components/fade-in';
import MaterialIcon from '@/components/material-icon';
import ThemeSwitch from '@/components/theme-switch';
import ThemePalette from '@/components/theme-palette';
import DynamicColorPreview from '@/components/dynamic-color-preview';

const downloadUrl = 'https://wwamd.lanzouw.com/iSq98440sjxe';

type Milestone = {
  version: string;
  date: string;
  title: string;
  desc: string;
  updates: string[];
};

function getMilestones() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'milestones.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const milestones: Milestone[] = [];
    let current: Milestone | undefined;

    fileContents.split(/\r?\n/).forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      if (/^v\d+(?:\.\d+)+\|/.test(trimmedLine)) {
        const [version = '', date = '', title = '', desc = ''] = trimmedLine.split('|');
        current = { version: version.trim(), date: date.trim(), title: title.trim(), desc: desc.trim(), updates: [] };
        milestones.push(current);
        return;
      }

      current?.updates.push(trimmedLine.replace(/^\d+\.\s*/, ''));
    });

    return milestones.reverse();
  } catch {
    return [];
  }
}

const features = [
  {
    icon: 'headphones' as const,
    title: '沉浸播放',
    desc: '封面、歌词与控制区拥有清晰层级，播放状态一眼可见。',
    meta: 'PLAYER',
  },
  {
    icon: 'radio' as const,
    title: '轻松发现',
    desc: '推荐歌单、官方榜单和音乐助手，帮你更快找到下一首。',
    meta: 'DISCOVER',
  },
  {
    icon: 'library_music' as const,
    title: '有序收藏',
    desc: '集中管理歌曲与歌单，也可以创建属于自己的收藏空间。',
    meta: 'LIBRARY',
  },
];

const designFeatures = [
  { icon: 'palette' as const, title: '动态取色', desc: '以一个主题色为种子，推导出整套配色。' },
  { icon: 'timer' as const, title: '实用控制', desc: '定时关闭等常用功能放在顺手的位置。' },
  { icon: 'tablet' as const, title: '多端适配', desc: '从手机到平板，都保持舒适的信息密度。' },
];

export default function Home() {
  const milestones = getMilestones();

  return (
    <div className="material-app-shell">
      <Sidebar />

      <header className="material-top-app-bar">
        <div className="material-top-app-bar-inner">
          <a href="#hero" className="material-brand" aria-label="艾莫音乐首页">
            <span className="material-brand-icon"><MaterialIcon name="music_note" size={22} /></span>
            <span>
              <strong>艾莫音乐</strong>
              <small>AIMO MUSIC</small>
            </span>
          </a>

          <nav className="material-top-nav" aria-label="主导航">
            <md-text-button href="#hero">首页</md-text-button>
            <md-text-button href="#features">特性</md-text-button>
            <md-text-button href="#screenshots">界面</md-text-button>
            <md-text-button href="#milestones">更新</md-text-button>
          </nav>

          <div className="material-top-actions">
            <ThemePalette />
            <ThemeSwitch />
            <md-filled-tonal-icon-button href="#download" aria-label="前往下载">
              <MaterialIcon name="download" size={24} />
            </md-filled-tonal-icon-button>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="material-section material-hero-section">
          <div className="material-section-inner material-hero-grid">
            <FadeIn className="material-hero-copy material-surface material-primary-container">
              <md-elevation />
              <div>
                <md-assist-chip elevated>
                  <MaterialIcon name="auto_awesome" size={18} slot="icon" />
                  基于 Material Design 3
                </md-assist-chip>
                <h1>把喜欢的音乐，<span>留在触手可及的地方。</span></h1>
                <p>艾莫音乐让播放、发现与收藏回到舒服的节奏。打开应用，找到想听的歌，然后沉浸其中。</p>
              </div>

              <div>
                <div className="material-action-row">
                  <md-filled-button href={downloadUrl} target="_blank" has-icon>
                    <MaterialIcon name="download" size={19} slot="icon" />
                    下载 Android 版
                  </md-filled-button>
                  <md-outlined-button href="#screenshots" has-icon trailing-icon>
                    查看界面
                    <MaterialIcon name="arrow_forward" size={18} slot="icon" />
                  </md-outlined-button>
                </div>
                <p className="material-download-hint">蓝奏云提取密码：<strong>50p5</strong></p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="material-hero-preview material-surface">
              <md-elevation />
              <Image src="/screenshots/screen-1.png" alt="艾莫音乐播放界面" fill priority className="material-hero-preview-image" />
              <div className="material-preview-scrim" />
              <div className="material-now-playing">
                <div className="material-now-playing-title">
                  <span className="material-tonal-icon"><MaterialIcon name="headphones" size={22} /></span>
                  <div><span className="material-overline">NOW PLAYING</span><strong>Aimo Music</strong></div>
                </div>
                <md-linear-progress value={0.62} />
                <div className="material-player-time"><span>02:36</span><span>04:12</span></div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="features" className="material-section">
          <div className="material-section-inner">
            <FadeIn className="material-section-heading">
              <md-assist-chip elevated>
                <MaterialIcon name="auto_awesome" size={18} slot="icon" />
                核心体验
              </md-assist-chip>
              <h2>把时间留给音乐，把操作交给直觉。</h2>
              <p>从播放到收藏，每个常用动作都保持清晰、轻快，不让多余的界面打断聆听。</p>
            </FadeIn>

            <div className="material-feature-grid">
              {features.map((feature, index) => {
                return (
                  <FadeIn key={feature.title} delay={index * 0.06} className={`material-feature-card material-feature-card-${index + 1} material-surface`}>
                    <md-elevation />
                    <div className="material-feature-card-top">
                      <span className="material-tonal-icon material-tonal-icon-large"><MaterialIcon name={feature.icon} size={26} /></span>
                      <span className="material-card-index">0{index + 1}</span>
                    </div>
                    <span className="material-overline">{feature.meta}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                    <md-divider />
                    <div className="material-feature-status"><MaterialIcon name="check_circle" size={17} /> 已在 Android 版提供</div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <ShowcaseReveal />

        <section id="design" className="material-section">
          <div className="material-section-inner material-design-grid">
            <FadeIn className="material-design-copy">
              <md-assist-chip elevated>
                <MaterialIcon name="palette" size={18} slot="icon" />
                Material Web
              </md-assist-chip>
              <h2>真实组件，统一交互，也统一表达。</h2>
              <p>页面使用 Material Web 的按钮、芯片、进度条、FAB、Ripple 与 Elevation，并由 Material 3 的动态取色算法从一个种子色推导出整套配色。</p>
              <div className="material-design-list">
                {designFeatures.map((item) => {
                  return (
                    <div key={item.title} className="material-list-row material-surface">
                      <md-elevation />
                      <span className="material-tonal-icon"><MaterialIcon name={item.icon} size={21} /></span>
                      <div><strong>{item.title}</strong><p>{item.desc}</p></div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="material-design-side">
              <DynamicColorPreview />

              <div className="material-design-visual material-surface">
                <md-elevation />
                <Image src="/screenshots/screen-4.png" alt="艾莫音乐歌词界面" fill className="material-design-image" />
                <div className="material-preview-scrim" />
                <div className="material-design-visual-copy">
                  <span className="material-overline">MATERIAL MOTION</span>
                  <h3>每一次反馈，都恰到好处。</h3>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="milestones" className="material-section material-updates-section">
          <div className="material-section-inner">
            <FadeIn className="material-section-heading material-section-heading-centered">
              <md-assist-chip elevated>
                <MaterialIcon name="queue_music" size={18} slot="icon" />
                版本历程
              </md-assist-chip>
              <h2>一路更新，只为更好地听歌。</h2>
              <p>从第一版到现在，每一次更新都来自真实的播放需求。</p>
            </FadeIn>

            <div className="material-timeline">
              {milestones.map((item, index) => (
                <FadeIn key={`${item.version}-${item.title}`} delay={index * 0.05} y={16} className={`material-update-card material-surface ${index === 0 ? 'is-latest' : ''}`}>
                  <md-elevation />
                  <div className="material-update-meta">
                    <div className="material-version-row">
                      <span className="material-version-badge">{item.version}</span>
                      {index === 0 && <span className="material-latest-label">最新版本</span>}
                    </div>
                    <time>{item.date}</time>
                  </div>
                  <div className="material-update-content">
                    <h3>{item.title}</h3>
                    {item.desc && <p>{item.desc}</p>}
                    {item.updates.length > 0 && (
                      <ul>
                        {item.updates.map((update) => (
                          <li key={update}><MaterialIcon name="check_circle" size={17} /><span>{update}</span></li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="material-section material-download-section">
          <div className="material-section-inner material-download-card">
            <md-elevation />
            <div className="material-download-copy">
              <span className="material-overline">DOWNLOAD</span>
              <h2>现在，就开始听。</h2>
              <p>下载 Android 版艾莫音乐，把喜欢的歌和舒适的播放体验一起带走。</p>
              <div className="material-action-row">
                <md-filled-button href={downloadUrl} target="_blank" has-icon>
                  <MaterialIcon name="download" size={19} slot="icon" />
                  下载 Android 版
                </md-filled-button>
                <md-outlined-button href="#milestones">查看更新记录</md-outlined-button>
              </div>
              <p className="material-download-hint material-download-hint-inverse">提取密码：<strong>50p5</strong></p>
            </div>

            <div className="material-platform-grid">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="material-platform-card">
                <md-ripple />
                <MaterialIcon name="smartphone" size={28} />
                <div><strong>Android 版</strong><span>立即开始播放</span></div>
                <MaterialIcon name="arrow_forward" size={20} />
              </a>
              <div className="material-platform-card is-disabled">
                <MaterialIcon name="desktop_windows" size={28} />
                <div><strong>PC 版</strong><span>桌面端体验即将到来</span></div>
                <span className="material-status-label">即将推出</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="material-footer">
        <md-divider />
        <div className="material-footer-inner">
          <div className="material-brand">
            <span className="material-brand-icon"><MaterialIcon name="music_note" size={20} /></span>
            <span><strong>艾莫音乐</strong><small>AIMO MUSIC</small></span>
          </div>
          <nav aria-label="页脚导航">
            <a href="https://amstudios.dpdns.org" target="_blank" rel="noopener noreferrer">关于我们</a>
            <a href="#">用户协议</a>
            <a href="#">隐私政策</a>
            <a href="#">联系客服</a>
          </nav>
          <p>© 2026 Aimo Music</p>
        </div>
      </footer>
    </div>
  );
}
