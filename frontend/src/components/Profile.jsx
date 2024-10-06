import useGetUserProfile from '@/hooks/getUserProfile';
import React from 'react'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;


  return (
    <div>
      profile
    </div>
  )
}

export default Profile
