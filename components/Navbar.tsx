import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Home, Bookmark, Camera, Calendar, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  userId: string
}

export default function Navbar({ userId }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  const handleNavigation = (path: string) => {
    setActiveTab(path)
    router.push(path)
  }

  const navItems = [
    { icon: Home, path: `/home/${userId}` },
    { icon: Bookmark, path: `/closet/${userId}` },
    { icon: Camera, path: `/image/${userId}` },
    { icon: Calendar, path: `/calendar/${userId}` },
    { icon: User, path: `/user/${userId}` },
  ]

  return (
    <motion.div 
      className="flex justify-around items-center p-6 border-t bg-white"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {navItems.map(({ icon: Icon, path }) => (
        <motion.div
          key={path}
          className={`cursor-pointer ${path === `/image/${userId}` ? 'relative' : ''}`}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleNavigation(path)}
        >
          {path === `/image/${userId}` ? (
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center -mt-10 border-4 border-white">
              <Icon className="w-8 h-8 text-white" />
            </div>
          ) : (
            <Icon 
              className={`w-8 h-8 ${activeTab === path ? 'text-yellow-400' : 'text-black'}`} 
            />
          )}
          {activeTab === path && path !== `/image/${userId}` && (
            <motion.div
              className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-1"
              layoutId="activeIndicator"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}