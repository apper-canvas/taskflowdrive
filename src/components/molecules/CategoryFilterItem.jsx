import React from 'react'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const CategoryFilterItem = ({ name, taskCount, color, isSelected, onClick }) => {
        return (
          <Button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${
              isSelected
                ? 'bg-primary text-white'
                : 'bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-900 dark:text-surface-100'
            }`}
          >
            <div className="flex items-center">
              {color && <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: color }} />}
              <Text>{name}</Text>
            </div>
            <Text className="text-sm">{taskCount}</Text>
          </Button>
        )
      }

      export default CategoryFilterItem