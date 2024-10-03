import React from 'react'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'

const Home = () => {
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Main />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  )
}

export default Home
