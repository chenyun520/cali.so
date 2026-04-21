'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { UsersIcon } from '~/assets'
import { TextRotate } from '~/components/fancy/text/text-rotate'

const FIXED_MEMBERS = 25

export function Newsletter({ _subCount }: { _subCount?: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-16 max-w-4xl mx-auto">
      {/* 卡片一：社区统计 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative rounded-[30px] px-8 py-5
                   bg-zinc-100 dark:bg-zinc-800
                   shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
                   dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]
                   flex items-center justify-between
                   -ml-[100px]"
      >
        {/* 左侧：标题和图标 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-lime-100 dark:bg-lime-900/30">
            <UsersIcon className="h-5 w-5 text-lime-600 dark:text-lime-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Community</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">社区成员</span>
          </div>
        </div>

        {/* 右侧：固定统计 */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="relative h-8 w-8 rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 overflow-hidden bg-gradient-to-br from-lime-400 to-emerald-500"
                style={{ zIndex: 4 - i }}
              >
                <span className="flex h-full w-full items-center justify-center text-xs font-medium text-white">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 bg-zinc-200 dark:bg-zinc-700">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                +{FIXED_MEMBERS - 4}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {FIXED_MEMBERS}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              members
            </span>
          </div>
        </div>
      </motion.div>

      {/* 卡片二：跳动单词 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 relative rounded-[30px] px-8 py-5
                   bg-zinc-100 dark:bg-zinc-800
                   shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
                   dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]
                   flex items-center justify-center gap-3"
      >
        <span className="text-zinc-500 dark:text-zinc-400 text-base font-medium whitespace-nowrap">Make it</span>
        <TextRotate
          texts={[
            'happen',
            'right',
            'fast',
          ]}
          mainClassName="text-white px-4 py-2 bg-gradient-to-r from-lime-500 to-emerald-500 overflow-hidden justify-center rounded-xl font-semibold inline-flex items-center text-base whitespace-nowrap"
          staggerFrom="last"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden inline-block"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </motion.div>
    </div>
  )
}