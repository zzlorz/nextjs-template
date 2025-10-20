// components/MyComponent.js
"use client";
import React from 'react';
import { AudioWaveform, House, GalleryVerticalEnd, SquareUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {ThemeSwitcher} from "../components/themeSwitcher"
export default function Navbar() {
    const router = useRouter();

    const handleClick = (path:string) => {
        // 跳转到带参数的路由
        router.push(`/${path}`);
    };
    return <div className="text-sm min-h-screen flex flex-col justify-between">
        <div>
            <div className="text-lg font-medium h-28 flex items-center justify-center"><AudioWaveform /> <span className="ml-2">相册日记</span></div>
            <div className="ml-6 mr-6 leading-8 mb-3.5 rounded content-btn active hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer flex items-center justify-center" onClick={() => handleClick('dashboard')}><House size={16} /> <span className='ml-2'>首页</span></div>
            <div className="ml-6 mr-6 leading-8 mb-3.5 rounded content-btn hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer flex items-center justify-center" onClick={() => handleClick('dashboard/album')}><GalleryVerticalEnd size={16} /> <span className='ml-2'>相册</span></div>
            <div className="ml-6 mr-6 leading-8 mb-3.5 rounded content-btn hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer flex items-center justify-center" onClick={() => handleClick('dashboard/profile')}><SquareUserRound size={16} /> <span className='ml-2'>我的</span></div>
        </div>
        
        <div className="mt-10 flex justify-center pt-4 pb-4"><ThemeSwitcher></ThemeSwitcher></div>
    </div>
  }