import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import Footer from '../../ui/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input id="name" type="text" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <Textarea id="message" placeholder="Your message here..." className="h-32" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">We&apos;re here to help and answer any question you might have. We look forward to hearing from you!</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> support@example.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Fashion Street, Style City, ST 12345</p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4 justify-center">
                <a to="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
                <a to="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
                <a to="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

