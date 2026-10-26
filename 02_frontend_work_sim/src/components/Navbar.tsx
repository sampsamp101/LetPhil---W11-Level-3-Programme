export const Navbar = () => (
  <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
    <nav
      aria-label="Main navigation"
      className="mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <a href="/" className="text-2xl font-bold text-gray-900">
        SummitGear Market
      </a>

      <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
        <li><a href="/" className="hover:text-blue-600">Shop</a></li>
        <li><a href="/favorites" className="hover:text-blue-600">Favorites</a></li>
        <li><a href="/cart" className="hover:text-blue-600">Cart</a></li>
      </ul>
    </nav>
  </header>
);