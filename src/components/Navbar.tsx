import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              Travel Box
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
              <Link href="#destinations" className="hover:text-blue-600">Destinations</Link>
              <Link href="#search" className="hover:text-blue-600">Flights</Link>
              <Link href="#search" className="hover:text-blue-600">Tours</Link>
              <Link href="#search" className="hover:text-blue-600">Cruises</Link>
              <Link href="#search" className="hover:text-blue-600">Visa</Link>
              <Link href="#footer" className="hover:text-blue-600">About Us</Link>
            </nav>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <a href="tel:+63286519000" className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Call</a>
            <Link href="#footer" className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  )
}







