// import { createBrowserRouter } from "react-router-dom";
// import Users from './views/Users';
// import Login from './views/Login';
// import SignUp from './views/SignUp';
// import GuestLayout from './components/GuestLayout';
// import DefaultLayout from './components/DefaultLayout';
// import NotFound from "./views/NotFound";
// import Dashboard from "./views/Dashboard";

// const router = createBrowserRouter ([

//     {
//         path: '/',
//         element: <DefaultLayout /> ,
//         children: [
//             {
//                 path: '/',
//                 // element: <Navigate to="/users" />
//                 // OR
//                 element: <Users />
//             },
//             {
//                 path: '/users',
//                 element: <Users />
//             },
//             {
//                 path: '/dashboard',
//                 element: <Dashboard />
//             },
//         ]
//     },
//     {
//         path: '/',
//         element: <GuestLayout /> ,
//         children: [
//             {
//                 path: '/',
//                 element: <Users />
//             },
//             {
//                 path: '/login',
//                 element: <Login />
//             },
//             {
//                 path: '/signUp',
//                 element: <SignUp />
//             },
//         ] 
//     },
//     {
//         path: '*',
//         element: <NotFound />
//     },
    

//     ]);

// export default router;





import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import CreateUser from "./views/CreateUser.jsx";
import UpdateUser from "./views/UpdateUser.jsx";
import MyMessages from "./views/MyMessages.jsx";
import SendMessage from "./views/SendMessage.jsx";

import AccessDenied from "./views/AccessDenied.jsx";
import { ProtectedRoute } from "./context/ContextProvider.jsx";
import UsersMessages from "./views/UsersMessages.jsx";
// import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute component={<Dashboard />} allowedTypes={['ADM']} />
      },
      {
        path: '/users',
        element: <ProtectedRoute component={<Users/>} allowedTypes={['ADM']} />
      },
      {
        path: '/create-user',
        element: <ProtectedRoute component={<CreateUser key='createUser' />} allowedTypes={['ADM']} />
      },
      {
        path: '/edit-user/:id',
        element: <ProtectedRoute component={<UpdateUser key='updateUser' />} allowedTypes={['ADM']} />
      },
      {
        path: '/messages',
        element: <ProtectedRoute component={<UsersMessages />} allowedTypes={['ADM']} />
      },
      {
        path: '/my-messages',
        element: <MyMessages key='MyMessages' />
      },
      {
        path: '/send-message',
        element: <SendMessage key='SendMessage' />
      },
      {
        path: "/access-denied",
        element: <AccessDenied/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  },
])

export default router;