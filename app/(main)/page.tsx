import React from 'react'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Headline } from '~/app/(main)/Headline'
import { Photos } from '~/app/(main)/Photos'
import { HomeProjectList } from '~/app/(main)/projects/HomeProjectList'
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

      {settings?.heroPhotos && <Photos photos={settings.heroPhotos} />}

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
          {/* 左侧：近期文章 */}
          <div className="flex flex-col gap-4">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">近期文章</span>
            </h2>
            <BlogPosts />
          </div>

          {/* 右侧：项目展示 */}
          <div className="flex flex-col gap-4 lg:w-56">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PresentationIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">项目展示</span>
            </h2>
            <HomeProjectList projects={projects} limit={6} />
          </div>
        </div>
      </Container>
    </>
  )
}

export const revalidate = 60
