/* 1. El Router (El "Mapa" o "Cerebro")
Su función es puramente lógica. No debería tener estilos solo debe organizar las rutas
 Es quien controla el historial del navegador. Si la URL es /login, el Router busca en su lista y dice: "Ok, toca mostrar el componente <Login />". */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";  //importacion no nombrada puede tener el nombre que elijamos, nombrada seria {}
import ProtectedRouter from "../components/ProtectedRoute";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route
                    path="/agregar-productos"
                    element={             
                        <ProtectedRouter>  {/*restringe el acceso a "/agregar-productos"y ejecutar AddProduct.jsx*/}
                            <AddProduct /> {/* children */}
                        </ProtectedRouter>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
};
export { RouterApp } //exportacion nombrada {}
