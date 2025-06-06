import React from 'react'
      import { format } from 'date-fns'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const DateDisplay = ({ date, className }) => {
        return (
          <div className={`flex items-center space-x-2 bg-surface-100 dark:bg-surface-700 rounded-lg px-3 py-2 ${className}`}>
            <Icon name="Calendar" size={16} className="text-surface-500" />
            <Text className="text-sm text-surface-600 dark:text-surface-300">
              {format(date, 'MMM dd, yyyy')}
            </Text>
          </div>
        )
      }

      export default DateDisplay