import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { MdOutlineGifBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice";
import { AppDispatch, RootState } from "../../redux/store";



const CreatePostCard: React.FC = () => {

    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute("type","file");
        input.setAttribute("accept","image/*");
        input.click();
    },[])

    const [content, setContent] = useState("")
    const {status} = useSelector((state:RootState)=> state.posts);
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClick = () =>{
        const token = localStorage.getItem("QP-authToken") as string;
        if(!token) toast.error("login to create post");
        dispatch(createPost({content,token}))
        if(status === "success"){
            setContent("");
        }
    }
    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src="https://avatars.githubusercontent.com/u/64761352?v=4" alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <textarea onChange={(e)=>setContent(e.target.value)} value={content} className="w-full bg-gray-100 p-3 " rows={4} name="tweet" placeholder="Write something interesting ..."></textarea>
                    <div className="flex justify-between text-lg mt-3 ">
                        <div className="flex justify-between gap-3">
                        <FaImage onClick={handleSelectImage} />
                        <MdOutlineGifBox />
                        <BsEmojiSmile />
                        </div>
                        <div>
                            <button className="text-white bg-red-400 rounded-lg px-3" onClick={handleOnClick} >Post</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreatePostCard;