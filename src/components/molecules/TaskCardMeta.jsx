import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import { format, isValid, parseISO } from 'date-fns'

      const TaskCardMeta = ({ priority, category, dueDate, categoryColor }) => {
        const priorityColors = {
          high: 'bg-red-500',
          medium: 'bg-yellow-500',
          low: 'bg-green-500'
        }

        const formatDate = (dateString) => {
          if (!dateString) return 'No due date'
          try {
            const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString)
            return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid date'
          } catch {
            return 'Invalid date'
          }
        }

        return (
          <div className="flex items-center space-x-4 mt-3">
            {/* Priority */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${priorityColors[priority]}`} />
              <Text className="text-sm text-surface-500 dark:text-surface-400 capitalize">
                {priority}
              </Text>
            </div>

            {/* Category */}
            {category && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColor }}
                />
                <Text className="text-sm text-surface-500 dark:text-surface-400">
                  {category}
                </Text>
              </div>
            )}

            {/* Due Date */}
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-surface-400" />
              <Text className="text-sm text-surface-500 dark:text-surface-400">
                {formatDate(dueDate)}
              </Text>
            </div>
          </div>
        )
      }

      export default TaskCardMeta