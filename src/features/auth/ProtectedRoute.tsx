import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { baseURL } from "../../config/constants";
import { RootState } from "../../redux/store";
import { clearUser, setUser } from "./authSlice";
// import { clearUser, setUser } from "./authSlice";


interface SigninResponse {
    user: object
  }

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)

    const dispatch = useDispatch();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const verifyToken = async () => {
            const token = localStorage.getItem("QP-authToken");
            if(!token){
                dispatch(clearUser());
                toast.error("Please login")
                setIsLoading(false)
                return;
            }
            try{
                const response = await axios.get<SigninResponse>(`${baseURL}/api/auth/signin`,{
                    headers: {Authorization: `Bearer ${token}`}
                })
                dispatch(setUser(response.data.user))
            }catch(error){
                console.log(error);
                dispatch(clearUser());
            }finally{
                setIsLoading(false);
            }
        }
        if(!isAuthenticated){
            verifyToken();
        }
        
    },[isAuthenticated, dispatch])

    if(isLoading){
        return <div>Loading....</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return <>{children}</>;
    
}

export default ProtectedRoute;