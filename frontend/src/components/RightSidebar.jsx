import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import InitialsAvatar from 'react-initials-avatar';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='fixed right-0 mt-[6rem] w-[22%] my-10  bg-white p-7 mr-4' style={{ minHeight: 'calc(100vh - 8rem)',maxHeight: 'calc(100vh - 7rem)' , borderRadius: "0.7rem"}}>
      <div className='w-full flex items-center gap-2 pb-6'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback><InitialsAvatar name={user?.username} className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full" /> </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-600 text-sm text-ellipsis line-clamp-1'>{user?.bio}</span>
        </div>
      </div>
      <hr />
      <SuggestedUsers />
    </div>
  )
}

export default RightSidebar