import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const StatCard = ({ title, value, iconName, iconColor, iconBgColor }) => {
        return (
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-surface-500 dark:text-surface-400">{title}</Text>
                <Text className={`text-2xl font-bold ${iconColor}`}>{value}</Text>
              </div>
              <div className={`${iconBgColor} p-2 rounded-lg`}>
                <Icon name={iconName} size={20} className={iconColor} />
              </div>
            </div>
          </motion.div>
        )
      }

      export default StatCard