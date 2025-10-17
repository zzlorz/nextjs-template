// components/MyComponent.js
import React from 'react';
export default function Navbar() {
    return <div className="text-sm min-h-screen">
        <div className="text-lg font-bold h-32 flex items-center justify-center">相册日记</div>
        <div className="ml-6 mr-6 leading-8 mb-3.5 rounded hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer text-center">首页</div>
        <div className="ml-6 mr-6 leading-8 mb-3.5 rounded hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer text-center">相册</div>
        <div className="ml-6 mr-6 leading-8 mb-3.5 rounded hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer text-center">我的</div>
    </div>
  }