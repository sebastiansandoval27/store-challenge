import { Toaster } from 'sonner'
import loginImage from '../../assets/images/Login.jpeg'
import LogoIcon from '../../components/Icons/Logo'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const { handleSubmit, onSubmit, register, history } = useLogin()

  return (
    <div className="w-full flex justify-center items-center h-2/3">
      <Toaster position="top-center" richColors className="text-2xl" />
      <div className="w-full h-full flex justify-center items-center gap-3 overflow-hidden">
        <div className="w-1/2 h-full flex justify-center items-center">
          <img src={loginImage} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center  bg-[#CF0000] rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col justify-center items-center text-white"
          >
            <LogoIcon />
            <h3 className="text-3xl font-bold mt-2">Login Form</h3>
            <div className="inputs mt-6 w-full flex flex-col justify-start items-center">
              <div className="mb-4 w-10/12">
                <label htmlFor="email" className="block text-lg font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                  {...register('email')}
                />
              </div>
              <div className="mb-4 w-10/12">
                <label htmlFor="password" className="block text-lg font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  {...register('password')}
                />
              </div>
              <button type="submit" className="w-10/12 h-12 border-2 bg-white mt-7 ">
                <span className="text-red-500 text-2xl font-black">Login</span>
              </button>

              <div
                className="w-10/12 mt-5 flex justify-center items-center pt-2 border-t-2 border-white outline-none cursor-pointer"
                onClick={() => history.push('/register')}
              >
                <h3 className="text-lg text-white font-bold">Register</h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
