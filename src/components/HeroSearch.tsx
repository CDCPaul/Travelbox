export default function HeroSearch() {
  return (
    <section id="search" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Discover Your Next Journey
            </h1>
            <p className="mt-4 text-gray-600">
              Korea, Japan, Europe, Middle East, and more. Book flights, tours, and cruises with confidence.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <form action="#" method="get" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Departure From</label>
                <select name="from" className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Manila</option>
                  <option>Clark</option>
                  <option>Cebu</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Destination</label>
                <input name="to" placeholder="Where to?" className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Departure Date</label>
                <input type="date" name="date" className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Duration</label>
                <select name="duration" className="w-full rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>3-4 Days</option>
                  <option>5-7 Days</option>
                  <option>8-10 Days</option>
                  <option>11+ Days</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                  Search
                </button>
              </div>
            </form>
            <p className="mt-3 text-center text-xs text-gray-500">No login required. Browse freely.</p>
          </div>
        </div>
      </div>
    </section>
  )
}







