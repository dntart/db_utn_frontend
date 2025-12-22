import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { login } = useAuth() // login cambia el valor (setea) de user de false a true
    const navigateUser = useNavigate()  // invocamos a useNavigate para ir a la ruta depsues de iniciar sesion
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault() //prevengp el reinicio de pagina
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData) //envio mi {email:"...", password:"..."}
            })
            const responseData = await response.json() //el response pasado de json a js
            console.log(responseData)

            if (responseData.error) {
                alert(responseData.error) //hay respuesta pero es negativa
                return
            }
            /* REGISTRADO EXITO guardar TOKEN */
            login(responseData.token)
            navigateUser("/")   //vamos al home

        } catch (error) {
            console.log(error) //no hay respuesta
        }

    }

    return <Layout>   {/*Layout contiene header-{main}-footer*/}
        <div className="center-container">
            <form onSubmit={handleSubmit}
                className="form-card centered-form">
                <h2>Iniciar Sesión</h2>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Ingrese su email"
                    onChange={handleChange}
                />

                <label>Contraseña</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    onChange={handleChange}
                />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    </Layout>
};

export default Login;
