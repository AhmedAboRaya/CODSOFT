import ProductGrid from '../../ui/ProductGrid'
import Footer from '../../ui/Footer'

export default function Shop() {
    
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}

