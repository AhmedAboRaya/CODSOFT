import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Stay updated with our latest offers and new arrivals.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

