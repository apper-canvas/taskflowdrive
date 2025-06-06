import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Checkbox from '@/components/atoms/Checkbox'
      import Badge from '@/components/atoms/Badge'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import TaskCardMeta from '@/components/molecules/TaskCardMeta'

      const TaskList = ({
        tasks,
        draggedTask,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleStatusChange,
        handleDeleteTask,
        getCategoryColor
      }) => {
        return (
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            <AnimatePresence>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors cursor-move ${
                      draggedTask?.id === task.id ? 'opacity-50' : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, task)}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Status Checkbox */}
                      <div className="flex items-center mt-1">
                        <Checkbox
                          checked={task.status === 'completed'}
                          onChange={(e) => handleStatusChange(task, e.target.checked ? 'completed' : 'pending')}
                        />
                      </div>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Text as="h3" className={`text-lg font-medium ${
                              task.status === 'completed'
                                ? 'line-through text-surface-500 dark:text-surface-400'
                                : 'text-surface-900 dark:text-surface-100'
                            }`}>
                              {task.title}
                            </Text>
                            {task.description && (
                              <Text className="text-surface-600 dark:text-surface-400 mt-1">
                                {task.description}
                              </Text>
                            )}

                            <TaskCardMeta
                              priority={task.priority}
                              category={task.category}
                              dueDate={task.dueDate}
                              categoryColor={getCategoryColor(task.category)}
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            {/* Status Badge */}
                            <Badge
                              className={
                                task.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  : task.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                              }
                            >
                              {task.status.replace('-', ' ')}
                            </Badge>

                            {/* Status Change */}
                            {task.status !== 'completed' && (
                              <Button
                                onClick={() => handleStatusChange(task,
                                  task.status === 'pending' ? 'in-progress' : 'completed'
                                )}
                                className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg"
                                icon={Icon}
                                iconName={task.status === 'pending' ? 'Play' : 'CheckCircle'}
                                iconSize={16}
                                iconClassName="mr-0"
                              />
                            )}

                            {/* Delete */}
                            <Button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                              icon={Icon}
                              iconName="Trash2"
                              iconSize={16}
                              iconClassName="mr-0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                  <Icon name="CheckSquare" size={48} className="text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                  <Text as="h3" className="text-lg font-medium text-surface-500 dark:text-surface-400 mb-2">
                    No tasks found
                  </Text>
                  <Text className="text-surface-400 dark:text-surface-500">
                    Create your first task to get started!
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }

      export default TaskList