import React from 'react'
      import StatCard from '@/components/molecules/StatCard'
      import CategoryFilter from '@/components/organisms/CategoryFilter'
      import SearchAndFilter from '@/components/organisms/SearchAndFilter'

      const Sidebar = ({
        completedToday,
        totalTasks,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        showCompleted,
        setShowCompleted
      }) => {
        return (
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <StatCard
                  title="Today"
                  value={completedToday}
                  iconName="Target"
                  iconColor="text-primary"
                  iconBgColor="bg-primary/10"
                />
                <StatCard
                  title="Total"
                  value={totalTasks}
                  iconName="List"
                  iconColor="text-secondary"
                  iconBgColor="bg-secondary/10"
                />
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                totalTasks={totalTasks}
              />

              <SearchAndFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                showCompleted={showCompleted}
                setShowCompleted={setShowCompleted}
              />
            </div>
          </div>
        )
      }

      export default Sidebar