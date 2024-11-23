import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickPostLayout from "../components/Layout/QuickPostLayout";

import { useLocation, useParams } from "react-router-dom";
import PostCard from "../components/FeedCard/PostCard";
import { fetchUser } from "../features/Auth/authSlice";
import { fetchUserPosts } from "../features/Posts/postSlice";
import { fetchSecondaryUser, updateUserFollower, updateUserProfile } from "../features/User/userSlice";
import { AppDispatch, RootState } from "../redux/store";



const UserProfileScreen:React.FC = () => {

    const location = useLocation()
    const {userId} = useParams();
    const user = useSelector((state: RootState)=> state?.auth.user)
    // console.log(user)
    const [isFollowing, setIsFollowing] = useState(false);
    const secondaryUser = useSelector((state:RootState)=> state?.users.secondaryUser);
    const userPosts = useSelector((state:RootState)=> state?.posts.userPosts);
    const {status}  = useSelector((state:RootState)=> state?.users)
    const memoizedStatus = useMemo(()=> status, [status])
    const dispatch = useDispatch<AppDispatch>();
    // console.log('current user',user);
    console.log('secondary user', secondaryUser)
    const [isEditing,setIsEditing] = useState(false);
    const [bio,setBio] = useState(user.bio)
    const [profileImage, setProfileImg] = useState("");

    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const isCurrentUserProfile = userId === undefined 
    const profileUser = isCurrentUserProfile? user : secondaryUser 
    // console.log(profileUser);
    const token = localStorage.getItem("QP-authToken") as string;
    const avatarOptions = [
        "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/premium-vector/simple-cute-black-boy-ith-beard-icon-vector_960391-425.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/premium-vector/illustration-young-ordinary-girl-cartoon-asian-woman-with-long-hair_15870-715.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175692.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",
        "https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869153.jpg?ga=GA1.1.1155537517.1728233364&semt=ais_hybrid",        
      ];
      
    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        if(secondaryUser === null || userPosts === null){
            dispatch(fetchSecondaryUser({userId, token}))
            dispatch(fetchUserPosts({userId:`${isCurrentUserProfile?`${user?.id}`:`${userId}`}`,token}));
        }
            dispatch(fetchUserPosts({userId:`${profileUser?.id}`,token}));
            dispatch(fetchUser(token));
        //  following secondary user check.
            if(status === "success" && location.pathname === `/profile/${userId}`){
                const followingData = secondaryUser?.followings
                const followinStatus =  followingData.length > 0 ? followingData.some((follower)=> follower.followingId === userId): false;
                setIsFollowing(followinStatus);
            }
    },[dispatch,secondaryUser])

    

    // if(status === "success" && location.pathname === `/profile/${userId}`){
    //     const followingData = secondaryUser?.followings
    //     const followinStatus =  followingData.length > 0 ? followingData.some((follower)=> follower.followingId === userId): false;
    //     // setIsFollowing(followinStatus);
    // }

    const handleSave = () => {
        const img = user.profileImageURL;
        dispatch(updateUserProfile({profileImage:img,bio,token}))
        setIsEditing(false);
        window.location.reload();
    }

    const handleAvatarChange = (avatarURL: string) => {
        // Implement API call to save avatar URL
        const userBio = user.bio;
        setProfileImg(avatarURL)
        dispatch(updateUserProfile({profileImage:avatarURL,bio:userBio,token}))
        setAvatarModalOpen(false);

        window.location.reload();
      };

    const handleUpdateFollower = () => {
        dispatch(updateUserFollower({from:`${user.id}`,to:`${userId}`,follow:!isFollowing,token}));
        window.location.reload();
    }

    //   console.log(status,`Seconday user`, secondaryUser)
    //   console.log(`user posts`, userPosts)
    return(
        <div>
            <QuickPostLayout>
                <div>
                    {/* status === "success" &&  */}
                   {status === "success" ? (<div className="flex flex-col justify-between items-center">
                        <img onClick={()=>isCurrentUserProfile && setAvatarModalOpen(true)} src={profileUser?.profileImageURL || `https://placehold.co/125?text=user`} alt={'user'} className="rounded-full cursor-pointer " width={125} height={150} />
                        <h1 className="mt-4 text-2xl font-bold" >{profileUser?.firstName} {profileUser?.lastName}</h1>
                        <p className="text-gray-400" >  @{(profileUser?.firstName || "").toLowerCase()}{(profileUser?.lastName || "").toLowerCase()}</p>
                        <button onClick={()=> isCurrentUserProfile? setIsEditing(true): handleUpdateFollower()} className={`border mt-2 px-2 py-1 font-semibold ${isCurrentUserProfile?`border-gray-300`:`border-red-400 bg-red-400 text-white`} `} >{isCurrentUserProfile?`Edit Profile`:`${isFollowing?`Unfollow`:`Follow`}`}</button>
                        <div className="mt-4" >
                            {isEditing? <div className="p-4 bg-white" > <textarea rows={4} cols={50} value={bio} onChange={(e)=>setBio(e.target.value)} /> 
                                <div className="flex gap-2 justify-end ">
                                <button onClick={()=>setIsEditing(false)} className="bg-gray-500 px-3 py-1 text-white rounded">Cancel</button>
                                <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded" >Save</button>
                                </div>
                            </div>:profileUser?.bio}   
                            </div>
                        <p className="text-red-400 mt-3" >{profileUser?.firstName}{profileUser?.lastName}.com</p>
                        <div className="bg-white mt-2 flex gap-8 px-7 py-4">
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >{profileUser?.followers?.length}</p>
                                <p>Following</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >{userPosts?.length}</p>
                                <p>Posts</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >{profileUser?.followings?.length}</p>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>): null}
                    {/* Avatar Modal */}
          {isAvatarModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-gray-300 p-8 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Choose an Avatar</h2>
                <div className="grid grid-cols-5 gap-4">
                  {avatarOptions.map((avatar) => (
                    <img
                      key={avatar}
                      src={avatar}
                      alt="Avatar"
                      className="cursor-pointer w-24 h-24 rounded-full border hover:border-red-400 hover:p-2"
                      onClick={() => handleAvatarChange(avatar)}
                    />
                  ))}
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-red-400 text-white rounded"
                  onClick={() => setAvatarModalOpen(false)}
                >
                  cancel
                </button>
              </div>
            </div>
          )}
                   {status === "success" ?  <div className="mt-4" >
                        <h1 className="text-2xl font-bold" >{isCurrentUserProfile? `Your Posts`:`${profileUser?.firstName}'s Posts`}</h1>
                        {userPosts.map((post)=>(
                            <PostCard key={post.id} post={post} page={`${isCurrentUserProfile?'profile':`profile/${profileUser.id}`}`} />
                        ))}
                    </div>: null}
                </div>
            </QuickPostLayout>
        </div>
    )
}

export default UserProfileScreen;

// {user?.profileImageURL? `${user.profileImageURL}`:`https://placehold.co/50?text=user`}