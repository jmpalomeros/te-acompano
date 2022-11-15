//import CreateReview from "../components/CreateReview";
import ReviewList from "../components/ReviewList";

import ReviewDetails from "../components/ReviewDetails";

function Reviews() {
  return (
    <div>
      <h3>Reseñas</h3>

      <ReviewList />

      <br />
      <hr />
      <h4>Solicitudes aceptadas</h4>
      <p>aquí irán las solicitudes aceptadas</p>

      <br />
    </div>
  );
}

export default Reviews;
