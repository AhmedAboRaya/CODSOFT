import {Link} from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-6">Discover Your Style</h1>
          <p className="text-xl mb-8">Explore our latest collection and find the perfect look for you.</p>
          <Link href="/shop">
            <Button size="lg">Shop Now</Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img src="/placeholder.svg?height=400&width=600" alt="Hero Image" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  )
}

