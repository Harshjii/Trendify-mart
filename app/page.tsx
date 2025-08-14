"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { NewArrivals } from "@/components/new-arrivals"
import { BestSellers } from "@/components/best-sellers"
import { LimitedOffer } from "@/components/limited-offer"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900"
    >
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <NewArrivals />
        <BestSellers />
        <LimitedOffer />
      </main>
      <Footer />
    </motion.div>
  )
}
