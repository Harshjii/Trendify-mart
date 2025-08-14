"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AnalyticsDashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

  const analyticsData = {
    overview: {
      totalRevenue: 125678.9,
      revenueChange: 12.5,
      totalOrders: 1234,
      ordersChange: 8.3,
      totalCustomers: 5678,
      customersChange: 15.2,
      avgOrderValue: 101.85,
      avgOrderChange: -2.1,
    },
    salesByCategory: [
      { name: "Streetwear", sales: 45678.9, percentage: 36.3, change: 15.2 },
      { name: "Casual", sales: 32456.78, percentage: 25.8, change: 8.7 },
      { name: "Formal", sales: 28934.56, percentage: 23.0, change: -3.2 },
      { name: "Accessories", sales: 18608.66, percentage: 14.8, change: 22.1 },
    ],
    topProducts: [
      { name: "URBAN SHADOW HOODIE", sales: 234, revenue: 20986.66, change: 18.5 },
      { name: "MIDNIGHT CARGO PANTS", sales: 189, revenue: 24567.11, change: 12.3 },
      { name: "OVERSIZED BLACK TEE", sales: 456, revenue: 13676.44, change: 25.7 },
      { name: "BOMBER JACKET", sales: 123, revenue: 19679.77, change: -5.2 },
      { name: "DISTRESSED JEANS", sales: 267, revenue: 26699.33, change: 8.9 },
    ],
    customerMetrics: {
      newCustomers: 234,
      returningCustomers: 1456,
      customerRetentionRate: 68.5,
      avgCustomerLifetime: 245.67,
    },
    salesTrends: [
      { period: "Week 1", sales: 15234.56, orders: 156 },
      { period: "Week 2", sales: 18567.89, orders: 189 },
      { period: "Week 3", sales: 22345.67, orders: 234 },
      { period: "Week 4", sales: 19876.54, orders: 198 },
    ],
    geographicData: [
      { region: "North America", sales: 56789.12, percentage: 45.2 },
      { region: "Europe", sales: 34567.89, percentage: 27.5 },
      { region: "Asia Pacific", sales: 23456.78, percentage: 18.7 },
      { region: "Other", sales: 10864.11, percentage: 8.6 },
    ],
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-400" : "text-red-400"
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="font-black text-xl uppercase tracking-wider">SALES ANALYTICS</h1>
                <p className="text-sm text-gray-400">Comprehensive business insights and reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-gray-800/50 border-white/10 text-white w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-white/10">
                  <SelectItem value="7d" className="text-white">
                    Last 7 days
                  </SelectItem>
                  <SelectItem value="30d" className="text-white">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="90d" className="text-white">
                    Last 90 days
                  </SelectItem>
                  <SelectItem value="1y" className="text-white">
                    Last year
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-gray-800/50 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Sales
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Customers
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${analyticsData.overview.totalRevenue.toLocaleString()}
                  </div>
                  <p className={`text-xs ${getChangeColor(analyticsData.overview.revenueChange)}`}>
                    {getChangeIcon(analyticsData.overview.revenueChange)}
                    <span className="ml-1">+{analyticsData.overview.revenueChange}% from last period</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analyticsData.overview.totalOrders}</div>
                  <p className={`text-xs ${getChangeColor(analyticsData.overview.ordersChange)}`}>
                    {getChangeIcon(analyticsData.overview.ordersChange)}
                    <span className="ml-1">+{analyticsData.overview.ordersChange}% from last period</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analyticsData.overview.totalCustomers}</div>
                  <p className={`text-xs ${getChangeColor(analyticsData.overview.customersChange)}`}>
                    {getChangeIcon(analyticsData.overview.customersChange)}
                    <span className="ml-1">+{analyticsData.overview.customersChange}% from last period</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Avg Order Value</CardTitle>
                  <Activity className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${analyticsData.overview.avgOrderValue}</div>
                  <p className={`text-xs ${getChangeColor(analyticsData.overview.avgOrderChange)}`}>
                    {getChangeIcon(analyticsData.overview.avgOrderChange)}
                    <span className="ml-1">{analyticsData.overview.avgOrderChange}% from last period</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-bold uppercase flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Sales by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.salesByCategory.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{category.name}</span>
                          <div className="text-right">
                            <span className="text-white">${category.sales.toLocaleString()}</span>
                            <span className={`text-xs ml-2 ${getChangeColor(category.change)}`}>
                              {category.change > 0 ? "+" : ""}
                              {category.change}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-400">{category.percentage}% of total sales</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-bold uppercase flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.geographicData.map((region) => (
                      <div
                        key={region.region}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">{region.region}</p>
                          <p className="text-sm text-gray-400">{region.percentage}% of sales</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${region.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-bold uppercase">Sales Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.salesTrends.map((trend) => (
                      <div
                        key={trend.period}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">{trend.period}</p>
                          <p className="text-sm text-gray-400">{trend.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${trend.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-bold uppercase">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topProducts.slice(0, 5).map((product, index) => (
                      <div
                        key={product.name}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary" className="bg-gray-600/50 text-gray-200">
                            #{index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            <p className="text-sm text-gray-400">{product.sales} sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${product.revenue.toLocaleString()}</p>
                          <p className={`text-xs ${getChangeColor(product.change)}`}>
                            {product.change > 0 ? "+" : ""}
                            {product.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analyticsData.customerMetrics.newCustomers}</div>
                  <p className="text-xs text-green-400">This period</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Returning Customers</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {analyticsData.customerMetrics.returningCustomers}
                  </div>
                  <p className="text-xs text-blue-400">Repeat purchases</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Retention Rate</CardTitle>
                  <Activity className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {analyticsData.customerMetrics.customerRetentionRate}%
                  </div>
                  <p className="text-xs text-purple-400">Customer loyalty</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Avg Lifetime Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${analyticsData.customerMetrics.avgCustomerLifetime}
                  </div>
                  <p className="text-xs text-orange-400">Per customer</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white font-bold uppercase">Product Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Units Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/30 divide-y divide-white/10">
                      {analyticsData.topProducts.map((product, index) => (
                        <tr key={product.name} className="hover:bg-gray-700/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="secondary" className="bg-gray-600/50 text-gray-200">
                              #{index + 1}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">{product.sales}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">
                            ${product.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`font-medium ${getChangeColor(product.change)}`}>
                              {product.change > 0 ? "+" : ""}
                              {product.change}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
