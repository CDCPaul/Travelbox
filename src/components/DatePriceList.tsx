export default function DatePriceList({ dates, currency = 'USD' }: { dates: Array<{ date: string; price: number }>; currency?: string }) {
  const fmt = (n: number) => `${currency} ${n.toLocaleString()}`
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      {dates.map((d, i) => (
        <div key={d.date} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50">
          <div className="flex items-center gap-2 text-gray-800">
            <span className="text-gray-500">📅</span>
            <span>{d.date}</span>
          </div>
          <div className="text-right">
            <div className="text-rose-600 font-semibold">{fmt(d.price)}</div>
            <div className="text-xs text-gray-500">/Person</div>
          </div>
        </div>
      ))}
    </div>
  )
}






