import React from 'react'

const Footer: React.FC = () => {
  return (
    <header className='w-full h-16 bg-[#212121] flex justify-center items-center text-white px-7 fixed bottom-0 left-0'>
      <div className="content w-10/12 flex justify-center items-center">
        <div className='w-1/4 h-full flex items-center justify-center '>
          <span className='text-lg text-white font-bold'>Logo</span>
        </div>
      </div>
    </header>
  )
}

export default Footer