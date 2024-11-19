import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickPostLayout from "../components/Layout/QuickPostLayout";

import PostCard from "../components/FeedCard/PostCard";
import { fetchUserPosts } from "../features/Posts/postSlice";
import { AppDispatch, RootState } from "../redux/store";

const UserProfileScreen:React.FC = () => {

    const user = useSelector((state: RootState)=> state?.auth.user)
    const userPosts = useSelector((state:RootState)=> state?.posts.userPosts);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchUserPosts(token))
    },[dispatch])

    return(
        <div>
            <QuickPostLayout>
                <div>
                    <div className="flex flex-col justify-between items-center">
                        <img src={(user?.profileImageURL) ? `${user?.profileImageURL}`:`https://placehold.co/125?text=user`} alt={user.firstName} className="rounded-full" width={125} height={150} />
                        <h1 className="mt-4 text-2xl font-bold" >{user.firstName} {user.lastName}</h1>
                        <p className="text-gray-400" >@{(user.firstName).toLowerCase()}{(user.lastName)?.toLowerCase()}</p>
                        <button className="border border-gray-300 bg-transparent mt-2 px-2 py-1 font-semibold" >Edit Profile</button>
                        <p className="mt-4" >Senior Software Engineer @Microsoft | Creator of India’s biggest programming community | Tweets about JavaScript, ReactJS, Career and Startups</p>
                        <p className="text-red-400 mt-3" >{user.firstName}{user.lastName}.com</p>
                        <div className="bg-white mt-2 flex gap-8 px-7 py-4">
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >0</p>
                                <p>Following</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >2K</p>
                                <p>Posts</p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className="font-bold" >37.3K</p>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4" >
                        <h1 className="text-2xl font-bold" >Your Posts</h1>
                        {userPosts.map((post)=>(
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </QuickPostLayout>
        </div>
    )
}

export default UserProfileScreen;

// {user?.profileImageURL? `${user.profileImageURL}`:`https://placehold.co/50?text=user`}