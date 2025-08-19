'use client'

import { useState } from 'react'

export default function DetailGallery({
  heroImage,
  images,
  tags,
}: {
  heroImage: string
  images: string[]
  tags: string[]
}) {
  const all = [heroImage, ...images]
  const [index, setIndex] = useState<number>(0)
  const main = all[index]

  return (
    <div className="grid gap-2 md:grid-cols-3">
      <div className="relative md:col-span-2">
        <div
          className="h-72 w-full rounded-xl bg-gray-100"
          style={{ backgroundImage: `url(${main})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white" title="Wishlist">❤</button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white" title="Share">↗</button>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
              {t}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
          {index + 1}/{all.length}
        </div>
      </div>
      <div className="grid grid-rows-3 gap-2">
        {all.slice(1, 4).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i + 1)}
            className={`h-24 w-full rounded-xl bg-gray-100 ring-offset-2 ${index === i + 1 ? 'ring-2 ring-blue-500' : ''}`}
            style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-label={`Thumbnail ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}






