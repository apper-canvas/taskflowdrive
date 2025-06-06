import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Input from '@/components/atoms/Input'
      import Label from '@/components/atoms/Label'
      import Select from '@/components/atoms/Select'
      import Checkbox from '@/components/atoms/Checkbox'
      import Text from '@/components/atoms/Text'

      const SearchAndFilter = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, showCompleted, setShowCompleted }) => {
        const statusOptions = [
          { value: 'all', label: 'All Status' },
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' }
        ]

        return (
          <div className="space-y-6">
            {/* Search Input */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Icon
                    name="Search"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
                  />
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
              <Text as="h3" className="text-lg font-semibold mb-4 flex items-center">
                <Icon name="Filter" size={20} className="mr-2" />
                Filters
              </Text>
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={statusOptions}
                    className="p-2"
                  />
                </div>

                <Checkbox
                  id="showCompleted"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  label="Show completed tasks"
                />
              </div>
            </div>
          </div>
        )
      }

      export default SearchAndFilter