"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, X, Trash2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    sizes: [] as string[],
    colors: [] as string[],
  })

  const categories = ["Streetwear", "Casual", "Formal", "Accessories"]
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const availableColors = ["Black", "White", "Gray", "Navy", "Red", "Blue", "Green"]

  useEffect(() => {
    const mockProduct = {
      name: "URBAN SHADOW HOODIE",
      price: "89.99",
      category: "streetwear",
      stock: "45",
      description: "Premium streetwear hoodie with urban aesthetic and comfortable fit.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray"],
    }
    setFormData(mockProduct)
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating product:", formData)
    router.push("/admin")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      console.log("Deleting product:", params.id)
      router.push("/admin")
    }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()} className="text-gray-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="font-black text-xl uppercase tracking-wider text-white">EDIT PRODUCT</h1>
                <p className="text-sm text-gray-300">Update product information</p>
              </div>
            </div>
            <Button
              onClick={handleDelete}
              variant="outline"
              className="border-red-400/20 text-red-400 hover:bg-red-400/10 font-bold uppercase bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="bg-gray-800/70 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase tracking-wide">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white font-semibold mb-2 block">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700/70 border-white/20 text-white placeholder-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-white font-semibold mb-2 block">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      className="bg-gray-700/70 border-white/20 text-white placeholder-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-white font-semibold mb-2 block">
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                      className="bg-gray-700/70 border-white/20 text-white placeholder-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-white font-semibold mb-2 block">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-700/70 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()} className="text-white hover:bg-gray-700">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white font-semibold mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700/70 border-white/20 text-white placeholder-gray-300 min-h-[100px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Variants */}
            <Card className="bg-gray-800/70 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase tracking-wide">Product Variants</CardTitle>
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
                            ? "bg-white text-black hover:bg-gray-200"
                            : "border-white/30 text-white hover:bg-white/10"
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
                            ? "bg-white text-black hover:bg-gray-200"
                            : "border-white/30 text-white hover:bg-white/10"
                        } font-bold`}
                        onClick={() => toggleColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
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
              className="border-white/30 text-white hover:bg-white/10 font-bold uppercase"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-black hover:bg-gray-200 font-bold uppercase">
              <Save className="h-4 w-4 mr-2" />
              Update Product
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
