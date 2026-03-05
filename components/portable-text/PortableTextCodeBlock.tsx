'use client'

import { type PortableTextComponentProps } from '@portabletext/react'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { ClipboardCheckIcon, ClipboardDataIcon } from '~/assets'
import { ClientOnly } from '~/components/ClientOnly'
import { Commentable } from '~/components/Commentable'
import { ElegantTooltip } from '~/components/ui/Tooltip'

// Sanity code type returns { _type: "code", code: string, language: string, filename?: string }
type SanityCodeBlockValue = {
  _key: string
  code: string
  language?: string
  filename?: string
}

// Sanity codeBlock type returns { _type: "codeBlock", code: { code: string, language: string }, filename?: string }
type SanityCodeBlockValue2 = {
  _key: string
  code: { code: string; language: string } | string
  filename?: string
}

type CodeBlockValue = SanityCodeBlockValue | SanityCodeBlockValue2

export function PortableTextCodeBlock({
  value,
}: PortableTextComponentProps<CodeBlockValue>) {
  // Handle both 'code' and 'codeBlock' type structures
  let codeContent = ''
  let language = 'text'
  let filename = undefined as string | undefined

  // Check if it's the 'code' type (flat structure)
  if ('code' in value && typeof value.code === 'string') {
    codeContent = value.code
    language = (value as SanityCodeBlockValue).language || 'text'
    filename = (value as SanityCodeBlockValue).filename
  }
  // Check if it's the 'codeBlock' type (nested structure)
  else if ('code' in value && typeof value.code === 'object') {
    codeContent = value.code?.code || ''
    language = value.code?.language || 'text'
    filename = (value as SanityCodeBlockValue2).filename
  }

  const [hasCopied, setHasCopied] = React.useState(false)
  const onClickCopy = React.useCallback(() => {
    navigator.clipboard
      .writeText(codeContent)
      .then(() => {
        setHasCopied(true)
        setTimeout(() => {
          setHasCopied(false)
        }, 3000)
      })
      .catch(() => {
        console.error('Failed to copy code block')
      })
  }, [codeContent])

  // Normalize language names
  const normalizedLanguage = language.toLowerCase().replace('bash', 'bash').replace('javascript', 'javascript').replace('typescript', 'typescript') || 'text'

  return (
    <div
      data-blockid={value._key}
      data-filename={filename}
      className="group relative mr-3 rounded-3xl border border-[--tw-prose-pre-border] dark:bg-zinc-800/80 md:mr-0"
    >
      <ClientOnly>
        <Commentable className="z-30 -mr-1.5 md:mr-0" blockId={value._key} />
      </ClientOnly>
      <ClientOnly>
        <>
          <div className="relative flex text-xs leading-6 text-slate-400">
            {Boolean(filename) && (
              <>
                <div className="mt-2 flex flex-none items-center border-b border-t border-b-emerald-700 border-t-transparent px-4 py-1 font-medium text-emerald-700 dark:border-b-emerald-200 dark:text-emerald-200">
                  {filename}
                </div>
                <div className="flex flex-auto overflow-hidden rounded-tr-3xl pt-2">
                  <div className="-mr-px flex-auto rounded-tl border border-zinc-300/40 bg-zinc-200/50 dark:border-zinc-500/30 dark:bg-zinc-700/50" />
                </div>
              </>
            )}
            <div className="absolute right-0 top-2 flex h-8 items-center pr-4">
              <div className="relative -mr-0.5 flex">
                <ElegantTooltip content="复制">
                  <button
                    type="button"
                    className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
                    onClick={onClickCopy}
                  >
                    {hasCopied ? (
                      <ClipboardCheckIcon className="h-5 w-5" />
                    ) : (
                      <ClipboardDataIcon className="h-5 w-5" />
                    )}
                  </button>
                </ElegantTooltip>
              </div>
            </div>
          </div>

          <SyntaxHighlighter
            language={normalizedLanguage}
            showLineNumbers
            useInlineStyles={false}
            codeTagProps={{
              style: {},
              className: `language-${normalizedLanguage}`,
            }}
          >
            {codeContent}
          </SyntaxHighlighter>
        </>
      </ClientOnly>
    </div>
  )
}
