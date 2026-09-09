'use client'

import { SignIn, SignUp, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Container } from '~/components/ui/Container'

export function AccountAccess({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const { loaded } = useClerk()
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    const timeout = window.setTimeout(() => setSlow(true), 10000)
    return () => window.clearTimeout(timeout)
  }, [])
  const signingIn = mode === 'sign-in'
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600">
          CHENYUN / COMMUNITY
        </p>
        <h1 className="mt-4 text-3xl font-bold">
          {signingIn ? '欢迎回来' : '加入我的博客'}
        </h1>
        <p className="mb-8 mt-3 text-sm text-zinc-500">
          登录账号，参与留言与交流。
        </p>
        {!loaded ? (
          <div
            role="status"
            className="w-full rounded-2xl border border-zinc-200 p-8 text-sm dark:border-zinc-700"
          >
            <p>
              {slow
                ? '登录服务暂时未能连接，请稍后重试。'
                : '正在连接登录服务…'}
            </p>
            {slow && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-white"
              >
                重新连接
              </button>
            )}
          </div>
        ) : signingIn ? (
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/"
          />
        ) : (
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/"
          />
        )}
        <p className="mt-8 text-sm text-zinc-500">
          {signingIn ? '还没有账号？' : '已经有账号？'}{' '}
          <Link
            href={signingIn ? '/sign-up' : '/sign-in'}
            className="font-semibold text-emerald-600"
          >
            {signingIn ? '前往注册' : '前往登录'}
          </Link>
        </p>
        <Link href="/" className="mt-4 text-sm text-zinc-500">
          ← 返回首页
        </Link>
      </div>
    </Container>
  )
}
