//import CreateReview from "../components/CreateReview";
import ReviewList from "../components/ReviewList";

import ReviewDetails from "../components/ReviewDetails";

function Reviews() {
  return (
    <div>
      <h3>Mis reseñas realizadas</h3>
      <p>aqui irán mis reseñas</p>
      <ReviewList />
      
      
            <br />
      <hr />
      <h4>Solicitudes aceptadas</h4>
      <p>aquí irán las solicitudes aceptadas</p>
      
      <br />
      <hr />
      <h3>Mis reseñas recibidas</h3>
      
      <br />
    </div>
  );
}

export default Reviews;
