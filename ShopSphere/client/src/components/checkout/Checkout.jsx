'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import ShippingForm from '../../ui/ShippingForm.jsx'
import PaymentSection from '../../ui/PaymentSection.jsx'
import ProgressIndicator from '../../ui/ProgressIndicator.jsx'
import DoneSection from '../../ui/DoneSection.jsx'


export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const steps = ['Your Info', 'Payment', 'Done']

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete your order</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressIndicator steps={steps} currentStep={step} />
          {step === 1 && <ShippingForm onSubmit={nextStep} onBack={prevStep} />}
          {step === 2 && (
            <PaymentSection 
              onBack={prevStep} 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={nextStep}
            />
          )}
          {step === 3 && <DoneSection />}
        </CardContent>
      </Card>
    </div>
  )
}