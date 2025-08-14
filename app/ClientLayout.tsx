"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/hooks/use-cart"
// <CHANGE> Added AnimatePresence for page transitions
import { AnimatePresence } from "framer-motion"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        {/* <CHANGE> Wrapped children in AnimatePresence for smooth page transitions */}
        <AnimatePresence mode="wait">{children}</AnimatePresence>
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  )
}
