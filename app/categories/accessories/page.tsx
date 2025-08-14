"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const accessoryProducts = [
  {
    id: 19,
    name: "LUXURY WATCH",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviews: 167,
    badge: "PREMIUM",
  },
  {
    id: 20,
    name: "LEATHER WALLET",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    reviews: 234,
    badge: "BESTSELLER",
  },
  {
    id: 21,
    name: "DESIGNER SUNGLASSES",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 22,
    name: "LEATHER BELT",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    reviews: 145,
  },
  {
    id: 23,
    name: "BACKPACK",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviews: 203,
    badge: "NEW",
  },
  {
    id: 24,
    name: "BASEBALL CAP",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.4,
    reviews: 98,
    badge: "TRENDING",
  },
]

export default function AccessoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-8">
        <Link href="/products">
          <Button
            variant="outline"
            className="maxzone-glass-card border-white/20 text-white hover:bg-white/10 bg-transparent mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO SHOP
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Accessories Collection"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center maxzone-slide-up">
          <h1 className="text-6xl md:text-8xl font-black mb-4 maxzone-text-glow">ACCESSORIES</h1>
          <p className="text-xl md:text-2xl font-light tracking-wider text-gray-300">
            COMPLETE YOUR LOOK • PREMIUM DETAILS
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="maxzone-glass-card border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              FILTER
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/20 text-white px-4 py-2 rounded-md maxzone-glass-card"
            >
              <option value="featured">FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="newest">NEWEST</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="maxzone-glass-card"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="maxzone-glass-card"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {accessoryProducts.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block">
              <Card
                className="maxzone-glass-card border-white/10 overflow-hidden group maxzone-float cursor-pointer hover:border-white/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-white text-black font-bold">{product.badge}</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-white text-white" />
                      <span className="ml-1 text-sm font-medium text-white">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-200">({product.reviews})</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 maxzone-text-glow text-white">{product.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-white">${product.price}</span>
                  </div>

                  <div className="text-center text-sm text-gray-300 group-hover:text-white transition-colors">
                    CLICK TO VIEW DETAILS
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
