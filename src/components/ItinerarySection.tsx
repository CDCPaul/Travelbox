'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ItineraryDay } from '@/lib/products'

export default function ItinerarySection({ items }: { items: ItineraryDay[] }) {
  const [activeDay, setActiveDay] = useState<number>(items[0]?.day ?? 1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({})

  const days = useMemo(() => items.map((d) => d.day), [items])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))
        if (visible[0]) {
          const id = visible[0].target.getAttribute('data-day')
          if (id) setActiveDay(parseInt(id))
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1,
      }
    )

    days.forEach((day) => {
      const el = sectionRefs.current[day]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [days])

  const scrollToDay = (day: number) => {
    const el = sectionRefs.current[day]
    if (!el) return
    const y = window.scrollY + el.getBoundingClientRect().top - 96 // adjust for navbar + sticky tabs
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky tabs inside itinerary section */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-t-xl">
        <div className="flex flex-wrap gap-2">
          {items.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => scrollToDay(d.day)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                activeDay === d.day ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              DAY {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day sections */}
      <div className="divide-y divide-gray-200 overflow-hidden rounded-b-xl border border-gray-200">
        {items.map((d) => (
          <section
            key={d.day}
            id={`day-${d.day}`}
            data-day={d.day}
            ref={(el) => { sectionRefs.current[d.day] = el }}
            className="scroll-mt-24 bg-white px-4 py-5"
          >
            <h3 className="text-sm font-semibold text-gray-900">DAY {d.day} · {d.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{d.description}</p>
          </section>
        ))}
      </div>
    </div>
  )
}


