import { Router } from 'express'
import { ProductController } from '@/controllers/product.controller'

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', productController.getProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', productController.createProduct)
productRouter.patch('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)

// Sell
productRouter.post('/sell', productController.sellProduct)

export default productRouter
