import React from 'react'
      import FormField from '@/components/molecules/FormField'

      const TaskFormFields = ({ newTask, setNewTask, categories }) => {
        const categoryOptions = [
          { value: '', label: 'Select category' },
          ...categories.map(category => ({ value: category.name, label: category.name }))
        ]

        const priorityOptions = [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Title"
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title..."
                required
              />
              <FormField
                label="Category"
                type="select"
                value={newTask.category}
                onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                options={categoryOptions}
              />
            </div>

            <div>
              <FormField
                label="Description"
                type="textarea"
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Enter task description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Priority"
                type="select"
                value={newTask.priority}
                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                options={priorityOptions}
              />
              <FormField
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </>
        )
      }

      export default TaskFormFields