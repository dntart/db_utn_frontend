import { useState, createContext, useContext } from "react"

const AuthContext = createContext() //1RO . creamos el contexto

const AuthProvider = ({children}) => {  //2DO. FUNCION GRAL. //es un destructuring de props.children
    const [user, setUser] = useState(false)  //herramienta 1

    const login = (token) =>  {  //herramienta 2 que despues vamos a poder llamar mediante el custom hook
    console.log(token) 
    localStorage.setItem("token", token)  //guardamos TOKEN en almacenamiento local p/poder usarlo desde las otras pages,("nombre", value)
    setUser(true)
    } 

    const logout = () => setUser(false) //herramienta 3 que despues vamos a poder llamar mediante el custom hook
   
     return (
        <AuthContext.Provider value={{ user, login, logout }}>  {/*El .Provider tiene una propiedad (prop) obligatoria llamada value. Lo que pongas dentro de value es lo que se repartirá a toda la aplicación.*/}
            {children}  {/* si no va entre {} seria "string" */}
        </AuthContext.Provider>
    )
}

//Custom Hook
const useAuth = () => useContext(AuthContext) //3RO. CAJA HERRAMIENTAS.//funcion p usar herramientas "useContext"

//Export
export { AuthProvider, useAuth }  // 4TO. exportamos el caja de herramientas useAuth y la funcion que las contiene