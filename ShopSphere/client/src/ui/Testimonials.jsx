import { Card, CardContent } from '../components/ui//card'

const testimonials = [
  { id: 1, name: 'Sarah J.', text: 'I love the quality of the clothes. Will definitely shop here again!' },
  { id: 2, name: 'Mike R.', text: 'Great customer service and fast shipping. Highly recommended!' },
  { id: 3, name: 'Emily L.', text: 'The variety of styles is amazing. I always find what I\'m looking for.' },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

