import { useState } from "react";
import Layout from "../components/Layout";

const AddProduct = () => {

    //captura del contenido del form
    const [formData, setFormData] = useState({  //valor inicial
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    })

    //manejador del button form
    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataToSend = {   //p soluciona el problema de q los numbers se convierten automaticamente en string en el input 
            ...formData,  //el operador de propagacion si no tiene las keys las crea y si existen las modifica
            price: Number(formData.price),
            stock: Number(formData.stock)

        }

        try {
            const response = await fetch(`https://db-utn-backend.onrender.com/products`, { // vamos a backend y el back gestiona la api
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend) //pasamos a json formData
            })
            if (!response.ok) {
                alert("❌Producto NO agregado")
                return
            }
            alert("✅Producto agregado con éxito")

            setFormData({  //vuelve el input.value a valor "" inicial /cuando envia el formulario
                name: "",
                description: "",
                price: "",
                stock: "",
                category: ""
            })

        } catch (error) {

        }


    }

    //captura cambios en inputs del form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })  //1ro operador de propagacion...formData trae todo las key del object automaticamente,2do [nombreDelInput]trae el valor de name ej stock y conecta e, 3ro el valor del key, ej stock:1(valor)

    }


    return <Layout>
        <div className="page-container">

            {/* Banner */}
            <section className="banner">
                <h1>Agregar un nuevo producto</h1>
                <p>Complete el siguiente formulario para cargar un producto en el sistema.</p>
            </section>

            {/* Formulario */}
            <section className="form-section">
                <form className="form-card" onSubmit={(e) => handleSubmit(e)}> {/*onSubmit lleva una funcion q espera evento (e) pq no se ejecute de arranque */}

                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name" //conecta el input con el estado
                        placeholder="Nombre del producto"
                        minLength={3}
                        maxLength={20} //{/*minLength xq es "text"*/}
                        onChange={(e) => handleChange(e)}
                        value={formData.name}//volvemos el value a valor inicial "" nada
                    />

                    <label>Descripción</label>
                    <textarea
                        name="description" //conecta el input con el estado
                        placeholder="Descripción del producto"
                        minLength={3}
                        maxLength={200}
                        onChange={(e) => handleChange(e)}
                        value={formData.description}//volvemos el value a valor inicial "" nada

                    >
                    </textarea>

                    <label>Precio</label>
                    <input type="number"
                        name="price" //conecta el input con el estado
                        placeholder="Precio"
                        min={0}  //{/* solo min y no minLength xq es "number"*/}
                        onChange={(e) => handleChange(e)}
                        value={formData.price}//volvemos el value a valor inicial "" nada
                    />

                    <label>Stock</label>
                    <input type="number"
                        name="stock" //conecta el input con el estado
                        placeholder="Stock disponible"
                        min={0}
                        onChange={(e) => handleChange(e)}
                        value={formData.stock}//volvemos el value a valor inicial "" nada
                    />

                    <label>Categoría</label>
                    <input type="text"
                        name="category" //conecta el input con el estado
                        placeholder="Categoría"
                        minLength={3}
                        maxLength={20}
                        onChange={(e) => handleChange(e)}
                        value={formData.category} //volvemos el value a valor inicial "" nada
                    />

                    <button type="submit">Agregar Producto</button>

                </form>
            </section>
        </div>
    </Layout>
};

export default AddProduct;
