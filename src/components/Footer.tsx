export default function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact Us</h3>
            <p className="mt-3 text-sm text-gray-600">(02) 8651-9000</p>
            <p className="mt-1 text-sm text-gray-600">Mon-Fri 9:00-18:00, Sat 9:00-13:00</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Address</h3>
            <p className="mt-3 text-sm text-gray-600">3/F RICO BUILDING, 112 AGUIRRE ST. LEGASPI VILLAGE, MAKATI CITY, PH</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Follow</h3>
            <div className="mt-3 flex space-x-3 text-sm text-gray-600">
              <a className="hover:text-blue-600" href="#">Facebook</a>
              <a className="hover:text-blue-600" href="#">Instagram</a>
              <a className="hover:text-blue-600" href="#">YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Travel Box. All rights reserved.
          <a href="/admin" className="ml-4 inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50">Admin Page</a>
        </div>
      </div>
    </footer>
  )
}


