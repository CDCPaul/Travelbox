import ProductCard, { type Product } from './ProductCard'

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'kr-001',
    title: 'Korea Spring Blossom 5D4N',
    subtitle: 'Seoul · Nami Island · Everland',
    tags: ['Group Tour', 'Korea', 'Spring'],
    price: '$899',
    images: [
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'jp-001',
    title: 'Japan Autumn 6D5N',
    subtitle: 'Tokyo · Mt. Fuji · Kyoto',
    tags: ['Free & Easy', 'Japan', 'Autumn'],
    price: '$1,099',
    images: [
      'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'eu-001',
    title: 'Best of Europe 10D9N',
    subtitle: 'Italy · France · Switzerland',
    tags: ['Europe', 'Group Tour'],
    price: '$2,499',
    images: [
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473951710406-1fc1d3a50452?q=80&w=800&auto=format&fit=crop',
    ],
  },
]

export default function ProductSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Tours</h2>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}







