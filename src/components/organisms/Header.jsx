import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import DateDisplay from '@/components/molecules/DateDisplay'
      import Button from '@/components/atoms/Button'

      const Header = ({ darkMode, toggleDarkMode }) => {
        return (
          <header className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                    <Icon name="CheckSquare" size={24} className="text-white" />
                  </div>
                  <Text as="h1" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TaskFlow
                  </Text>
                </div>

                <div className="flex items-center space-x-4">
                  <DateDisplay date={new Date()} className="hidden md:flex" />

                  <Button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                    icon={Icon}
                    iconName={darkMode ? "Sun" : "Moon"}
                    iconSize={20}
                    iconClassName="text-surface-600 dark:text-surface-300 mr-0"
                  >
                  </Button>
                </div>
              </div>
            </div>
          </header>
        )
      }

      export default Header