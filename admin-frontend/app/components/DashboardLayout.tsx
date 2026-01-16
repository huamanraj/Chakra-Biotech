'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 1024
      
      setIsMobile(mobile)
      setIsTablet(tablet)
      
      // Auto-collapse sidebar on mobile and tablet
      if (mobile || tablet) {
        setSidebarCollapsed(true)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Calculate margin based on screen size and sidebar state
  const getMainMargin = () => {
    if (isMobile) return 'ml-0'
    if (isTablet) return 'ml-0'
    return sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
  }

  return (
    <div className="min-h-screen bg-admin-50 overflow-x-hidden">
      <Sidebar />
      
      <div className={`flex flex-col transition-all duration-300 ${getMainMargin()}`}>
        <Header title={title} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)] w-full">
          <div className="max-w-full mx-auto w-full">
            <div className="w-full overflow-x-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout