/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from 'react-router-dom'


export default function ShippingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically validate the form and send the data to your backend
    console.log('Shipping info:', formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      <div className="flex justify-between">
        <Link to={'/cart'}><Button type="button" variant="outline" >Back</Button></Link>
        <Button type="submit">Proceed to Payment</Button>
      </div>
    </form>
  )
}

