import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isValid, parseISO } from 'date-fns'
import ApperIcon from './ApperIcon'
import taskService from '../services/api/taskService'
import { toast } from 'react-toastify'

const MainFeature = ({ tasks = [], categories = [], onTaskUpdate, onTaskCreate, onTaskDelete }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [sortBy, setSortBy] = useState('dueDate')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  })

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

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    try {
      const taskData = {
        ...newTask,
        status: 'pending',
        createdAt: new Date().toISOString(),
        archived: false
      }
      
      const createdTask = await taskService.create(taskData)
      onTaskCreate(createdTask)
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        dueDate: ''
      })
      setIsCreating(false)
      toast.success('Task created successfully!')
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, {
        ...updates,
        ...(updates.status === 'completed' && { completedAt: new Date().toISOString() })
      })
      onTaskUpdate(updatedTask)
      
      if (updates.status === 'completed') {
        // Confetti effect
        toast.success('🎉 Task completed!', {
          position: "top-center",
          autoClose: 2000,
        })
      } else {
        toast.success('Task updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskService.delete(taskId)
      onTaskDelete(taskId)
      toast.success('Task deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleStatusChange = async (task, newStatus) => {
    await handleUpdateTask(task.id, { status: newStatus })
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetTask) => {
    e.preventDefault()
    if (draggedTask && targetTask && draggedTask.id !== targetTask.id) {
      // Reorder logic would go here
      console.log('Reorder:', draggedTask.title, 'before', targetTask.title)
    }
    setDraggedTask(null)
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'dueDate':
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date'
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString)
      return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid date'
    } catch {
      return 'Invalid date'
    }
  }

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category?.color || '#6B7280'
  }

  return (
    <div className="space-y-6">
      {/* Task Creation Form */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <ApperIcon name="Plus" size={24} className="mr-2 text-primary" />
              Tasks
            </h2>
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="title">Sort by Title</option>
                <option value="created">Sort by Created</option>
              </select>
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                New Task
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-surface-200 dark:border-surface-700"
            >
              <form onSubmit={handleCreateTask} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter task title..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter task description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          <AnimatePresence>
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors cursor-move ${
                    draggedTask?.id === task.id ? 'opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, task)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Status Checkbox */}
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={(e) => handleStatusChange(task, e.target.checked ? 'completed' : 'pending')}
                        className="h-5 w-5 text-primary focus:ring-primary border-surface-300 rounded"
                      />
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-medium ${
                            task.status === 'completed' 
                              ? 'line-through text-surface-500 dark:text-surface-400' 
                              : 'text-surface-900 dark:text-surface-100'
                          }`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-surface-600 dark:text-surface-400 mt-1">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-4 mt-3">
                            {/* Priority */}
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`} />
                              <span className="text-sm text-surface-500 dark:text-surface-400 capitalize">
                                {task.priority}
                              </span>
                            </div>
                            
                            {/* Category */}
                            {task.category && (
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getCategoryColor(task.category) }}
                                />
                                <span className="text-sm text-surface-500 dark:text-surface-400">
                                  {task.category}
                                </span>
                              </div>
                            )}
                            
                            {/* Due Date */}
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Calendar" size={14} className="text-surface-400" />
                              <span className="text-sm text-surface-500 dark:text-surface-400">
                                {formatDate(task.dueDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {/* Status Badge */}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              : task.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>

                          {/* Status Change */}
                          {task.status !== 'completed' && (
                            <button
                              onClick={() => handleStatusChange(task, 
                                task.status === 'pending' ? 'in-progress' : 'completed'
                              )}
                              className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <ApperIcon 
                                name={task.status === 'pending' ? 'Play' : 'CheckCircle'} 
                                size={16} 
                              />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <ApperIcon name="Trash2" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center"
              >
                <ApperIcon name="CheckSquare" size={48} className="text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-500 dark:text-surface-400 mb-2">
                  No tasks found
                </h3>
                <p className="text-surface-400 dark:text-surface-500">
                  Create your first task to get started!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default MainFeature