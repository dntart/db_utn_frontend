import Layout from "../components/Layout";


const AboutUs = () => {
    return <Layout>   {/*//Layout contiene header-main-footer*/}
         <div className="page-container">

      <section className="banner">
        <h1>Sobre Nosotros</h1>
        <p>Conocé quiénes somos y qué nos motiva a brindar el mejor servicio.</p>
      </section>

      <section className="section-text">
        <h2>Nuestra Historia</h2>
        <p>
          Somos una empresa dedicada a ofrecer productos de calidad. Nuestro compromiso es brindar
          confianza, seguridad y servicio personalizado a cada uno de nuestros clientes.
        </p>
      </section>

      <section className="section-text">
        <h2>Nuestra Misión</h2>
        <p>
          Proveer soluciones eficientes y productos confiables, con una experiencia de usuario
          impecable. Innovamos constantemente para mejorar nuestro servicio.
        </p>
      </section>

    </div>
    </Layout>
};

export default AboutUs;
