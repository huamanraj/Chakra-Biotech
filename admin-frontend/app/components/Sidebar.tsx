"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Image,
  FileText,
  FolderOpen,
  Package,
  Grid3X3,
  GraduationCap,
  MessageSquare,
  Building2,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Carousel", href: "/dashboard/carousel", icon: Image },
    { name: "Blog", href: "/dashboard/blog", icon: FileText },
    {
      name: "Blog Categories",
      href: "/dashboard/blog-categories",
      icon: FolderOpen,
    },
    { name: "Products", href: "/dashboard/products", icon: Package },
    {
      name: "Product Categories",
      href: "/dashboard/product-categories",
      icon: Grid3X3,
    },
    { name: "Gallery", href: "/dashboard/gallery", icon: Image },
    {
      name: "Gallery Categories",
      href: "/dashboard/gallery-categories",
      icon: FolderOpen,
    },
    { name: "Training", href: "/dashboard/training", icon: GraduationCap },
    { name: "Contact", href: "/dashboard/contact", icon: MessageSquare },
    { name: "Company Info", href: "/dashboard/company", icon: Building2 },
  ];

  const bottomMenuItems = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Logout", href: "#", icon: LogOut, action: "logout" },
  ];

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-admin-200 hover:bg-admin-50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-admin-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-admin-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Desktop Collapse Button */}
      <button
        onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
        className={`hidden lg:block fixed top-4 z-40 p-2 bg-white rounded-lg shadow-md border border-admin-200 hover:bg-admin-50 transition-all duration-300 ${
          isDesktopCollapsed ? "left-24" : "left-80"
        }`}
        aria-label="Toggle sidebar"
      >
        {isDesktopCollapsed ? (
          <ChevronRight className="w-5 h-5 text-admin-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-admin-600" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: isMobile ? -320 : 0 }}
          animate={{
            x: isMobile ? (isMobileOpen ? 0 : -320) : 0,
            width: isMobile ? 320 : isDesktopCollapsed ? 80 : 288,
          }}
          exit={{ x: -320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-40 border-r border-admin-200 ${
            isMobile ? "w-80" : isDesktopCollapsed ? "w-20" : "w-72"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div
              className={`border-b border-admin-200 ${
                isDesktopCollapsed && !isMobile ? "p-4" : "p-6"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-maroon-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <AnimatePresence>
                  {(!isDesktopCollapsed || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h1 className="font-serif text-xl font-bold text-admin-800 whitespace-nowrap">
                        Chakra Biotech
                      </h1>
                      <p className="text-sm text-admin-500 whitespace-nowrap">
                        Admin Dashboard
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href} onClick={closeMobileMenu}>
                      <div
                        className={`group relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-admin-50 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-saffron-50 to-saffron-100 text-saffron-700 shadow-sm border-l-4 border-saffron-500"
                            : "text-admin-600 hover:text-admin-800"
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            isActive
                              ? "text-saffron-600"
                              : "text-admin-500 group-hover:text-admin-700"
                          }`}
                        />
                        <AnimatePresence>
                          {(!isDesktopCollapsed || isMobile) && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="font-medium whitespace-nowrap"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Tooltip for collapsed state */}
                        {isDesktopCollapsed && !isMobile && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-admin-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {item.name}
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-admin-800 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Menu */}
            <div className="p-4 border-t border-admin-200 space-y-1">
              {bottomMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.name}>
                    {item.action === "logout" ? (
                      <button
                        onClick={handleLogout}
                        className="group relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-red-50 cursor-pointer text-admin-600 hover:text-red-700 w-full text-left"
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0 text-admin-500 group-hover:text-red-600" />
                        <AnimatePresence>
                          {(!isDesktopCollapsed || isMobile) && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="font-medium whitespace-nowrap"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Tooltip for collapsed state */}
                        {isDesktopCollapsed && !isMobile && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-admin-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {item.name}
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-admin-800 rotate-45"></div>
                          </div>
                        )}
                      </button>
                    ) : (
                      <Link href={item.href} onClick={closeMobileMenu}>
                        <div
                          className={`group relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-admin-50 cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-saffron-50 to-saffron-100 text-saffron-700 shadow-sm border-l-4 border-saffron-500"
                              : "text-admin-600 hover:text-admin-800"
                          }`}
                        >
                          <item.icon
                            className={`w-5 h-5 flex-shrink-0 transition-colors ${
                              isActive
                                ? "text-saffron-600"
                                : "text-admin-500 group-hover:text-admin-700"
                            }`}
                          />
                          <AnimatePresence>
                            {(!isDesktopCollapsed || isMobile) && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="font-medium whitespace-nowrap"
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Tooltip for collapsed state */}
                          {isDesktopCollapsed && !isMobile && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-admin-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                              {item.name}
                              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-admin-800 rotate-45"></div>
                            </div>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
