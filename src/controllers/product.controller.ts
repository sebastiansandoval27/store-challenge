import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { readFileSync, writeFileSync } from '@/utils/writeFile'
import { Product } from '@/models/Product.model'
import { Stock } from '@/models/Stock.model'
import { SaleModel } from '@/models/Sale.model'

const PRODUCTS_PATH_ROUTE = '../database/products.json'
const STOCK_PATH_ROUTE = '../database/stock.json'
const SALES_PATH_ROUTE = '../database/sales.json'

export class ProductController {
  constructor() {
    this.getProducts = this.getProducts.bind(this)
    this.getProductById = this.getProductById.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  async getProducts(req: Request, res: Response) {
    try {
      let products: Product[] = []

      const data = await readFileSync(PRODUCTS_PATH_ROUTE)

      if (!data) {
        return res.status(404).json({ error: 'Products not found' })
      }
      const fileData = data?.data
      products = fileData
      return res.json(products)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return false
      }

      const data = await readFileSync(PRODUCTS_PATH_ROUTE)
      if (!data?.file) {
        return res.status(404).json({ error: 'Products not found' })
      }

      const products: Product[] = data?.data
      const product = products.find((product: Product) => product.id === id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      return res.json(product)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description, image, quantity } = req.body

      if (!name || !price || !description || !image || !quantity) {
        return res.status(400).json({ error: 'Missing fields' })
      }

      const data = await readFileSync(PRODUCTS_PATH_ROUTE)

      if (!data?.file) {
        return res.status(404).json({ error: 'Products not found' })
      }

      const products: Product[] = data?.data

      const uniqueName = products.find((product: Product) => product.name === name)

      if (uniqueName?.name) {
        return res.status(400).json({ error: 'Product already exists' })
      }

      const product: Product = {
        id: uuidv4(),
        name,
        price,
        description,
        image,
        createdAt: new Date(),
      }

      products.push(product)

      const write = await writeFileSync(PRODUCTS_PATH_ROUTE, products)

      if (!write) {
        return res.status(500).json({ error: 'Error to create product' })
      }

      const updateStock = await readFileSync(STOCK_PATH_ROUTE)

      if (!updateStock?.file) {
        const stock: Stock[] = []
        await writeFileSync(STOCK_PATH_ROUTE, stock)
      }

      const stock: Stock[] = updateStock?.data

      const stockProduct: Stock = {
        id: uuidv4(),
        productId: product.id,
        quantity,
        createdAt: new Date(),
      }

      stock.push(stockProduct)

      const writeStock = await writeFileSync(STOCK_PATH_ROUTE, stock)

      if (!writeStock) {
        return res.status(500).json({ error: 'Error to create product' })
      }

      return res.json(product)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, price, description, image } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Id is required' })
      }

      const data = await readFileSync(PRODUCTS_PATH_ROUTE)
      if (!data?.file) {
        return res.status(404).json({ error: 'Products not found' })
      }

      const products: Product[] = data?.data

      const product = products.find((product: Product) => product.id === id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
      }

      const write = await writeFileSync(PRODUCTS_PATH_ROUTE, products)

      if (!write) {
        return res.status(500).json({ error: 'Error to update product' })
      }

      return res.json(product)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params

      const data = await readFileSync(PRODUCTS_PATH_ROUTE)
      if (!data?.file) {
        return res.status(404).json({ error: 'Products not found' })
      }

      let products: Product[] = data?.data

      const product = products.find((product: Product) => product.id === id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      products = products.filter((product: Product) => product.id !== id)

      const write = await writeFileSync(PRODUCTS_PATH_ROUTE, products)

      if (!write) {
        return res.status(500).json({ error: 'Error to delete product' })
      }

      return res.json(product)
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async sellProduct(req: Request, res: Response) {
    try {
      const { id, quantity, userId } = req.body

      if (!id || !quantity || !userId) {
        return res.status(400).json({ error: 'Missing fields' })
      }

      const data = await readFileSync(STOCK_PATH_ROUTE)

      if (!data?.file) {
        return res.status(404).json({ error: 'Stock not found' })
      }

      const stock: Stock[] = data?.data

      const product = stock.find((stock: Stock) => stock.productId === id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      if (product) {
        // verify if quantity is available
        if (product.quantity < quantity) {
          return res.status(400).json({ error: 'Quantity not available' })
        }
        // update quantity
        product.quantity = product.quantity - quantity

        const write = await writeFileSync(STOCK_PATH_ROUTE, stock)

        if (!write) {
          return res.status(500).json({ error: 'Error to sell product' })
        }

        // create sale
        const dataSale = await readFileSync(SALES_PATH_ROUTE)

        if (!dataSale?.file) {
          const sales: SaleModel[] = []
          await writeFileSync(SALES_PATH_ROUTE, sales)
        }

        const sales: SaleModel[] = dataSale?.data

        const sale: SaleModel = {
          id: uuidv4(),
          productId: id,
          quantity,
          userId,
          createdAt: new Date(),
        }

        sales.push(sale)

        const writeSale = await writeFileSync(SALES_PATH_ROUTE, sales)

        if (!writeSale) {
          return res.status(500).json({ error: 'Error to sell product' })
        }
        return res.json(product)
      } else {
        return res.status(404).json({ error: 'Product not found' })
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
