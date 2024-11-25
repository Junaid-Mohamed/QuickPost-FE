import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiBookmark, CiSearch } from "react-icons/ci";
import { FaPencil } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { SiAzuredataexplorer } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../features/User/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import CreatePostCard from "../CreatePostCard/CreatePostCard";
import FollowerSuggestionCard from "../FollowerSuggestionCard/FollowerSuggestionCard";
import Navbar from "../Navbar";



interface SidebarButton{
    title: string;
    icon: React.ReactNode; // an icon is a react node.
}

const sidebarMenuItems: SidebarButton[] = [
    {
        title: 'Home',
        icon: <IoHomeOutline />
    },
    {
        title: 'Explore',
        icon: <SiAzuredataexplorer />
    },
    {
        title: 'Bookmark',
        icon: <CiBookmark />

    },
    {
        title: 'Profile',
        icon: <CgProfile />
    },

]

interface QuickPostProps{
    children: React.ReactNode;
}

const QuickPostLayout: React.FC<QuickPostProps> = (props) => {

    const user = useSelector((state: RootState)=> state?.auth.user)
    // console.log("User", user);
    const token = localStorage.getItem("QP-authToken") as string
    const navigate = useNavigate();
    const handleMenuClick = (page:string) => {
        navigate(`/${page.toLowerCase()}`)
    }
    const dispatch = useDispatch<AppDispatch>();
    const allUsers = useSelector((state:RootState)=> state?.users.allUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev)=> !prev)
    }

    useEffect(()=>{
        dispatch(fetchAllUsers({token}))
    },[dispatch])

    // console.log('allUsers',allUsers);

    const newFollowers = allUsers.filter((u)=> u.followings.length>0? !u.followings.some((follower)=>follower.followerId === user.id): false);
    // console.log('following data',followingData)
    // const newFollowers = allUsers.filter((u)=> ) followingData
    return(
        <div className="bg-gray-100" >
        <Navbar/>
    <div className="h-screen px-7 sm:px-20 grid grid-cols-10 gap-8 mt-12 lg:grid-cols-12 " >
        <div className="sticky top-0 col-span-1 md:col-span-3" >
            <ul>
                {sidebarMenuItems.map((item)=>(
                    <li onClick={()=>handleMenuClick(item.title)} className="cursor-pointer text-lg gap-4 flex justify-start items-center my-4"  key={item.title}>
                        <span className="text-xl md:text-lg ">{item.icon}</span>
                        <span className="hidden md:block">{item.title}</span>
                    </li>
                ))}
            </ul>
            <button onClick={toggleModal} className="flex md:text-lg gap-4 bg-red-400 px-3 py-3 w-fit rounded-full md:rounded-lg text-sm " > <span><FaPencil /></span><span className="hidden md:block text-white" >Create new Post</span></button>
            <div className="mt-80 md:flex md:gap-2 items-center :px-3 py-2 w-fit rounded-full">
                {user? <img src={user.profileImageURL} height={50} width={50} className="rounded-full" alt="user" />:""}
                <div className="hidden md:block" >
                  <h3 className="" >{user?.firstName} {user?.lastName}</h3> 
                  <p className="text-gray-400" >@{user.firstName}{user.lastName}</p> 
                </div>
            </div>
        </div>
        <div className="overflow-y-auto scrollbar-hide col-span-9 md:col-span-7 lg:col-span-6" >
          {props.children}
            </div>
        <div className="sticky top-0 hidden lg:col-span-3 lg:block" >
            <div className="border bg-white border-gray-400 flex justify-start gap-2 items-center my-2 px-2 py-1" >
                <CiSearch className="text-xl" />     
                <input className="text-sm w-full py-2 outline-none" type="text" placeholder="Search Posts, People, Anything"  />
            </div>
            <div className="bg-white my-8" >
                <div className="flex justify-between p-4">
                    <h5 className="font-bold">Who to Follow?</h5>
                    <h5 className="text-red-300 font-bold " >Show More</h5>
                </div>
                <hr />
                {newFollowers.map((user)=>(
                    <FollowerSuggestionCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    </div>
    {
        isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-4 rounded-lg w-3/4 sm:w-1/2 relative ">
              <CreatePostCard closeModal={toggleModal} />
              <button
                onClick={toggleModal}
                className="absolute sm:text-2xl top-3 right-3 text-red-400"
              >
                <MdCancel />
              </button>
            </div>
          </div>
        )
    }
    </div>
    )
}

export default QuickPostLayout;