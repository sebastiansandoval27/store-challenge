import React, { useState } from 'react'
import { ProductModel } from '../../contexts/models/productModel'
import { CartType } from '../../contexts/stateContext'

interface Props {
  product: ProductModel
  addToCart: (product: CartType, quantity: number) => void
}

const ProductItem: React.FC<Props> = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="w-52 h-64 rounded-md overflow-hidden flex flex-col items-center justify-center border-2 border-red-400 relative">
      <div className="relative w-full h-full">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end items-center bg-black bg-opacity-20 text-white font-bold text-lg pb-10">
        {product.name}
        <div className="buttons flex justify-center items-center gap-2 mt-3">
          <button
            className="bg-green-600 text-white py-2 rounded-lg px-5"
            onClick={() => {
              setQuantity(quantity + 1)
            }}
          >
            +
          </button>
          <span className="px-2">{quantity}</span>
          <button
            className="bg-red-600 text-white py-2 rounded-lg px-5"
            onClick={() => {
              if (quantity > 0) setQuantity(quantity - 1)
            }}
          >
            -
          </button>
        </div>
        <div className="buttons flex justify-center items-center gap-2 mt-3">
          <button
            className="bg-blue-400 text-white py-2 rounded-lg px-5 w-full"
            onClick={() => {
              addToCart(product, quantity)
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
