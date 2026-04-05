'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/aimo1/1200/500?grayscale',
    title: '艾莫音乐 震撼上线',
    subtitle: '千万正版曲库，享受高品质听觉盛宴',
    color: 'from-black/90 via-black/50 to-transparent'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/aimo2/1200/500?grayscale',
    title: '独家首发 新歌速递',
    subtitle: '第一时间聆听偶像的最新作品',
    color: 'from-black/90 via-black/50 to-transparent'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/aimo3/1200/500?grayscale',
    title: '个性化推荐',
    subtitle: '懂你的AI算法，每天推荐你的最爱',
    color: 'from-black/90 via-black/50 to-transparent'
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[320px] sm:h-[400px] md:h-[520px] rounded-[2rem] overflow-hidden group shadow-sm bg-zinc-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            className="object-cover scale-105"
            referrerPolicy="no-referrer"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].color}`} />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-24 text-white">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 md:mb-6 tracking-tight"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="text-base sm:text-lg md:text-2xl text-zinc-300 font-medium"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="mt-6 md:mt-10"
            >
              <button 
                onClick={() => {
                  const element = document.getElementById('download');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-zinc-200 active:scale-95 transition-all shadow-lg"
              >
                立即体验
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls - MD3 FAB style */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 active:scale-90 border border-white/10"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 active:scale-90 border border-white/10"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Indicators - MD3 Pill style */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 p-1.5 md:p-2 rounded-full bg-black/20 backdrop-blur-md">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ease-out ${
              index === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
