'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Search, Plus, Minus } from 'lucide-react'
import Navbar from '../../../components/Navbar'

export default function ClosetUI() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClientComponentClient()
  const userId = params.userId as string

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.id !== userId) {
        router.push('/login')
      }
    }
    checkUser()
  }, [userId, router, supabase])

  return (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center my-8">Your Closets</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 relative mr-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-8 pr-4 bg-gray-100 rounded-full text-sm"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <button className="p-2 rounded-full bg-gray-200">
            <Plus className="w-4 h-4" />
          </button>
          <button className="ml-2 p-2 rounded-full bg-gray-200">
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src="/placeholder.svg?height=200&width=300&text=Casual"
              alt="Casual"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm font-semibold">Casual</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src="/placeholder.svg?height=200&width=300&text=Formal"
              alt="Formal"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm font-semibold">Formal</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src="/placeholder.svg?height=200&width=300&text=Sports"
              alt="Sports"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm font-semibold">Sports</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src="/placeholder.svg?height=200&width=300&text=Accessories"
              alt="Accessories"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm font-semibold">Accessories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <Navbar userId={userId} />
    </div>
  )
}
