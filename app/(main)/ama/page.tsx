import Balancer from 'react-wrap-balancer'

import { Container } from '~/components/ui/Container'

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
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Ask Me Anything / 一对一咨询
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>

      <article className="prose dark:prose-invert">
        <h2>咨询内容</h2>
        <p>我可以为你解答以下相关的问题：</p>
        <ul>
          <li>
            <b>前端/全栈开发</b>
            ：工作难找，或是寻求职场建议？想提升自己的工程师水平？还是想锐评
            React vs Vue？
          </li>
          <li>
            <b>UI/UX 设计</b>：不知道如何开始学习设计？想提升自己的设计水平？
          </li>
          <li>
            <b>精益课程</b>：推出《目视化管理》、《八大浪费》等等精益系列小课堂。
          </li>
          <li>
            <b>英语技能</b>：英语能力不足，想提高自己的英语水平？和我一起学习与考试。
          </li>
          <li>
            <b>其他</b>
            ：MES SAP系统开发运维相关的问题都可以帮助你解答一些其他的问题。
          </li>
        </ul>

        <h2>定价</h2>
        <p>我的一对一咨询的价格为：</p>
        <ul>
          <li>
            <strong>¥150 - 30分钟</strong>
          </li>
          <li>
            <strong>¥300 - 60分钟</strong>
          </li>
        </ul>
      </article>
    </Container>
  )
}
