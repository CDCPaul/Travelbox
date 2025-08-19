import { getProductById, getAllProducts, type DetailedProduct } from '@/lib/products'
import Link from 'next/link'
import BookingWidget from '@/components/BookingWidget'
import Breadcrumb from '@/components/Breadcrumb'
import DetailGallery from '@/components/DetailGallery'
import FeatureBadges from '@/components/FeatureBadges'
import DatePriceList from '@/components/DatePriceList'
import ItinerarySection from '@/components/ItinerarySection'

function Currency({ value }: { value: number }) {
  return <>{`$${value.toLocaleString()}`}</>
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-gray-200 py-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      {children}
    </section>
  )
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product: DetailedProduct | undefined = getProductById(params.id)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-3 text-gray-600">The tour you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block text-blue-600">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ href: '/', label: 'Home' }, { href: '/tours', label: 'Tours' }, { label: product.title }]} />
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{product.title}</h1>
            {product.subtitle ? <p className="mt-1 text-gray-600">{product.subtitle}</p> : null}
            <div className="mt-2 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">From</div>
            <div className="text-2xl font-bold text-gray-900">
              <Currency value={product.priceOptions[0].pricePerPerson} />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <DetailGallery heroImage={product.heroImage} images={product.images} tags={product.tags} />
      </div>

      {/* Feature badges row */}
      <div className="mb-6">
        <FeatureBadges
          items={[
            { icon: '✈️', label: 'Flight' },
            { icon: '⭐', label: '4-star', note: 'Hotel' },
            { icon: '🚌', label: 'Transpo' },
            { icon: '🗺️', label: 'Tours' },
            { icon: '🍽️', label: 'Meals' },
            { icon: '🧑‍✈️', label: 'Guide' },
            { icon: '💼', label: 'Insurance' },
          ]}
        />
      </div>

      {/* Prices */}
      <Section title="Prices">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
            <div>Type</div>
            <div>Price per person</div>
            <div>Example</div>
          </div>
          {product.priceOptions.map((o) => (
            <div key={o.code} className="grid grid-cols-3 items-center px-4 py-3 text-sm">
              <div className="font-medium text-gray-900">{o.label}</div>
              <div className="text-gray-700"><Currency value={o.pricePerPerson} /></div>
              <div className="text-gray-500">2 pax (Twin), 1 pax (Single), 3 pax (Triple)</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">Price is per person and based on twin sharing. Taxes and other charges may apply.</p>
      </Section>

      {/* Date price list like reference */}
      <Section title="Available Dates">
        <DatePriceList
          dates={[
            { date: 'Dec 19, 2025', price: product.priceOptions[0].pricePerPerson + 0 },
            { date: 'Dec 23, 2025', price: product.priceOptions[0].pricePerPerson - 10 },
          ]}
          currency="USD"
        />
      </Section>

      {/* Why we recommend / Highlights */}
      <Section title="Key Highlights">
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {product.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </Section>

      {/* Route Map */}
      {product.routeMapImage ? (
        <Section title="Tour Route Map">
          <div
            className="h-60 w-full rounded-xl bg-gray-100"
            style={{ backgroundImage: `url(${product.routeMapImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </Section>
      ) : null}

      {/* Itinerary */}
      <Section title="Itinerary">
        <ItinerarySection items={product.itinerary} />
      </Section>

      {/* Accommodation */}
      <Section title="Accommodation">
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {product.accommodations.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </Section>

      {/* Inclusions / Exclusions */}
      <div className="grid gap-8 md:grid-cols-2">
        <Section title="Inclusions">
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {product.inclusions.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Section>
        <Section title="Exclusions">
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {product.exclusions.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Optional Tours */}
      {product.optionalTours.length > 0 ? (
        <Section title="Optional Tours">
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {product.optionalTours.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Country Info */}
      <Section title="Country Information">
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {product.countryInfo.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </Section>

      {/* Booking Conditions */}
      <Section title="Booking Conditions">
        <ul className="list-disc space-y-1 pl-5 text-gray-700">
          {product.bookingConditions.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </Section>

      {/* Sticky CTA */}
      <div className="sticky bottom-3 z-30 mt-6">
        <div className="mx-auto max-w-3xl rounded-full border border-gray-200 bg-white/95 p-2 shadow-md backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <a href="tel:+63286519000" className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Call</a>
            <a href="#" className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Chat</a>
            <a href="#booking" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Book Now</a>
          </div>
        </div>
      </div>

      {/* Booking Widget */}
      <Section title="Booking" >
        <BookingWidget priceOptions={product.priceOptions} />
      </Section>
    </div>
  )
}

// Pre-generate all tour pages for SSG
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }))
}

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 60 * 60 * 24 // 24h


