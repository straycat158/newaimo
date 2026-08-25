'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import MaterialIcon from '@/components/material-icon';

const screens = [
  {
    title: '播放页',
    label: 'PLAYER',
    desc: '封面、歌词和控制区层级清晰，常用操作始终触手可及。',
    image: '/screenshots/screen-1.png',
    icon: 'music_note' as const,
  },
  {
    title: '发现页',
    label: 'DISCOVER',
    desc: '推荐歌单与官方榜单集中呈现，找到下一首歌更轻松。',
    image: '/screenshots/screen-2.png',
    icon: 'radio' as const,
  },
  {
    title: '收藏页',
    label: 'LIBRARY',
    desc: '歌曲、歌单和历史被有序收纳，也可以创建自己的歌单。',
    image: '/screenshots/screen-3.png',
    icon: 'library_music' as const,
  },
  {
    title: '歌词页',
    label: 'LYRICS',
    desc: '滚动动效跟随歌曲推进，让歌词阅读自然融入播放过程。',
    image: '/screenshots/screen-4.png',
    icon: 'lyrics' as const,
  },
];

const viewport = { once: true, amount: 0.2 };

export default function ShowcaseReveal() {
  return (
    <section id="screenshots" className="material-section material-showcase-section">
      <div className="material-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
          className="material-section-heading material-section-heading-split"
        >
          <div>
            <md-assist-chip elevated>
              <MaterialIcon name="view_carousel" size={18} slot="icon" />
              产品界面
            </md-assist-chip>
            <h2>看见你的下一首歌。</h2>
          </div>
          <p>从播放、发现到收藏，真实界面展示艾莫音乐如何把常用体验放在更顺手的位置。</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
          className="material-showcase-stage material-surface material-surface-container"
        >
          <md-elevation />
          <div className="material-phone-frame">
            <Image src="/screenshots/screen-1.png" alt="艾莫音乐播放主界面" fill className="material-phone-image" priority />
          </div>

          <div className="material-showcase-copy">
            <span className="material-overline">AIMO MUSIC 1.2</span>
            <h3>让播放体验回到中心。</h3>
            <p>清晰的封面、歌词与播放控制，让你更快找到状态，也更少被操作打断。</p>

            <div className="material-showcase-highlights">
              {screens.slice(1, 3).map((item) => {
                return (
                  <div key={item.title} className="material-mini-card material-surface">
                    <md-elevation />
                    <span className="material-tonal-icon"><MaterialIcon name={item.icon} size={22} /></span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="material-screen-grid">
          {screens.slice(1).map((item, index) => {
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="material-screen-card material-surface"
              >
                <md-elevation />
                <div className="material-screen-image-wrap">
                  <Image src={item.image} alt={item.title} fill className="material-screen-image" />
                </div>
                <div className="material-screen-meta">
                    <span className="material-tonal-icon"><MaterialIcon name={item.icon} size={20} /></span>
                  <div>
                    <span className="material-overline">{item.label}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
