import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import HomeScreen from './screens/HomeScreen.tsx'
import Login from './screens/Login.tsx'
import Signup from './screens/Signup.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/home',
    element: <HomeScreen/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/login",
    element: <Login/>
  }
])


createRoot(document.getElementById('root')!).render(
  
  <GoogleOAuthProvider clientId='692226496273-u1h3mcfo3b504cf014me5todaqim9isa.apps.googleusercontent.com' >
    <RouterProvider router={router} />
    <Toaster/> {/** global toast to use for notification.*/}
    </GoogleOAuthProvider>
)
