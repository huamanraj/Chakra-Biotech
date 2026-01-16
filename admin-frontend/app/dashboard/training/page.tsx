'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import Modal from '../../components/Modal'
import { Plus, Edit, Trash2, Search, Users, BookOpen, Calendar, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: 'Saffron Cultivation Basics',
      description: 'Learn the fundamentals of saffron farming from soil preparation to harvesting',
      category: 'Cultivation',
      level: 'Beginner',
      duration: '4 hours',
      price: 2500,
      originalPrice: 3500,
      maxParticipants: 25,
      currentEnrollments: 18,
      status: 'Active',
      featured: true,
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      instructor: 'Dr. Rajesh Kumar',
      location: 'Kashmir Valley Farm',
      image: '/training-cultivation.jpg',
      topics: ['Soil preparation', 'Planting techniques', 'Irrigation methods', 'Pest control']
    },
    {
      id: 2,
      title: 'Saffron Quality Testing & Grading',
      description: 'Master the art of identifying premium saffron quality and grading standards',
      category: 'Quality Control',
      level: 'Intermediate',
      duration: '6 hours',
      price: 4000,
      originalPrice: 5000,
      maxParticipants: 15,
      currentEnrollments: 12,
      status: 'Active',
      featured: true,
      startDate: '2024-02-20',
      endDate: '2024-02-21',
      instructor: 'Prof. Meera Sharma',
      location: 'Quality Lab, Srinagar',
      image: '/training-quality.jpg',
      topics: ['Visual inspection', 'Aroma testing', 'Color analysis', 'Grading standards']
    },
    {
      id: 3,
      title: 'Saffron Processing & Packaging',
      description: 'Complete guide to post-harvest processing and premium packaging techniques',
      category: 'Processing',
      level: 'Advanced',
      duration: '8 hours',
      price: 6000,
      originalPrice: 7500,
      maxParticipants: 20,
      currentEnrollments: 8,
      status: 'Active',
      featured: false,
      startDate: '2024-03-01',
      endDate: '2024-03-02',
      instructor: 'Mr. Arjun Singh',
      location: 'Processing Unit, Pampore',
      image: '/training-processing.jpg',
      topics: ['Drying techniques', 'Storage methods', 'Packaging standards', 'Quality preservation']
    },
    {
      id: 4,
      title: 'Saffron Business & Marketing',
      description: 'Learn to build and scale your saffron business with effective marketing strategies',
      category: 'Business',
      level: 'Intermediate',
      duration: '5 hours',
      price: 3500,
      originalPrice: 4500,
      maxParticipants: 30,
      currentEnrollments: 0,
      status: 'Draft',
      featured: false,
      startDate: '2024-03-15',
      endDate: '2024-03-15',
      instructor: 'Ms. Priya Patel',
      location: 'Online Session',
      image: '/training-business.jpg',
      topics: ['Market analysis', 'Pricing strategies', 'Digital marketing', 'Export procedures']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingTraining, setEditingTraining] = useState<any>(null)

  const categories = ['All', 'Cultivation', 'Quality Control', 'Processing', 'Business', 'Marketing']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const statuses = ['All', 'Active', 'Draft', 'Completed', 'Cancelled']

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Cultivation',
    level: 'Beginner',
    duration: '',
    price: 0,
    originalPrice: 0,
    maxParticipants: 20,
    status: 'Active',
    featured: false,
    startDate: '',
    endDate: '',
    instructor: '',
    location: '',
    image: '',
    topics: ''
  })

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || training.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || training.level === selectedLevel
    const matchesStatus = selectedStatus === 'All' || training.status === selectedStatus
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const topics = formData.topics.split(',').map(topic => topic.trim()).filter(topic => topic)
    
    if (editingTraining) {
      setTrainings(trainings => 
        trainings.map(training => 
          training.id === editingTraining.id 
            ? { 
                ...training,
                ...formData,
                topics
              }
            : training
        )
      )
      toast.success('Training updated successfully!')
    } else {
      const newTraining = {
        ...formData,
        id: Date.now(),
        currentEnrollments: 0,
        topics
      }
      setTrainings(trainings => [...trainings, newTraining])
      toast.success('Training created successfully!')
    }

    setShowForm(false)
    setEditingTraining(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Cultivation',
      level: 'Beginner',
      duration: '',
      price: 0,
      originalPrice: 0,
      maxParticipants: 20,
      status: 'Active',
      featured: false,
      startDate: '',
      endDate: '',
      instructor: '',
      location: '',
      image: '',
      topics: ''
    })
  }

  const handleEdit = (training: any) => {
    setEditingTraining(training)
    setFormData({
      title: training.title,
      description: training.description,
      category: training.category,
      level: training.level,
      duration: training.duration,
      price: training.price,
      originalPrice: training.originalPrice,
      maxParticipants: training.maxParticipants,
      status: training.status,
      featured: training.featured,
      startDate: training.startDate,
      endDate: training.endDate,
      instructor: training.instructor,
      location: training.location,
      image: training.image,
      topics: training.topics.join(', ')
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    const training = trainings.find(t => t.id === id)
    if (training?.currentEnrollments > 0) {
      toast.error('Cannot delete training with active enrollments.')
      return
    }
    
    if (confirm('Are you sure you want to delete this training?')) {
      setTrainings(trainings => trainings.filter(training => training.id !== id))
      toast.success('Training deleted successfully!')
    }
  }

  const toggleFeatured = (id: number) => {
    setTrainings(trainings =>
      trainings.map(training =>
        training.id === id ? { ...training, featured: !training.featured } : training
      )
    )
    toast.success('Featured status updated!')
  }

  return (
    <DashboardLayout title="Training Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-admin-800">Manage Training Programs</h2>
            <p className="text-admin-600">Create and manage saffron training courses</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Training</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Total Programs</p>
                <p className="text-2xl font-bold text-admin-800">{trainings.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-saffron-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Active Programs</p>
                <p className="text-2xl font-bold text-green-600">
                  {trainings.filter(t => t.status === 'Active').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Total Enrollments</p>
                <p className="text-2xl font-bold text-blue-600">
                  {trainings.reduce((sum, t) => sum + t.currentEnrollments, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-500 text-sm">Featured Programs</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {trainings.filter(t => t.featured).length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-yellow-500" />
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
                placeholder="Search training programs..."
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
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field md:w-48"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field md:w-48"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Training Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrainings.map((training, index) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-saffron-100 to-saffron-200 relative">
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {training.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    training.status === 'Active' ? 'bg-green-100 text-green-700' :
                    training.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                    training.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {training.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-white bg-opacity-90 text-admin-700 text-xs rounded-full">
                    {training.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-admin-800 mb-1">{training.title}</h3>
                    <p className="text-sm text-admin-500">{training.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-admin-800">₹{training.price.toLocaleString()}</div>
                    {training.originalPrice > training.price && (
                      <div className="text-sm text-admin-500 line-through">
                        ₹{training.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-admin-600 text-sm mb-4 line-clamp-2">
                  {training.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-admin-400" />
                    <span className="text-admin-600">{training.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-admin-400" />
                    <span className="text-admin-600">
                      {training.currentEnrollments}/{training.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-admin-400" />
                    <span className="text-admin-600">{training.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-admin-400" />
                    <span className="text-admin-600">{training.instructor}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-admin-500 mb-2">Topics covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {training.topics.slice(0, 3).map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-admin-100 text-admin-600 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                    {training.topics.length > 3 && (
                      <span className="px-2 py-1 bg-admin-100 text-admin-600 text-xs rounded">
                        +{training.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleFeatured(training.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      training.featured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-admin-400 hover:bg-admin-50'
                    }`}
                    title="Toggle Featured"
                  >
                    ⭐
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(training)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(training.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={training.currentEnrollments > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={() => {
            setShowForm(false)
            setEditingTraining(null)
            resetForm()
          }}
          title={editingTraining ? 'Edit Training' : 'Add New Training'}
          size="2xl"
        >
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">Basic Information</h4>
              <div className="form-grid">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Training Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="input-field"
                    placeholder="Enter training title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="input-field"
                    placeholder="Instructor name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-field"
                  placeholder="Training description"
                />
              </div>
            </div>

            {/* Training Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">Training Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="input-field"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="input-field"
                  >
                    {levels.slice(1).map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 4 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Max Participants *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">Pricing</h4>
              <div className="form-grid">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
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
                    onChange={(e) => setFormData({...formData, originalPrice: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Schedule & Location */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">Schedule & Location</h4>
              <div className="form-grid">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="input-field"
                    placeholder="Training location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="input-field"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>

            {/* Topics & Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-admin-800 text-sm sm:text-base">Topics & Settings</h4>
              <div>
                <label className="block text-sm font-medium text-admin-700 mb-2">
                  Topics (comma separated)
                </label>
                <textarea
                  rows={2}
                  value={formData.topics}
                  onChange={(e) => setFormData({...formData, topics: e.target.value})}
                  className="input-field"
                  placeholder="Topic 1, Topic 2, Topic 3"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-admin-700">
                    Featured Training
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="input-field"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-admin-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingTraining(null)
                  resetForm()
                }}
                className="btn-mobile px-6 py-2 text-admin-600 hover:bg-admin-100 rounded-lg transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary btn-mobile order-1 sm:order-2"
              >
                {editingTraining ? 'Update' : 'Create'} Training
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default TrainingManagement