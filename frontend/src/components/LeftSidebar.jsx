import React, { useState } from 'react'
import { Bell, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import { toast } from 'sonner'
import { setAuthUser } from '@/redux/authSlice'
import InitialsAvatar from 'react-initials-avatar';
import { Button } from './ui/button'
import { setLikeNotification } from '@/redux/notificationSlice'

const LeftSidebar = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/logout', { withCredentials: true });
      if (res.data.success) {
        navigate("/login");
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    }
    else if (textType === "Create") {
      setOpen(true);
    }
    else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    }
    else if (textType === "Home") {
      navigate("/");
    }
    else if (textType === 'Messages') {
      navigate("/chat");
    }
  }

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    {
      icon: (
        <Avatar className='w-8 h-8'>
          <AvatarImage src={user?.profilePicture} alt={user?.username} className="w-full h-full rounded-full object-cover" />
          <AvatarFallback className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full">
            <InitialsAvatar name={user?.username || "CN"} className="h-full w-full flex items-center justify-center text-sm bg-slate-200 p-2 rounded-full" />
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile"
    },
  ]
  const favouritesItems = [
    // { icon: <Search />, text: "Search" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Bell />, text: "Notifications" },
    { icon: <TrendingUp />, text: "Feed" },
    { icon: <PlusSquare />, text: "Create" },
    { icon: <LogOut />, text: "Logout" },
  ]
  return (
    <div className='fixed top-[4rem] z-10 left-0 px-4 border-r bg-white border-t border-gray-300 w-[16%] h-screen'>
      <div className='flex flex-col'>
        <div>
          {
            sidebarItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )
            })
          }
        </div><hr />

        <div>
          <h1 className='mb-6 mt-4 pl-3 font-semibold text-2xl'>Favourites</h1>
          {
            favouritesItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                >
                  {item.icon}
                  <span>{item.text}</span>
                  {
                    item.text === "Notifications" && likeNotification.length > 0 && (
                      <Popover
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            dispatch(setLikeNotification(null));
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                        </PopoverTrigger>
                        <PopoverContent >
                          <div>
                            {
                              likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                likeNotification.map((notification) => {
                                  return (
                                    <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                      <Avatar>
                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                        <AvatarFallback>
                                          <InitialsAvatar name={user?.username || "CN"} className="h-full w-full flex items-center justify-center text-sm bg-slate-200 p-2 rounded-full" />
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post.</p>
                                    </div>
                                  )
                                })
                              )
                            }
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />

    </div>
  )
}

export default LeftSidebar
