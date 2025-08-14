"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingBag, Filter } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

const products = [
  {
    id: 1,
    name: "URBAN SHADOW HOODIE",
    price: 89.99,
    image: "/black-urban-hoodie-streetwear.png",
    category: "Streetwear",
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 2,
    name: "MIDNIGHT DENIM JACKET",
    price: 129.99,
    image: "/vintage-denim-jacket-fashion.png",
    category: "Casual",
    rating: 4.7,
    reviews: 89,
    isNew: true,
  },
  {
    id: 6,
    name: "ESSENTIAL BLACK TEE",
    price: 29.99,
    originalPrice: 39.99,
    image: "/oversized-black-tee-streetwear.png",
    category: "Casual",
    rating: 4.8,
    reviews: 234,
    isBestseller: true,
  },
  {
    id: 7,
    name: "TACTICAL CARGO PANTS",
    price: 79.99,
    image: "/black-cargo-pants-streetwear.png",
    category: "Streetwear",
    rating: 4.9,
    reviews: 189,
    isBestseller: true,
  },
  {
    id: 8,
    name: "NOIR LEATHER JACKET",
    price: 249.99,
    image: "/black-bomber-streetwear.png",
    category: "Formal",
    rating: 4.7,
    reviews: 156,
    isBestseller: true,
  },
  {
    id: 12,
    name: "DISTRESSED BLACK DENIM",
    price: 89.99,
    image: "/distressed-black-jeans-streetwear.png",
    category: "Streetwear",
    rating: 4.6,
    reviews: 203,
  },
]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filterBy, setFilterBy] = useState("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "ADDED TO CART",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const filteredProducts = products.filter(
    (product) => filterBy === "all" || product.category.toLowerCase() === filterBy,
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-sans font-black text-4xl md:text-6xl mb-6 tracking-wider uppercase">
            SHOP ALL <span className="text-white glow-text">PRODUCTS</span>
          </h1>
          <p className="text-xl text-gray-300 font-light tracking-wide">DISCOVER OUR COMPLETE STREETWEAR COLLECTION</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-64 bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="FILTER BY CATEGORY" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20 backdrop-blur-sm">
              <SelectItem value="all" className="text-white hover:bg-white/10">
                ALL CATEGORIES
              </SelectItem>
              <SelectItem value="streetwear" className="text-white hover:bg-white/10">
                STREETWEAR
              </SelectItem>
              <SelectItem value="casual" className="text-white hover:bg-white/10">
                CASUAL
              </SelectItem>
              <SelectItem value="formal" className="text-white hover:bg-white/10">
                FORMAL
              </SelectItem>
              <SelectItem value="accessories" className="text-white hover:bg-white/10">
                ACCESSORIES
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-64 bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all">
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20 backdrop-blur-sm">
              <SelectItem value="featured" className="text-white hover:bg-white/10">
                FEATURED
              </SelectItem>
              <SelectItem value="price-low" className="text-white hover:bg-white/10">
                PRICE: LOW TO HIGH
              </SelectItem>
              <SelectItem value="price-high" className="text-white hover:bg-white/10">
                PRICE: HIGH TO LOW
              </SelectItem>
              <SelectItem value="rating" className="text-white hover:bg-white/10">
                HIGHEST RATED
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group cursor-pointer bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 glass-card floating-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-4 left-4 bg-white text-black font-bold tracking-wider">NEW</Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="absolute top-4 left-4 bg-white text-black font-bold tracking-wider">
                      BESTSELLER
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold tracking-wider">
                      SALE
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ right: product.originalPrice ? "60px" : "16px" }}
                  >
                    <Heart className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/10 text-white border-white/20 tracking-wider"
                    >
                      {product.category.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-white">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-lg mb-3 group-hover:text-white glow-text transition-all tracking-wide uppercase">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-6">
                    <span className="font-sans font-bold text-xl text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-wider uppercase transition-all duration-300 group/btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    ADD TO CART
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
