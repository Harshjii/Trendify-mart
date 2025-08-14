"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 maxzone-slide-up">
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
            <h1 className="font-black text-4xl md:text-6xl mb-4 maxzone-text-glow uppercase tracking-wider">
              ORDER CONFIRMED
            </h1>
            <p className="text-xl text-gray-400 mb-2">Thank you for your purchase!</p>
            <p className="text-lg text-gray-500">Order #{orderNumber}</p>
          </div>

          {/* Order Details */}
          <Card className="maxzone-glass-card border-white/10 mb-8 maxzone-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-8">
              <h2 className="font-black text-2xl mb-6 uppercase tracking-wide">WHAT HAPPENS NEXT?</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2 uppercase">CONFIRMATION EMAIL</h3>
                  <p className="text-sm text-gray-400">You'll receive an order confirmation email shortly</p>
                </div>

                <div className="text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2 uppercase">PROCESSING</h3>
                  <p className="text-sm text-gray-400">We'll prepare your order within 1-2 business days</p>
                </div>

                <div className="text-center">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2 uppercase">SHIPPING</h3>
                  <p className="text-sm text-gray-400">Free shipping, delivered in 5-7 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 maxzone-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/categories/streetwear">
              <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 px-8 py-4 font-black text-lg uppercase tracking-wider mb-4">
                CONTINUE SHOPPING
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-gray-400 mb-2">Need help with your order?</p>
              <Link href="/contact" className="text-white hover:text-gray-300 underline font-medium">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
