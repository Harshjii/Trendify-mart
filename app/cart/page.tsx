"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { useEffect, useState } from "react"
import { saveCart } from "../../firebaseFirestoreHelpers" // path adjust karein

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const [cart, setCart] = useState([])

  // Example: Add to cart
  const addToCart = (product) => {
    const newCart = [...cart, product]
    setCart(newCart)
    saveCart(userId, newCart)
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <main className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            </motion.div>
            <motion.h1
              className="font-black text-3xl mb-4 maxzone-text-glow uppercase tracking-wider"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              CART IS EMPTY
            </motion.h1>
            <motion.p
              className="text-gray-400 mb-8 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Your cart is waiting for some fresh pieces. Start shopping to fill it up!
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/categories/streetwear">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 font-black uppercase tracking-wider text-lg">
                  START SHOPPING
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </main>
      </motion.div>
    )
  }

  const tax = total * 0.08
  const finalTotal = total + tax

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white"
    >
      <main className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="mb-12">
            <motion.h1
              className="font-black text-4xl md:text-6xl mb-4 maxzone-text-glow uppercase tracking-wider"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              SHOPPING CART
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Review your items before checkout
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items with Stagger Animation */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  layout
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="maxzone-glass-card border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <motion.div
                          className="relative w-24 h-24 overflow-hidden rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </motion.div>

                        <div className="flex-1">
                          <motion.h3
                            className="font-bold text-xl mb-2 uppercase tracking-wide text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            {item.name}
                          </motion.h3>
                          <motion.div
                            className="flex items-center gap-4 text-gray-300 mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            {item.size && <span>SIZE: {item.size}</span>}
                            {item.color && <span>COLOR: {item.color}</span>}
                          </motion.div>
                          <motion.p
                            className="text-2xl font-black text-white"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 300 }}
                          >
                            ${item.price}
                          </motion.p>
                        </div>

                        <motion.div
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-10 w-10 border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </motion.div>

                          <div className="w-16 text-center">
                            <motion.div
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                                className="text-center bg-transparent border-white/20 text-white font-bold"
                                min="0"
                              />
                            </motion.div>
                          </div>

                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10 border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary with Animation */}
          <div className="lg:col-span-1">
            <ScrollReveal direction="right" delay={0.3}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Card className="maxzone-glass-card border-white/10 sticky top-24">
                  <CardContent className="p-8">
                    <motion.h2
                      className="font-black text-2xl mb-6 uppercase tracking-wider text-white"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      ORDER SUMMARY
                    </motion.h2>

                    <motion.div
                      className="space-y-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.div
                        className="flex justify-between text-lg"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-gray-300">SUBTOTAL</span>
                        <motion.span
                          className="font-bold text-white"
                          key={total}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          ${total.toFixed(2)}
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="flex justify-between text-lg"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-gray-300">SHIPPING</span>
                        <motion.span
                          className="font-bold text-green-400"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          FREE
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="flex justify-between text-lg"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-gray-300">TAX</span>
                        <motion.span
                          className="font-bold text-white"
                          key={tax}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          ${tax.toFixed(2)}
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    <Separator className="my-6 bg-white/20" />

                    <motion.div
                      className="flex justify-between font-black text-2xl mb-8 text-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <span>TOTAL</span>
                      <motion.span
                        className="maxzone-text-glow"
                        key={finalTotal}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        ${finalTotal.toFixed(2)}
                      </motion.span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/checkout">
                        <Button className="w-full bg-white text-black hover:bg-gray-200 py-4 font-black text-lg uppercase tracking-wider mb-4">
                          <motion.div
                            className="flex items-center justify-center"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            PROCEED TO CHECKOUT
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </motion.div>
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/categories/streetwear">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wide"
                        >
                          CONTINUE SHOPPING
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Security Features */}
                    <motion.div
                      className="mt-8 pt-6 border-t border-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                    >
                      <motion.div
                        className="text-center space-y-2"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <p className="text-sm text-gray-300 uppercase tracking-wide">SECURE CHECKOUT</p>
                        <p className="text-xs text-gray-400">SSL encrypted • Safe payments</p>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </motion.div>
  )
}
