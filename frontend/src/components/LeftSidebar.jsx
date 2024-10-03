import React from 'react'
import { Bell, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const LeftSidebar = () => {
  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    {
      icon: (
        <Avatar className='w-6 h-6'>
          <AvatarImage src='https://github.com/shadcn.png' alt="User Profile Image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile"
    },
  ]
  const favouritesItems = [
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Feed" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Bell />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    { icon: <LogOut />, text: "Logout" },
  ]
  return (
    <div className='fixed top-[4rem] z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
      <div className='flex flex-col'>
        <div>
          {
            sidebarItems.map((item, index) => {
              return (
                <div
                  // onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )
            })
          }
        </div>

        <div>
          <h1 className='mb-6 mt-2 pl-3 font-semibold text-2xl'>Favourites</h1>
          {
            favouritesItems.map((item, index) => {
              return (
                <div
                  // onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                >
                  {item.icon}
                  <span>{item.text}</span>
                  {/* {
                    item.text === "Notifications" && likeNotification.length > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div>
                            {
                              likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                likeNotification.map((notification) => {
                                  return (
                                    <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                      <Avatar>
                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                      </Avatar>
                                      <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                    </div>
                                  )
                                })
                              )
                            }
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  } */}
                </div>
              )
            })
          }
        </div>
      </div>

      {/* <CreatePost open={open} setOpen={setOpen} /> */}

    </div>
  )
}

export default LeftSidebar
