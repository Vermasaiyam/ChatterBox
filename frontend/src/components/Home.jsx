import React from 'react'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/getAllPosts'

const Home = () => {
  useGetAllPost();
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
