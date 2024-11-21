import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { MdOutlineGifBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/Posts/postSlice";
import { AppDispatch, RootState } from "../../redux/store";


interface CreatePostCardProps {
    closeModal?: () => void;
}


const CreatePostCard: React.FC<CreatePostCardProps> = ({closeModal}) => {

    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute("type","file");
        // input.setAttribute("accept","image/*");
        input.click();

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file){
                setSelectedImage(file);
                toast.success("image selected.")
            }
        }
    },[])

    
    const user = useSelector((state:RootState)=> state.auth.user);
    const {status} = useSelector((state:RootState)=> state.posts);
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClickPost = async () =>{
        const token = localStorage.getItem("QP-authToken") as string;
        if(!token) toast.error("login to create post");

        const formData = new FormData();
        formData.append("content",content);
        if(selectedImage){
            formData.append("file",selectedImage);
        }

        const toastId = toast.loading("Posting....");

        await dispatch(createPost({formData,token}))
        if(status === "success"){
            setContent("");
            setSelectedImage(null);
            closeModal?.();
            toast.success("Posted successfully.", {id: toastId});
        }
    }
    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src={user.profileImageURL} alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <textarea onChange={(e)=>setContent(e.target.value)} value={content} className="w-full bg-gray-100 p-3 " rows={4} name="tweet" placeholder="Write something interesting ..."></textarea>
                    { selectedImage && <div className="mt-3" >
                        <img src={URL.createObjectURL(selectedImage)} alt="selected." className="max-h-40 w-fit rounded-md"  />
                        </div>}
                    <div className="flex justify-between text-lg mt-3 ">
                        <div className="flex justify-between gap-3">
                        <FaImage onClick={handleSelectImage} />
                        <MdOutlineGifBox />
                        <BsEmojiSmile />
                        </div>
                        <div>
                            <button className="text-white bg-red-400 rounded-lg px-3" onClick={handleOnClickPost} >Post</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreatePostCard;