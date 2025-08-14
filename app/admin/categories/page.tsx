"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2, Search, Package, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CategoryManagement() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  })

  const categories = [
    {
      id: 1,
      name: "Streetwear",
      description: "Urban fashion and street-inspired clothing",
      products: 45,
      sales: 15678.9,
      image: "/black-urban-hoodie-streetwear.png",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Casual",
      description: "Comfortable everyday wear and relaxed styles",
      products: 32,
      sales: 12456.78,
      image: "/oversized-black-tee-streetwear.png",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: 3,
      name: "Formal",
      description: "Professional and business attire",
      products: 28,
      sales: 8934.56,
      image: "/placeholder.svg",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: 4,
      name: "Accessories",
      description: "Bags, jewelry, and fashion accessories",
      products: 51,
      sales: 6789.12,
      image: "/placeholder.svg",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: 5,
      name: "Seasonal",
      description: "Limited time seasonal collections",
      products: 12,
      sales: 2345.67,
      image: "/placeholder.svg",
      status: "Inactive",
      createdDate: "2024-01-15",
    },
  ]

  const stats = {
    totalCategories: categories.length,
    activeCategories: categories.filter((c) => c.status === "Active").length,
    totalProducts: categories.reduce((sum, cat) => sum + cat.products, 0),
    totalSales: categories.reduce((sum, cat) => sum + cat.sales, 0),
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding category:", newCategory)
    setNewCategory({ name: "", description: "", image: "" })
    setIsAddCategoryOpen(false)
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setIsEditCategoryOpen(true)
  }

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating category:", editingCategory)
    setIsEditCategoryOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (categoryId: number) => {
    if (confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      console.log("Deleting category:", categoryId)
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="font-black text-xl uppercase tracking-wider">CATEGORY MANAGEMENT</h1>
              <p className="text-sm text-gray-400">Manage product categories and organization</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Categories</CardTitle>
              <Package className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCategories}</div>
              <p className="text-xs text-blue-400">All categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeCategories}</div>
              <p className="text-xs text-green-400">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Products</CardTitle>
              <Package className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProducts}</div>
              <p className="text-xs text-purple-400">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-green-400">Category revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-black text-2xl uppercase tracking-wider text-white">All Categories</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder-gray-400"
              />
            </div>
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-gray-200 font-bold uppercase">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="font-bold uppercase">Add New Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName" className="text-white font-semibold">
                      Category Name
                    </Label>
                    <Input
                      id="categoryName"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700/50 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription" className="text-white font-semibold">
                      Description
                    </Label>
                    <Textarea
                      id="categoryDescription"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-700/50 border-white/10 text-white"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase">
                    Create Category
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="bg-gray-800/50 border-white/10 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-black text-lg uppercase tracking-wider text-white">{category.name}</h3>
                      <Badge
                        className={
                          category.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {category.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{category.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Products:</span>
                    <span className="text-white font-semibold">{category.products}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sales:</span>
                    <span className="text-green-400 font-semibold">${category.sales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Created:</span>
                    <span className="text-gray-400 text-sm">{new Date(category.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${Math.min((category.products / 60) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Product capacity</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Category Dialog */}
        <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
          <DialogContent className="bg-gray-800 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="font-bold uppercase">Edit Category</DialogTitle>
            </DialogHeader>
            {editingCategory && (
              <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div>
                  <Label htmlFor="editCategoryName" className="text-white font-semibold">
                    Category Name
                  </Label>
                  <Input
                    id="editCategoryName"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700/50 border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editCategoryDescription" className="text-white font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="editCategoryDescription"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700/50 border-white/10 text-white"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditCategoryOpen(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200 font-bold uppercase">
                    Update Category
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
