import Footer from '../../ui/Footer'
import img from '../../assets/home.png'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Welcome to our fashion e-commerce store! We are passionate about bringing you the latest trends and styles from around the world.
            </p>
            <p className="mb-4">
              Our mission is to provide high-quality, affordable fashion that helps you express your unique style. We believe that everyone deserves to look and feel their best, and we&apos;re here to make that happen.
            </p>
            <p>
              With a carefully curated selection of clothing, accessories, and footwear, we offer something for every taste and occasion. Our team of fashion experts is always on the lookout for the next big thing, ensuring that you stay ahead of the curve.
            </p>
          </div>
          <div>
            <img src={img} alt="About Us" className="rounded-lg " />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

