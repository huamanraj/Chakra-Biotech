'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import Modal from '../../components/Modal'
import { Plus, Edit, Trash2, Eye, Search, Star, Package, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { productsApi, productCategoriesApi, uploadApi, Product, Category } from '@/lib/api'

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    price: 0,
    originalPrice: 0,
    grade: '',
    origin: '',
    weight: '',
    images: [] as string[],
    features: [] as string[],
    benefits: [] as string[],
    inStock: true,
    stockQuantity: 0,
    badge: '',
    isPublished: false,
    isFeatured: false,
    displayOrder: 0,
    specifications: {
      origin: '',
      grade: '',
      moistureContent: '',
      crocin: '',
      safranal: '',
      picrocrocin: '',
      shelfLife: '',
      storage: ''
    }
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsRes, categoriesRes] = await Promise.all([
        productsApi.getAll({ page: 1, limit: 100 }),
        productCategoriesApi.getAll()
      ])
      setProducts(productsRes.data.products)
      setCategories(categoriesRes.data)
    } catch (error) {
      toast.error('Failed to load data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || 
      (typeof product.category === 'object' && product.category._id === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => uploadApi.uploadImage(file))
      const results = await Promise.all(uploadPromises)
      const urls = results.map(r => r.data.url)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }))
      toast.success('Images uploaded successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.images.length === 0) {
      toast.error('Please upload at least one product image')
      return
    }

    setSubmitting(true)
    try {
      if (editingProduct) {
        await productsApi.update(editingProduct._id, formData)
        toast.success('Product updated successfully!')
      } else {
        await productsApi.create(formData)
        toast.success('Product created successfully!')
      }

      setShowForm(false)
      setEditingProduct(null)
      resetForm()
      loadData()
    } catch (error: any) {
      toast.error(error.message || 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      shortDescription: '',
      category: categories[0]?._id || '',
      price: 0,
      originalPrice: 0,
      grade: '',
      origin: '',
      weight: '',
      images: [],
      features: [],
      benefits: [],
      inStock: true,
      stockQuantity: 0,
      badge: '',
      isPublished: false,
      isFeatured: false,
      displayOrder: 0,
      specifications: {
        origin: '',
        grade: '',
        moistureContent: '',
        crocin: '',
        safranal: '',
        picrocrocin: '',
        shelfLife: '',
        storage: ''
      }
    })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription || '',
      category: typeof product.category === 'object' ? product.category._id : product.category,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      grade: product.grade || '',
      origin: product.origin || '',
      weight: product.weight || '',
      images: product.images,
      features: product.features || [],
      benefits: product.benefits || [],
      inStock: product.inStock,
      stockQuantity: product.stockQuantity || 0,
      badge: product.badge || '',
      isPublished: product.isPublished,
      isFeatured: product.isFeatured,
      displayOrder: product.displayOrder,
      specifications: product.specifications || {
        origin: '',
        grade: '',
        moistureContent: '',
        crocin: '',
        safranal: '',
        picrocrocin: '',
        shelfLife: '',
        storage: ''
      }
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await productsApi.delete(id)
      toast.success('Product deleted successfully!')
      loadData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product')
    }
  }

  const togglePublish = async (id: string) => {
    try {
      await productsApi.togglePublish(id)
      toast.success('Publish status updated!')
      loadData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status')
    }
  }

  const toggleFeatured = async (id: string) => {
    try {
      await productsApi.toggleFeatured(id)
      toast.success('Featured status updated!')
      loadData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status')
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Products Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Products Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-admin-800">Manage Products</h2>
            <p className="text-admin-600">Create and manage your saffron products</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-admin-800">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-saffron-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.isPublished).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => !p.inStock).length}
                </p>
              </div>
              <Package className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.isFeatured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field md:w-48"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Product</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Price</th>
                  <th className="table-header">Stock</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-lg flex-shrink-0">
                          {product.featuredImage && (
                            <img src={product.featuredImage} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-admin-800">{product.name}</h3>
                          <p className="text-sm text-admin-500">{product.grade} • {product.weight}</p>
                          {product.isFeatured && (
                            <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="px-2 py-1 bg-admin-100 text-admin-700 rounded-full text-sm">
                        {typeof product.category === 'object' ? product.category.name : 'N/A'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div>
                        <span className="font-semibold text-admin-800">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-sm text-admin-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`font-medium ${
                        product.inStock ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.inStock ? (product.stockQuantity || 'In Stock') : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge ${
                        product.isPublished ? 'status-active' : 'status-draft'
                      }`}>
                        {product.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFeatured(product._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            product.isFeatured 
                              ? 'text-yellow-600 hover:bg-yellow-50' 
                              : 'text-admin-400 hover:bg-admin-50'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => togglePublish(product._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            product.isPublished 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-admin-400 hover:bg-admin-50'
                          }`}
                          title="Toggle Publish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-admin-300 mx-auto mb-4" />
            <p className="text-admin-500">No products found</p>
          </div>
        )}

        {/* Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => {
            setShowForm(false)
            setEditingProduct(null)
            resetForm()
          }}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
          size="2xl"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800">Basic Information</h4>
              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="input-field"
                  placeholder="Brief product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-field"
                  placeholder="Detailed product description"
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800">Product Images *</h4>
              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Upload Images
                </label>
                <div className="border-2 border-dashed border-admin-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-admin-400 mb-2" />
                    <span className="text-sm text-admin-600">
                      {uploading ? 'Uploading...' : 'Click to upload images'}
                    </span>
                    <span className="text-xs text-admin-500 mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800">Pricing & Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Grade A+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 1g"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Origin
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Kashmir"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800">Settings</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
                  />
                  <span className="text-sm font-medium text-admin-700">In Stock</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
                  />
                  <span className="text-sm font-medium text-admin-700">Published</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
                  />
                  <span className="text-sm font-medium text-admin-700">Featured Product</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-admin-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                  resetForm()
                }}
                className="px-6 py-2 text-admin-600 hover:bg-admin-100 rounded-lg transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={submitting || uploading}
              >
                {submitting ? 'Saving...' : editingProduct ? 'Update' : 'Create'} Product
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default ProductsManagement
