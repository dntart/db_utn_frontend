import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UpdateProduct from "../components/UpdateProduct";
import { useAuth } from "../context/AuthContext";
import { productCategories } from "../constants/categories";

const Home = () => {
    const [products, setProducts] = useState([]) //para cambiar el valor de products/[]comienza como array vacio, despues .map le da contenido
    const { user } = useAuth() // de la caja de herramientas con destructuring sacamos user 
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filters, setFilters] = useState({    //filter es un objeto con keys sin valor
        name: "",
        description: "",
        stock: 0,
        category: "",
        minPrice: 0,
        maxPrice: 0
    }
    )

    //GET ALL PRODUCTS
    const fetchingProducts = async (query = "") => {
        try {
            const response = await fetch(`https://db-utn-backend.onrender.com/products?${query}`, { //? va aqui para que la query vaya seguido
                method: "GET"
            }) // por defecto peticion GET
            const dataProducts = await response.json() //pasamos json a js
            setProducts(dataProducts.data.reverse())  //reverse() metodo de js p revertir el orden de elementos de un array u objeto, lo usamos para ver lo agregado primero y no ultimo 
        } catch (error) {  //muestra el error y no se rompe la app
            console.log("error a traer los productos")
        }
    }
    useEffect(() => {  //use effect  es una funcion alternativa que se ejecuta luego del renderizado del contenido estatico, por lo que corre luego y no debe entorpecer lo estatico 
        fetchingProducts() // useEfecct tiene2 partes: 1ra que ejecutar(la funcion)
    }, [])  //  2da que dice cuando ejecutar [] vacio:una vez, [id] cuando el id cambie, etc, si no esta se loopea infinitamente 

    // DELETE
    const deleteProduct = async (idProduct) => { //el argumento no es definido solo es un nombre cualuqiera
        if (!confirm("estas por borrar un producto, se solicita confirmacion.")) {
            console.log("producto no borrado", idProduct)
            return
        }
        try {
            const response = await fetch(`https://db-utn-backend.onrender.com/products/${idProduct}`, {  //borrado
                method: "DELETE"
            })
            const dataResponse = await response.json() //conversion a js

            setProducts(products.filter((product) => product._id !== idProduct))    //filtrado de productos no borrados/ si es un sistema de varios usuarios conviene hacer fetch de nuevo

            alert(`${dataResponse.name} borrado con exito`) //ver por que no es dataResponse.data.name

        } catch (error) {
            console.log("Error al borrar el producto")
        }


    }
    //UPDATE 
    const handleUpdateProduct = (product) => {
        console.log(product, "producto a actualizar")
        setSelectedProduct(product)
    }

    // 🔹 Más adelante este return será reemplazado por un fetch
    /* MANEJADOR DE FILTERS */
    const handleChange = (e) => {
        setFilters({
            ...filters, //traemos las keys sin value
            [e.target.name]: e.target.value  // las [] son para acceder a la keys sin nombrar
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const query = new URLSearchParams()  //URLSearchParams crea una url nueva con los parametros que se le pasa

        if (filters.name) query.append("name", filters.name) // si en objeto filtro hay {name:} /crea una query ?...("nombre","value")
        if (filters.description) query.append("description", filters.description) // si en objeto filtro hay {description:} /crea una query ?...("nombre","value")
        if (filters.stock) query.append("stock", filters.stock) // si en objeto filtro hay {stock:} /crea una query ?...("nombre","value")
        if (filters.category) query.append("category", filters.category) // si en objeto filtro hay {category:} /crea una query ?...("nombre","value")
        if (filters.minPrice) query.append("minPrice", filters.minPrice) // si en objeto filtro hay {minPrice:} /crea una query ?...("nombre","value")
        if (filters.maxPrice) query.append("maxPrice", filters.maxPrice) // si en objeto filtro hay {maxPrice:} /crea una query ?...("nombre","value")


        fetchingProducts(query.toString()) // enviamos al fech el parametro- .toString siempre pasado a string para legibilidad
    }
    return (
        <Layout>
            {/* Layout contiene header - main - footer */}

            <div className="page-container">

                {/* Banner */}
                <section className="banner">
                    <h1>Nuestros Productos</h1>
                    <p>
                        La mejor selección de productos de calidad. Todo lo que necesitás en un solo lugar.
                    </p>
                </section>

                {/* Texto descriptivo */}
                <section className="section-text">
                    <h2>Descubrí lo que ofrecemos</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum.
                        Suspendisse cursus malesuada facilisis. Curabitur at commodo arcu, sed hendrerit ex.
                    </p>

                </section>
                <section >
                    <form className="filter-form" onSubmit={handleSubmit}>  {/* inputs p/Filters */}
                        <input
                            type="text"
                            name="name"
                            placeholder="busca por nombre"
                            onChange={handleChange} />
                        <input
                            type="text"
                            name="description"
                            placeholder="busca por su decripcion"
                            onChange={handleChange} />
                        <input
                            type="number"
                            name="stock"
                            placeholder="busca por cantidad"
                            onChange={handleChange} />
                        <select
                            type="string"
                            name="category"
                            onChange={handleChange}
                            value={filters.category}
                        >
                            {
                                productCategories.map((category) => <option key={category.id} value={category.value}>
                                    {category.content} </option>)  //option despliega el listado 
                            }
                        </select>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="precio minimo"
                            onChange={handleChange} />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="precio maximo"
                            onChange={handleChange} />

                        <button type="submit">Aplicar filtros</button>
                        <button type="button">Cancelar</button>
                    </form>

                </section>


                {selectedProduct &&
                    <UpdateProduct  //COMPONENTE
                        product={selectedProduct}//creamos PROP apartir de selectedProduct, un state que se puede usar en otro componente
                        onClose={() => setSelectedProduct(null)} //creamos PROP para cerrar el popup/vuelve a sus estado inicial de null 
                        onUpdate={fetchingProducts} //PROP que llama los productos y renueva la UI
                    />
                }  {/*seccion para popup para update*/}


                {/* Grid de productos */}
                <section>
                    <h2>Productos destacados</h2>
                    <div className="product-grid">
                        {products.map((product, index) => (   // .map devuelve nuevo array de c producto x index, o (p,i)
                            <div className="product-card" key={product._id}> {/*usar ._id y no index en key porque al borra el index da error*/}
                                <h3>{product.name}</h3>
                                <p><strong>Descripción:</strong> {product.description}</p>
                                <p><strong>Precio:</strong> ${product.price}</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Categoría:</strong> {product.category}</p>

                                {user && // si hay user hay button
                                    <div className="cont-btn">
                                        <button onClick={() => handleUpdateProduct(product)}>Actualizar</button> {/*product nos viene del mapeo*/}
                                        <button onClick={() => deleteProduct(product._id)}>Borrar</button>  {/*si hay usuario hay boton*/}

                                    </div>
                                }
                            </div>
                        ))}


                    </div>
                </section>

            </div>
        </Layout>
    );
};

export default Home;
