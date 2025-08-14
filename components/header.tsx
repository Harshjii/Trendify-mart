"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, User, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 maxzone-border bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-black text-xl">T</span>
            </div>
            <span className="font-black text-2xl text-white maxzone-text-glow">TRENDIFY MART</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
            >
              SHOP
            </Link>
            <Link
              href="/categories/streetwear"
              className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
            >
              STREETWEAR
            </Link>
            <Link
              href="/categories/casual"
              className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
            >
              CASUAL
            </Link>
            <Link
              href="/categories/formal"
              className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
            >
              FORMAL
            </Link>
            <Link
              href="/categories/accessories"
              className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
            >
              ACCESSORIES
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-white text-black text-xs font-bold">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 border-t border-white/10 pt-6 maxzone-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/categories/streetwear"
                className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                STREETWEAR
              </Link>
              <Link
                href="/categories/casual"
                className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                CASUAL
              </Link>
              <Link
                href="/categories/formal"
                className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                FORMAL
              </Link>
              <Link
                href="/categories/accessories"
                className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                ACCESSORIES
              </Link>
              <div className="border-t border-white/10 pt-4 mt-4">
                <Link
                  href="/account"
                  className="font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  MY ACCOUNT
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
