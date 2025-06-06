import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import CategoryFilterItem from '@/components/molecules/CategoryFilterItem'
      import Text from '@/components/atoms/Text'

      const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory, totalTasks }) => {
        const getCategoryColor = (categoryName) => {
          const category = categories.find(cat => cat.name === categoryName)
          return category?.color || '#6B7280'
        }

        return (
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
            <Text as="h3" className="text-lg font-semibold mb-4 flex items-center">
              <Icon name="Folder" size={20} className="mr-2" />
              Categories
            </Text>
            <div className="space-y-2">
              <CategoryFilterItem
                name="All Tasks"
                taskCount={totalTasks}
                isSelected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              />
              {categories?.map(category => (
                <CategoryFilterItem
                  key={category?.id}
                  name={category?.name}
                  taskCount={category?.taskCount || 0}
                  color={getCategoryColor(category?.name)}
                  isSelected={selectedCategory === category?.name}
                  onClick={() => setSelectedCategory(category?.name)}
                />
              )) || []}
            </div>
          </div>
        )
      }

      export default CategoryFilter