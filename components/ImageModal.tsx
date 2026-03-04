'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'

import { XIcon } from '~/assets'

interface ImageModalProps {
  src: string
  alt?: string
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="relative flex items-center justify-center">
            <Image
              src={src}
              alt={alt || ''}
              width={800}
              height={800}
              className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain"
            />
            <Dialog.Close className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-colors">
              <XIcon className="h-6 w-6" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
