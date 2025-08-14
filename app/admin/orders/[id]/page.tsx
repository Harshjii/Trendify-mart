"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, Mail, Phone, MapPin } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function OrderDetails() {
  const router = useRouter()
  const params = useParams()
  const [orderStatus, setOrderStatus] = useState("processing")

  const [orderData, setOrderData] = useState({
    id: "1001",
    customer: {
      name: "Alex Johnson",
      email: "alex@email.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    billingAddress: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "URBAN SHADOW HOODIE",
        price: 89.99,
        quantity: 1,
        size: "L",
        color: "Black",
        image: "/black-urban-hoodie-streetwear.png",
      },
      {
        id: 2,
        name: "MIDNIGHT CARGO PANTS",
        price: 129.99,
        quantity: 1,
        size: "L",
        color: "Black",
        image: "/black-cargo-pants-streetwear.png",
      },
    ],
    subtotal: 219.98,
    shipping: 15.0,
    tax: 17.6,
    total: 252.58,
    status: "processing",
    orderDate: "2024-01-15T10:30:00Z",
    trackingNumber: "TM123456789",
    paymentMethod: "Credit Card (**** 4242)",
    notes: "Customer requested expedited shipping",
  })

  useEffect(() => {
    setOrderStatus(orderData.status)
  }, [orderData.status])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    setOrderStatus(newStatus)
    setOrderData((prev) => ({ ...prev, status: newStatus }))
    console.log(`Order ${orderData.id} status updated to: ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
              <div>
                <h1 className="font-black text-xl uppercase tracking-wider">ORDER #{orderData.id}</h1>
                <p className="text-sm text-gray-400">Placed on {new Date(orderData.orderDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(orderStatus)}>
                {getStatusIcon(orderStatus)}
                <span className="ml-2 uppercase">{orderStatus}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${item.price}</p>
                        <p className="text-sm text-gray-400">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Contact Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Mail className="h-4 w-4" />
                        <span>{orderData.customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Phone className="h-4 w-4" />
                        <span>{orderData.customer.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Shipping Address</h4>
                    <div className="flex items-start space-x-2 text-gray-300">
                      <MapPin className="h-4 w-4 mt-1" />
                      <div>
                        <p>{orderData.shippingAddress.street}</p>
                        <p>
                          {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                          {orderData.shippingAddress.zipCode}
                        </p>
                        <p>{orderData.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Status Management */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={orderStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger className="bg-gray-700/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-white/10">
                    <SelectItem value="processing" className="text-white">
                      Processing
                    </SelectItem>
                    <SelectItem value="shipped" className="text-white">
                      Shipped
                    </SelectItem>
                    <SelectItem value="delivered" className="text-white">
                      Delivered
                    </SelectItem>
                    <SelectItem value="cancelled" className="text-white">
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase">
                  Send Status Update Email
                </Button>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>${orderData.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax:</span>
                    <span>${orderData.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between font-bold text-white text-lg">
                    <span>Total:</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <p className="text-sm text-gray-400">
                    <strong>Payment:</strong> {orderData.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Tracking:</strong> {orderData.trackingNumber}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{orderData.notes}</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 font-bold uppercase bg-transparent"
                >
                  Print Invoice
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 font-bold uppercase bg-transparent"
                >
                  Refund Order
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-400/20 text-red-400 hover:bg-red-400/10 font-bold uppercase bg-transparent"
                >
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
