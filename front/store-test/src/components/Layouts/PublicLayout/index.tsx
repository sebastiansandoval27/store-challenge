import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'

interface Props {
  children: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({
  children
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <Header privateHeader={false} />
      <div className="content w-10/12 h-full flex justify-center items-center ">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default PublicLayout