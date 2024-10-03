import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      Header
      Sidebar
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
