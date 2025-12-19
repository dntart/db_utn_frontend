/* . El Layout (El "Marco" o "Cuerpo")
Su función es visual y estructural. Se encarga de que el Header y el Footer se mantengan siempre en su lugar mientras el contenido cambia.
Utiliza la prop {children}. El Layout no sabe qué página está mostrando; solo sabe que tiene que poner un Header arriba, un Footer abajo, y "lo que sea que venga" en el medio. */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Layout = ({ children }) => {   //funcion que envuelve las pages, ahora se usa en pages
    const { user, logout } = useAuth() //sacamos mediante destructuring a user mediante useAuth(cajita de herramientas)
    const navigateUser = useNavigate()

    const handleLogout = (e) => {
        logout()
        navigateUser("/login")          
    }

    return (
        <>
            <nav>     {/* <nav>  {navegador} */}
                <Link to="/">Nuestros productos</Link>
                <Link to="/sobre-nosotros">Sobre nosotros</Link>

                {user &&
                    <>
                        <Link to="/agregar-productos">Agregar productos</Link>
                        <button onClick={handleLogout}>Cerrar Sesion</button>
                    </>}
                {!user &&   /* renderizado condicional a user */
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/registro">Registro</Link>
                    </>
                }
            </nav>

            {/* CONTENIDO INTERNO */}
            <main >
                {children}
            </main>
            {/* FOOTER */}
            <footer>
                <p>Sitio desarrollado por UTN</p>
            </footer>

        </>
    )
};

export default Layout;
