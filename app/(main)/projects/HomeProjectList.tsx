'use client'

import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '~/sanity/lib/image'
import type { Project } from '~/sanity/schemas/project'

export function HomeProjectList({ projects, limit = 9 }: { projects: Project[]; limit?: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {projects.slice(0, limit).map((project) => {
        const iconUrl = project.icon ? urlFor(project.icon)?.size(48, 48).auto('format').url() : null

        return (
          <Link
            key={project._id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-700/50 shadow-lg shadow-zinc-200/50 dark:shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-zinc-300/50 dark:hover:shadow-zinc-800/30 flex items-center justify-center p-2"
            title={project.name}
          >
            {/* 毛玻璃光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:via-transparent pointer-events-none" />

            {/* 项目图标 */}
            {iconUrl ? (
              <Image
                src={iconUrl}
                alt={project.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            ) : (
              <svg className="h-8 w-8 text-zinc-400 dark:text-zinc-500 transition-transform duration-300 group-hover:scale-110 group-hover:text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            )}
          </Link>
        )
      })}
    </div>
  )
}
