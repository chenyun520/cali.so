'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { urlFor } from '~/sanity/lib/image'
import type { Project } from '~/sanity/schemas/project'

export function ProjectCard({ project }: { project: Project }) {
  const { url, icon, name, description } = project

  // Check if this is the learning certification project
  const isLearningProject = url.includes('levelcertification.pages.dev')

  // 3D rotation values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring config for smoother animation
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5
      x.set(xPct)
      y.set(yPct)
    },
    [x, y]
  )

  const handleMouseLeave = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const iconUrl = icon ? urlFor(icon)?.size(100, 100).auto('format').url() : null

  return (
    <motion.li
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full"
      >
        {/* 3D Card with gradient background */}
        <div
          className="relative h-full rounded-[50px] overflow-hidden
                     bg-gradient-to-br from-lime-400 to-emerald-500
                     shadow-[rgba(5,71,17,0)_40px_50px_25px_-40px,rgba(5,71,17,0.2)_0px_25px_25px_-5px]
                     transition-shadow duration-500
                     hover:shadow-[rgba(5,71,17,0.3)_30px_50px_25px_-40px,rgba(5,71,17,0.1)_0px_25px_30px_0px]"
        >
          {/* Glass layer */}
          <div
            className="absolute inset-2 rounded-[55px] rounded-tr-[100%]
                       bg-gradient-to-b from-white/80 via-white/60 to-white/30
                       dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-900/30
                       border-l border-b border-white/50 dark:border-white/10"
            style={{
              transform: 'translateZ(25px)',
            }}
          />

          {/* Content */}
          <div
            className="relative p-8 h-full flex flex-col"
            style={{
              transform: 'translateZ(26px)',
            }}
          >
            {/* 项目图标 */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-lg mb-5">
              {iconUrl ? (
                <Image
                  src={iconUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl"
                  unoptimized
                />
              ) : (
                <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )}
            </div>

            {/* 项目标题 */}
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {name}
            </h2>

            {/* 项目描述 */}
            <p className="text-sm text-zinc-700/80 dark:text-zinc-300/80 leading-relaxed flex-grow">
              {description}
            </p>

            {/* 链接按钮区域 */}
            <div className="mt-6 flex flex-col gap-3">
              {/* 汇报材料链接 - 仅学习认证项目 */}
              {isLearningProject && (
                <a
                  href="/learning-cert-presentation.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-lime-700 dark:hover:text-lime-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>查看项目汇报材料</span>
                </a>
              )}

              {/* Play 风格访问按钮 */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5
                           text-white text-shadow: 2px 2px rgb(116, 116, 116)
                           uppercase cursor-pointer
                           border-2 border-black
                           font-semibold text-sm
                           bg-yellow-400
                           rounded-[50px]
                           relative overflow-hidden
                           transition-all duration-500
                           hover:shadow-lg
                           active:scale-95
                           group/btn"
              >
                {/* Bird SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  width="24px"
                  height="24px"
                  className="transition-transform duration-500 group-hover/btn:scale-150 group-hover/btn:translate-x-2"
                >
                  <rect width={36} height={36} x={0} y={0} fill="#fdd835" />
                  <path
                    fill="#e53935"
                    d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"
                  />
                  <path
                    fill="#b71c1c"
                    d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"
                  />
                </svg>
                <span className="transition-all duration-500 group-hover/btn:translate-x-4">访问项目</span>
                <span className="absolute left-2 -translate-x-12 opacity-0 transition-all duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100">
                  GO!
                </span>
              </a>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm" style={{ transform: 'translateZ(20px)' }} />
          <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm" style={{ transform: 'translateZ(40px)' }} />
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm" style={{ transform: 'translateZ(60px)' }} />
        </div>
      </motion.div>
    </motion.li>
  )
}