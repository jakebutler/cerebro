import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">PM Atlas</Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-600 hover:text-gray-900">
                  Verify
                </Link>
              </li>
              <li>
                <Link to="/suggested-edits" className="text-gray-600 hover:text-gray-900">
                  Suggestions
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-gray-600 hover:text-gray-900">
                  Add Person
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="text-gray-600 hover:text-gray-900">
                  Design System
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="bg-white shadow-inner mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          PM Atlas - A structured database of influential people in product management
        </div>
      </footer>
    </div>
  )
}

export default Layout