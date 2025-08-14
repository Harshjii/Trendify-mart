"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const newArrivals = [
  {
    id: 1,
    name: "Neon Dreams Hoodie",
    price: 89.99,
    image: "/neon-hoodie-streetwear.png",
    category: "Streetwear",
    isNew: true,
  },
  {
    id: 2,
    name: "Vintage Denim Jacket",
    price: 129.99,
    image: "/vintage-denim-jacket-fashion.png",
    category: "Casual",
    isNew: true,
  },
  {
    id: 3,
    name: "Minimalist Tee",
    price: 39.99,
    image: "/minimalist-t-shirt.png",
    category: "Casual",
    isNew: true,
  },
  {
    id: 4,
    name: "Statement Sneakers",
    price: 159.99,
    image: "/trendy-statement-sneakers.png",
    category: "Accessories",
    isNew: true,
  },
  {
    id: 5,
    name: "Oversized Blazer",
    price: 199.99,
    image: "/oversized-blazer-formal.png",
    category: "Formal",
    isNew: true,
  },
]

export function NewArrivals() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, newArrivals.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, newArrivals.length - 2)) % Math.max(1, newArrivals.length - 2))
  }

  const handleAddToCart = (product: (typeof newArrivals)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleCardClick = (productId: number) => {
    router.push(`/products/${productId}`)
  }

  const handleAddToCartClick = (e: React.MouseEvent, product: (typeof newArrivals)[0]) => {
    e.stopPropagation() // Prevent card click event
    handleAddToCart(product)
  }

  return (
    <section className="py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="font-black text-4xl md:text-6xl mb-6 text-white uppercase tracking-wider">NEW DROPS</h2>
            <p className="text-xl text-gray-400 font-medium">Fresh pieces that define the culture</p>
          </div>

          <div className="hidden md:flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {newArrivals.map((product, index) => (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                <Card
                  className="group cursor-pointer maxzone-card maxzone-slide-up overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleCardClick(product.id)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-4 left-4 bg-white text-black font-black uppercase tracking-wider">
                          NEW
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-800 text-gray-300 uppercase tracking-wide"
                        >
                          {product.category}
                        </Badge>
                        <span className="font-black text-xl text-white">${product.price}</span>
                      </div>

                      <h3 className="font-bold text-lg mb-4 text-white group-hover:text-gray-300 transition-colors uppercase">
                        {product.name}
                      </h3>

                      <Button
                        className="w-full bg-white text-black hover:bg-gray-200 rounded-none font-black uppercase tracking-wider group"
                        onClick={(e) => handleAddToCartClick(e, product)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        ADD TO CART
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center space-x-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
