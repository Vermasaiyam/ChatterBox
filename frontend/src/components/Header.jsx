import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InitialsAvatar from 'react-initials-avatar';
import { Button } from './ui/button'

const Header = () => {

    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);

    return (
        <nav className="fixed w-full flex items-center justify-between h-[4rem] px-6 bg-white shadow-md z-10">
            {/* Left Side */}
            <Link to="/" className="flex items-center cursor-pointer">
                <span className="text-blue-500 text-6xl font-bold"><img src="logo.png" alt="ChatterBox" className='h-[5rem] w-[11rem]' /></span>
            </Link>

            {/* Center - Search Bar */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="w-[35rem] pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <div className="flex items-center space-x-6 mx-3">
                <button className="relative">
                    <Bell className='w-7 h-7 ' />
                    {
                        likeNotification.length > 0 && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-4">{likeNotification.length}</Button>
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
                </button>

                {/* Profile Icon/Button */}
                <Link to={`profile/${user?._id}`} className="cursor-pointer">
                    <Avatar className='w-9 h-9'>
                        <AvatarImage src={user?.profilePicture} alt="User Profile Image" />
                        <AvatarFallback><InitialsAvatar name={user?.username || "CN"} className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full" /></AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </nav>
    )
}

export default Header
