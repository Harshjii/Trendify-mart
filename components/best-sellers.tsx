"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

const bestSellers = [
  {
    id: 6,
    name: "Classic White Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "/classic-white-tshirt-bestseller.png",
    category: "Casual",
    rating: 4.8,
    reviews: 234,
    isBestseller: true,
  },
  {
    id: 7,
    name: "Cargo Pants",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Streetwear",
    rating: 4.9,
    reviews: 189,
    isBestseller: true,
  },
  {
    id: 8,
    name: "Leather Jacket",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Formal",
    rating: 4.7,
    reviews: 156,
    isBestseller: true,
  },
  {
    id: 9,
    name: "Bucket Hat",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    rating: 4.6,
    reviews: 298,
    isBestseller: true,
  },
  {
    id: 10,
    name: "Cropped Hoodie",
    price: 69.99,
    originalPrice: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Streetwear",
    rating: 4.8,
    reviews: 167,
    isBestseller: true,
  },
  {
    id: 11,
    name: "High-Waist Jeans",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    rating: 4.9,
    reviews: 312,
    isBestseller: true,
  },
]

export function BestSellers() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof bestSellers)[0]) => {
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

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-6xl mb-6 text-white uppercase tracking-wider">BESTSELLERS</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">The pieces everyone's talking about</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product, index) => (
            <Card
              key={product.id}
              className="group cursor-pointer maxzone-card maxzone-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isBestseller && (
                    <Badge className="absolute top-4 left-4 bg-white text-black font-black uppercase tracking-wider">
                      BESTSELLER
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-red-600 text-white font-black uppercase tracking-wider">
                      SALE
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ right: product.originalPrice ? "60px" : "16px" }}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300 uppercase tracking-wide">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-white">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-white group-hover:text-gray-300 transition-colors uppercase">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="font-black text-xl text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    className="w-full bg-white text-black hover:bg-gray-200 rounded-none font-black uppercase tracking-wider group"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    ADD TO CART
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
