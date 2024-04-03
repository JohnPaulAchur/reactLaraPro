import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value={{
            user, setUser, token, setToken
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

export const ProtectedRoute = ({ component, allowedTypes }) => {
    const { user } = useStateContext();
    console.log("User type:", user.utype);
    if (user && allowedTypes.includes(user.utype)) {
        return component;
    } else {
        return <Navigate to="/access-denied" />;
    }
};
