import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/FeedCard/PostCard";
import QuickPostLayout from "../components/Layout/QuickPostLayout";
import { fetchBookmarkedPost } from "../features/User/userSlice";
import { AppDispatch, RootState } from "../redux/store";

const BookmarkScreen:React.FC = () => {

    const userBookmarkedPosts = useSelector((state:RootState)=> state.users.bookmarkPosts)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchBookmarkedPost({token})) 
    },[])

    return(
        <div>
            <QuickPostLayout>
                <h1 className="text-2xl font-bold mt-4" >Your Bookmarks</h1>
                {userBookmarkedPosts.map((post)=>(
                    <PostCard key={post.id} post={post} page="bookmark" />
                ))}
            </QuickPostLayout>
        </div>
    )
}

export default BookmarkScreen;