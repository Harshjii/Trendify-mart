"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { HoverScale } from "@/components/animations/hover-scale"

const streetwearProducts = [
  {
    id: 1,
    name: "URBAN HOODIE",
    price: 89.99,
    originalPrice: 119.99,
    image: "/black-urban-hoodie-streetwear.png",
    rating: 4.8,
    reviews: 124,
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "CARGO PANTS",
    price: 79.99,
    image: "/black-cargo-pants-streetwear.png",
    rating: 4.6,
    reviews: 89,
    badge: "NEW",
  },
  {
    id: 3,
    name: "OVERSIZED TEE",
    price: 39.99,
    image: "/oversized-black-tee-streetwear.png",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "BOMBER JACKET",
    price: 149.99,
    image: "/black-bomber-streetwear.png",
    rating: 4.9,
    reviews: 203,
    badge: "LIMITED",
  },
  {
    id: 5,
    name: "DISTRESSED JEANS",
    price: 99.99,
    image: "/distressed-black-jeans-streetwear.png",
    rating: 4.5,
    reviews: 78,
  },
  {
    id: 6,
    name: "CHAIN NECKLACE",
    price: 29.99,
    image: "/placeholder-vel4o.png",
    rating: 4.4,
    reviews: 92,
    badge: "TRENDING",
  },
]

export default function StreetwearPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white"
    >
      <motion.div
        className="container mx-auto px-4 pt-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HoverScale scale={1.05}>
          <Link href="/products">
            <Button
              variant="outline"
              className="maxzone-glass-card border-white/20 text-white hover:bg-white/10 bg-transparent mb-4"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO SHOP
              </motion.div>
            </Button>
          </Link>
        </HoverScale>
      </motion.div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image src="/placeholder-1q3bu.png" alt="Streetwear Collection" fill className="object-cover" />
        </motion.div>
        <motion.div className="relative z-20 text-center" style={{ opacity }}>
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-4 maxzone-text-glow"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            STREETWEAR
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light tracking-wider text-gray-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            URBAN CULTURE • AUTHENTIC STYLE
          </motion.p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Controls with Animation */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <motion.div
              className="flex items-center gap-4"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HoverScale scale={1.05}>
                <Button
                  variant="outline"
                  className="maxzone-glass-card border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  FILTER
                </Button>
              </HoverScale>
              <motion.select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-white/20 text-white px-4 py-2 rounded-md maxzone-glass-card"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="featured">FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="newest">NEWEST</option>
              </motion.select>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="maxzone-glass-card"
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="maxzone-glass-card"
                >
                  <List className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Products Grid with Stagger Animation */}
        <StaggerContainer
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          staggerDelay={0.1}
        >
          {streetwearProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Link href={`/products/${product.id}`} className="block">
                <Card className="maxzone-glass-card border-white/10 overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-80 object-cover"
                      />
                    </motion.div>
                    {product.badge && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 300 }}
                      >
                        <Badge className="absolute top-4 left-4 bg-white text-black font-bold">{product.badge}</Badge>
                      </motion.div>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  <CardContent className="p-6">
                    <motion.div
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                        >
                          <Star className="w-4 h-4 fill-white text-white" />
                        </motion.div>
                        <span className="ml-1 text-sm font-medium text-white">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-300">({product.reviews})</span>
                    </motion.div>

                    <motion.h3
                      className="font-bold text-lg mb-2 maxzone-text-glow text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {product.name}
                    </motion.h3>

                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <motion.span
                        className="text-xl font-bold text-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        ${product.price}
                      </motion.span>
                      {product.originalPrice && (
                        <motion.span
                          className="text-sm text-gray-300 line-through"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          ${product.originalPrice}
                        </motion.span>
                      )}
                    </motion.div>

                    <motion.div
                      className="text-center text-sm text-gray-300 group-hover:text-white transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      CLICK TO VIEW DETAILS
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </motion.div>
  )
}
