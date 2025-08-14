"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  })

  const categories = ["Streetwear", "Casual", "Formal", "Accessories"]
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const availableColors = ["Black", "White", "Gray", "Navy", "Red", "Blue", "Green"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating product:", formData)
    router.push("/admin")
  }

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const toggleColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
            <div>
              <h1 className="font-black text-xl uppercase tracking-wider">ADD NEW PRODUCT</h1>
              <p className="text-sm text-gray-400">Create a new product for TRENDIFY MART</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white font-semibold">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-white font-semibold">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-white font-semibold">
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                      className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-white font-semibold">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/10">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()} className="text-white">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400 min-h-[100px]"
                    placeholder="Enter product description"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Variants */}
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Product Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white font-semibold mb-3 block">Available Sizes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={formData.sizes.includes(size) ? "default" : "outline"}
                        className={`${
                          formData.sizes.includes(size)
                            ? "bg-white text-black"
                            : "border-white/20 text-white hover:bg-white/10"
                        } font-bold`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white font-semibold mb-3 block">Available Colors</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableColors.map((color) => (
                      <Button
                        key={color}
                        type="button"
                        variant={formData.colors.includes(color) ? "default" : "outline"}
                        className={`${
                          formData.colors.includes(color)
                            ? "bg-white text-black"
                            : "border-white/20 text-white hover:bg-white/10"
                        } font-bold`}
                        onClick={() => toggleColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white font-semibold mb-3 block">Product Images</Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drag and drop images here, or click to browse</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/20 text-white hover:bg-white/10 font-bold uppercase"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-black hover:bg-gray-200 font-bold uppercase">
              <Save className="h-4 w-4 mr-2" />
              Create Product
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
