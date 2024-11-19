import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePostCard from "../components/CreatePostCard/CreatePostCard";
import PostCard from "../components/FeedCard/PostCard";

import QuickPostLayout from "../components/Layout/QuickPostLayout";

import { GrSort } from "react-icons/gr";
import { fetchPosts } from "../features/Posts/postSlice";
import { AppDispatch, RootState } from "../redux/store";


const HomeScreen = () => {

    const posts = useSelector((state:RootState)=> state.posts.posts)
    const dispatch = useDispatch<AppDispatch>();

    const [filterModal,setFilterModal] = useState(false);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("QP-authToken") as string;
        dispatch(fetchPosts(token))
    },[dispatch])
    
    // console.log(new Date(posts[1].createdAt));
    // console.log(getRelativeTime(posts[1].createdAt));

    const postList = sortedPosts.length>0? sortedPosts : posts
    const handleSort = (criteria:string) => {
        setFilterModal(false);
        /**
         * React's state should not be mutated directly. The posts array is assumed to come
         * from a state or a prop, so modifying it directly can lead to unexpected behaviors.
         * If you don't spread the array, sorting would modify the posts array in place, which 
         * could lead to bugs if the same array is needed elsewhere in the component or app.
         */
        const sorted = [...posts].sort((a,b)=>{
            if(criteria === "trending"){
                return b.likes - a.likes;
            }
            if(criteria === "date"){
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            return 0;
        })
        setSortedPosts(sorted);
    }

    return(
       <QuickPostLayout>
        <div>
        <CreatePostCard/>
        <div className="flex justify-between items-center" >
        <h1 className="sm:text-2xl font-semibold" >Lastest post</h1>
        <div className="relative">
          <GrSort className="cursor-pointer" onClick={()=> setFilterModal(true)} />
          { filterModal && 
          <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded w-40">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSort("trending")}
              >
                Trending
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date
              </li>
            </ul>
          </div> }
        </div>
      </div>
      
                {postList.map((post)=>(
                    <PostCard key={post.id} post={post} />
                ))}
        </div>
       </QuickPostLayout>
    )
}

export default HomeScreen;