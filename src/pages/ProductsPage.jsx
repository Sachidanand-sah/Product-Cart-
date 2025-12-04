import React, { useEffect, useState } from 'react'
import API from '../api'
import Navbar from '../components/Navbar'
import ProductForm from '../components/ProductForm'
import ConfirmDialog from '../components/ConfirmDialog'
import AnalyticsPanel from '../components/AnalyticsPanel'
import { Edit, Trash2, Search, Plus, Filter, Grid3x3, List } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirming, setConfirming] = useState(null)
  const [viewMode, setViewMode] = useState('list') 
  const [deletingId, setDeletingId] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await API.get('/products')
    setProducts(
      res.data.map((p) => ({
        id: p.id,
        name: p.title,
        category: p.category,
        price: p.price,
        stock: p.rating?.count || 0,
        description: p.description,
        image: p.image,
      }))
    )
  }

  useEffect(() => {
    load()
  }, [])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  function filtered() {
    return products.filter((p) => {
      const q = search.trim().toLowerCase()
      if (q && !(p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)))
        return false
      if (categoryFilter && p.category !== categoryFilter) return false
      return true
    })
  }

  async function handleSubmitProduct(data) {
    const payload = {
      title: data.name,
      price: Number(data.price) || 0,
      description: data.description || '',
      image: data.image || 'https://i.pravatar.cc',
      category: data.category || 'general',
    }
    if (data.id) {
      const previous = products
      setSaving(true)
      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? {
                ...p,
                name: payload.title,
                price: payload.price,
                description: payload.description,
                image: payload.image,
                category: payload.category,
              }
            : p
        )
      )
      setShowForm(false)
      setEditing(null)

      try {
        await API.put(`/products/${data.id}`, payload)
      } catch (err) {
        setProducts(previous)
        console.error('Update failed', err)
        alert('Failed to update product')
      } finally {
        setSaving(false)
      }
    } else {
      const tempId = `tmp-${Date.now()}`
      const newProd = {
        id: tempId,
        name: payload.title,
        price: payload.price,
        description: payload.description,
        image: payload.image,
        category: payload.category,
        stock: 0,
      }
      const previous = products
      setProducts((prev) => [newProd, ...prev])
      setShowForm(false)
      setSaving(true)
      try {
        const res = await API.post('/products', payload)
        if (res && res.data && res.data.id) {
          const serverId = res.data.id
          setProducts((prev) => prev.map((p) => (p.id === tempId ? { ...p, id: serverId } : p)))
        }
      } catch (err) {
        setProducts(previous)
        console.error('Create failed', err)
        alert('Failed to create product')
      } finally {
        setSaving(false)
      }
    }
  }

  async function confirmDelete() {
    if (!confirming) return
    const id = confirming.id
    const previous = products
    setDeletingId(id)

    if (String(id).startsWith('tmp-')) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setDeletingId(null)
      setConfirming(null)
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))

    try {
      await API.delete(`/products/${id}`)
    } catch (err) {
      setProducts(previous)
      console.error('Delete failed', err)
      alert('Failed to delete product. Changes were reverted. See console for details.')
    } finally {
      setDeletingId(null)
      setConfirming(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Products</h1>
              <p className="text-gray-600">Manage and organize your product inventory</p>
            </div>
            <button
              onClick={() => {
                setEditing(null)
                setShowForm(true)
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          <AnalyticsPanel products={products} />
        </div>

  
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Search by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="w-full lg:w-48">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filtered().length > 0 ? (
              filtered().map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group"
                >
                  <div className="flex items-center gap-5 flex-1">
                    <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{p.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {p.category}
                        </span>
                        <span className="text-green-600 font-bold text-lg">${p.price.toFixed(2)}</span>
                        <span className="text-gray-500">Stock: <span className="font-semibold text-gray-700">{p.stock}</span></span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-1">{p.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditing(p)
                        setShowForm(true)
                      }}
                      className="flex items-center gap-2"
                      title="Edit Product"
                    >
                      <span className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition inline-flex items-center justify-center">
                        <Edit className="w-4 h-4" />
                      </span>
                      <span className="hidden md:inline text-blue-700 font-medium">Edit</span>
                    </button>

                    <button
                      onClick={() => setConfirming(p)}
                      className="flex items-center gap-2"
                      title="Delete Product"
                    >
                      <span className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition inline-flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </span>
                      <span className="hidden md:inline text-red-600 font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered().length > 0 ? (
              filtered().map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{p.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{p.category}</p>
                    <p className="text-gray-600 text-xs mb-4 flex-1 line-clamp-2">{p.description}</p>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">Stock: <span className="font-semibold">{p.stock}</span></p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(p)
                          setShowForm(true)
                        }}
                        className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition inline-flex items-center justify-center"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setConfirming(p)}
                        className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition inline-flex items-center justify-center"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editing ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <ProductForm
                initial={editing}
                onCancel={() => setShowForm(false)}
                onSubmit={handleSubmitProduct}
                loading={saving}
              />
            </div>
          </div>
        )}

        {confirming && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <ConfirmDialog
                title="🗑️ Delete Product"
                message={`Are you sure you want to delete "${confirming.name}"? This action cannot be undone.`}
                onCancel={() => setConfirming(null)}
                onConfirm={confirmDelete}
                loading={deletingId === confirming.id}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
