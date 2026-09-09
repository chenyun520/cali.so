'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { prettifyNumber } from '~/lib/math'
import { type Post } from '~/sanity/schemas/post'

function moodToReactions(mood: Post['mood']) {
  switch (mood) {
    case 'happy':
      return ['claps', 'tada', 'confetti', 'fire']
    case 'sad':
      return ['pray', 'cry', 'heart', 'hugs']
    default:
      return ['claps', 'heart', 'thumbs-up', 'fire']
  }
}

export function BlogReactions({
  _id,
  mood,
  reactions,
}: Pick<Post, '_id' | 'mood'> & { reactions?: number[] }) {
  const mouseY = useMotionValue(Infinity)
  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      mouseY.set(e.clientY)
    },
    [mouseY]
  )
  const client = useQueryClient()
  const queryKey = ['reactions', _id]
  const { data: cachedReactions } = useQuery({
    queryKey,
    initialData: reactions ?? [0, 0, 0, 0],
    staleTime: 0,
    refetchOnMount: 'always',
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `/api/reactions?id=${encodeURIComponent(_id)}`,
        {
          cache: 'no-store',
          signal,
        }
      )
      if (!response.ok) throw new Error('点赞数量加载失败')
      return readCounts(await response.json())
    },
  })
  const mutation = useMutation({
    mutationFn: async (index: number) => {
      const response = await fetch(
        `/api/reactions?id=${encodeURIComponent(_id)}&index=${index}`,
        { method: 'PATCH' }
      )
      if (!response.ok) throw new Error('点赞未成功，请稍后重试')
      const result = await response.json()
      return readCounts(result.data)
    },
    onMutate: async (index) => {
      await client.cancelQueries({ queryKey })
      const previous = client.getQueryData<number[]>(queryKey)
      client.setQueryData(
        queryKey,
        (previous ?? [0, 0, 0, 0]).map(
          (count, i) => count + (i === index ? 1 : 0)
        )
      )
      return { previous }
    },
    onError: (_error, _index, context) => {
      if (context?.previous) client.setQueryData(queryKey, context.previous)
    },
    onSuccess: (data) => client.setQueryData(queryKey, data),
    onSettled: () => client.invalidateQueries({ queryKey }),
  })

  return (
    <motion.div
      className="pointer-events-auto flex w-12 flex-col items-center justify-center gap-8 rounded-3xl bg-gradient-to-b from-zinc-100/80 to-white/90 px-1 pb-8 pt-4 ring-1 ring-zinc-400/10 backdrop-blur-lg dark:from-zinc-800/80 dark:to-zinc-950/80 dark:ring-zinc-500/10"
      onMouseMove={onMouseMove}
      onMouseLeave={() => mouseY.set(Infinity)}
      initial={{
        opacity: 0,
        y: 8,
        rotateY: 90,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 0.55,
        type: 'spring',
        damping: 15,
        stiffness: 180,
      }}
    >
      {moodToReactions(mood).map((reaction, idx) => (
        <ReactIcon
          key={idx}
          y={mouseY}
          image={`/reactions/${reaction}.png`}
          count={cachedReactions[idx]}
          onClick={() => mutation.mutate(idx)}
          disabled={mutation.isPending}
          label={reaction}
        />
      ))}
      {mutation.isError && (
        <span
          role="alert"
          className="absolute top-full mt-2 w-32 rounded-lg bg-white p-2 text-xs text-red-700 shadow dark:bg-zinc-900"
        >
          点赞未成功，请稍后重试
        </span>
      )}
    </motion.div>
  )
}

function ReactIcon({
  y,
  image,
  count = 0,
  onClick,
  disabled,
  label,
}: {
  disabled: boolean
  label: string
  y: MotionValue
  image: string
  count?: number
  onClick?: () => void
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  const distance = useTransform(y, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 }

    return val - bounds.y - bounds.height / 2
  })

  const heightSync = useTransform(distance, [-120, 0, 120], [24, 56, 24])
  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  })

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-label={`${label}，${count} 次反应`}
      style={{ height }}
      className="relative aspect-square h-8"
      whileTap={{
        scale: 1.3,
      }}
      onClick={onClick}
    >
      <Image
        src={image}
        alt=""
        className="inline-block"
        priority
        fetchPriority="high"
        fill
        unoptimized
      />
      <span className="absolute -bottom-6 left-0 flex w-full items-center justify-center whitespace-nowrap text-[12px] font-semibold text-zinc-600 dark:text-zinc-300">
        {prettifyNumber(count, true)}
      </span>
    </motion.button>
  )
}

function readCounts(value: unknown): number[] {
  const counts = typeof value === 'string' ? JSON.parse(value) : value
  if (
    !Array.isArray(counts) ||
    counts.length !== 4 ||
    !counts.every((count) => Number.isInteger(count) && count >= 0)
  )
    throw new Error('点赞数据格式错误')
  return counts as number[]
}
