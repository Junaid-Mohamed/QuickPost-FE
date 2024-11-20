import { useEffect, useState } from "react";
import { CiBookmark, CiHeart, CiShare2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoBookmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getRelativeTime } from "../../config/utils";
import { deleteUserPost, editUserPost, likePost, Post } from "../../features/Posts/postSlice";
import { updateBookmarkedPost } from "../../features/User/userSlice";
import { AppDispatch, RootState } from "../../redux/store";


interface PostCardProps {
    post: Post;
    page:string
}

const PostCard: React.FC<PostCardProps> = ({post,page}) => {
    
    const userBookmarkedPosts = useSelector((state:RootState)=> state.users.bookmarkPosts)
    
    const [liked,setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    
    const [isBookmarked, setIsBookmarked] = useState(false);

    // for profile page delete/edit post
    const [postOptionModal, setPostOptionModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content)    

    const token = localStorage.getItem("QP-authToken") as string
    const dispatch = useDispatch<AppDispatch>();

        // Effect to check if the post is bookmarked
        useEffect(() => {
            const isAlreadyBookmarked = userBookmarkedPosts.some(
                (bookmarkedPost) => bookmarkedPost.id === post.id
            );
            setIsBookmarked(isAlreadyBookmarked);
        }, [userBookmarkedPosts, post.id]);
    

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
        setPostOptionModal(false)
        dispatch(deleteUserPost({postId,token}))
    }

    const handleEditPost = () => {
        setPostOptionModal(false);
        setIsEditing(true)
    }

    const handleSaveEditedPost = () =>{
        setPostOptionModal(false);
        const postId = post.id;
        dispatch(editUserPost({postId, editedContent,token}));
        setIsEditing(false);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(post.content);
    }

    const handleBookmark = () =>{
        const newBookmarkState = !isBookmarked;
        setIsBookmarked(newBookmarkState);
        const postId = post.id;
        dispatch(updateBookmarkedPost({postId,isBookmarked:newBookmarkState,token}))
        
        
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
                onClick={handleEditPost }
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
                        { isEditing ? (
                            <div>
                                <textarea value={editedContent}
                                 onChange={((e)=> setEditedContent(e.target.value))} 
                                 className="w-full p-2 border rounded"
                                 ></textarea>
                                <div className="flex justify-end gap-2 mt-2" >
                                    <button onClick={handleSaveEditedPost} className="bg-blue-500 text-white px-4 py-2 rounded" >
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded" >
                                        Cancel
                                    </button>
                                </div> 
                            </div>
                        )
                        :
                         (<p>{post?.content}</p>)
                        }
                    
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
                        {isBookmarked? <IoBookmark onClick={handleBookmark} className="cursor-pointer" />: <CiBookmark onClick={handleBookmark} className="cursor-pointer" />
                        }
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;