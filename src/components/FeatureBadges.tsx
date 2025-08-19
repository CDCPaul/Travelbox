export default function FeatureBadges({ items }: { items: Array<{ icon: string; label: string; note?: string }> }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((x, i) => (
        <div key={i} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
          <span className="text-gray-600">{x.icon}</span>
          <span className="font-medium text-gray-900">{x.label}</span>
          {x.note ? <span className="text-xs text-gray-500">{x.note}</span> : null}
        </div>
      ))}
    </div>
  )
}






