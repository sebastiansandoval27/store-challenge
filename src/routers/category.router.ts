import { Router } from 'express'
import { CategoryController } from '@/controllers/category.controller'

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.get('/', categoryController.getCategories)
categoryRouter.get('/:id', categoryController.getCategoryById)

export default categoryRouter
