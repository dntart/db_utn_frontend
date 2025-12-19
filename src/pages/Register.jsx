import Layout from "../components/Layout";

const Register = () => {
    return <Layout>   {/*//Layout contiene header-main-footer*/}
       <div className="center-container">
      <form className="form-card centered-form">
        <h2>Registrarse</h2>

        <label>Email</label>
        <input type="email" placeholder="Correo electrónico" />

        <label>Contraseña</label>
        <input type="password" placeholder="Cree una contraseña" />

        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
    </Layout>
};

export default Register;
