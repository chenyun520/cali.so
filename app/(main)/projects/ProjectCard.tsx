'use client'

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { ExternalLinkIcon, Layers3Icon } from '~/assets'
import { urlFor } from '~/sanity/lib/image'
import type { Project } from '~/sanity/schemas/project'

export function ProjectCard({ project }: { project: Project }) {
  const { url, icon, name, description } = project

  // Check if this is the learning certification project
  const isLearningProject = url.includes('levelcertification.pages.dev')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)
  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - bounds.left)
      mouseY.set(clientY - bounds.top)
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2)
    },
    [mouseX, mouseY, radius]
  )
  const maskBackground = useMotionTemplate`radial-gradient(circle ${radius}px at ${mouseX}px ${mouseY}px, black 40%, transparent)`
  const [isHovering, setIsHovering] = React.useState(false)

  const iconUrl = icon ? urlFor(icon)?.size(100, 100).auto('format').url() : null

  return (
    <motion.li
      className="group relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Apple 风格毛玻璃卡片 */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-700/50 p-8 shadow-xl shadow-zinc-200/50 dark:shadow-black/30 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-zinc-800/40"
      >
        {/* 多层毛玻璃光泽效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 dark:from-white/10 dark:via-transparent dark:to-white/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-lime-100/30 via-transparent to-transparent dark:from-lime-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* 内容 */}
        <div className="relative">
          {/* 项目图标 */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-white/50 dark:from-zinc-800 dark:to-zinc-800/50 shadow-lg shadow-zinc-200/50 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/10 mb-6">
            {iconUrl ? (
              <Image
                src={iconUrl}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl"
                unoptimized
              />
            ) : (
              <Layers3Icon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            )}
          </div>

          {/* 项目标题 */}
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
            {name}
          </h2>

          {/* 项目描述 */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {description}
          </p>

          {/* 链接区域 */}
          <div className="flex flex-col gap-3">
            {/* 汇报材料链接 - 仅学习认证项目 */}
            {isLearningProject && (
              <a
                href="/learning-cert-presentation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open('/learning-cert-presentation.html', '_blank')
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>查看项目汇报材料</span>
                <svg className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {/* 网站链接 */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>访问项目网站</span>
              <ExternalLinkIcon className="h-4 w-4 ml-auto" />
            </div>
          </div>
        </div>
      </a>

      {/* 悬停动画效果 */}
      <AnimatePresence>
        {isHovering && (
          <motion.footer
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-30 select-none px-6 py-8 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              WebkitMaskImage: maskBackground,
            }}
          >
            <div className="absolute inset-x-px inset-y-px rounded-3xl border border-dashed border-zinc-900/20 dark:border-zinc-100/10" />
          </motion.footer>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
