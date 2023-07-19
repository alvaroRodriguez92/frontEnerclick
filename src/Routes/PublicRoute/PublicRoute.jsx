import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export default function PublicRoute(){
    const token = localStorage.getItem("token");
    const {activarNavigate} = useAuthContext()
    const {location} = useLocation()

    return activarNavigate ? (
        <Navigate to="/configuracion" state={{ from: location }} replace />
        
      ) : (<Outlet />
      ) 
}