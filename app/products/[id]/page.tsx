"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingBag, Minus, Plus, ArrowLeft, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { HoverScale } from "@/components/animations/hover-scale"
import { StaggerContainer } from "@/components/animations/stagger-container"

// Mock product data - in real app this would come from API
const allProducts = [
  {
    id: 1,
    name: "URBAN HOODIE",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "/black-urban-hoodie-streetwear.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Streetwear",
    rating: 4.8,
    reviews: 124,
    badge: "BESTSELLER",
    description:
      "Premium urban hoodie crafted from heavyweight cotton blend. Features oversized fit, kangaroo pocket, and signature MaxZone branding.",
    features: ["100% Cotton Blend", "Oversized Fit", "Kangaroo Pocket", "Ribbed Cuffs", "Machine Washable"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    stockCount: 45,
  },
  {
    id: 2,
    name: "CARGO PANTS",
    price: 79.99,
    images: ["/black-cargo-pants-streetwear.png", "/placeholder.svg?height=600&width=600"],
    category: "Streetwear",
    rating: 4.6,
    reviews: 89,
    badge: "NEW",
    description:
      "Military-inspired cargo pants with multiple pockets and adjustable straps. Perfect for street style and utility.",
    features: ["Multiple Cargo Pockets", "Adjustable Straps", "Tapered Fit", "Durable Fabric", "Side Zippers"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Olive", "Khaki"],
    inStock: true,
    stockCount: 23,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = allProducts.find((p) => p.id === productId) || allProducts[0]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showCartNotification, setShowCartNotification] = useState(false)

  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    })

    setShowCartNotification(true)
    setTimeout(() => setShowCartNotification(false), 3000)
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.category === product.category)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white"
    >
      <AnimatePresence>
        {showCartNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 right-4 z-50 maxzone-glass-card border border-white/20 p-4"
          >
            <motion.div
              className="flex items-center gap-3"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-12 h-12 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </motion.div>
              <div>
                <motion.p
                  className="font-bold text-sm uppercase tracking-wide"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  ADDED TO CART!
                </motion.p>
                <motion.p
                  className="text-xs text-gray-300"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.name} - {selectedSize} - {selectedColor}
                </motion.p>
              </div>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ delay: 0.5, duration: 0.5 }}>
                <ShoppingBag className="w-5 h-5 text-green-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HoverScale scale={1.02}>
          <Link
            href="/categories/streetwear"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </motion.div>
            BACK TO {product.category.toUpperCase()}
          </Link>
        </HoverScale>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <motion.div
                className="relative aspect-square overflow-hidden maxzone-glass-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                {product.badge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <Badge className="absolute top-6 left-6 bg-white text-black font-bold text-sm px-3 py-1">
                      {product.badge}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>

              <StaggerContainer className="flex gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 overflow-hidden maxzone-glass-card border-2 transition-colors ${
                      selectedImage === index ? "border-white" : "border-transparent"
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Product Details */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Badge className="bg-gray-800 text-gray-300 uppercase tracking-wide">{product.category}</Badge>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-4 h-4 fill-white text-white" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews} reviews)</span>
                  </motion.div>
                </div>

                <motion.h1
                  className="text-4xl md:text-5xl font-black mb-4 maxzone-text-glow uppercase tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {product.name}
                </motion.h1>

                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.span
                    className="text-3xl font-black"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ${product.price}
                  </motion.span>
                  {product.originalPrice && (
                    <motion.span
                      className="text-xl text-gray-500 line-through"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      ${product.originalPrice}
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {product.description}
              </motion.p>

              {/* Cart Section with Animations */}
              <motion.div
                className="maxzone-glass-card border border-white/20 p-6 space-y-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                {/* Color Selection */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                  <h4 className="font-bold text-sm mb-3 uppercase tracking-wide text-gray-300">COLOR</h4>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 text-sm border-2 transition-colors uppercase tracking-wide font-medium ${
                          selectedColor === color
                            ? "border-white bg-white text-black"
                            : "border-gray-600 text-gray-300 hover:border-gray-400"
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Size Selection */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
                  <h4 className="font-bold text-sm mb-3 uppercase tracking-wide text-gray-300">SIZE</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size, index) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-sm border-2 transition-colors font-bold uppercase ${
                          selectedSize === size
                            ? "border-white bg-white text-black"
                            : "border-gray-600 text-gray-300 hover:border-gray-400"
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 + index * 0.05 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Quantity Selection */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                  <h4 className="font-bold text-sm mb-3 uppercase tracking-wide text-gray-300">QUANTITY</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-600 maxzone-glass-card">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="text-white hover:bg-white/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <motion.span
                        className="px-4 py-2 font-bold"
                        key={quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {quantity}
                      </motion.span>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                          className="text-white hover:bg-white/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <span className="text-sm text-gray-400">{product.stockCount} in stock</span>
                  </div>
                </motion.div>

                {/* Add to Cart Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-white text-black hover:bg-gray-200 font-black text-lg py-6 uppercase tracking-wider"
                    disabled={!product.inStock}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ShoppingBag className="w-5 h-5 mr-3" />
                      {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase tracking-wide"
                    >
                      <motion.div animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                        <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-white" : ""}`} />
                      </motion.div>
                      WISHLIST
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Features Section */}
              <ScrollReveal delay={0.8}>
                <div className="border-t border-gray-800 pt-6">
                  <StaggerContainer className="grid grid-cols-3 gap-6 text-center">
                    {[
                      { icon: Truck, title: "FREE SHIPPING", subtitle: "On orders over $100" },
                      { icon: RotateCcw, title: "FREE RETURNS", subtitle: "30-day return policy" },
                      { icon: Shield, title: "AUTHENTIC", subtitle: "100% genuine products" },
                    ].map(({ icon: Icon, title, subtitle }, index) => (
                      <motion.div
                        key={title}
                        className="space-y-2"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        >
                          <Icon className="w-6 h-6 mx-auto text-gray-400" />
                        </motion.div>
                        <p className="text-sm font-medium uppercase tracking-wide">{title}</p>
                        <p className="text-xs text-gray-500">{subtitle}</p>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        {/* Tabs Section */}
        <ScrollReveal delay={0.5}>
          <motion.div
            className="mt-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase"
                >
                  DETAILS
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase"
                >
                  REVIEWS
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:bg-white data-[state=active]:text-black font-bold uppercase"
                >
                  SHIPPING
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="maxzone-glass-card border-white/10">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4 uppercase tracking-wide text-white">PRODUCT FEATURES</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-200">
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="maxzone-glass-card border-white/10">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4 uppercase tracking-wide text-white">CUSTOMER REVIEWS</h3>
                    <div className="space-y-4">
                      <div className="border-b border-gray-800 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-white text-white" />
                            ))}
                          </div>
                          <span className="font-bold text-white">ALEX M.</span>
                        </div>
                        <p className="text-gray-200">
                          "Perfect fit and amazing quality. The material feels premium and the design is exactly what I
                          was looking for."
                        </p>
                      </div>
                      <div className="border-b border-gray-800 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-white text-white" />
                            ))}
                            <Star className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="font-bold text-white">SARAH K.</span>
                        </div>
                        <p className="text-gray-200">
                          "Great hoodie, runs a bit large so size down if you want a more fitted look."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Card className="maxzone-glass-card border-white/10">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4 uppercase tracking-wide text-white">SHIPPING INFO</h3>
                    <div className="space-y-4 text-gray-200">
                      <p>
                        <strong className="text-white">Standard Shipping:</strong> 5-7 business days - FREE on orders
                        over $100
                      </p>
                      <p>
                        <strong className="text-white">Express Shipping:</strong> 2-3 business days - $15
                      </p>
                      <p>
                        <strong className="text-white">Overnight Shipping:</strong> 1 business day - $25
                      </p>
                      <p>
                        <strong className="text-white">International Shipping:</strong> 7-14 business days - Rates vary
                        by location
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </ScrollReveal>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <motion.h2
                className="font-black text-3xl md:text-4xl mb-8 text-center maxzone-text-glow uppercase tracking-wider"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                YOU MIGHT ALSO LIKE
              </motion.h2>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link href={`/products/${relatedProduct.id}`}>
                      <Card className="maxzone-glass-card border-white/10 overflow-hidden group">
                        <div className="relative overflow-hidden">
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                            <Image
                              src={relatedProduct.images[0] || "/placeholder.svg"}
                              alt={relatedProduct.name}
                              width={300}
                              height={400}
                              className="w-full h-80 object-cover"
                            />
                          </motion.div>
                          {relatedProduct.badge && (
                            <motion.div
                              initial={{ scale: 0, rotate: -10 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 300 }}
                            >
                              <Badge className="absolute top-4 left-4 bg-white text-black font-bold">
                                {relatedProduct.badge}
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2 maxzone-text-glow uppercase text-white">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">${relatedProduct.price}</span>
                            {relatedProduct.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${relatedProduct.originalPrice}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        )}
      </div>
    </motion.div>
  )
}
