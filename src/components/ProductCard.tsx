'use client'

import { useState } from 'react'
import Link from 'next/link'

export type Product = {
  id: string
  title: string
  subtitle?: string
  tags: string[]
  price: string
  images: string[] // [0] large image, [1..3] thumbnails
}

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false)

  const mainImage = product.images[0]
  const thumbs = product.images.slice(1, 4)

  return (
    <article className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <div
          className="h-56 w-full bg-gray-100 transition-transform group-hover:scale-[1.02]"
          style={{ backgroundImage: `url(${mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <button
          type="button"
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked((v) => !v) }}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
        >
          {liked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-rose-500">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 3 13.164 3 10.5 3 8.015 5.015 6 7.5 6a4.5 4.5 0 014.5 4.5A4.5 4.5 0 0116.5 6 4.5 4.5 0 0121 10.5c0 2.664-1.688 4.86-3.989 6.007a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.666 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5c0 2.485-1.5 4.5-3.75 6.06-2.055 1.43-4.702 2.64-5.616 3.05a.75.75 0 01-.268.05.75.75 0 01-.268-.05c-.914-.41-3.561-1.62-5.616-3.05C4.5 15 3 12.985 3 10.5A4.5 4.5 0 017.5 6 4.5 4.5 0 0112 10.5 4.5 4.5 0 0116.5 6 4.5 4.5 0 0121 10.5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1 p-3 pt-2">
        {thumbs.map((src, idx) => (
          <div
            key={idx}
            className="h-14 w-full rounded-md bg-gray-100"
            style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="mt-2 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {t}
            </span>
          ))}
        </div>

        <h3 className="mt-3 line-clamp-1 text-base font-semibold text-gray-900">{product.title}</h3>
        {product.subtitle ? (
          <p className="mt-1 line-clamp-1 text-sm text-gray-600">{product.subtitle}</p>
        ) : null}

        <div className="mt-3 flex items-end justify-between">
          <div className="text-sm text-gray-500">From</div>
          <div className="text-lg font-bold text-gray-900">{product.price}</div>
        </div>
      </div>
      {/* Make entire card clickable */}
      <Link
        href={`/tours/${product.id}`}
        aria-label={`${product.title} details`}
        className="absolute inset-0 z-10"
      />
    </article>
  )
}


