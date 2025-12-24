import { useState, createContext, useContext } from "react"

const AuthContext = createContext() //1RO . creamos el contexto

/* deco de TOKEN  para ver PAYLOAD */
const decodeJWT = (token) => {
    try {
        const base64Payload = token.split(".")[1];   //divide su base con criterio "." queda divido en 3= 0,1,2
        const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/")); // la conversio de base64URL a base64 normal
        return JSON.parse(payload);    //parseo de json a js
    } catch (error) {
        return null;
    }
};

/* AUTHPROVIDER */
const AuthProvider = ({ children }) => {  //2DO. FUNCION GRAL. //es un destructuring de props.children

    const savedToken = localStorage.getItem("token")  //pedimos token al localStorage se usa mucho y lo volvemos variable
    const [token, setToken] = useState(savedToken || null) //herramienta 1. si ponemos "" de valor inicial al cambiar de page perdemos el token, siempre debe ir atado al token inicial
    const [user, setUser] = useState(() => savedToken ? decodeJWT(savedToken) : null)  //herramienta 2.ya no va a tener el valor boolean sino que va estar atado al payloadToken, user=payloadToken (sino al reiniciar la pagina se pierde el token y el true)

    const login = (token) => {  //herramienta 3. que despues vamos a poder llamar mediante el custom hook
        localStorage.setItem("token", token)  //guardamos TOKEN en almacenamiento local p/poder usarlo desde las otras pages,("nombre", value)
        setToken(token) // es el primero generado antes de que exista savedToken, que es producto de leer este token
        setUser(decodeJWT(token))
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null) //
        setUser(null) //herramienta 4. que despues vamos a poder llamar mediante el custom hook


    }
    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>  {/*El .Provider tiene una propiedad (prop) obligatoria llamada value. Lo que pongas dentro de value es lo que se repartirá a toda la aplicación.*/}
            {children}  {/* si no va entre {} seria "string" */}
        </AuthContext.Provider>
    )
}

//Custom Hook
const useAuth = () => useContext(AuthContext) //3RO. CAJA HERRAMIENTAS.//funcion p usar herramientas "useContext"

//Export
export { AuthProvider, useAuth }  // 4TO. exportamos el caja de herramientas useAuth y la funcion que las contiene