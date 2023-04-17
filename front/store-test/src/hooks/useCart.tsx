import { useContext } from 'react'
import { StateContext } from '../contexts/stateContext'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../constants/apiUrl'
import { toast } from 'sonner'
import { useHistory } from 'react-router-dom'

const useCart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(StateContext)

  const history = useHistory()

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart.map((product: any) => {
      if (product.id === id) {
        return { ...product, quantity }
      }
      return product
    })
    dispatch({ cart: newCart })
  }

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((product: any) => product.id !== id)
    dispatch({ cart: newCart })
  }

  const pay = async () => {
    try {
      const currentUser = localStorage.getItem('user')

      if (!currentUser) {
        toast.error('You need to login to pay', {
          style: {
            fontSize: '1.25rem',
          },
        })
        return
      }

      const dataToSend = {
        products: cart,
        userId: 'be8ed0fd-a51e-4045-bad8-5760f4629450',
      }

      const sendData = await axios.post(`${API_URL}products/sell/many`, dataToSend)
      if (sendData.status === 200 || sendData.status === 201) {
        toast.success('Login Success', {
          style: {
            fontSize: '1.25rem',
          },
        })
        history.push('/dashboard')
        dispatch({ cart: [] })
      }
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.error || 'Error', {
        style: {
          fontSize: '1.25rem',
        },
      })
    }
  }

  return {
    cart,
    updateQuantity,
    pay,
    removeFromCart,
    history,
  }
}

export default useCart
