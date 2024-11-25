import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-gray-600">We are a fashion-forward e-commerce store dedicated to bringing you the latest trends.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-gray-900">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Information</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop All</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-gray-900">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a to="#" className="text-gray-600 hover:text-gray-900">Facebook</a></li>
              <li><a to="#" className="text-gray-600 hover:text-gray-900">Instagram</a></li>
              <li><a to="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2024 Your E-commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

