// app/components/ThemeSwitcher.tsx
"use client";


import { useEffect, useState } from "react";
import {useTheme} from "next-themes";

import {Sun, MoonStar} from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      {theme === 'light' ? (
        <div className="flex flex-row items-center rounded-full border-1 border-gray-300 dark:border-gray-800 cursor-pointer"><div className="mr-1 border-1 border-gray-300 dark:border-gray-800 rounded-full p-1"><Sun size={14} /></div><div className="p-1" onClick={() => setTheme('dark')} ><MoonStar className="text-gray-400 hover:text-black" size={14} /></div></div>
      ) : (
        <div className="flex flex-row items-center rounded-full border-1 border-gray-300 dark:border-gray-800 cursor-pointer"><div className="mr-1 p-1" onClick={() => setTheme('light')}><Sun className="text-gray-500 hover:text-black dark:hover:text-white border-gray-800" size={14} /></div><div className=" border-1 border-gray-300 rounded-full p-1 dark:border-gray-800"><MoonStar size={14} /></div></div>
      )}
    </div>
  )
};