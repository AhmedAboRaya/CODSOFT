'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function Checkout() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Sandqvist',
      type: 'Set 1',
      size: '35 L',
      quantity: 2,
      price: 110.99,
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: 2,
      name: 'Sandqvist',
      type: 'Set 2',
      size: '30 L',
      quantity: 1,
      price: 159.99,
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: 3,
      name: 'Sandqvist',
      type: 'Set 3',
      size: '25 L',
      quantity: 1,
      price: 89.99,
      image: '/placeholder.svg?height=80&width=80',
    },
  ])

  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [cardHolder, setCardHolder] = useState('John Carter')
  const [cardNumber, setCardNumber] = useState('**** **** **** 2153')
  const [expiryMonth, setExpiryMonth] = useState('05')
  const [expiryYear, setExpiryYear] = useState('2020')
  const [cvv, setCvv] = useState('156')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const updateQuantity = (id, increment) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Shopping Cart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.type}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <select
                        defaultValue={item.size}
                        className="w-24 border rounded"
                      >
                        <option value="25 L">25 L</option>
                        <option value="30 L">30 L</option>
                        <option value="35 L">35 L</option>
                      </select>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, false)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, true)}
                          className="w-8 h-8 flex items-center justify-center border rounded-md"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-6 text-blue-600 underline"
              onClick={() => window.history.back()}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Payment Info</h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full border rounded"
                  />
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Payment Method:</span>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit-card"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="credit-card" className="ml-2">💳 Credit Card</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="paypal" className="ml-2">PayPal</label>
                  </div>
                </div>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-holder">Name On Card</label>
                    <input
                      id="card-holder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="mt-1 w-full border rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      id="card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1 w-full border rounded"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Expiration Date</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <select
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                          className="border rounded"
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, '0')
                            return <option key={month} value={month}>{month}</option>
                          })}
                        </select>

                        <select
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                          className="border rounded"
                        >
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = (new Date().getFullYear() + i).toString()
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mt-1 w-full border rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
