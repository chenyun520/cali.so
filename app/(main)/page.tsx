import React from 'react'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Headline } from '~/app/(main)/Headline'
import { PhotoGallery } from '~/app/(main)/PhotoGallery'
import { HomeProjectList } from '~/app/(main)/projects/HomeProjectList'
import { Resume } from '~/app/(main)/Resume'
import { PencilSwooshIcon, PresentationIcon } from '~/assets'
import { Container } from '~/components/ui/Container'
import { getSettings } from '~/sanity/queries'

export default async function BlogHomePage() {
  const settings = await getSettings()
  const projects = settings?.projects || []

  return (
    <>
      <Container className="mt-10">
        <Headline />
      </Container>

      <Container className="mt-12 md:mt-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* 左侧：近期文章（缩小） */}
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">近期文章</span>
            </h2>
            <BlogPosts />
          </div>

          {/* 右侧：相册 + 个人履历 + 项目展示 + 培训材料 */}
          <div className="flex flex-col gap-4 lg:w-80">
            <PhotoGallery />
            <Resume />

            <div className="flex flex-col gap-3">
              <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <PresentationIcon className="h-5 w-5 flex-none" />
                <span className="ml-2">项目展示</span>
              </h2>
              <HomeProjectList projects={projects} limit={6} />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <PresentationIcon className="h-5 w-5 flex-none" />
                <span className="ml-2">培训材料</span>
              </h2>
              <a
                href="/production-training.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 rounded-[20px] overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-1.5 rounded-[16px] bg-gradient-to-b from-white/70 via-white/50 to-white/30 border-l border-b border-white/50" />
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <span className="text-xs font-semibold text-zinc-900">生产现场日常管理</span>
                </div>
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/20" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export const revalidate = 60
