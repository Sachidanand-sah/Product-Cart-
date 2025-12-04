import React from 'react'
import { Loader } from 'lucide-react'

export default function ConfirmDialog({ title, message, onCancel, onConfirm, loading = false }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} disabled={loading} className="px-3 py-1 border rounded disabled:opacity-60">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Delete'}
        </button>
      </div>
    </div>
  )
}
