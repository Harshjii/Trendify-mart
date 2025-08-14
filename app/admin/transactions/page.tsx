"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TransactionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const transactions = [
    {
      id: "TXN001",
      orderId: "1001",
      customer: "Alex Johnson",
      amount: 252.58,
      type: "Sale",
      status: "Completed",
      date: "2024-01-15T10:30:00Z",
      paymentMethod: "Credit Card",
    },
    {
      id: "TXN002",
      orderId: "1002",
      customer: "Sarah Chen",
      amount: -50.0,
      type: "Refund",
      status: "Processed",
      date: "2024-01-14T15:45:00Z",
      paymentMethod: "Credit Card",
    },
    {
      id: "TXN003",
      orderId: "1003",
      customer: "Mike Davis",
      amount: 189.99,
      type: "Sale",
      status: "Completed",
      date: "2024-01-14T09:20:00Z",
      paymentMethod: "PayPal",
    },
    {
      id: "TXN004",
      orderId: "1004",
      customer: "Emma Wilson",
      amount: 299.97,
      type: "Sale",
      status: "Pending",
      date: "2024-01-13T14:15:00Z",
      paymentMethod: "Credit Card",
    },
    {
      id: "TXN005",
      orderId: "1005",
      customer: "James Brown",
      amount: -129.99,
      type: "Refund",
      status: "Processed",
      date: "2024-01-12T11:30:00Z",
      paymentMethod: "Credit Card",
    },
  ]

  const stats = {
    totalRevenue: 15678.9,
    totalTransactions: 234,
    totalRefunds: 1234.56,
    pendingAmount: 567.89,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Processed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Sale":
        return "bg-green-500/20 text-green-400"
      case "Refund":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || transaction.type.toLowerCase() === filterType

    return matchesSearch && matchesFilter
  })

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
              <h1 className="font-black text-xl uppercase tracking-wider">TRANSACTION MANAGEMENT</h1>
              <p className="text-sm text-gray-400">Monitor all financial transactions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-400">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalTransactions}</div>
              <p className="text-xs text-blue-400">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Refunds</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRefunds.toLocaleString()}</div>
              <p className="text-xs text-red-400">-3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-yellow-400">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-black text-2xl uppercase tracking-wider text-white">All Transactions</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder-gray-400"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-gray-800/50 border-white/10 text-white w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/10">
                <SelectItem value="all" className="text-white">
                  All Types
                </SelectItem>
                <SelectItem value="sale" className="text-white">
                  Sales
                </SelectItem>
                <SelectItem value="refund" className="text-white">
                  Refunds
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent font-bold uppercase"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <Card className="bg-gray-800/50 border-white/10 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/30 divide-y divide-white/10">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="link"
                          className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
                          onClick={() => router.push(`/admin/orders/${transaction.orderId}`)}
                        >
                          #{transaction.orderId}
                        </Button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">{transaction.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getTypeColor(transaction.type)}>{transaction.type}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{transaction.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
