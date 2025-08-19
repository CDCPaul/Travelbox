type Destination = {
  name: string
  region: string
  imageUrl: string
}

const DESTINATIONS: Destination[] = [
  { name: 'Korea', region: 'Asia', imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Japan', region: 'Asia', imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Thailand', region: 'Asia', imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Europe', region: 'Europe', imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Middle East', region: 'MENA', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'USA / Canada', region: 'America', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop' },
]

export default function Destinations() {
  return (
    <section id="destinations" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Destinations</h2>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <a key={d.name} href="#" className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div
                className="h-44 w-full bg-gray-100 transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${d.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">{d.region}</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">{d.name}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}






