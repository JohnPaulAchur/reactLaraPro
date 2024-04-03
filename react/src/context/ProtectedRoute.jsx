import { Navigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider";



export const ProtectedRoute = ({ component, allowedTypes }) => {
    const { user } = useStateContext();
    console.log("User type:", user.name);
    if (user && allowedTypes.includes(user.utype)) {
        return component;
    } else {
        return <Navigate to="/access-denied" />;
    }
};