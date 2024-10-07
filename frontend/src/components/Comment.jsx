import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import InitialsAvatar from 'react-initials-avatar';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Link to={`/profile/${comment?.author?._id}`}>
                    <Avatar>
                        <AvatarImage src={comment?.author?.profilePicture} />
                        <AvatarFallback><InitialsAvatar name={comment?.author?.username || "CN"} className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full" /></AvatarFallback>
                    </Avatar>
                </Link>
                <h1 className='font-bold text-sm'>{comment?.author?.username} <span className='font-normal pl-1'>{comment?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment