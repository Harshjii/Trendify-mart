"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Truck, Shield, ArrowLeft, Lock } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const tax = total * 0.08
  const finalTotal = total + tax

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="font-black text-3xl mb-4 maxzone-text-glow uppercase">NO ITEMS TO CHECKOUT</h1>
            <p className="text-gray-400 mb-8">Add some items to your cart first.</p>
            <Link href="/categories/streetwear">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 font-black uppercase tracking-wider">
                START SHOPPING
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/cart" className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO CART
          </Link>
          <h1 className="font-black text-4xl md:text-6xl mb-4 text-white uppercase tracking-wider">CHECKOUT</h1>
          <p className="text-xl text-gray-200">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="maxzone-glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="font-black text-xl uppercase tracking-wide text-white">
                    CONTACT INFORMATION
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white uppercase tracking-wide font-semibold">
                      EMAIL ADDRESS
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="maxzone-glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="font-black text-xl uppercase tracking-wide text-white">
                    SHIPPING ADDRESS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white uppercase tracking-wide font-semibold">
                        FIRST NAME
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white uppercase tracking-wide font-semibold">
                        LAST NAME
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white uppercase tracking-wide font-semibold">
                      ADDRESS
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white uppercase tracking-wide font-semibold">
                        CITY
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-white uppercase tracking-wide font-semibold">
                        STATE
                      </Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="bg-transparent border-white/20 text-white">
                          <SelectValue placeholder="Select state" className="text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-white/20">
                          <SelectItem value="CA" className="text-white hover:bg-gray-700">
                            California
                          </SelectItem>
                          <SelectItem value="NY" className="text-white hover:bg-gray-700">
                            New York
                          </SelectItem>
                          <SelectItem value="TX" className="text-white hover:bg-gray-700">
                            Texas
                          </SelectItem>
                          <SelectItem value="FL" className="text-white hover:bg-gray-700">
                            Florida
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zipCode" className="text-white uppercase tracking-wide font-semibold">
                      ZIP CODE
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="maxzone-glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="font-black text-xl uppercase tracking-wide text-white">
                    PAYMENT METHOD
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
                      <TabsTrigger
                        value="card"
                        className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-white"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        CARD
                      </TabsTrigger>
                      <TabsTrigger
                        value="paypal"
                        className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-white"
                      >
                        PAYPAL
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="cardNumber" className="text-white uppercase tracking-wide font-semibold">
                          CARD NUMBER
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-white uppercase tracking-wide font-semibold">
                            EXPIRY DATE
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-white uppercase tracking-wide font-semibold">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nameOnCard" className="text-white uppercase tracking-wide font-semibold">
                          NAME ON CARD
                        </Label>
                        <Input
                          id="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                          className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                          required
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-200 mb-4">You will be redirected to PayPal to complete your payment.</p>
                        <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              {/* Order Items */}
              <Card className="maxzone-glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="font-black text-xl uppercase tracking-wide text-white">ORDER SUMMARY</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold uppercase text-white">{item.name}</h4>
                        <div className="text-sm text-gray-300">
                          {item.size && <span>SIZE: {item.size}</span>}
                          {item.color && <span className="ml-2">COLOR: {item.color}</span>}
                        </div>
                        <p className="text-sm text-gray-300">QTY: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card className="maxzone-glass-card border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-300">SUBTOTAL</span>
                      <span className="font-bold text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-300">SHIPPING</span>
                      <span className="font-bold text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-300">TAX</span>
                      <span className="font-bold text-white">${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="flex justify-between font-black text-2xl">
                      <span className="text-white">TOTAL</span>
                      <span className="text-white">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-8 bg-white text-black hover:bg-gray-200 py-4 font-black text-lg uppercase tracking-wider"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        COMPLETE ORDER
                      </>
                    )}
                  </Button>

                  {/* Security Features */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        SSL SECURE
                      </div>
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        FREE SHIPPING
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
