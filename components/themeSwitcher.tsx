// app/components/ThemeSwitcher.tsx
"use client";


import { useEffect, useState } from "react";
import {useTheme} from "next-themes";

import {Sun, Moon, ToggleLeft, ToggleRight} from "lucide-react";

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
        <div className="flex flex-row items-center"><button onClick={() => setTheme('dark')} className="mr-1"><ToggleLeft /></button><Moon size={16} /></div>
      ) : (
        <div className="flex flex-row items-center"><button onClick={() => setTheme('light')} className="mr-1"><ToggleRight /></button><Sun size={16} /></div>
      )}
    </div>
  )
};