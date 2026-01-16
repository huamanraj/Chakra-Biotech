'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import Modal from '../../components/Modal'
import { 
  Save, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@saffronshop.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    avatar: '',
    bio: 'Managing the saffron business operations and ensuring quality products reach our customers.',
    location: 'Kashmir, India',
    timezone: 'Asia/Kolkata',
    language: 'English'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newOrders: true,
      orderUpdates: true,
      lowStock: true,
      newMessages: true,
      systemUpdates: false,
      marketing: false
    },
    pushNotifications: {
      newOrders: true,
      orderUpdates: false,
      lowStock: true,
      newMessages: true,
      systemUpdates: true,
      marketing: false
    },
    smsNotifications: {
      newOrders: false,
      orderUpdates: false,
      lowStock: true,
      newMessages: false,
      systemUpdates: false,
      marketing: false
    }
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    allowMultipleSessions: false
  })

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
    animations: true,
    colorScheme: 'saffron'
  })

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    maintenanceMode: false,
    debugMode: false
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Database }
  ]

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!')
  }

  const handleSaveSecurity = () => {
    toast.success('Security settings updated!')
  }

  const handleSaveAppearance = () => {
    toast.success('Appearance settings updated!')
  }

  const handleSaveSystem = () => {
    toast.success('System settings updated!')
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long!')
      return
    }
    toast.success('Password changed successfully!')
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleDeleteAccount = () => {
    toast.success('Account deletion request submitted!')
    setShowDeleteModal(false)
  }

  const renderProfileTab = () => (
    <div className="space-responsive">
      <div className="card">
        <h3 className="heading-responsive-md text-admin-800 mb-4">Profile Information</h3>
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-saffron-500 to-maroon-600 rounded-full flex items-center justify-center">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-saffron-500 text-white rounded-full hover:bg-saffron-600 transition-colors">
              <Upload className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1">
            <h4 className="text-responsive-lg font-semibold text-admin-800">
              {profileData.firstName} {profileData.lastName}
            </h4>
            <p className="text-responsive-sm text-admin-600">{profileData.role}</p>
            <p className="text-responsive-xs text-admin-500">{profileData.email}</p>
          </div>
        </div>

        <div className="form-grid gap-responsive">
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">Location</label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-700 mb-2">Timezone</label>
            <select
              value={profileData.timezone}
              onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
              className="select-field"
            >
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-admin-700 mb-2">Bio</label>
          <textarea
            rows={3}
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            className="textarea-field"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={handleSaveProfile} className="btn-primary">
            <Save className="icon-responsive-sm mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-responsive">
      {['emailNotifications', 'pushNotifications', 'smsNotifications'].map((type) => (
        <div key={type} className="card">
          <h3 className="heading-responsive-md text-admin-800 mb-4 capitalize">
            {type.replace('Notifications', ' Notifications')}
          </h3>
          <div className="space-y-4">
            {Object.entries(notificationSettings[type as keyof typeof notificationSettings]).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="text-responsive-sm font-medium text-admin-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-responsive-xs text-admin-500">
                    {getNotificationDescription(key)}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [type]: {
                        ...notificationSettings[type as keyof typeof notificationSettings],
                        [key]: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-saffron-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-saffron-600"></div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleSaveNotifications} className="btn-primary">
              <Save className="icon-responsive-sm mr-2" />
              Save Preferences
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-responsive">
      <div className="card">
        <h3 className="heading-responsive-md text-admin-800 mb-4">Password & Authentication</h3>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-between w-full p-4 bg-admin-50 rounded-lg hover:bg-admin-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Lock className="icon-responsive-md text-admin-600" />
              <div className="text-left">
                <h4 className="text-responsive-sm font-medium text-admin-800">Change Password</h4>
                <p className="text-responsive-xs text-admin-500">Update your account password</p>
              </div>
            </div>
            <span className="text-admin-400">→</span>
          </button>

          <div className="flex items-center justify-between p-4 bg-admin-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="icon-responsive-md text-admin-600" />
              <div>
                <h4 className="text-responsive-sm font-medium text-admin-800">Two-Factor Authentication</h4>
                <p className="text-responsive-xs text-admin-500">Add an extra layer of security</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-saffron-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-saffron-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-responsive-sm font-medium text-admin-800 mb-4">Security Preferences</h4>
          <div className="form-grid gap-responsive">
            <div>
              <label className="block text-sm font-medium text-admin-700 mb-2">Session Timeout (minutes)</label>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                className="select-field"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-admin-700 mb-2">Password Expiry (days)</label>
              <select
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                className="select-field"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
                <option value={0}>Never</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={handleSaveSecurity} className="btn-primary">
            <Save className="icon-responsive-sm mr-2" />
            Save Security Settings
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="heading-responsive-md text-red-600 mb-4">Danger Zone</h3>
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h4 className="text-responsive-sm font-medium text-red-800 mb-2">Delete Account</h4>
          <p className="text-responsive-xs text-red-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn-danger"
          >
            <Trash2 className="icon-responsive-sm mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )

  const getNotificationDescription = (key: string) => {
    const descriptions: { [key: string]: string } = {
      newOrders: 'Get notified when new orders are placed',
      orderUpdates: 'Receive updates on order status changes',
      lowStock: 'Alert when product inventory is running low',
      newMessages: 'Notifications for new customer messages',
      systemUpdates: 'Important system and security updates',
      marketing: 'Marketing and promotional notifications'
    }
    return descriptions[key] || 'Notification setting'
  }

  return (
    <DashboardLayout title="Settings">
      <div className="space-responsive">
        {/* Header */}
        <div className="flex-responsive-between gap-4">
          <div>
            <h2 className="heading-responsive-xl text-admin-800">Settings</h2>
            <p className="text-responsive-sm text-admin-600">Manage your account and application preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-admin-200">
            <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-thin">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-2 sm:px-4 border-b-2 font-medium text-responsive-xs sm:text-responsive-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-saffron-500 text-saffron-600'
                        : 'border-transparent text-admin-500 hover:text-admin-700 hover:border-admin-300'
                    }`}
                  >
                    <Icon className="icon-responsive-sm" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
          
          <div className="padding-responsive">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'appearance' && (
              <div className="text-center py-8">
                <Palette className="w-12 h-12 text-admin-400 mx-auto mb-4" />
                <p className="text-admin-500">Appearance settings coming soon...</p>
              </div>
            )}
            {activeTab === 'system' && (
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-admin-400 mx-auto mb-4" />
                <p className="text-admin-500">System settings coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Password Change Modal */}
        <Modal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          title="Change Password"
          size="md"
        >
          <div className="padding-responsive space-responsive">
            <div>
              <label className="block text-sm font-medium text-admin-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-admin-400 hover:text-admin-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="flex-responsive justify-end gap-responsive-sm pt-4 border-t border-admin-200">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="btn-ghost btn-mobile"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="btn-primary btn-mobile"
              >
                Change Password
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Account"
          size="md"
        >
          <div className="padding-responsive space-responsive">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="heading-responsive-md text-red-800 mb-2">Are you absolutely sure?</h3>
              <p className="text-responsive-sm text-admin-600 mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-responsive-xs text-red-700">
                  <strong>Warning:</strong> All your data including products, orders, and settings will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="flex-responsive justify-end gap-responsive-sm pt-4 border-t border-admin-200">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-ghost btn-mobile"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="btn-danger btn-mobile"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage