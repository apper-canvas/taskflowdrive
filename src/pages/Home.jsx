import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import taskService from '../services/api/taskService'
import categoryService from '../services/api/categoryService'
import { toast } from 'react-toastify'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tasksResult, categoriesResult] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ])
        setTasks(tasksResult || [])
        setCategories(categoriesResult || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const filteredTasks = tasks?.filter(task => {
    if (!task) return false
    
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    const matchesSearch = !searchQuery || 
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesCompleted = showCompleted || task.status !== 'completed'
    
    return matchesCategory && matchesSearch && matchesStatus && matchesCompleted
  }) || []

  const completedToday = tasks?.filter(task => 
    task?.status === 'completed' && 
    task?.completedAt &&
    format(new Date(task.completedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).length || 0

  const totalTasks = tasks?.length || 0
  const completionRate = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 0

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  }

  const statusColors = {
    pending: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-lg text-surface-600 dark:text-surface-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-surface-100 dark:bg-surface-700 rounded-lg px-3 py-2">
                <ApperIcon name="Calendar" size={16} className="text-surface-500" />
                <span className="text-sm text-surface-600 dark:text-surface-300">
                  {format(new Date(), 'MMM dd, yyyy')}
                </span>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  size={20} 
                  className="text-surface-600 dark:text-surface-300" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <motion.div 
                  className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Today</p>
                      <p className="text-2xl font-bold text-primary">{completedToday}</p>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <ApperIcon name="Target" size={20} className="text-primary" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Total</p>
                      <p className="text-2xl font-bold text-secondary">{totalTasks}</p>
                    </div>
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <ApperIcon name="List" size={20} className="text-secondary" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ApperIcon name="Folder" size={20} className="mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600'
                    }`}
                  >
                    <span>All Tasks</span>
                    <span className="text-sm">{totalTasks}</span>
                  </button>
                  {categories?.map(category => (
                    <button
                      key={category?.id}
                      onClick={() => setSelectedCategory(category?.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category?.name
                          ? 'bg-primary text-white'
                          : 'bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-3 h-3 rounded-full mr-3`}
                          style={{ backgroundColor: category?.color }}
                        />
                        <span>{category?.name}</span>
                      </div>
                      <span className="text-sm">{category?.taskCount || 0}</span>
                    </button>
                  )) || []}
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ApperIcon name="Filter" size={20} className="mr-2" />
                  Filters
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showCompleted"
                      checked={showCompleted}
                      onChange={(e) => setShowCompleted(e.target.checked)}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                    />
                    <label htmlFor="showCompleted" className="text-sm">
                      Show completed tasks
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <ApperIcon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
                    />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Main Feature Component */}
              <MainFeature 
                tasks={filteredTasks}
                categories={categories}
                onTaskUpdate={(updatedTask) => {
                  setTasks(prev => prev?.map(task => 
                    task?.id === updatedTask.id ? updatedTask : task
                  ) || [])
                }}
                onTaskCreate={(newTask) => {
                  setTasks(prev => [...(prev || []), newTask])
                }}
                onTaskDelete={(taskId) => {
                  setTasks(prev => prev?.filter(task => task?.id !== taskId) || [])
                }}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Pending</p>
                      <p className="text-2xl font-bold text-orange-500">
                        {tasks?.filter(task => task?.status === 'pending').length || 0}
                      </p>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                      <ApperIcon name="Clock" size={24} className="text-orange-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">In Progress</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {tasks?.filter(task => task?.status === 'in-progress').length || 0}
                      </p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <ApperIcon name="Play" size={24} className="text-blue-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Completed</p>
                      <p className="text-2xl font-bold text-green-500">
                        {tasks?.filter(task => task?.status === 'completed').length || 0}
                      </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                      <ApperIcon name="CheckCircle" size={24} className="text-green-500" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home