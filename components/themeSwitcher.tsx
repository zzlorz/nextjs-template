// app/components/ThemeSwitcher.tsx
"use client";


import { useEffect, useState } from "react";
import {useTheme} from "next-themes";

import {Sun, Moon} from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}><Sun /></button>
      <button onClick={() => setTheme('dark')}><Moon /></button>
    </div>
  )
};