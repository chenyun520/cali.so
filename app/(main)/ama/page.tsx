import Balancer from 'react-wrap-balancer'

import { Container } from '~/components/ui/Container'

import { AmaClient } from './AmaClient'

const title = 'AMA 一对一咨询'
const description =
  'Chenyun 提供一对一的咨询服务（Ask Me Anything）。我有前端开发、全栈开发、UI/UX 设计、创业经验、英语技能、内容创作等经验，可以为你解答相关的问题，我也支持纯英语沟通。'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
}

export default function AskMeAnythingPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Ask Me Anything
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>
      <AmaClient />
    </Container>
  )
}