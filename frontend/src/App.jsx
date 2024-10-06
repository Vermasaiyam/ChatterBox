import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:
      // <ProtectedRoutes>
      <MainLayout />
    // </ProtectedRoutes>
    ,
    children: [
      {
        path: '/',
        element:
          // <ProtectedRoutes>
          <Home />
        // </ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element:
          // <ProtectedRoutes>
          <Profile />
        // </ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element:
          // <ProtectedRoutes>
          <EditProfile />
          // </ProtectedRoutes>
      },
      // {
      //   path: '/chat',
      //   element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      // },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
