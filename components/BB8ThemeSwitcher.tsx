'use client'

import { useTheme } from 'next-themes'
import React from 'react'

export function BB8ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  return (
    <label className="bb8-toggle" title={isDark ? '切换到浅色模式' : '切换到深色模式'}>
      <input
        type="checkbox"
        className="bb8-toggle__checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className="bb8-toggle__container">
        <div className="bb8-toggle__scenery">
          {/* Stars */}
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          <div className="bb8-toggle__star" />
          {/* Clouds */}
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
          {/* Suns */}
          <div className="tatto-1" />
          <div className="tatto-2" />
          {/* Mountains */}
          <div className="gomrassen" />
          <div className="hermes" />
          <div className="chenini" />
        </div>
        {/* BB-8 Droid */}
        <div className="bb8">
          <div className="bb8__head-container">
            <div className="bb8__antenna" />
            <div className="bb8__antenna" />
            <div className="bb8__head" />
          </div>
          <div className="bb8__body" />
        </div>
        <div className="bb8__shadow" />
      </div>
    </label>
  )
}