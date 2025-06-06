import React, { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import taskService from '@/services/api/taskService'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import Select from '@/components/atoms/Select'
      import TaskCreateForm from '@/components/organisms/TaskCreateForm'
      import TaskList from '@/components/organisms/TaskList'

      const FeatureSection = ({ tasks = [], categories = [], onTaskUpdate, onTaskCreate, onTaskDelete }) => {
        const [isCreating, setIsCreating] = useState(false)
        const [draggedTask, setDraggedTask] = useState(null)
        const [sortBy, setSortBy] = useState('dueDate')
        const [newTask, setNewTask] = useState({
          title: '',
          description: '',
          category: '',
          priority: 'medium',
          dueDate: ''
        })

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

        const getCategoryColor = (categoryName) => {
          const category = categories.find(cat => cat.name === categoryName)
          return category?.color || '#6B7280'
        }

        const sortOptions = [
          { value: 'dueDate', label: 'Sort by Due Date' },
          { value: 'priority', label: 'Sort by Priority' },
          { value: 'title', label: 'Sort by Title' },
          { value: 'created', label: 'Sort by Created' }
        ]

        return (
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <Text as="h2" className="text-xl font-semibold flex items-center">
                  <Icon name="Plus" size={24} className="mr-2 text-primary" />
                  Tasks
                </Text>
                <div className="flex items-center space-x-3">
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={sortOptions}
                    className="px-3 py-2 text-sm"
                  />
                  <Button
                    onClick={() => setIsCreating(!isCreating)}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
                    icon={Icon}
                    iconName="Plus"
                  >
                    New Task
                  </Button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isCreating && (
                <TaskCreateForm
                  newTask={newTask}
                  setNewTask={setNewTask}
                  categories={categories}
                  handleCreateTask={handleCreateTask}
                  onCancel={() => setIsCreating(false)}
                />
              )}
            </AnimatePresence>

            <TaskList
              tasks={sortedTasks}
              draggedTask={draggedTask}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleStatusChange={handleStatusChange}
              handleDeleteTask={handleDeleteTask}
              getCategoryColor={getCategoryColor}
            />
          </div>
        )
      }

      export default FeatureSection