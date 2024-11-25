import { Button } from '../components/ui/button'
import { Card, CardContent, CardFooter } from '../components/ui/card'

const featuredProducts = [
  { id: 1, name: 'Summer Dress', price: 79.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Leather Boots', price: 129.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Denim Jacket', price: 89.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Silk Scarf', price: 39.99, image: '/placeholder.svg?height=300&width=300' },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

