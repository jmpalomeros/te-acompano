import Carousel from "react-bootstrap/Carousel";

function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item className="carousel-item">
          <img src="./images/volunteers.jpg" alt="First slide" />
          <Carousel.Caption className="carouselCaption">
            <h4>Comparte tu tiempo</h4>
            <p>"Quien no sabe compartir carece de emociones"</p>
            <p>Marc Levy</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img src="./images/helping.jpg" alt="Second slide" />
          <Carousel.Caption className="carouselCaption">
            <h4>Ayuda y aprende</h4>
            <p>
              "Indudablemente nadie se ocupa de quien no se ocupa de nadie"{" "}
            </p>
            <p>Thomas Jefferson</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img src="./images/havefun.jpg" alt="Third slide" />
          <Carousel.Caption className="carouselCaption">
            <h4>Diviértete creciendo</h4>
            <p>
              "No todo lo que es de oro reluce, ni toda la gente errante anda
              perdida"
            </p>
            <p>J.R.R. Tolkien</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="homeText">
        <h4>TE ACOMPAÑO</h4>
        <p>Actualizando la labor del voluntariado</p>
        <p>
          Conectamos a personas de un mismo entorno para que compartan su tiempo
        </p>
        <p>Únete y comienza a descubrir a quienes viven a tu alrededor</p>
      </div>
    </div>
  );
}

export default Home;
