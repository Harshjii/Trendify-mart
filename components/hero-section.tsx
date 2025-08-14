"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { ParallaxSection } from "@/components/animations/parallax-section"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32 bg-gray-900">
      {/* Animated Background Effects */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <motion.div
                className="inline-flex items-center space-x-2 maxzone-card px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Zap className="h-4 w-4 text-white" />
                </motion.div>
                <span className="text-white">NEW DROP</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <motion.h1
                className="font-black text-5xl md:text-7xl lg:text-8xl leading-tight text-white"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  STREET
                </motion.span>
                <br />
                <motion.span
                  className="maxzone-gradient maxzone-text-glow"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  CULTURE
                </motion.span>
              </motion.h1>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed font-medium"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Authentic streetwear for the bold. Premium quality meets urban style in every piece.
              </motion.p>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-200 px-10 py-6 rounded-none font-black text-lg uppercase tracking-wider maxzone-glow group"
                    >
                      SHOP NOW
                      <motion.div
                        className="ml-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-6 rounded-none font-black text-lg border-2 border-white text-white hover:bg-white hover:text-black bg-transparent uppercase tracking-wider"
                  >
                    LOOKBOOK
                  </Button>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Hero Image with Parallax */}
          <ParallaxSection speed={0.3}>
            <ScrollReveal direction="right" delay={1.0}>
              <div className="relative">
                <motion.div
                  className="relative z-10 maxzone-glow"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src="/urban-streetwear-model.png" alt="MaxZone Streetwear" className="w-full h-auto" />
                </motion.div>

                {/* Animated Decorative Elements */}
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32 border-2 border-white/20"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-24 h-24 border-2 border-white/20"
                  animate={{
                    rotate: -360,
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 },
                  }}
                />
              </div>
            </ScrollReveal>
          </ParallaxSection>
        </div>
      </motion.div>
    </section>
  )
}
