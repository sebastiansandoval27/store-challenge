import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'

interface Props {
  children: React.ReactNode
}

const PrivateLayout: React.FC<Props> = ({
  children
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header
        privateHeader={true}
      />
      <div className="content w-10/12 p-10 mt-20">
        <div className="content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivateLayout