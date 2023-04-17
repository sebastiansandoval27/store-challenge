import { Toaster } from 'sonner';
import loginImage from '../../assets/images/register.jpeg'
import LogoIcon from '../../components/Icons/Logo'
import useRegister from '../../hooks/useRegister';

const Register = () => {

  const {
    handleSubmit,
    onSubmit,
    register,
    history
  } = useRegister();

  return (
    <div className='w-full flex justify-center items-center h-[75%]'>
      <Toaster
        position='top-center'
        richColors
      />
      <div className="w-full h-full flex justify-center items-center gap-3 overflow-hidden">
        <div className="w-1/2 h-full flex flex-col justify-center items-center  bg-[#CF0000] rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col justify-center items-center text-white'>
            <LogoIcon />
            <h3 className='text-3xl font-bold mt-2'>Register Form</h3>
            <div className="inputs mt-6 w-full flex flex-col justify-start items-center">
              <div className="mb-4 w-10/12">
                <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  autoComplete='false'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name")}
                />
              </div>
              <div className="mb-4 w-10/12">
                <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
                <input
                  type="email"
                  autoComplete="false"
                  placeholder="example@gmail.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                  {...register("email")}
                />
              </div>
              <div className="mb-4 w-10/12">
                <label htmlFor="password" className="block text-lg font-bold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  {...register("password")}
                />
              </div>
              <button type='submit' className='w-10/12 h-12 border-2 border-white mt-7 '>
                <span className="text-white text-2xl font-black">Register</span>
              </button>

              <div className='w-10/12 mt-5 flex justify-center items-center pt-2 border-t-2 border-white outline-none cursor-pointer'
                onClick={() => history.push('/login')}
              >
                <h3 className='text-lg text-white font-bold'>Login</h3>
              </div>

            </div>
          </form>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center">
          <img src={loginImage} alt="" className="object-cover w-full h-full place-content-start" />
        </div>

      </div>
    </div>
  )
}

export default Register