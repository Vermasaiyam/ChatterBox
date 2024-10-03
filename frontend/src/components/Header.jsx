import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bell } from 'lucide-react'

const Header = () => {

    return (
        <nav className="fixed w-full flex items-center justify-between h-[4rem] px-6 bg-white shadow-md">
            {/* Left Side */}
            <div className="flex items-center cursor-pointer">
                <span className="text-blue-500 text-6xl font-bold"><img src="logo.png" alt="ChatterBox" className='h-[5rem] w-[11rem]' /></span>
            </div>

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
                    <span className="absolute top-0 right-0 -mr-1 -mt-1 bg-red-500 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Profile Icon/Button */}
                <button className="cursor-pointer">
                    <Avatar className='w-9 h-9'>
                        <AvatarImage src='https://github.com/shadcn.png' alt="User Profile Image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </button>
            </div>
        </nav>
    )
}

export default Header
