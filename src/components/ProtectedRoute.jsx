import { useContext} from "react";
import { Navigate} from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children}) {
    const{user,loading} =useContext(AuthContext);

    if(loading) {
        return <div>Loading ...</div>
    }


    if(!user) {
        return <Navigate to="/sign-up" replace/>
    }
    return children;
}