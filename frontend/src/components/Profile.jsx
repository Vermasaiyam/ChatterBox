import useGetUserProfile from '@/hooks/getUserProfile';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, MessageCircle } from 'lucide-react';
import { FaRegThumbsUp } from "react-icons/fa";
import InitialsAvatar from 'react-initials-avatar';
import CommentDialog from './CommentDialog';
import { setSelectedPost } from '@/redux/postSlice';
import axios from 'axios';
import { toast } from "sonner";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile, user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const [isFollowing, setIsFollowing] = useState(user?.following.includes(userId));

  const [activeTab, setActiveTab] = useState('posts');
  const [open, setOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const likedPosts = posts.filter(post => post?.likes?.includes(userId));

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : (activeTab === 'saved' ? userProfile?.bookmarks : likedPosts);
  console.log(displayedPost);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile?._id && user?._id) {
      // Fetch whether the user is following this profile
      const checkFollowStatus = async () => {
        try {
          const res = user?.following.includes(userId);
          console.log(res);
          setIsFollowing(res); // Set the initial follow status
        } catch (error) {
          console.error("Error fetching follow status:", error);
        }
      };
      checkFollowStatus();
    }
  }, [userProfile?._id, user?._id]); // Run whenever the userProfile or user changes

  const followOrUnfollow = async () => {
    if (!userProfile?._id) {
      console.log("User profile ID is missing");
      return;
    }
    try {
      const res = await axios.post(
        `https://chatterbox-aaxc.onrender.com/api/user/followorunfollow/${userProfile?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsFollowing(!isFollowing); // Toggle follow status
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='pt-14 flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-10 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback><InitialsAvatar name={userProfile?.username || "CN"} className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full text-4xl" /></AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username}</span>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
                      {/* <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button> */}
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        <Button variant='secondary' className='h-8' onClick={followOrUnfollow}>Unfollow</Button>
                        <Button variant='secondary' className='h-8'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#042035] hover:bg-[#165686] h-8' onClick={followOrUnfollow}>Follow</Button>
                    )
                  )
                }
              </div>
              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <Badge className='w-fit cursor-pointer' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                <span className='font-semibold mt-2'>{userProfile?.bio}</span>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-300'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            {
              isLoggedInUserProfile && (
                <>
                  <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
                    SAVED
                  </span>
                  <span className={`py-3 cursor-pointer ${activeTab === 'liked' ? 'font-bold' : ''}`} onClick={() => handleTabChange('liked')}>LIKED POSTS</span>
                </>
              )
            }
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {
              displayedPost?.slice().reverse().map((post) => {
                return (
                  <div className="">


                    <div onClick={() => {
                      dispatch(setSelectedPost(post));
                      setOpen(true);
                    }}
                      key={post?._id}
                      className='relative group cursor-pointer'
                    >
                      <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='flex items-center text-white space-x-4'>
                          <button className='flex items-center gap-2 hover:text-gray-300'>
                            <FaRegThumbsUp size={'22px'} />
                            <span>{post?.likes.length}</span>
                          </button>
                          <button className='flex items-center gap-2 hover:text-gray-300'>
                            <MessageCircle />
                            <span>{post?.comments.length}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <CommentDialog open={open} setOpen={setOpen} />
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile