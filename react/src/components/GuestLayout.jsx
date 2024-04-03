import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Preloader from "./Preloader.jsx";
import axiosClient from "../axios-client.js";
 function GuestLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(true);
    console.log(user.utype)

    useEffect(() => {
        if (token) {
            axiosClient.get('/user')
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false); // Mark loading as false when user data is fetched
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false); // Mark loading as false even in case of error
                });
        } else {
            setLoading(false);
        }
    }, [token, setUser]);


    if (loading) {
        return (
            <div id="guestLayout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Preloader /></div>
        
        );
    }else
    if (token) {
        return (
            <div>
                <Navigate to={user.utype=='ADM'?"/dashboard":"/my-messages"} />
            </div>
        );
    }
    if(!loading){
        // Redirect unauthenticated users to the login page ("/login")
        return (
            <div id="guestLayout">
                <Outlet />
            </div>
        );

    }
    
        
    // This part of the code will not be reached because the function returns inside the conditional blocks
    
}


export default GuestLayout;
