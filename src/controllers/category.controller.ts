import { Request, Response } from 'express'
import { readFileSync } from '@/utils/writeFile'
import { CategoryModel } from '@/models/Category.model'

const CATEGORIES_PATH_ROUTE = '../database/categories.json'

export class CategoryController {
  constructor() {
    this.getCategories = this.getCategories.bind(this)
    this.getCategoryById = this.getCategoryById.bind(this)
  }

  async getCategories(req: Request, res: Response) {
    try {
      let categories: CategoryModel[] = []

      const data = await readFileSync(CATEGORIES_PATH_ROUTE)

      if (!data) {
        return res.status(404).json({ error: 'Categories not found' })
      }
      const fileData = data?.data
      categories = fileData
      return res.json(categories)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return false
      }

      const data = await readFileSync(CATEGORIES_PATH_ROUTE)
      if (!data?.file) {
        return res.status(404).json({ error: 'Categories not found' })
      }

      const categories: CategoryModel[] = data?.data
      const product = categories.find((product: CategoryModel) => product.id === id)

      if (!product) {
        return res.status(404).json({ error: 'CategoryModel not found' })
      }

      return res.json(product)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }
}
