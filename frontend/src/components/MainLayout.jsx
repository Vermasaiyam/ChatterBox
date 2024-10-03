import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import Header from './Header'

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <LeftSidebar/>
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
