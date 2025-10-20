// app/album-diary/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Camera, BookOpen, Heart, Share2, AudioWaveform } from "lucide-react";

export default function AlbumDiaryPage() {
  // 主题切换逻辑
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 初始化主题
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex flex-row items-center">
            <AudioWaveform color="#2563EB" />相册日记
          </h1>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* 英雄区域 */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Camera className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            用照片记录生活的<br className="md:hidden" />每一个珍贵瞬间
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            相册日记，不止是照片的集合，更是时光的容器。定格美好，珍藏回忆，让每一段故事都有迹可循。
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            开始记录
          </Link>
        </section>

        {/* 功能特点 */}
        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <BookOpen className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">时光叙事</h3>
            <p className="text-gray-600 dark:text-gray-400">
              按时间线整理照片，搭配文字注解，让回忆有脉络，故事更完整。
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Heart className="text-pink-600 dark:text-pink-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">情感珍藏</h3>
            <p className="text-gray-600 dark:text-gray-400">
              私密空间存储生活点滴，无论是欢笑还是感动，都值得被温柔收藏。
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Share2 className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">分享美好</h3>
            <p className="text-gray-600 dark:text-gray-400">
              一键分享相册给亲友，让珍贵瞬间在彼此心中流转，传递温暖。
            </p>
          </div>
        </section>

        {/* 示例展示 */}
        <section className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">记录生活的多种可能</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://picsum.photos/id/10/500/500" 
              alt="旅行照片" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <img 
              src="https://picsum.photos/id/20/500/500" 
              alt="美食照片" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <img 
              src="https://picsum.photos/id/30/500/500" 
              alt="自然风景" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <img 
              src="https://picsum.photos/id/40/500/500" 
              alt="日常瞬间" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </section>

        {/* 行动召唤 */}
        <section className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">开始你的相册日记之旅</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            每一张照片都是时光的标本，每一篇日记都是情感的印记。
          </p>
          
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 相册日记 - 珍藏每一段时光</p>
          {/* <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="hover:underline">关于我们</Link>
            <Link href="/privacy" className="hover:underline">隐私政策</Link>
            <Link href="/terms" className="hover:underline">使用条款</Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}