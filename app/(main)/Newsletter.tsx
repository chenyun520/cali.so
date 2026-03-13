'use client'

import { LayoutGroup, motion } from 'framer-motion'
import React from 'react'

import { UsersIcon } from '~/assets'
import { ClerkUserStats } from '~/components/ClerkUserStats'
import { TextRotate } from '~/components/fancy/text/text-rotate'

export function Newsletter({ _subCount }: { _subCount?: string }) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 lg:gap-24">
      {/* 左侧：社区统计 - Neumorphism 风格 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[50px] p-6 flex flex-col justify-center flex-shrink-0 min-w-[200px]
                   bg-zinc-100 dark:bg-zinc-800
                   shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
                   dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]"
      >
        <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <UsersIcon className="h-5 w-5 flex-none" />
          <span className="ml-2">社区</span>
        </div>

        <ClerkUserStats
          fallback={
            <div className="mt-4 flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          }
          render={(users, totalUsers) => (
            <div className="mt-4">
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalUsers}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                位开发者加入社区
              </p>
              {/* 显示用户头像 */}
              <div className="mt-3 flex -space-x-2">
                {users.slice(0, 5).map((user, index) => (
                  <div
                    key={user.id}
                    className="relative h-8 w-8 rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 overflow-hidden bg-gradient-to-br from-lime-400 to-emerald-500"
                    style={{ zIndex: 5 - index }}
                  >
                    {user.image_url ? (
                      <img
                        src={user.image_url}
                        alt={user.full_name || 'User'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-xs font-medium text-white">
                        {(user.full_name || user.first_name || '?')[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                ))}
                {totalUsers > 5 && (
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 bg-zinc-200 dark:bg-zinc-700">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                      +{totalUsers - 5}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </motion.div>

      {/* 右侧：动画效果 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-[50px] p-6 flex items-center justify-center overflow-hidden flex-shrink-0
                   bg-zinc-100 dark:bg-zinc-800
                   shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
                   dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]"
      >
        <LayoutGroup>
          <div className="flex whitespace-pre text-lg sm:text-xl md:text-2xl font-light items-center">
            <span className="text-zinc-700 dark:text-zinc-300">
              Make it{' '}
            </span>
            <TextRotate
              texts={[
                'hares',
                'right',
                'fast',
              ]}
              mainClassName="text-white px-3 py-1.5 bg-gradient-to-r from-lime-500 to-emerald-500 overflow-hidden justify-center rounded-lg font-semibold inline-flex items-center"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden inline-block"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </LayoutGroup>
      </motion.div>
    </div>
  )
}