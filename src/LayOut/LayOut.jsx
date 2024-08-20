

import {  Outlet, RouterProvider ,createBrowserRouter } from 'react-router-dom'

//paginas...................
import Login from '../pages/login/Login'
import Singup from '../pages/signup/Signup'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import ChatBox from '../pages/chatbox/ChatBox'


//componentes...........
import Nav from '../components/nav/Nav'
import LeftBar from '../components/leftbar/LeftBar'
import RightBar from '../components/rightbar/RightBar'
import Market from '../components/market/Market'
import PostForm from '../components/PostForm/PostForm'
import Posts from '../components/posts/Posts'



export default function LayOut() {

//feed..........
const Feed =() => {
  return (
    <>
    < Nav/>
       <main>
        <LeftBar/> 
      <div className="container">
        <Outlet/>
      </div>
      <RightBar />
     </main>
    </>
  )
}


  //routers..................
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Feed/>  ,
      children:[
        {
          path:'/',
          element: <Market />,
          children: [
            {
              path:'',
              element: <Posts />
            },
            {
              path:'post',
              element: <PostForm />
            }
          ]
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
        {
          path: '/chatbox/:id',
          element: <ChatBox />
        },
        {
          path: '/market',
          element: <Market />,
          children: [
            {
              path:'post',
              element: <PostForm />
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Singup />
    }
  ])
  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}
