'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '~/sanity/lib/image'
import type { Project } from '~/sanity/schemas/project'

export function HomeProjectList({ projects, limit = 6 }: { projects: Project[]; limit?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {projects.slice(0, limit).map((project, index) => {
        const iconUrl = project.icon ? urlFor(project.icon)?.size(64, 64).auto('format').url() : null

        return (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-4
                         rounded-[30px] overflow-hidden
                         bg-gradient-to-br from-lime-400 to-emerald-500
                         shadow-[rgba(5,71,17,0.1)_10px_15px_15px_-10px,rgba(5,71,17,0.05)_0px_10px_10px_0px]
                         transition-all duration-300
                         hover:shadow-[rgba(5,71,17,0.2)_15px_20px_20px_-10px,rgba(5,71,17,0.1)_0px_15px_15px_0px]
                         hover:scale-[1.02]"
              title={project.name}
            >
              {/* Glass layer */}
              <div className="absolute inset-1.5 rounded-[26px] rounded-tr-[50%]
                              bg-gradient-to-b from-white/70 via-white/50 to-white/30
                              border-l border-b border-white/50" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {/* 项目图标 */}
                <div className="relative h-10 w-10 rounded-xl bg-white/80 shadow-sm mb-2 flex items-center justify-center">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={project.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-lg"
                      unoptimized
                    />
                  ) : (
                    <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                </div>

                {/* 项目名称 */}
                <span className="text-xs font-semibold text-zinc-800 text-center line-clamp-1 max-w-full px-1">
                  {project.name}
                </span>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/20" />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}