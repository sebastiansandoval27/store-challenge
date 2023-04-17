import axios, { AxiosError } from 'axios'
import { API_URL } from '../constants/apiUrl'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { StateContext } from '../contexts/stateContext'

const useDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    state: { categories, products, cart },
    dispatch,
  } = useContext(StateContext)

  const getCategories = async () => {
    try {
      setLoading(true)
      const sendData = await axios.get(`${API_URL}categories`)
      if (sendData.status === 200 || sendData.status === 201) {
        dispatch({ categories: sendData.data })
        setLoading(false)
      }
    } catch (error: AxiosError | any) {
      setLoading(false)
      toast.error(error?.response?.data?.error || 'Error getting categories', {
        style: {
          fontSize: '1.25rem',
        },
      })
    }
  }

  const getProductsByCategory = async (categoryId: string) => {
    try {
      setLoading(true)
      const sendData = await axios.get(`${API_URL}products/category/${categoryId}`)
      if (sendData.status === 200 || sendData.status === 201) {
        dispatch({ products: sendData.data })
        setLoading(false)
      }
    } catch (error: AxiosError | any) {
      setLoading(false)
      toast.error(error?.response?.data?.error || 'Error getting categories', {
        style: {
          fontSize: '1.25rem',
        },
      })
    }
  }

  const addProductToCart = (product: any, quantity = 1) => {
    // Verify if product is already in cart
    const productInCart = cart.find((p: any) => p.id === product.id)
    if (productInCart) {
      return
    } else {
      product.quantity = quantity
    }

    dispatch({ cart: [...cart, product] })
  }

  useEffect(() => {
    getCategories()
    getProductsByCategory('All')
  }, [])

  return {
    getCategories,
    categories,
    loading,
    getProductsByCategory,
    products,
    addProductToCart,
  }
}

export default useDashboard
