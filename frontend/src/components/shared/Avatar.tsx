import clsx from 'clsx'
import { ImgHTMLAttributes, memo } from 'react'

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & { alt: string }

export const Avatar = memo(({ src, alt, className }: AvatarProps) => {
  return src ? (
    <img src={src} alt={alt} className={clsx('rounded-full', className)} />
  ) : (
    <div
      className={clsx(
        'grid place-items-center bg-gray-200 rounded-full',
        className
      )}
    />
  )
})

Avatar.displayName = 'Avatar'
