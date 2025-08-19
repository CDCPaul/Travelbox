import Link from 'next/link'

export default function Breadcrumb({ trail }: { trail: Array<{ href?: string; label: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((t, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            {t.href ? (
              <Link href={t.href} className="hover:text-blue-600">{t.label}</Link>
            ) : (
              <span className="text-gray-800">{t.label}</span>
            )}
            {i < trail.length - 1 ? <span className="text-gray-400">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}







