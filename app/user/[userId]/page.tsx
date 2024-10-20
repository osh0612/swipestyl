'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Settings, Edit2, ShoppingBag } from 'lucide-react'
import Navbar from '../../../components/Navbar'

interface ProfileProps {
  username: string
  followers: number
  following: number
}

export default function Component({ username = "shaurya", followers = 0, following = 0 }: ProfileProps) {
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
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button className="text-gray-600 hover:text-gray-800">
              <Settings className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <h1 className="text-xl font-semibold mb-2">{username}</h1>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-yellow-400 text-sm font-medium rounded-full hover:bg-yellow-500 transition-colors">
                Edit profile
              </button>
              <Edit2 className="w-5 h-5 ml-2 text-black" />
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="text-center">
              <span className="block font-semibold">{followers}</span>
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold">{following}</span>
              <span className="text-sm text-gray-600">Following</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <ShoppingBag className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="border-t border-gray-200"></div>
        {/* Add more content below the line if needed */}
      </div>
      <Navbar userId={userId} />
    </div>
  )
}