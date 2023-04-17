import React from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  privateHeader: boolean
}

const Header: React.FC<Props> = ({ privateHeader = false }) => {
  const history = useHistory()

  const logoutFunc = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const changeRoute = (route: string) => {
    history.push(route)
  }

  return (
    <header className="w-full h-16 bg-[#212121] flex justify-center items-center text-white px-7 fixed top-0 left-0">
      <div className="content w-10/12 flex justify-center items-center">
        <div
          className="w-1/4 h-full flex items-center justify-center "
          onClick={() => {
            changeRoute('/')
          }}
        >
          <span className="font-bold text-white text-3xl">{`<`}</span>
          <span className="text-lg text-white font-bold mx-2">Store Challenge</span>
          <span className="font-bold text-white text-3xl">{`/>`}</span>
        </div>
        {privateHeader && (
          <ul className="w-3/4 gap-3 flex items-center justify-end">
            <li>Home</li>
            <li>Products</li>
            <li
              className="cursor-pointer hover:text-yellow-300 transition-all duration-200"
              onClick={() => changeRoute('/cart')}
            >
              Cart
            </li>
            <li className="cursor-pointer hover:text-yellow-300 transition-all duration-200" onClick={logoutFunc}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
