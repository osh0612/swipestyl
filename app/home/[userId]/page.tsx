'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Search, Heart, X, Bookmark } from 'lucide-react'
import Navbar from '../../../components/Navbar'

export default function FashionFeedUI() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

    // Disable scrolling
    document.body.style.overflow = 'hidden'

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [userId, router, supabase])

  const images = [
    "https://svgsilh.com/svg/297509.svg?height=600&width=400",
    "https://www.svgrepo.com/show/23070/shirt.svg?height=600&width=400&text=Image+2",
    "https://thumb.silhouette-ac.com/t/2d/2df35ef3766388dc3eacaf6a68aed6d8_t.jpeg?height=600&width=400&text=Image+3",
  ]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1))
    } else if (info.offset.x < -100) {
      // Swiped left
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    }
    x.set(0)
    y.set(0)
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="p-4 flex items-center space-x-2 bg-white">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex space-x-3 flex-grow overflow-x-auto">
          <button className="w-24 h-8 bg-white border-2 border-black rounded-full text-sm font-medium text-gray-500 flex items-center justify-center whitespace-nowrap">Brand</button>
          <button className="w-24 h-8 bg-white border-2 border-black rounded-full text-sm font-medium text-gray-500 flex items-center justify-center whitespace-nowrap">Feed</button>
          <button className="w-24 h-8 bg-white border-2 border-black rounded-full text-sm font-medium text-gray-500 flex items-center justify-center whitespace-nowrap">Trending</button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full h-[calc(100vh-14rem)]"
          style={{ x, y, rotate, opacity }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full h-full relative">
            <img
              src={images[currentIndex]}
              alt={`Fashion selfie ${currentIndex + 1}`}
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base">@gabsey113</span>
                <span className="text-sm">221 likes</span>
              </div>
              <p className="text-sm mt-1">Fit of the day #baddies</p>
            </div>
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
            >
              <Heart className="w-32 h-32 text-black" />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
            >
              <X className="w-32 h-32 text-black" />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: useTransform(y, [-100, 0], [1, 0]) }}
            >
              <Bookmark className="w-32 h-32 text-black" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 w-full bg-white bg-opacity-90 shadow-md">
        <Navbar userId={userId} />
      </div>
    </div>
  )
}
