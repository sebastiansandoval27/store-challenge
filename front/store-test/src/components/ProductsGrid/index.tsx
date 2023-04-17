import React, { useState } from 'react'
import { CategoryModel } from '../../contexts/models/categoryModel'
import { ProductModel } from '../../contexts/models/productModel'
import ProductItem from '../ProductItem'
import './productGrid.styles.css'
import { CartType } from '../../contexts/stateContext'

interface Props {
  products: ProductModel[]
  categories: CategoryModel[]
  addToCart: (product: CartType, quantity: number) => void
  getProductsByCategory: (categoryId: string) => void
}

const ProductsGrid: React.FC<Props> = ({ products = [], categories = [], getProductsByCategory, addToCart }) => {
  const [categorySelected, setCategorySelected] = useState<any>('all')

  const onChange = (category: CategoryModel) => {
    setCategorySelected(category.id)
    getProductsByCategory(category.id)
  }

  const categoriesUpdated: CategoryModel[] = [...categories]
  categoriesUpdated.unshift({ id: 'all', name: 'All' })

  return (
    <div className="products-wrap">
      <div className="products-header flex justify-start items-center w-full">
        {categories &&
          categoriesUpdated &&
          categoriesUpdated.map((category: CategoryModel) => (
            <button
              type="button"
              onClick={() => onChange(category)}
              className={`category-item flex justify-center items-center mx-2 px-5 py-2 text-white border-none outline-none cursor-pointer ${
                categorySelected === category.id ? 'bg-blue-500' : 'bg-red-500'
              }`}
            >
              {category.name}
            </button>
          ))}
      </div>
      <div className="products-grid">
        {products.map((product: ProductModel, index) => (
          <ProductItem key={`ProductItem${index}-${product.name}`} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}

export default ProductsGrid
