import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import ProtectedRoute from './features/Auth/ProtectedRoute.tsx'
import './index.css'
import store from './redux/store.ts'
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
    element: <ProtectedRoute><HomeScreen/></ProtectedRoute> 
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
  <Provider store={store} >
  <GoogleOAuthProvider clientId='692226496273-u1h3mcfo3b504cf014me5todaqim9isa.apps.googleusercontent.com' >
    <RouterProvider router={router} />
    <Toaster/> {/** global toast to use for notification.*/}
    </GoogleOAuthProvider>
    </Provider>
)
