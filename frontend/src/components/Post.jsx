import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'sonner'
import { Badge } from './ui/badge'

const Post = () => {
    return (
        <div className='my-16 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        {/* <AvatarImage src={post.author?.profilePicture} alt="post_image" /> */}
                        <AvatarImage src='' alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        {/* <h1>{post.author?.username}</h1> */}
                        <h1>username</h1>
                        {/* {user?._id === post.author._id && <Badge variant="secondary">Author</Badge>} */}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        {/* {
                            post?.author?._id !== user?._id && 
                        } */}
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>

                        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
                        {/* {
                            user && user?._id === post?.author._id && 
                            } */}
                        <Button
                            // onClick={deletePostHandler} 
                            variant='ghost' className="cursor-pointer w-fit">Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='rounded-sm my-2 w-full aspect-square object-cover'
                // src={post.image}
                src='https://plus.unsplash.com/premium_photo-1685736630644-488e8146a3dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
                alt="Post"
            />

            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>
                    {/* {
                        liked ? 
                    <FaThumbsUp size={'24'} className='cursor-pointer text-[#042035]' /> :
                    } */}
                    <FaRegThumbsUp size={'22px'} className='cursor-pointer hover:text-gray-600' />

                    <MessageCircle
                        // onClick={() => {
                        //     dispatch(setSelectedPost(post));
                        //     setOpen(true);
                        // }} 
                        className='cursor-pointer hover:text-gray-600'
                    />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark
                    // onClick={bookmarkHandler} 
                    className='cursor-pointer hover:text-gray-600' />
            </div>

            <span className='font-medium block mb-2'>1k likes</span>
            <p>
                <span className='font-medium text-lg'>
                    {/* {post.author?.username} */}
                    Lorem, ipsum.
                </span><br />
                {/* {post.caption} */}
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, sed!</p>
            </p>
            <span>view all 10 comments</span>
            {/* {
                comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
                )
            } */}
            {/* <CommentDialog /> */}
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    // value={text}
                    // onChange={changeEventHandler}
                    className='outline-none text-sm w-full'
                />
                {/* {
                    text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                } */}

            </div>
        </div>
    )
}

export default Post
