import { CgProfile } from "react-icons/cg";
import { CiBookmark, CiSearch } from "react-icons/ci";
import { FaPencil } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { SiAzuredataexplorer } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeedCard from "../components/FeedCard/FeedCard";
import FollowerSuggestionCard from "../components/FollowerSuggestionCard/FollowerSuggestionCard";
import Navbar from "../components/Navbar";
import { RootState } from "../redux/store";



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


const HomeScreen = () => {

    const user = useSelector((state: RootState)=> state.auth.user)

    return(
        <div>
            <Navbar/>
        <div className="px-20 grid grid-cols-10 gap-8 mt-12 lg:grid-cols-12 " >
            <div className="col-span-3" >
                <ul>
                    {sidebarMenuItems.map((item)=>(
                        <li className="cursor-pointer text-lg gap-4 flex justify-start items-center my-4"  key={item.title}>
                            <span className="text-xl md:text-lg ">{item.icon}</span>
                            <span className="hidden md:block">{item.title}</span>
                        </li>
                    ))}
                </ul>
                <Link to="" className="flex md:text-lg gap-4 bg-red-400 px-3 py-3 w-fit rounded-full md:rounded-lg text-xl " > <span><FaPencil /></span><span className="hidden md:block" >Create new Post</span></Link>
                <div className="mt-80 flex gap-2 items-center bg-gray-200 px-3 py-2 rounded-full">
                    {user? <img src="https://avatars.githubusercontent.com/u/64761352?v=4" height={50} width={50} className="rounded-full" alt="user" />:""}
                    <div>
                      <h3 className="" >{user?.firstName} {user?.lastName}</h3> 
                      <p className="text-gray-400" >@{user.firstName}{user.lastName}</p> 
                    </div>
                </div>
            </div>
            <div className="col-span-6" >
                <FeedCard/> 
                <FeedCard/> 
                <FeedCard/> 
                <FeedCard/> 
                <FeedCard/> 
                
                </div>
            <div className="hidden lg:col-span-3 lg:block" >
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
                    <FollowerSuggestionCard/>
                    <FollowerSuggestionCard/>
                    <FollowerSuggestionCard/>
                    <FollowerSuggestionCard/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default HomeScreen;