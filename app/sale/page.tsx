"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, Grid, List, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { HoverScale } from "@/components/animations/hover-scale"

const saleProducts = [
  {
    id: 1,
    name: "URBAN HOODIE",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    image: "/black-urban-hoodie-streetwear.png",
    category: "Streetwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
  },
  {
    id: 2,
    name: "CARGO PANTS",
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    image: "/black-cargo-pants-streetwear.png",
    category: "Streetwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive", "Khaki"],
  },
  {
    id: 3,
    name: "OVERSIZED TEE",
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    image: "/oversized-black-tee-streetwear.png",
    category: "Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
  },
  {
    id: 4,
    name: "BOMBER JACKET",
    price: 139.99,
    originalPrice: 199.99,
    discount: 30,
    image: "/black-bomber-streetwear.png",
    category: "Streetwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Olive"],
  },
  {
    id: 5,
    name: "DISTRESSED JEANS",
    price: 79.99,
    originalPrice: 114.99,
    discount: 30,
    image: "/distressed-black-jeans-streetwear.png",
    category: "Casual",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Blue", "Gray"],
  },
  {
    id: 6,
    name: "CHAIN NECKLACE",
    price: 24.99,
    originalPrice: 35.99,
    discount: 30,
    image: "/placeholder-mbwui.png",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Gold", "Silver"],
  },
]

export default function SalePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredProducts = saleProducts.filter(
    (product) => filterCategory === "all" || product.category.toLowerCase() === filterCategory,
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white"
    >
      <main className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="mb-12">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to TRENDIFY MART
            </Link>

            {/* Sale Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 mb-6 font-black uppercase tracking-wider">
                <Zap className="h-5 w-5" />
                <span>FLASH SALE</span>
              </div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-black text-4xl md:text-6xl mb-4 uppercase tracking-wider text-white"
              >
                30% OFF EVERYTHING
              </motion.h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Limited time offer on all premium streetwear. Don't miss out on these exclusive deals.
              </p>
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-gray-800 border border-white/20 text-white px-4 py-2 rounded"
                >
                  <option value="all">All Categories</option>
                  <option value="streetwear">Streetwear</option>
                  <option value="casual">Casual</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-white/20 text-white px-4 py-2 rounded"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>

                <div className="flex border border-white/20 rounded overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <StaggerContainer>
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <HoverScale key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <Card className="maxzone-glass-card border-white/10 overflow-hidden cursor-pointer group">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold">
                        -{product.discount}%
                      </Badge>
                      <div className="absolute top-4 right-4">
                        <Clock className="h-5 w-5 text-white animate-pulse" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-black text-xl mb-2 uppercase tracking-wide text-white">{product.name}</h3>
                      <p className="text-gray-400 mb-4">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-2xl text-white">${product.price}</span>
                          <span className="text-gray-500 line-through">${product.originalPrice}</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {product.colors.slice(0, 3).map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </HoverScale>
            ))}
          </div>
        </StaggerContainer>

        {/* Sale Banner */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <div className="maxzone-glass-card border-white/10 p-8 rounded-lg">
              <h3 className="font-black text-2xl mb-4 uppercase tracking-wide text-white">HURRY! SALE ENDS SOON</h3>
              <p className="text-gray-300 mb-6">Don't miss out on these incredible deals. Limited time offer.</p>
              <Link href="/products">
                <Button className="bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-wider px-8 py-3">
                  SHOP ALL PRODUCTS
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </motion.div>
  )
}
