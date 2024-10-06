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
    <div className='flex top-[5rem] bg-slate-100 min-h-screen'>
      <div className='flex flex-grow items-start justify-between'>
        <Main className="min-w-[50vw] flex items-center justify-center" />
        <Outlet />
      </div>
      <RightSidebar />
    </div>

  )
}

export default Home
