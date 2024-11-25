import { useDispatch, useSelector } from "react-redux";
import { updateUserFollower, User } from "../../features/User/userSlice";
import { AppDispatch, RootState } from "../../redux/store";



const FollowerSuggestionCard : React.FC<User> = ({user}) => {

    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('QP-authToken') as string
    const currentUser = useSelector((state:RootState)=> state.auth.user);

    const handleFollowClick = (userId) => {
        dispatch(updateUserFollower({from:`${currentUser?.id}`,to:`${userId}`, follow: true, token}))
        window.location.reload();
    }

    return(
        <div className="p-4 grid grid-cols-8 mb-2" >
            <div className="col-span-2">
                <img src={user.profileImageURL || `https://placehold.co/50?text=${user.firstName}`} height={50} width={50} className="rounded-full" alt="user" />
            </div>
            <div className="col-span-4">
                <h5 className="my-0" >{user.firstName}{user.lastName}</h5>
                <h5 className="text-slate-400" >@{user.firstName}{user.lastName}</h5>
            </div>
            <div className="col-span-2" >
                <button className="text-red-300" onClick={()=> handleFollowClick(user.id)} >Follow +</button>
            </div>
        </div>
    )
}

export default FollowerSuggestionCard;