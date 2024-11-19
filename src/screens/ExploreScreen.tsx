import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/FeedCard/PostCard";
import QuickPostLayout from "../components/Layout/QuickPostLayout";
import { fetchPosts } from "../features/Posts/postSlice";
import { AppDispatch, RootState } from "../redux/store";

interface ExploreTopics {
    title: string;
}

const topics: ExploreTopics[] = [
    {title: 'Trending'},
    {title: 'Technology'},
    {title: 'Sports'},
    {title: 'News'},
]

const ExploreScreen:React.FC = () => {

    const posts = useSelector((state:RootState)=> state.posts.posts)
    const dispatch = useDispatch<AppDispatch>();
    if(posts.length === 0){
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchPosts(token))
    }
    return(
        <div>
            <QuickPostLayout>
                <div className="mt-4" >
                    <h1 className="text-2xl font-bold" >Explore</h1>
                    <div className="flex justify-between mt-3" >
                    <button className="border border-gray-300 bg-transparent px-5 py-2 " >For You</button> 
                    {topics.map((topic)=>(
                        <button key={topic.title} className="border border-gray-300 bg-transparent text-gray-400 px-3 py-1 " >{topic.title}</button> 
                    ))} 
                    </div>
                    <div>
                    {posts.map((post)=>(
                    <PostCard key={post.id} post={post} page="explore" />
                ))} 
                    </div>
                </div>
            </QuickPostLayout>
        </div>
    )
}

export default ExploreScreen;