import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickPostLayout from "../components/Layout/QuickPostLayout";

import PostCard from "../components/FeedCard/PostCard";
import { fetchUser } from "../features/Auth/authSlice";
import { fetchUserPosts } from "../features/Posts/postSlice";
import { AppDispatch, RootState } from "../redux/store";

const UserProfileScreen:React.FC = () => {

    const user = useSelector((state: RootState)=> state?.auth.user)
    const userPosts = useSelector((state:RootState)=> state?.posts.userPosts);
    const dispatch = useDispatch<AppDispatch>();
    
    const [isEditing,setIsEditing] = useState(false);
    const [bio,setBio] = useState(user.bio)
    const [profileImg, setProfileImg] = useState(user.profileImageURL);

    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

    const avatarOptions = [
        "https://placehold.co/125?text=Avatar 1",
        "https://placehold.co/125?text=Avatar 2",
        "https://placehold.co/125?text=Avatar 3",
        "https://placehold.co/125?text=Avatar 4",
        "https://placehold.co/125?text=Avatar 5",        
      ];
    
    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchUserPosts(token));
        dispatch(fetchUser(token));
    },[dispatch])

    const handleProfileEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        console.log("saved")
        //  shoudl make implementation of persisting the changes.
        setIsEditing(false);
    }

    const handleAvatarChange = (avatarURL: string) => {
        // Implement API call to save avatar URL
        console.log("avatar changed",avatarURL)
        setProfileImg(avatarURL)
        setAvatarModalOpen(false);
      };
    
    

    return(
        <div>
            <QuickPostLayout>
                <div>
                    <div className="flex flex-col justify-between items-center">
                        <img onClick={()=>setAvatarModalOpen(true)} src={(profileImg) ? `${profileImg}`:`https://placehold.co/125?text=user`} alt={'user'} className="rounded-full cursor-pointer " width={125} height={150} />
                        <h1 className="mt-4 text-2xl font-bold" >{user.firstName} {user.lastName}</h1>
                        <p className="text-gray-400" >@{(user.firstName).toLowerCase()}{(user.lastName)?.toLowerCase()}</p>
                        <button onClick={handleProfileEdit} className="border border-gray-300 bg-transparent mt-2 px-2 py-1 font-semibold" >Edit Profile</button>
                        <p className="mt-4" >
                            {isEditing? <div className="p-4 bg-white" > <textarea rows={4} cols={50} value={bio} onChange={(e)=>setBio(e.target.value)} /> 
                                <div className="flex gap-2 justify-end ">
                                <button onClick={()=>setIsEditing(false)} className="bg-gray-400 px-3 py-1 rounded">Cancel</button>
                                <button onClick={handleSave} className="bg-blue-400 px-3 py-1 rounded" >Save</button>
                                </div>
                            </div>:bio}
                            
                            </p>
                        <p className="text-red-400 mt-3" >{user.firstName}{user.lastName}.com</p>
                        <div className="bg-white mt-2 flex gap-8 px-7 py-4">
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >0</p>
                                <p>Following</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >{userPosts.length}</p>
                                <p>Posts</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >37.3K</p>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>
                    {/* Avatar Modal */}
          {isAvatarModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-gray-300 p-8 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Choose an Avatar</h2>
                <div className="grid grid-cols-2 gap-4">
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
                    <div className="mt-4" >
                        <h1 className="text-2xl font-bold" >Your Posts</h1>
                        {userPosts.map((post)=>(
                            <PostCard key={post.id} post={post} page="profile" />
                        ))}
                    </div>
                </div>
            </QuickPostLayout>
        </div>
    )
}

export default UserProfileScreen;

// {user?.profileImageURL? `${user.profileImageURL}`:`https://placehold.co/50?text=user`}