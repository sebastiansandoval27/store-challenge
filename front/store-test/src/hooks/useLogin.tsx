import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { StateContext } from '../contexts/stateContext'
import { API_URL } from '../constants/apiUrl'

const useLogin = () => {
  const schema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().min(6).required(),
    })
    .required()
  type FormData = yup.InferType<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { loggedIn, setLoggedIn } = useContext(StateContext)

  const onSubmit = async (data: FormData) => {
    try {
      const sendData = await axios.post(`${API_URL}users/login`, data)
      if (sendData.status === 200 || sendData.status === 201) {
        localStorage.setItem('token', 'temporal-token')
        localStorage.setItem('user', JSON.stringify(sendData.data))
        setLoggedIn(!loggedIn)
        history.push('/dashboard')
      }
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.error, {
        style: {
          fontSize: '1.25rem',
        },
      })
    }
  }

  useEffect(() => {
    if (errors && errors.email) toast.error(errors.email.message)
    if (errors && errors.password) toast.error(errors.password.message)
  }, [errors])

  const history = useHistory()

  return {
    register,
    handleSubmit,
    onSubmit,
    history,
  }
}

export default useLogin
