import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { Package, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react'

export default function AnalyticsPanel({ products }) {
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const avgPrice = totalProducts
    ? (products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(2)
    : 0
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(2)

  const categoryData = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { name: p.category, value: 0, totalValue: 0 }
      acc[p.category].value += 1
      acc[p.category].totalValue += p.price * p.stock
      return acc
    }, {})
  )

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

  // Calculate percentage for categories
  const categoryPercentage = categoryData.map(cat => ({
    ...cat,
    percentage: ((cat.value / totalProducts) * 100).toFixed(1)
  }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold mb-1">Total Products</p>
              <p className="text-3xl font-bold text-blue-900">{totalProducts}</p>
              <p className="text-blue-600 text-xs mt-2">Items in inventory</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Stock */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold mb-1">Total Stock</p>
              <p className="text-3xl font-bold text-green-900">{totalStock}</p>
              <p className="text-green-600 text-xs mt-2">Units available</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-semibold mb-1">Average Price</p>
              <p className="text-3xl font-bold text-amber-900">${avgPrice}</p>
              <p className="text-amber-600 text-xs mt-2">Per product</p>
            </div>
            <div className="p-3 bg-amber-200 rounded-full">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold mb-1">Inventory Value</p>
              <p className="text-3xl font-bold text-purple-900">${totalValue}</p>
              <p className="text-purple-600 text-xs mt-2">Total worth</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Products by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  nameKey="name" 
                  outerRadius={80}
                  label={({ name, percentage: pct }) => `${name} (${((categoryData.find(c => c.name === name).value / totalProducts) * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value} items`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Category Stats Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Category Stats</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [value, 'Count']}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Category Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Products</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Percentage</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Inventory Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryPercentage.map((cat, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      ></div>
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                      {cat.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${cat.percentage}%`,
                            backgroundColor: colors[idx % colors.length]
                          }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-700 min-w-[40px] text-right">{cat.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-gray-900">${cat.totalValue.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
