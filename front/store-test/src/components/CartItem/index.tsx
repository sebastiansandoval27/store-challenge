import React from 'react'
import { CartType } from '../../contexts/stateContext'

interface Props {
  product: CartType
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
}

const CartItem: React.FC<Props> = ({ product, updateQuantity, removeFromCart }) => {
  return (
    <article className="w-[30rem] h-40 flex justify-start items-center my-5 border-2 border-gray-700 px-5 py-3 rounded-lg">
      <div className="w-1/4 h-full flex justify-center items-center py-2 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-36" />
      </div>
      <div className="flex-1 h-full flex justify-between items-center px-2">
        <span className="text-lg font-bold overflow-ellipsis w-full">{product.name}</span>
        <span className="text-xl font-bold text-green-600">${product.price * (product?.quantity || 1)}</span>
      </div>
      <div className="buttons">
        <button
          className="bg-green-600 text-white px-2 py-1 rounded-lg"
          onClick={() => {
            if (product?.quantity && product?.quantity) updateQuantity(product.id, product.quantity + 1)
          }}
        >
          +
        </button>
        <span className="px-2">{product.quantity}</span>
        <button
          className="bg-red-600 text-white px-2 py-1 rounded-lg"
          onClick={() => {
            if (product?.quantity && product?.quantity > 1) updateQuantity(product.id, product.quantity - 1)

            if (product?.quantity && product?.quantity === 1) removeFromCart(product.id)
          }}
        >
          -
        </button>
      </div>
    </article>
  )
}

export default CartItem
