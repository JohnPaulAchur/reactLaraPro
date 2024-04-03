import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import Preloader from "./Preloader.jsx";


function DefaultLayout() {
    let imgLink = 'dummy.jpg';
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const { user, token, setUser, setToken } = useStateContext();

    

    const logoutFunc = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    useEffect(() => {
        const { pathname } = location;
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
                setLoading(false); // Mark loading as false when user data is fetched
                setActiveLink(pathname);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false); // Mark loading as false even in case of error
            });
    }, [location, setUser]);

    if (!token) {
        return (
            <div>
                <Navigate to="/login" />
            </div>
        );
    }
    if (loading) {
        return (
            <div id="defaultLayout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Preloader /></div>
        
        );
    }
    return (
        <div id="defaultLayout">
            <aside>
                        {user && user.utype === 'ADM' && (
                            <div>
                                <Link to="/dashboard" style={{ backgroundColor: activeLink === "/dashboard" ? "rgba(0, 0, 0, 0.5)" : "transparent" ,display:"flex", justifyContent:"space-around"}}><i className="bi bi-speedometer"></i> Dashboard</Link>
                                <Link to="/users" style={{ backgroundColor: activeLink === "/users" ? "rgba(0, 0, 0, 0.5)" : "transparent" ,display:"flex", justifyContent:"space-around"}}><i className="bi bi-people-fill"></i> Users</Link>
                                <Link to="/messages" style={{ backgroundColor: activeLink === "/messages" ? "rgba(0, 0, 0, 0.5)" : "transparent" ,display:"flex", justifyContent:"space-around"}}><i className="bi bi-chat-dots-fill"></i> Messages</Link>
                            </div>
                        )}
                        {user && user.utype === 'USR' && (
                            <div>
                                <Link to="/my-messages" style={{ backgroundColor: activeLink === "/my-messages" ? "rgba(0, 0, 0, 0.5)" : "transparent" ,display:"flex", justifyContent:"space-around"}}><i className="bi bi-chat-dots-fill"></i> My Messages</Link>
                                <Link to="/send-message" style={{ backgroundColor: activeLink === "/send-message" ? "rgba(0, 0, 0, 0.5)" : "transparent" ,display:"flex", justifyContent:"space-around"}}><i className="bi bi-pencil-fill"></i> Write Messages</Link>
                            </div>
                        )}
            </aside>
            <div className="content">
                <header>
                    <div style={{color:"green",fontWeight:"bold"}} className="logoHeader">
                        User Reg. System
                    </div>
                    <div className="profileDet">
                        <img src={imgLink} alt="Description" style={{ width: '40px', height: 'auto', borderRadius:'100%',marginRight:'7px' }} />
                        {user && user.name && <span>{user.name}</span>} &nbsp;
                        <a href="#" onClick={logoutFunc} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout;
