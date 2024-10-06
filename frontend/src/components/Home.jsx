import React from 'react'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/getAllPosts'
import useGetSuggestedUsers from '@/hooks/getSuggestedUsers'

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className='flex top-[5rem]'>
      <div className='flex-grow'>
        <Main />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  )
}

export default Home
