import tasksData from '../mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
    this.delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(t => t.id === id)
    return task ? { ...task } : null
  }

  async create(taskData) {
    await this.delay()
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null,
      archived: false
    }
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    const deleted = this.tasks.splice(index, 1)[0]
    return { ...deleted }
  }

  async getByCategory(category) {
    await this.delay()
    return this.tasks.filter(t => t.category === category).map(t => ({ ...t }))
  }

  async getByStatus(status) {
    await this.delay()
    return this.tasks.filter(t => t.status === status).map(t => ({ ...t }))
  }
}

export default new TaskService()