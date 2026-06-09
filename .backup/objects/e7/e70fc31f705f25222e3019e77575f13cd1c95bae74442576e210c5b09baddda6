'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

const showcases = [
  {
    title: '播放界面',
    desc: '纯粹、聚焦、无干扰。把播放控制、封面与歌词层级重新梳理，让每一次聆听都更沉浸。',
    image: '/screenshots/screen-1.png',
    imageSide: 'right',
    label: 'Now Playing',
  },
  {
    title: '发现音乐',
    desc: '更轻的浏览，更快的发现。通过克制的信息密度，让推荐内容自然呈现。',
    image: '/screenshots/screen-2.png',
    imageSide: 'left',
    label: 'Discover',
  },
  {
    title: '收藏空间',
    desc: '你的音乐档案被重新整理为更清晰的视觉秩序，喜欢的内容一眼可达。',
    image: '/screenshots/screen-3.png',
    imageSide: 'right',
    label: 'Library',
  },
  {
    title: '动态歌词',
    desc: '歌词跟随情绪流动，以安静而精准的动效，强化音乐表达本身。',
    image: '/screenshots/screen-4.png',
    imageSide: 'left',
    label: 'Lyrics',
  },
];

export default function ShowcaseReveal() {
  return (
    <section id="screenshots" className="relative overflow-hidden bg-zinc-950 px-3 py-16 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,transparent_76%,rgba(255,255,255,0.04))]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl md:mb-24">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
            <Layers className="h-4 w-4" />
            Interface Flow
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] md:text-6xl">界面，从滑动中展开。</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
            每一个核心界面都以“图片 + 黑色介绍卡片”的方式呈现。向下滚动时，两部分从不同方向进入，中间用淡化光带连接，形成更高级的叙事感。
          </p>
        </div>

        <div className="space-y-16 md:space-y-28">
          {showcases.map((item, index) => {
            const imageFromRight = item.imageSide === 'right';
            const imageMotion = {
              hidden: { opacity: 0, x: imageFromRight ? 120 : -120, scale: 0.96 },
              visible: { opacity: 1, x: 0, scale: 1 },
            };
            const cardMotion = {
              hidden: { opacity: 0, x: imageFromRight ? -120 : 120, scale: 0.96 },
              visible: { opacity: 1, x: 0, scale: 1 },
            };

            const imageBlock = (
              <motion.div
                variants={imageMotion}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mx-auto w-full max-w-[320px] md:max-w-[390px]"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-[0_34px_90px_rgba(0,0,0,0.48)] md:rounded-[2.75rem]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-white/10 blur-3xl" />
              </motion.div>
            );

            const cardBlock = (
              <motion.div
                variants={cardMotion}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 rounded-[2rem] border border-white/10 bg-black/80 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl md:rounded-[2.5rem] md:p-10"
              >
                <div className="mb-10 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-zinc-600">0{index + 1}</span>
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{item.title}</h3>
                <p className="mt-5 text-sm leading-8 text-zinc-400 md:text-base md:leading-8">{item.desc}</p>
              </motion.div>
            );

            return (
              <div key={item.title} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-1/3 -translate-x-1/2 -translate-y-1/2 origin-center bg-gradient-to-r from-transparent via-white/30 to-transparent md:block"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:block" />

                {imageFromRight ? (
                  <>
                    {cardBlock}
                    {imageBlock}
                  </>
                ) : (
                  <>
                    {imageBlock}
                    {cardBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
