import { useState, useEffect } from 'react'
      import { format } from 'date-fns'
      import { toast } from 'react-toastify'
      import taskService from '@/services/api/taskService'
      import categoryService from '@/services/api/categoryService'
      import Icon from '@/components/atoms/Icon'
      import Header from '@/components/organisms/Header'
      import Sidebar from '@/components/organisms/Sidebar'
      import FeatureSection from '@/components/organisms/FeatureSection'
      import QuickStats from '@/components/organisms/QuickStats'

      const HomePage = () => {
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
                <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
                <p className="text-lg text-surface-600 dark:text-surface-400">{error}</p>
              </div>
            </div>
          )
        }

        return (
          <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
            <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Sidebar
                  completedToday={completedToday}
                  totalTasks={totalTasks}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  showCompleted={showCompleted}
                  setShowCompleted={setShowCompleted}
                />

                <div className="lg:col-span-9">
                  <div className="space-y-6">
                    <FeatureSection
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

                    <QuickStats tasks={tasks} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      export default HomePage