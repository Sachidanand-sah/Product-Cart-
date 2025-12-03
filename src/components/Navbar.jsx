import React from 'react'
import { logout, getToken } from '../auth'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Home } from 'lucide-react'

export default function Navbar() {
  const nav = useNavigate()
  const user = getToken()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-blue-50/30 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => nav('/')}>
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:shadow-lg transition">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3a1 1 0 000 2h1.639l.25 1H3a1 1 0 000 2h.11l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">ProductCart</h1>
            <p className="text-xs text-gray-600">Inventory Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 hover:border-blue-300 transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">User</p>
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[150px]">
                {user?.email || 'Guest'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout()
              nav('/login')
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
