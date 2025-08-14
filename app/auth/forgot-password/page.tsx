"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset
    setTimeout(() => {
      setIsSubmitted(true)
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      })
      setIsLoading(false)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="maxzone-glass-card border-white/10">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>

                <h2 className="font-black text-3xl mb-4 text-white uppercase tracking-wider">CHECK YOUR EMAIL</h2>
                <p className="text-gray-200 mb-2 text-lg">We've sent a password reset link to</p>
                <p className="text-white font-bold mb-8 text-lg">{email}</p>

                <Link href="/auth/login">
                  <Button className="w-full bg-white text-black hover:bg-gray-200 py-4 font-black text-lg uppercase tracking-wider">
                    BACK TO SIGN IN
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO TRENDIFY MART
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="maxzone-glass-card border-white/10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="font-black text-3xl mb-4 text-white uppercase tracking-wider">
                FORGOT PASSWORD?
              </CardTitle>
              <p className="text-gray-200 text-lg">Enter your email to reset your password</p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white uppercase tracking-wide font-bold">
                    EMAIL ADDRESS
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 py-4 bg-transparent border-white/20 text-white placeholder:text-gray-400 font-medium"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 py-4 font-black text-lg uppercase tracking-wider"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      SENDING...
                    </>
                  ) : (
                    "SEND RESET LINK"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
