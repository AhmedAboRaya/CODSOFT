import Header from '../../ui/Header'
import Hero from '../../ui/Hero'
import FeaturedProducts from '../../ui/FeaturedProducts'
import Categories from '../../ui/Categories'
import Testimonials from '../../ui/Testimonials'
import Newsletter from '../../ui/Newsletter'
import Footer from '../../ui/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

