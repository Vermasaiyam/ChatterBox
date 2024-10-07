import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { setSocket } from './redux/socketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers } from './redux/chatSlice'

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
      {
        path: '/chat',
        element: //<ProtectedRoutes>
          <ChatPage />
        // </ProtectedRoutes>
      },
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
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // socketio.on('notification', (notification) => {
      //   dispatch(setLikeNotification(notification));
      // });

      // if closing the page then offline user
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
