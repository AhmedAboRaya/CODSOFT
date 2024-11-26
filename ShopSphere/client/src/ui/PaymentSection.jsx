/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { CreditCard, Banknote, ShoppingCartIcon as Paypal } from 'lucide-react'

export default function PaymentSection({ onBack, paymentMethod, setPaymentMethod, onSubmit }) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    cashAmount: '',
    paypalEmail: '',
  })

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically validate the form and process the payment
    console.log('Payment info:', { method: paymentMethod, ...paymentData })
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex space-x-4">
        <div>
          <RadioGroupItem value="card" id="card" className="peer sr-only" />
          <Label
            htmlFor="card"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCard className="mb-3 h-6 w-6" />
            Card
          </Label>
        </div>
        <div>
          <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
          <Label
            htmlFor="cash"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Banknote className="mb-3 h-6 w-6" />
            Cash
          </Label>
        </div>
        <div>
          <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
          <Label
            htmlFor="paypal"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Paypal className="mb-3 h-6 w-6" />
            PayPal
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" name="cardNumber" value={paymentData.cardNumber} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="cardName">Name on Card</Label>
            <Input id="cardName" name="cardName" value={paymentData.cardName} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="expiryMonth">Expiry Date</Label>
              <div className="flex space-x-2">
                <Select name="expiryMonth" onValueChange={(value) => setPaymentData({ ...paymentData, expiryMonth: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select name="expiryYear" onValueChange={(value) => setPaymentData({ ...paymentData, expiryYear: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                name="cvv" 
                value={paymentData.cvv} 
                onChange={handleChange} 
                required 
                maxLength={4}
                pattern="\d{3,4}"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'cash' && (
        <div>
          <Label htmlFor="cashAmount">Cash Amount</Label>
          <Input id="cashAmount" name="cashAmount" type="number" value={paymentData.cashAmount} onChange={handleChange} required />
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div>
          <Label htmlFor="paypalEmail">PayPal Email</Label>
          <Input id="paypalEmail" name="paypalEmail" type="email" value={paymentData.paypalEmail} onChange={handleChange} required />
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit">Place Order</Button>
      </div>
    </form>
  )
}

