import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Register = () => {
  const navigate = useNavigate()      //registrado va al login
  //crear Estados de manejo de inputs
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  //capturar inputs 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value   //1ro. seleccionamos dinamicamente el input por su nombre/2do.caputramos su valor
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {            /* enviamos al back la peticion */
      const response = await fetch("https://db-utn-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      /* respuestas al usuario despues de validacion */
      const responseData = await response.json()  //pasamos a js el json
      if (!responseData.succes) {
        return alert(responseData.error) //??
      }
      alert("✅usuario creado con exito")
      
      navigate("/login")
    

    } catch (error) {
      console.log("error al registrarse el usuario")
    }
  }

  return <Layout>   {/*//Layout contiene header-main-footer*/}
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form-card centered-form" >
        <h2>Registrarse</h2>

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
        />

        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          placeholder="Cree una contraseña"
          onChange={handleChange}
        />

        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  </Layout>
};

export default Register;
