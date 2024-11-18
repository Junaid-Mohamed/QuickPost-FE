import { CiBookmark, CiHeart, CiShare2 } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { Post } from "../../features/Posts/postSlice";

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    
    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src={post?.author?.imageUrl? `${post?.author?.imageUrl}`:`https://placehold.co/50?text=user`} alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <h5>{post?.author.firstName} {post?.author.lastName}</h5>
                    <p>{post?.content}</p>
                    <div className="flex justify-between text-xl mt-5">
                        <div>
                        <CiHeart />
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