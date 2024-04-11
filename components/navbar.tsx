// components/MyComponent.js
import React from 'react';
export default function Navbar() {
    return <div className="bg-slate-400 rounded-2xl text-white text-sm" style={{height: 'calc(100vh - 100px)', 'padding': '10px'}}>
        <div className="bg-gray-600 leading-8 pl-2 mb-0.5 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer">Home</div>
        <div className="bg-gray-600 leading-8 pl-2 mb-0.5 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer">Holiday Set</div>
    </div>
  }