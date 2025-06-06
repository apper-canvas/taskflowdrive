import categoriesData from '../mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = [...categoriesData]
    this.delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(c => c.id === id)
    return category ? { ...category } : null
  }

  async create(categoryData) {
    await this.delay()
    const newCategory = {
      id: Date.now().toString(),
      ...categoryData,
      taskCount: 0
    }
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.categories.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Category not found')
    
    this.categories[index] = { ...this.categories[index], ...updates }
    return { ...this.categories[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.categories.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Category not found')
    
    const deleted = this.categories.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new CategoryService()