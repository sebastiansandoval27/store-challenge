import React, { useReducer, createContext } from 'react'
import { CategoryModel } from './models/categoryModel'
import { ProductModel } from './models/productModel'

export type CartType = ProductModel & { quantity?: number }

interface StateProps {
  categories: CategoryModel[]
  products: ProductModel[]
  login: boolean
  cart: CartType[]
}

const initialState: StateProps = {
  categories: [],
  products: [],
  login: false,
  cart: [],
}

function reducer(state: any, action: any) {
  return { ...state, ...action }
}

const StateContext = createContext({} as any)

interface Props {
  children: React.ReactNode
}

const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

export { StateContext, StateProvider }
