import React from 'react'
      import { motion } from 'framer-motion'
      import Button from '@/components/atoms/Button'
      import TaskFormFields from '@/components/molecules/TaskFormFields'

      const TaskCreateForm = ({ newTask, setNewTask, categories, handleCreateTask, onCancel }) => {
        return (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-surface-200 dark:border-surface-700"
          >
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <TaskFormFields
                newTask={newTask}
                setNewTask={setNewTask}
                categories={categories}
              />

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
                >
                  Create Task
                </Button>
              </div>
            </form>
          </motion.div>
        )
      }

      export default TaskCreateForm