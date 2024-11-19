import { useState } from "react";
import { CiBookmark, CiHeart, CiShare2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getRelativeTime } from "../../config/utils";
import { likePost, Post } from "../../features/Posts/postSlice";
import { AppDispatch } from "../../redux/store";


interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    
    const [liked,setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const dispatch = useDispatch<AppDispatch>();

    const handleLike = () => {
        if(liked){
            setLikesCount(likesCount-1)
        }else{
            setLikesCount(likesCount+1)
        }
        setLiked(!liked);
        const token = localStorage.getItem("QP-authToken") as string
        const postId = post.id
        dispatch(likePost({postId, liked, token}))
    }

    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src={post?.author?.profileImageURL? `${post?.author?.profileImageURL}`:`https://placehold.co/50?text=user`} alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <h5>{post?.author.firstName} {post?.author.lastName} <span className="text-sm text-gray-400 px-1" >@{(post?.author.firstName)?.toLocaleLowerCase()}{(post?.author.lastName)?.toLocaleLowerCase()}</span> <span className="text-sm text-gray-400" >
                        · {getRelativeTime(post.createdAt)}
                        </span></h5>
                    <p>{post?.content}</p>
                    <div className="flex justify-between text-xl mt-5">
                        <div onClick={handleLike} className="flex justify-between gap-2" >
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
                        <CiBookmark />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;