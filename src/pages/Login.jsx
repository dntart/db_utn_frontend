import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { login } = useAuth() // login cambia el valor (setea) de user de false a true
    const navigateUser = useNavigate()  // invocamos a useNavigate para ir a la ruta depsues de iniciar sesion

    const handleSubmit = (e) => {
        e.preventDefault() //preveni el reinicio de pagina
        login() //ejectua login on submit
        navigateUser("/")  //vamos al home despues de iniciar sesion
    }

    return <Layout>   {/*//Layout contiene header-{main}-footer*/}
        <div className="center-container">
            <form onSubmit={handleSubmit}
                className="form-card centered-form">
                <h2>Iniciar Sesión</h2>

                <label>Email</label>
                <input type="email" placeholder="Ingrese su email" />

                <label>Contraseña</label>
                <input type="password" placeholder="Ingrese su contraseña" />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    </Layout>
};

export default Login;
