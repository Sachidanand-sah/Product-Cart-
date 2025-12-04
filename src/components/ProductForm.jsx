import React, { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'

export default function ProductForm({ initial, onCancel, onSubmit, loading = false }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  function validateForm() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Product name is required'
    if (!form.category.trim()) newErrors.category = 'Category is required'
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'Price must be greater than 0'
    if (!form.stock || parseInt(form.stock) < 0) newErrors.stock = 'Stock must be a valid number'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Product Name *</label>
        <input
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.name
              ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          }`}
          disabled={loading}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Category *</label>
          <input
            name="category"
            placeholder="e.g., Electronics, Clothing"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.category
                ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
            }`}
            disabled={loading}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Price ($) *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.price}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.price
                ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
            }`}
            disabled={loading}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Stock Quantity *</label>
        <input
          name="stock"
          type="number"
          min="0"
          placeholder="0"
          value={form.stock}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.stock
              ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          }`}
          disabled={loading}
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Description *</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
            errors.description
              ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          }`}
          disabled={loading}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Image URL (Optional)</label>
        <input
          name="image"
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          disabled={loading}
        />
      </div>
        <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => !loading && onCancel && onCancel()}
          className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          disabled={loading}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
          disabled={loading}
        >
          <Save className="w-4 h-4" />
          {loading ? (form.id ? 'Saving...' : 'Creating...') : (form.id ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  )
}
