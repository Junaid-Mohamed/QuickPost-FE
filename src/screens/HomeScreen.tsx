import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePostCard from "../components/CreatePostCard/CreatePostCard";
import PostCard from "../components/FeedCard/PostCard";

import QuickPostLayout from "../components/Layout/QuickPostLayout";

import { fetchPosts } from "../features/Posts/postSlice";
import { AppDispatch, RootState } from "../redux/store";






const HomeScreen = () => {

    const posts = useSelector((state:RootState)=> state.posts.posts)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchPosts(token))
    },[dispatch])
    

    return(
       <QuickPostLayout>
        <div>
        <CreatePostCard/>
                {posts.map((post)=>(
                    <PostCard key={post.id} post={post} />
                ))}
                </div>
       </QuickPostLayout>
    )
}

export default HomeScreen;