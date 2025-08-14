"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, Heart, Settings, ArrowLeft, Edit, Eye } from "lucide-react"
import Image from "next/image"

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Street Style Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    country: "United States",
  },
}

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 159.98,
    items: [
      { name: "Urban Hoodie", image: "/black-urban-hoodie-streetwear.png", price: 89.99, quantity: 1 },
      { name: "Cargo Pants", image: "/black-cargo-pants-streetwear.png", price: 79.99, quantity: 1 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 89.99,
    items: [{ name: "Oversized Tee", image: "/oversized-black-tee-streetwear.png", price: 89.99, quantity: 1 }],
  },
]

const mockWishlist = [
  { id: 1, name: "Bomber Jacket", price: 149.99, image: "/black-bomber-streetwear.png" },
  { id: 2, name: "Distressed Jeans", price: 99.99, image: "/distressed-black-jeans-streetwear.png" },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockUser)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "Shipped":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30"
      case "Delivered":
        return "bg-green-400/20 text-green-400 border-green-400/30"
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30"
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleLogout = () => {
    // Clear user session/tokens
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
    sessionStorage.clear()

    // Show confirmation
    alert("You have been logged out successfully!")

    window.location.href = "/auth/login"
  }

  const handleDeleteAccount = () => {
    const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.")
    if (confirmed) {
      // Here you would typically call your API to delete the account
      alert("Account deletion requested. You will receive a confirmation email.")
      handleLogout()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO TRENDIFY MART
          </Link>
          <h1 className="font-black text-4xl md:text-6xl mb-4 maxzone-text-glow uppercase tracking-wider text-white">
            MY ACCOUNT
          </h1>
          <p className="text-xl text-gray-300">Manage your profile and orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-gray-300"
            >
              <User className="w-4 h-4 mr-2" />
              PROFILE
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-gray-300"
            >
              <Package className="w-4 h-4 mr-2" />
              ORDERS
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-gray-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              WISHLIST
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase text-gray-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              SETTINGS
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <Card className="maxzone-glass-card border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-black text-2xl uppercase tracking-wide text-white">
                  PROFILE INFORMATION
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "SAVE" : "EDIT"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-200 uppercase tracking-wide font-bold">FULL NAME</Label>
                    {isEditing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-transparent border-white/20 text-white mt-2"
                      />
                    ) : (
                      <p className="text-lg font-medium mt-2 text-white">{formData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-200 uppercase tracking-wide font-bold">EMAIL</Label>
                    {isEditing ? (
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-white/20 text-white mt-2"
                      />
                    ) : (
                      <p className="text-lg font-medium mt-2 text-white">{formData.email}</p>
                    )}
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div>
                  <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-white">SHIPPING ADDRESS</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-200 uppercase tracking-wide font-bold">STREET ADDRESS</Label>
                      {isEditing ? (
                        <Input
                          value={formData.address.street}
                          onChange={(e) =>
                            setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                          }
                          className="bg-transparent border-white/20 text-white mt-2"
                        />
                      ) : (
                        <p className="text-lg font-medium mt-2 text-white">{formData.address.street}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-200 uppercase tracking-wide font-bold">CITY</Label>
                      {isEditing ? (
                        <Input
                          value={formData.address.city}
                          onChange={(e) =>
                            setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                          }
                          className="bg-transparent border-white/20 text-white mt-2"
                        />
                      ) : (
                        <p className="text-lg font-medium mt-2 text-white">{formData.address.city}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-200 uppercase tracking-wide font-bold">STATE</Label>
                      {isEditing ? (
                        <Input
                          value={formData.address.state}
                          onChange={(e) =>
                            setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                          }
                          className="bg-transparent border-white/20 text-white mt-2"
                        />
                      ) : (
                        <p className="text-lg font-medium mt-2 text-white">{formData.address.state}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-200 uppercase tracking-wide font-bold">ZIP CODE</Label>
                      {isEditing ? (
                        <Input
                          value={formData.address.zipCode}
                          onChange={(e) =>
                            setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })
                          }
                          className="bg-transparent border-white/20 text-white mt-2"
                        />
                      ) : (
                        <p className="text-lg font-medium mt-2 text-white">{formData.address.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="maxzone-glass-card border-white/10">
              <CardHeader>
                <CardTitle className="font-black text-2xl uppercase tracking-wide text-white">ORDER HISTORY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-white/10 rounded-lg p-6 maxzone-glass-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-wide text-white">ORDER {order.id}</h3>
                        <p className="text-gray-300">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.status)} font-bold uppercase`}>{order.status}</Badge>
                        <p className="font-black text-xl mt-1 text-white">${order.total}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold uppercase text-white">{item.name}</h4>
                            <p className="text-gray-300">QTY: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-white">${item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.open(`/orders/${order.id}`, "_blank")}
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        VIEW DETAILS
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Add all items from this order to cart
                          order.items.forEach((item) => {
                            console.log(`Adding ${item.name} to cart`)
                            // Here you would integrate with your cart system
                          })
                          alert("Items added to cart!")
                        }}
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                      >
                        REORDER
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card className="maxzone-glass-card border-white/10">
              <CardHeader>
                <CardTitle className="font-black text-2xl uppercase tracking-wide text-white">MY WISHLIST</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item) => (
                    <Card key={item.id} className="maxzone-glass-card border-white/10 overflow-hidden group">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 uppercase text-white">{item.name}</h3>
                        <p className="text-xl font-black mb-4 text-white">${item.price}</p>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-white text-black hover:bg-gray-200 font-bold uppercase">
                            ADD TO CART
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Heart className="w-4 h-4 fill-white" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="maxzone-glass-card border-white/10">
              <CardHeader>
                <CardTitle className="font-black text-2xl uppercase tracking-wide text-white">
                  ACCOUNT SETTINGS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                  >
                    CHANGE PASSWORD
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                  >
                    NOTIFICATION PREFERENCES
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                  >
                    PRIVACY SETTINGS
                  </Button>
                  <Separator className="bg-white/20" />
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                  >
                    LOG OUT
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDeleteAccount}
                    className="w-full justify-start border-red-400/20 text-red-400 hover:bg-red-400/10 bg-transparent font-bold uppercase"
                  >
                    DELETE ACCOUNT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
