/* PROTECTED  se usa para restringir acceso a direcciones url en caso de no cumplir condicion */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouter = ({children})=>{
    const {user} = useAuth()
    if(!user){
        return <Navigate to ={"/login"} /> //return <jsx/> /si no hay usuario vamos a login
     }
     return children // retorna el children filtrado p renderizar
    }
export default ProtectedRouter