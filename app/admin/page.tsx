"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
} from "lucide-react"
import { useRouter } from "next/navigation"

const mockData = {
  stats: {
    totalSales: 125678.9,
    totalOrders: 1234,
    customerCount: 5678,
    totalProducts: 156,
    pendingOrders: 23,
    lowStockItems: 8,
  },
  products: [
    {
      id: 1,
      name: "URBAN SHADOW HOODIE",
      price: 89.99,
      stock: 45,
      category: "Streetwear",
      sales: 234,
      image: "/black-urban-hoodie-streetwear.png",
    },
    {
      id: 2,
      name: "MIDNIGHT CARGO PANTS",
      price: 129.99,
      stock: 23,
      category: "Streetwear",
      sales: 189,
      image: "/black-cargo-pants-streetwear.png",
    },
    {
      id: 3,
      name: "OVERSIZED BLACK TEE",
      price: 29.99,
      stock: 78,
      category: "Casual",
      sales: 456,
      image: "/oversized-black-tee-streetwear.png",
    },
    {
      id: 4,
      name: "BOMBER JACKET",
      price: 159.99,
      stock: 12,
      category: "Streetwear",
      sales: 123,
      image: "/black-bomber-streetwear.png",
    },
    {
      id: 5,
      name: "DISTRESSED JEANS",
      price: 99.99,
      stock: 34,
      category: "Casual",
      sales: 267,
      image: "/distressed-black-jeans-streetwear.png",
    },
  ],
  orders: [
    {
      id: 1001,
      customer: "Alex Johnson",
      email: "alex@email.com",
      total: 159.98,
      status: "Processing",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: 1002,
      customer: "Sarah Chen",
      email: "sarah@email.com",
      total: 89.99,
      status: "Shipped",
      date: "2024-01-14",
      items: 1,
    },
    {
      id: 1003,
      customer: "Mike Davis",
      email: "mike@email.com",
      total: 249.97,
      status: "Delivered",
      date: "2024-01-13",
      items: 3,
    },
    {
      id: 1004,
      customer: "Emma Wilson",
      email: "emma@email.com",
      total: 199.98,
      status: "Processing",
      date: "2024-01-12",
      items: 2,
    },
    {
      id: 1005,
      customer: "James Brown",
      email: "james@email.com",
      total: 129.99,
      status: "Cancelled",
      date: "2024-01-11",
      items: 1,
    },
  ],
  categories: [
    { name: "Streetwear", products: 45, sales: 15678.9 },
    { name: "Casual", products: 32, sales: 12456.78 },
    { name: "Formal", products: 28, sales: 8934.56 },
    { name: "Accessories", products: 51, sales: 6789.12 },
  ],
  transactions: [
    { id: "TXN001", amount: 159.98, type: "Sale", date: "2024-01-15", customer: "Alex Johnson" },
    { id: "TXN002", amount: -50.0, type: "Refund", date: "2024-01-14", customer: "John Doe" },
    { id: "TXN003", amount: 89.99, type: "Sale", date: "2024-01-14", customer: "Sarah Chen" },
  ],
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-xl">T</span>
              </div>
              <div>
                <span className="font-black text-xl uppercase tracking-wider">TRENDIFY MART</span>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                onClick={() => router.push("/")}
              >
                View Store
              </Button>
              <Button
                variant="outline"
                className="border-red-400/20 text-red-400 hover:bg-red-400/10 bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-black text-3xl md:text-4xl mb-2 uppercase tracking-wider">
            ADMIN <span className="text-white">DASHBOARD</span>
          </h1>
          <p className="text-gray-400">Manage your TRENDIFY MART store operations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-gray-800/50 border border-white/10">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Orders
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Categories
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${mockData.stats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-green-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockData.stats.totalOrders}</div>
                  <p className="text-xs text-blue-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Customers</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockData.stats.customerCount.toLocaleString()}</div>
                  <p className="text-xs text-purple-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +15% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Products</CardTitle>
                  <Package className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockData.stats.totalProducts}</div>
                  <p className="text-xs text-orange-400">+5 new this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">Pending Orders</CardTitle>
                  <Settings className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockData.stats.pendingOrders}</div>
                  <p className="text-xs text-yellow-400">Needs attention</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-300">Low Stock</CardTitle>
                  <TrendingUp className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{mockData.stats.lowStockItems}</div>
                  <p className="text-xs text-red-400">Items below 20</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="font-medium text-white">#{order.id}</p>
                          <p className="text-sm text-gray-400">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${order.total}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.products
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-sm text-gray-400">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">{product.sales} sold</p>
                            <p className="text-sm text-gray-400">${product.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-black text-2xl uppercase tracking-wider text-white">Product Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-gray-200 font-bold uppercase">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-bold uppercase text-white">Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-white font-semibold">
                            Product Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter product name"
                            className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category" className="text-white font-semibold">
                            Category *
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-gray-700/50 border-white/10 text-white">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-white/10">
                              {mockData.categories.map((cat) => (
                                <SelectItem
                                  key={cat.name}
                                  value={cat.name.toLowerCase()}
                                  className="text-white hover:bg-gray-700"
                                >
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="originalPrice" className="text-white font-semibold">
                            Original Price *
                          </Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="salePrice" className="text-white font-semibold">
                            Sale Price
                          </Label>
                          <Input
                            id="salePrice"
                            type="number"
                            step="0.01"
                            placeholder="0.00 (optional)"
                            className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white font-semibold">Available Colors *</Label>
                        <div className="grid grid-cols-4 gap-3 mt-2">
                          {["Black", "White", "Gray", "Navy", "Red", "Blue", "Green", "Brown"].map((color) => (
                            <label key={color} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="rounded border-white/20 bg-gray-700/50 text-white focus:ring-white/20"
                              />
                              <span className="text-white text-sm">{color}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-white font-semibold">Available Sizes *</Label>
                        <div className="grid grid-cols-6 gap-3 mt-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <label key={size} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="rounded border-white/20 bg-gray-700/50 text-white focus:ring-white/20"
                              />
                              <span className="text-white text-sm font-medium">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="stock" className="text-white font-semibold">
                          Stock Quantity *
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder="Enter stock quantity"
                          className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="images" className="text-white font-semibold">
                          Product Images *
                        </Label>
                        <div className="mt-2 space-y-3">
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Plus className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                              </div>
                              <input id="images" type="file" multiple accept="image/*" className="hidden" />
                            </label>
                          </div>
                          <div className="grid grid-cols-4 gap-2">{/* Preview uploaded images would go here */}</div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-white font-semibold">
                          Product Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Enter detailed product description..."
                          rows={4}
                          className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="brand" className="text-white font-semibold">
                            Brand
                          </Label>
                          <Input
                            id="brand"
                            placeholder="Enter brand name"
                            className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sku" className="text-white font-semibold">
                            SKU
                          </Label>
                          <Input
                            id="sku"
                            placeholder="Enter SKU code"
                            className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          className="rounded border-white/20 bg-gray-700/50 text-white focus:ring-white/20"
                        />
                        <Label htmlFor="featured" className="text-white font-semibold">
                          Mark as Featured Product
                        </Label>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          className="flex-1 bg-white text-black hover:bg-gray-200 font-bold uppercase"
                          onClick={() => {
                            setIsAddProductOpen(false)
                            router.push("/admin/products/add")
                          }}
                        >
                          Create Product
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
                          onClick={() => setIsAddProductOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/30 divide-y divide-white/10">
                      {mockData.products
                        .filter(
                          (product) =>
                            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase()),
                        )
                        .map((product) => (
                          <tr key={product.id} className="hover:bg-gray-700/30">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <div className="font-medium text-white">{product.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="secondary" className="bg-gray-600/50 text-gray-200">
                                {product.category}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  product.stock < 30 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                                }
                              >
                                {product.stock}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">{product.sales}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-black text-2xl uppercase tracking-wider text-white">Order Management</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/30 divide-y divide-white/10">
                      {mockData.orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-700/30">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-white">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-white">{order.customer}</div>
                              <div className="text-sm text-gray-400">{order.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">{order.items}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">${order.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-black text-2xl uppercase tracking-wider text-white">Category Management</h2>
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
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="categoryName" className="text-white">
                        Category Name
                      </Label>
                      <Input
                        id="categoryName"
                        className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryDescription" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="categoryDescription"
                        className="bg-gray-700/50 border-white/10 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button
                      className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase"
                      onClick={() => router.push("/admin/categories")}
                    >
                      Manage Categories
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockData.categories.map((category) => (
                <Card
                  key={category.name}
                  className="bg-gray-800/50 border-white/10 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-black text-lg uppercase tracking-wider text-white">{category.name}</h3>
                        <p className="text-sm text-gray-400">{category.products} products</p>
                        <p className="text-sm text-green-400">${category.sales.toLocaleString()} sales</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: `${(category.products / 60) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="font-black text-2xl uppercase tracking-wider text-white">Sales Analytics & Reports</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">{transaction.id}</p>
                          <p className="text-sm text-gray-400">{transaction.customer}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                          </p>
                          <Badge variant="secondary" className="bg-gray-600/50 text-gray-200">
                            {transaction.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.categories
                      .sort((a, b) => b.sales - a.sales)
                      .map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{category.name}</span>
                            <span className="text-green-400">${category.sales.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-white h-2 rounded-full"
                              style={{ width: `${(category.sales / 20000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="bg-white text-black hover:bg-gray-200 font-bold uppercase p-6 h-auto"
                    onClick={() => router.push("/admin/analytics")}
                  >
                    <div className="text-center">
                      <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                      <div>View Analytics</div>
                    </div>
                  </Button>
                  <Button
                    className="bg-white text-black hover:bg-gray-200 font-bold uppercase p-6 h-auto"
                    onClick={() => router.push("/admin/transactions")}
                  >
                    <div className="text-center">
                      <DollarSign className="h-6 w-6 mx-auto mb-2" />
                      <div>View Transactions</div>
                    </div>
                  </Button>
                  <Button className="bg-white text-black hover:bg-gray-200 font-bold uppercase p-6 h-auto">
                    <div className="text-center">
                      <Settings className="h-6 w-6 mx-auto mb-2" />
                      <div>System Settings</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
