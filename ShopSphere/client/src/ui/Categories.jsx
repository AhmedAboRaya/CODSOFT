import {Link} from 'react-router-dom'

const categories = [
  { name: 'Women', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Men', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Accessories', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Shoes', image: '/placeholder.svg?height=300&width=300' },
]

export default function Categories() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={`/shop/${category.name.toLowerCase()}`} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img src={category.image} alt={category.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

