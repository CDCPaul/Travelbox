'use client'

import { useMemo, useState } from 'react'
import type { PriceOption } from '@/lib/products'

export default function BookingWidget({ priceOptions }: { priceOptions: PriceOption[] }) {
  const [date, setDate] = useState<string>('')
  const [roomCode, setRoomCode] = useState<string>(priceOptions[0]?.code ?? 'TWIN')
  const [adult, setAdult] = useState<number>(2)
  const [child, setChild] = useState<number>(0)
  const [infant, setInfant] = useState<number>(0)

  const selected = useMemo(() => priceOptions.find((o) => o.code === roomCode) ?? priceOptions[0], [priceOptions, roomCode])
  const total = useMemo(() => {
    const ppl = adult + child // infants assumed free for this mock
    return (selected?.pricePerPerson ?? 0) * Math.max(0, ppl)
  }, [adult, child, selected])

  const Counter = ({ label, value, setValue }: { label: string; value: number; setValue: (n: number) => void }) => (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <button type="button" onClick={() => setValue(Math.max(0, value - 1))} className="h-8 w-8 rounded-full border border-gray-300 text-gray-700">-</button>
        <div className="text-sm">{value}</div>
        <button type="button" onClick={() => setValue(value + 1)} className="h-8 w-8 rounded-full border border-gray-300 text-gray-700">+</button>
      </div>
    </div>
  )

  return (
    <div id="booking" className="grid gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">Travel Date</label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">Room Type</label>
        <select value={roomCode} onChange={(e) => setRoomCode(e.target.value)} className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
          {priceOptions.map((o) => (
            <option key={o.code} value={o.code}>{o.label} - ${o.pricePerPerson}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 grid grid-cols-3 gap-3">
        <Counter label="Adult" value={adult} setValue={setAdult} />
        <Counter label="Child" value={child} setValue={setChild} />
        <Counter label="Infant" value={infant} setValue={setInfant} />
      </div>
      <div className="sm:col-span-2 flex items-center justify-between">
        <div className="text-sm text-gray-600">Estimated total (infants free): <span className="font-semibold text-gray-900">${total.toLocaleString()}</span></div>
        <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Proceed</button>
      </div>
    </div>
  )
}






