import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import StatCard from '@/components/molecules/StatCard'

      const QuickStats = ({ tasks }) => {
        const pendingTasks = tasks?.filter(task => task?.status === 'pending').length || 0
        const inProgressTasks = tasks?.filter(task => task?.status === 'in-progress').length || 0
        const completedTasks = tasks?.filter(task => task?.status === 'completed').length || 0

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Pending"
              value={pendingTasks}
              iconName="Clock"
              iconColor="text-orange-500"
              iconBgColor="bg-orange-100 dark:bg-orange-900/20"
            />
            <StatCard
              title="In Progress"
              value={inProgressTasks}
              iconName="Play"
              iconColor="text-blue-500"
              iconBgColor="bg-blue-100 dark:bg-blue-900/20"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              iconName="CheckCircle"
              iconColor="text-green-500"
              iconBgColor="bg-green-100 dark:bg-green-900/20"
            />
          </div>
        )
      }

      export default QuickStats