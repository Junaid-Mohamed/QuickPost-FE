import { useState } from "react";
import { CiBookmark, CiHeart, CiShare2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { getRelativeTime } from "../../config/utils";
import { deleteUserPost, likePost, Post } from "../../features/Posts/postSlice";
import { AppDispatch } from "../../redux/store";


interface PostCardProps {
    post: Post;
    page:string
}

const PostCard: React.FC<PostCardProps> = ({post,page}) => {
    
    const [liked,setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);

    // for profile page delete/edit post
    const [postOptionModal, setPostOptionModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const token = localStorage.getItem("QP-authToken") as string
    const dispatch = useDispatch<AppDispatch>();

    const handleLike = () => {
        if(liked){
            setLikesCount(likesCount-1)
        }else{
            setLikesCount(likesCount+1)
        }
        setLiked(!liked);
       
        const postId = post.id
        dispatch(likePost({postId, liked, token}))
    }

    const handleDeletePost = (postId:string) => {
        dispatch(deleteUserPost({postId,token}))
    }

    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white p-5">
                <div className="col-span-1">
                    <img src={post?.author?.profileImageURL? `${post?.author?.profileImageURL}`:`https://placehold.co/50?text=user`} alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <div className="flex justify-between items-center relative">
                    <h5>{post?.author.firstName} {post?.author.lastName} <span className="text-sm text-gray-400 px-1" >@{(post?.author.firstName)?.toLocaleLowerCase()}{(post?.author.lastName)?.toLocaleLowerCase()}</span> <span className="text-sm text-gray-400" >
                        · {getRelativeTime(post.createdAt)}
                        </span></h5>
                        { page === "profile"  ? <div className="text-gray-400 cursor-pointer" ><HiDotsHorizontal onClick={()=>setPostOptionModal(!postOptionModal)} />
                        {
                            postOptionModal && 
                            <div className="absolute top-full right-0  bg-white shadow-lg border rounded w-20">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("edit")}
              >
                Edit
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </li>
            </ul>
          </div>
                        }
                        
                        </div>:<p></p>}
                        </div>
                    <p>{post?.content}</p>
                    <div className="flex justify-between text-xl mt-5">
                        <div onClick={handleLike} className="flex justify-between gap-2 cursor-pointer " >
                        {liked?<FaHeart className="text-red-500" />:<CiHeart className="text-red-500" />}
                        <p className="text-sm" >{likesCount}</p>
                        </div>
                        <div>
                        <GoComment />
                        </div>
                        <div>
                        <CiShare2 />
                        </div>
                        <div>
                        <CiBookmark className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;