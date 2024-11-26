/* eslint-disable react/prop-types */
import { Check } from 'lucide-react'

export default function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              index + 1 <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'border-gray-300'
            }`}
          >
            {index + 1 < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div
            className={`ml-2 text-sm ${
              index + 1 <= currentStep ? 'text-primary font-medium' : 'text-gray-500'
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-10 h-1 mx-2 ${
                index + 1 < currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

