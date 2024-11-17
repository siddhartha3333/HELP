'use client'

import React, { useState } from 'react'
import { CreditCard, DollarSign, Apple, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HelpPayment() {
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Help requested with payment method:', paymentMethod)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Invest in Your Lifeline</CardTitle>
            <CardDescription>Enter the amount you're willing to pay for a helping hand. Remember, good karma has no fixed price!</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="$0.00" type="number" step="0.01" required />
              </div>

              <RadioGroup defaultValue="card" onValueChange={setPaymentMethod}>
                <div className="flex flex-col space-y-2">
                  <Label>Select Payment Method</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'card', label: 'Card', icon: CreditCard },
                      { value: 'paypal', label: 'PayPal', icon: ShoppingCart },
                      { value: 'apple', label: 'Apple Pay', icon: Apple },
                      { value: 'cashapp', label: 'Cash App', icon: DollarSign },
                      { value: 'venmo', label: 'Venmo', icon: DollarSign },
                    ].map(({ value, label, icon: Icon }) => (
                      <div key={value} className="flex flex-col items-center space-y-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value} className="flex flex-col items-center">
                          <Icon className="h-8 w-8 mb-1" />
                          <span>{label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod !== 'apple' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Account</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
              )}

              {(paymentMethod === 'paypal' || paymentMethod === 'venmo') && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              )}

              {(paymentMethod === 'cashapp' || paymentMethod === 'venmo') && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="w-full flex justify-center pb-6">
              <button
                type="submit"
                className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-[0_6px_12px_rgba(0,0,0,0.3)] text-white text-2xl font-bold tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.3)'
                }}
              >
                $HELP
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}