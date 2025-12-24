import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const UpdateProduct = ({ product, onClose, onUpdate }) => {  // componentes siempre en MAYUSCULA/(props)==={}, {product}===props.product, DESTRUCTURING
    const { token } = useAuth()

    const [loader, setLoader] = useState(false)  //estado de carga para ux/ui
    const [formData, setFormData] = useState(
        {
            name: product.name, // este value inicial viene del home/ luego al llenar el input cambia
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category
        })
    const handleChange = (e) => {
        setFormData({  //seteAmos el objeto 
            ...formData,  //traemos el objeto viejo
            [e.target.name]: e.target.value  //identificamos segun nombre//y tomamos le value del input
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataToUpdate = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)

        }
        try {
            setLoader(true)
            const response = await fetch(`http://localhost:3000/products/${product._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify(dataToUpdate)
            })
            const responseData = await response.json() //importante para leer errores res del back

            if (responseData.error) {
                alert(responseData.error)
            }

            onClose()  //si todo sale bien se patchea y se cierra el formulario
            onUpdate()

        } catch (error) {
            console.log("error al actualizar el objeto")
        } finally {
            setLoader(false)

        }
    }
    return (
        <section className="modal-overlay">
            <div className="modal-box" >
                <h1>Editar producto: {product.name} </h1>  {/*product es el prop que viene de home, trae dentro {object de productos}*/}
                <form className="form-container"
                    onSubmit={handleSubmit}>
                    <input
                        name="name"  // identificamos por el name
                        type="text"
                        value={formData.name}
                        onChange={handleChange} //porque es sin funcion ()=>{}?
                    />
                    <input
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange} //porque es sin funcion ()=>{}?

                    />
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange} //porque es sin funcion ()=>{}

                    />
                    <input
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange} //porque es sin funcion ()=>{}

                    />
                    <input
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}//porque es sin funcion ()=>{}
                    />

                    <button type="submit">{loader ? "Enviando" : "Enviar"}</button>

                </form>
                <button className="close-btn" onClick={onClose} type="button">Cancelar</button> {/*aclarar qNO es submit sino lo toma por defecto submit x estar al ultimo */}

            </div >
        </section >
    )
}
export default UpdateProduct