"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        toast({
          title: "Welcome back!",
          description: "Redirecting to admin dashboard...",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Login successful!",
          description: "Welcome back to TRENDIFY MART!",
        })
        router.push("/")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors font-semibold uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO TRENDIFY MART
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="maxzone-glass-card border-white/10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="font-black text-3xl mb-4 maxzone-text-glow uppercase tracking-wider text-white">
                WELCOME BACK
              </CardTitle>
              <p className="text-gray-200 text-lg font-medium">Sign in to your TRENDIFY MART account</p>
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
                      className="pl-12 py-4 bg-transparent border-white/20 text-white placeholder:text-gray-500 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white uppercase tracking-wide font-bold">
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 py-4 bg-transparent border-white/20 text-white placeholder:text-gray-500 font-medium"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1 h-10 w-10 text-gray-400 hover:text-white hover:bg-white/10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-gray-200 hover:text-white transition-colors uppercase tracking-wide font-medium"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 py-4 font-black text-lg uppercase tracking-wider"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      SIGNING IN...
                    </>
                  ) : (
                    "SIGN IN"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-200 mb-4 font-medium">
                  DON'T HAVE AN ACCOUNT?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-white hover:text-gray-300 font-bold uppercase tracking-wide"
                  >
                    SIGN UP
                  </Link>
                </p>
              </div>

              <div className="mt-6 p-6 maxzone-glass-card border border-white/10">
                <p className="text-sm text-gray-200 text-center uppercase tracking-wide">
                  <strong className="text-white">ADMIN ACCESS:</strong>
                  <br />
                  <span className="text-white">EMAIL:</span> admin@gmail.com
                  <br />
                  <span className="text-white">PASSWORD:</span> admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
