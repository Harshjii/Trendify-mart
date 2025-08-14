"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"
import Link from "next/link"

export function LimitedOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 md:py-32 bg-white text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-4 border-black animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-20 h-20 border-4 border-black animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 mb-8 font-black uppercase tracking-wider">
            <Zap className="h-5 w-5" />
            <span>LIMITED TIME</span>
          </div>

          <h2 className="font-black text-5xl md:text-7xl mb-8 uppercase tracking-wider">
            FLASH SALE
            <br />
            30% OFF
          </h2>

          <p className="text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
            Don't sleep on this. Premium streetwear at unbeatable prices. Limited time only.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-6 md:space-x-12 mb-12">
            <div className="text-center">
              <div className="bg-black text-white p-6 mb-3 font-black text-3xl md:text-4xl">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">DAYS</span>
            </div>
            <div className="text-center">
              <div className="bg-black text-white p-6 mb-3 font-black text-3xl md:text-4xl">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">HOURS</span>
            </div>
            <div className="text-center">
              <div className="bg-black text-white p-6 mb-3 font-black text-3xl md:text-4xl">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">MINS</span>
            </div>
            <div className="text-center">
              <div className="bg-black text-white p-6 mb-3 font-black text-3xl md:text-4xl">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">SECS</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/sale">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-12 py-6 rounded-none font-black text-lg uppercase tracking-wider w-full"
              >
                <Clock className="mr-3 h-6 w-6" />
                SHOP SALE
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-4 border-black text-black hover:bg-black hover:text-white px-12 py-6 rounded-none font-black text-lg bg-transparent uppercase tracking-wider w-full"
              >
                VIEW ALL
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
