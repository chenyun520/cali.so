import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '~/components/ui/Container'

import styles from './editorial.module.css'

const title = '让经验有处可寻，让知识有序流动'
const description =
  '陈云科技企业知识平台开发纪实：从制造现场的资料查找与经验沉淀出发，连接文件、图文创作、审核发布、版本追溯与权限管理。'

export const metadata: Metadata = {
  title: `${title} · 企业知识平台`,
  description,
  alternates: { canonical: '/projects/knowledge-platform' },
  openGraph: {
    title,
    description,
    type: 'article',
    url: '/projects/knowledge-platform',
    authors: ['陈云'],
    images: [
      {
        url: '/projects/knowledge-platform/cover.webp',
        width: 1487,
        height: 1058,
        alt: '企业知识平台品牌插画',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/projects/knowledge-platform/cover.webp'],
  },
}

const chapters = [
  ['starting-point', '从现场出发'],
  ['find-knowledge', '让资料更好找'],
  ['create-knowledge', '把经验写下来'],
  ['review-versions', '让版本有依据'],
  ['lasting-value', '让积累可持续'],
] as const

function Screen({
  name,
  alt,
  caption,
  page,
  tall = false,
}: {
  name: string
  alt: string
  caption: string
  page: string
  tall?: boolean
}) {
  return (
    <figure className={styles.screen}>
      <a
        href={`/projects/knowledge-platform/${name}.webp`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${alt}，在新标签页查看大图`}
      >
        <Image
          unoptimized
          loading="eager"
          src={`/projects/knowledge-platform/${name}.webp`}
          alt={alt}
          width={name === 'review' || name === 'tasks' ? 1280 : 1265}
          height={
            tall ? 1391 : name === 'review' || name === 'tasks' ? 720 : 712
          }
          sizes="(min-width: 1024px) 1000px, (min-width: 640px) 640px, 100vw"
        />
      </a>
      <figcaption>
        <span>{caption}</span>
        <span>手册 P{page} · 点击看大图 ↗</span>
      </figcaption>
    </figure>
  )
}

function Chapter({
  number,
  label,
  title: heading,
}: {
  number: string
  label: string
  title: string
}) {
  return (
    <header className={styles.chapterHeading}>
      <span className={styles.chapterNumber}>{number}</span>
      <div>
        <p className={styles.eyebrow}>{label}</p>
        <h2>{heading}</h2>
      </div>
    </header>
  )
}

export default function KnowledgePlatformPage() {
  return (
    <Container className="mt-12 sm:mt-20">
      <article className={styles.journal}>
        <Link href="/projects" className={styles.backLink}>
          ← 返回项目
        </Link>
        <header className={styles.articleHeader}>
          <div className={styles.masthead}>
            <p>CHENYUN / PROJECT JOURNAL</p>
            <span>VOL. 01 · 2026.09</span>
          </div>
          <p className={styles.articleCategory}>企业知识平台 · 项目通讯稿</p>
          <h1>
            让经验有处可寻，
            <br />
            <em>让知识有序流动。</em>
          </h1>
          <p className={styles.standfirst}>
            从一份作业指导书，到一次品质改善。
            <br className={styles.desktopBreak} />
            把散落在文件与现场中的经验，整理成团队可以查找、协作与传承的知识。
          </p>
          <div className={styles.byline}>
            <span>设计与开发 / 陈云</span>
            <span>制造业 · 企业内部应用</span>
            <span>约 6 分钟阅读</span>
          </div>
        </header>

        <figure className={styles.cover}>
          <Image
            unoptimized
            src="/projects/knowledge-platform/cover.webp"
            alt="保温杯产品、工程图纸与晨光中的制造车间，平台品牌插画"
            width={1487}
            height={1058}
            sizes="(min-width: 1024px) 1000px, 100vw"
            priority
          />
          <div className={styles.coverCaption}>
            <span>
              KNOWLEDGE,
              <br />
              MADE TOGETHER.
            </span>
            <p>
              连接制度、流程
              <br />
              与一线经验。
            </p>
          </div>
          <figcaption>平台品牌插画 / 非工厂实景照片</figcaption>
        </figure>

        <nav className={styles.chapterNav} aria-label="通讯稿章节导航">
          {chapters.map(([id, label], index) => (
            <a key={id} href={`#${id}`}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>

        <section id="starting-point" className={styles.chapter}>
          <Chapter
            number="01"
            label="THE STARTING POINT"
            title="知识管理，从一个现场问题开始。"
          />
          <div className={styles.introColumns}>
            <p className={styles.lead}>
              一份文件被保存下来，只是开始。下一位需要它的人，能不能找到、看懂，并确认它仍然有效，才是知识真正进入工作的时刻。
            </p>
            <div className={styles.prose}>
              <p>
                在制造现场，制度、操作规程、检验标准和设备维护经验常以不同形式存在：有已经成稿的
                Office
                文件，也有需要配图解释的操作步骤。资料进入同一个文件夹，并不自动意味着它们变得好用。
              </p>
              <p>
                陈云科技企业知识平台围绕这些使用场景展开设计。它把知识中心、内容创作、审核发布和后台管理连接起来，希望让“找一份资料”和“留下一份经验”成为日常工作中自然的一步。
              </p>
            </div>
          </div>
          <div className={styles.principles}>
            <div>
              <span>查找</span>
              <p>需要的时候，找得到。</p>
            </div>
            <div>
              <span>沉淀</span>
              <p>做过的经验，留得住。</p>
            </div>
            <div>
              <span>受控</span>
              <p>使用的版本，有依据。</p>
            </div>
          </div>
          <Screen
            name="home"
            alt="企业知识平台首页，集成搜索、上传文件、编写文章与导航入口"
            caption="图 01 / 把知识入口与日常工作放在一起。"
            page="06"
          />
        </section>

        <section id="find-knowledge" className={styles.chapter}>
          <Chapter
            number="02"
            label="FIND WHAT MATTERS"
            title="从“文件在哪里”，到“这就是我需要的”。"
          />
          <div className={styles.prose}>
            <p>
              进入平台后，员工既可以沿知识目录逐级查找，也可以用工序、设备型号或缺陷名称发起搜索。知识中心处理标题、摘要与标签检索；需要进一步查找正文时，则进入全文搜索，定位已完成提取和索引的内容。
            </p>
            <p>
              收藏和最近浏览为高频资料留出更短的路径：常用的 SOP
              可以收在手边，刚刚读过的检验要求也不必从头再找。这些入口始终遵循当前访问权限，收藏并不会额外复制出一份不受管理的文件。
            </p>
          </div>
          <Screen
            name="knowledge"
            alt="知识中心的目录导航、关键词搜索与状态筛选界面"
            caption="图 02 / 目录与筛选共同缩小查找范围。"
            page="07"
          />
          <aside className={styles.marginNote}>
            <span>设计细节</span>
            <p>
              把“按目录找”与“搜正文”分清楚，让使用者知道自己正在查什么。全文检索依赖后台索引；图片与扫描件中的文字不保证可检索。
            </p>
          </aside>
        </section>

        <section id="create-knowledge" className={styles.chapter}>
          <Chapter
            number="03"
            label="TURN EXPERIENCE INTO KNOWLEDGE"
            title="给成品文件一个位置，给现场经验一种表达。"
          />
          <div className={styles.prose}>
            <p>
              知识不只有一种形态。平台为内容作者提供“上传文件”和“编写文章”两条路径，让已有资料与新产生的经验都能进入同一套管理流程。
            </p>
          </div>
          <Screen
            name="create"
            alt="创建文档页面，提供编写文章与上传文件两种方式"
            caption="图 03 / 从资料的实际形态出发，选择合适的创建方式。"
            page="10"
          />
          <div className={styles.twoPaths}>
            <div>
              <p className={styles.eyebrow}>PATH A / 上传文件</p>
              <h3>保留成熟资料的原貌</h3>
              <p>
                PDF、Word、Excel、PowerPoint
                和图片可以作为文件知识上传，保留原文件，并进入预览、正文提取与索引处理。补充目录和说明后，先保存草稿，再提交审核。
              </p>
            </div>
            <div>
              <p className={styles.eyebrow}>PATH B / 编写文章</p>
              <h3>让一线经验讲得清楚</h3>
              <p>
                操作步骤、现场图片、图注和表格可以组合成图文文章。标准作业
                SOP、质量缺陷案例、设备维护记录和培训资料模板，为整理经验提供一个起点。
              </p>
            </div>
          </div>
          <div className={styles.editorStory}>
            <Screen
              name="editor"
              alt="图文文章编辑器，包含标题、工厂知识模板、正文工具栏与归档信息"
              caption="图 04 / 图文编辑与工厂知识模板。"
              page="12–13"
              tall
            />
            <div className={styles.editorCopy}>
              <p className={styles.eyebrow}>SMALL DETAILS, REAL WORK</p>
              <h3>
                不只让人写得下，
                <br />
                也要让人安心地写。
              </h3>
              <p>
                编辑区先聚焦正文，再完善目录、摘要与权限。首次手动保存成功后，停止输入约两秒，系统会自动保存后续修改。
              </p>
              <p>
                遇到保存失败或版本冲突时，“复制完整备份”为作者保留处理问题的余地。一个看似细小的入口，回应的是使用者最在意的事：刚刚整理好的经验，不能轻易丢失。
              </p>
            </div>
          </div>
        </section>

        <section id="review-versions" className={styles.chapter}>
          <Chapter
            number="04"
            label="TRUST THE VERSION"
            title="分享有流程，更新有来处。"
          />
          <div className={styles.prose}>
            <p>
              文控的价值，体现在资料进入使用环节之前。内容保存为草稿，由作者完善后提交审核；合格审核人阅读提交版本，通过后正式发布，需要修改时则填写原因退回。提交者不能审核自己的内容。
            </p>
          </div>
          <figure className={styles.workflow}>
            <ol>
              {[
                ['01', '创建草稿', '整理内容与归档'],
                ['02', '提交审核', '锁定本次提交版本'],
                ['03', '审核决定', '通过发布或退回修改'],
                ['04', '正式阅读', '向有权限的读者开放'],
              ].map(([n, name, detail]) => (
                <li key={n}>
                  <span>{n}</span>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ol>
            <figcaption>
              流程示意 / 退回后由作者修改并重新提交，非业务运行数据。
            </figcaption>
          </figure>
          <Screen
            name="review"
            alt="审核中心，区分待我审核与审核历史"
            caption="图 05 / 审核中心汇集提交版本与处理记录。"
            page="16"
          />
          <div className={styles.versionNote}>
            <p className={styles.eyebrow}>VERSION MATTERS</p>
            <h3>新版本还在修改，正式版本继续可读。</h3>
            <p>
              作者更新文件或文章时，普通读者仍访问原已发布版本。新版审核通过后才替换正式内容，历史版本继续保留；恢复旧内容也会先形成新草稿，再走审核流程。
            </p>
          </div>
          <div className={styles.prose}>
            <p>
              权限进一步区分“能看”“能下载”与“能编辑”。角色控制可执行的操作，访问密级与文档授权限定资料范围。查看与下载分别管理，让团队协作与文档边界同时得到照顾。
            </p>
          </div>
        </section>

        <section id="lasting-value" className={styles.chapter}>
          <Chapter
            number="05"
            label="BUILT FOR THE EVERYDAY"
            title="看得见的是界面，留得下的是积累。"
          />
          <div className={styles.prose}>
            <p>
              一个可以持续使用的知识平台，还需要有人维护目录、组织与账号，也需要能发现处理失败、判断容量风险、保存备份和追查操作。平台把这些管理工作收进独立区域，让日常阅读与后台维护各有清晰的入口。
            </p>
          </div>
          <Screen
            name="tasks"
            alt="后台任务管理界面，提供任务状态筛选与重建搜索索引入口"
            caption="图 06 / 从后台任务了解预览、提取与索引的处理状态。"
            page="24"
          />
          <dl className={styles.operations}>
            <div>
              <dt>组织与目录</dt>
              <dd>
                管理知识层级、部门与员工账号，支持 Excel 批量导入的预检与确认。
              </dd>
            </div>
            <div>
              <dt>运行与备份</dt>
              <dd>
                查看任务和容量、创建备份归档，为持续运行准备可管理的基础。
              </dd>
            </div>
            <div>
              <dt>审计与追溯</dt>
              <dd>
                通过操作记录、变更详情与请求编号，帮助管理员还原发生过的事情。
              </dd>
            </div>
          </dl>
          <div className={styles.closing}>
            <p className={styles.eyebrow}>A NOTE FROM THE PROJECT</p>
            <h2>
              让一次经验，
              <br />
              成为下一次工作的起点。
            </h2>
            <p>
              这个项目的出发点很具体：让需要资料的人少一次反复寻找，让愿意分享的人多一种清晰表达，让每一次内容更新都有可追溯的依据。平台提供空间与流程，真正让知识持续生长的，是团队日复一日的整理、审核与使用。
            </p>
            <span>陈云 / 企业知识平台</span>
          </div>
        </section>

        <footer className={styles.sourceNote}>
          <p>关于本文与配图</p>
          <p>
            内容依据《陈云科技企业知识平台 · 图文操作手册
            V1.0（脱敏版）》及本地平台只读查看整理。界面图取自手册对应版本（e0765da1c2e1），空列表为当时的真实状态；当前界面与数据可能已有变化。流程图为说明性示意，本文不代表业务成效统计或系统验收结论。
          </p>
          <Link href="/projects" className={styles.backLink}>
            ← 继续浏览项目
          </Link>
        </footer>
      </article>
    </Container>
  )
}
