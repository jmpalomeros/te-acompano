import CreateReview from "../components/CreateReview";
import ReviewList from "../components/ReviewList";
import EditReview from "../components/EditReview";

function Reviews() {
  return (
    <div>
      <h3>Mis reseñas realizadas</h3>
      <p>aqui irán mis reseñas</p>
      <ReviewList />
      <EditReview />
      {/* // ! esto deberia estar en una sección donde el usuario vea la lista/o detalles de los servicios aceptados */}
      <br />
      <hr />
      <h4>Solicitudes aceptadas</h4>
      <p>aquí irán las solicitudes aceptadas</p>
      
      <br />
      <hr />
      <h3>Mis reseñas recibidas</h3>
      {/* <ReviewedService /> */}
      <br />
    </div>
  );
}

export default Reviews;
