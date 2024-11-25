import {Link} from 'react-router-dom'
import { ShoppingBag, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          LOGO
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
            <li><Link href="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/account" className="text-gray-600 hover:text-gray-900">
            <User size={24} />
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-900">
            <ShoppingBag size={24} />
          </Link>
        </div>
      </div>
    </header>
  )
}

