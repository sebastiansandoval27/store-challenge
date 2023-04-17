import React from 'react'
import { CartType } from '../../contexts/stateContext'
import CartItem from '../../components/CartItem'
import './cart-styles.css'
import useCart from '../../hooks/useCart'

interface Props {}

const Cart: React.FC<Props> = () => {
  const { cart, updateQuantity, pay, removeFromCart, history } = useCart()

  return (
    <div className="w-full p-10 flex flex-col items-center justify-center">
      <h2 className="text-3xl text-blue-600 font-bold">Cart Items</h2>
      <div className="content-cart cart-products-grid">
        {cart &&
          cart.map((product: CartType, index) => (
            <CartItem
              key={`CartItem-${product.name}-${index}`}
              updateQuantity={updateQuantity}
              product={product}
              removeFromCart={removeFromCart}
            />
          ))}
      </div>
      <span className="w-96 h-10 my-5 bg-orange-600 text-white font-bold text-lg flex justify-center items-center">
        $
        {cart.reduce((acc: number, product: CartType) => {
          return acc + product.price * (product?.quantity || 1)
        }, 0)}
      </span>
      {cart.length > 0 ? (
        <button
          className="w-44 h-11 px-5 py-2 border-none bg-blue-600 text-white font-bold text-lg mt-5"
          onClick={() => {
            pay()
          }}
        >
          Pay
        </button>
      ) : (
        <button
          className="w-44 h-11 px-5 py-2 border-none bg-blue-600 text-white font-bold text-lg mt-5"
          onClick={() => {
            history.push('/')
          }}
        >
          Go to home
        </button>
      )}
    </div>
  )
}

export default Cart
