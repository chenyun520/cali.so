import Image from 'next/image'
import Link from 'next/link'

import styles from './knowledge-platform/editorial.module.css'

export function KnowledgePlatformFeature() {
  return (
    <article
      className={styles.feature}
      aria-labelledby="knowledge-feature-title"
    >
      <div className={styles.featureCopy}>
        <p className={styles.eyebrow}>精选项目 / PROJECT JOURNAL 01</p>
        <p className={styles.featureCategory}>企业知识管理 · 文档控制</p>
        <h2 id="knowledge-feature-title">
          让经验有处可寻，
          <br />
          让知识有序流动。
        </h2>
        <p className={styles.featureDescription}>
          陈云科技企业知识平台开发纪实。从一份作业指导书到一次品质改善，把查找、创作、审核与版本管理，连接成团队共同的知识空间。
        </p>
        <Link href="/projects/knowledge-platform" className={styles.readLink}>
          阅读项目通讯稿 <span aria-hidden="true">↗</span>
        </Link>
        <p className={styles.featureNote}>
          陈云 / 设计与开发 · 2026.09 · 图文纪实
        </p>
      </div>
      <div className={styles.featureVisual}>
        <Image
          src="/projects/knowledge-platform/cover.webp"
          alt="晨光中的制造车间、保温杯与工程图纸，平台品牌插画"
          width={1487}
          height={1058}
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 640px, 100vw"
          priority
        />
        <span className={styles.visualLabel}>
          从制造现场出发，让知识回到工作中。
        </span>
      </div>
    </article>
  )
}
