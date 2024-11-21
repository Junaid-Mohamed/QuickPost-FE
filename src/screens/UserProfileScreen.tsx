import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickPostLayout from "../components/Layout/QuickPostLayout";

import { useNavigate } from "react-router-dom";
import PostCard from "../components/FeedCard/PostCard";
import { fetchUser } from "../features/Auth/authSlice";
import { fetchUserPosts } from "../features/Posts/postSlice";
import { updateUserProfile } from "../features/User/userSlice";
import { AppDispatch, RootState } from "../redux/store";

const UserProfileScreen:React.FC = () => {

    const user = useSelector((state: RootState)=> state?.auth.user)
    const userPosts = useSelector((state:RootState)=> state?.posts.userPosts);
    const dispatch = useDispatch<AppDispatch>();
    
    const [isEditing,setIsEditing] = useState(false);
    const [bio,setBio] = useState(user.bio)
    const [profileImage, setProfileImg] = useState("");

    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

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
            dispatch(fetchUserPosts(token));
            dispatch(fetchUser(token));
    },[dispatch])

  

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

    return(
        <div>
            <QuickPostLayout>
                <div>
                    <div className="flex flex-col justify-between items-center">
                        <img onClick={()=>setAvatarModalOpen(true)} src={(user.profileImageURL) ? `${user.profileImageURL}`:`https://placehold.co/125?text=user`} alt={'user'} className="rounded-full cursor-pointer " width={125} height={150} />
                        <h1 className="mt-4 text-2xl font-bold" >{user.firstName} {user.lastName}</h1>
                        <p className="text-gray-400" >@{(user.firstName).toLowerCase()}{(user.lastName)?.toLowerCase()}</p>
                        <button onClick={()=>setIsEditing(true)} className="border border-gray-300 bg-transparent mt-2 px-2 py-1 font-semibold" >Edit Profile</button>
                        <p className="mt-4" >
                            {isEditing? <div className="p-4 bg-white" > <textarea rows={4} cols={50} value={bio} onChange={(e)=>setBio(e.target.value)} /> 
                                <div className="flex gap-2 justify-end ">
                                <button onClick={()=>setIsEditing(false)} className="bg-gray-500 px-3 py-1 text-white rounded">Cancel</button>
                                <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded" >Save</button>
                                </div>
                            </div>:user.bio}
                            
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