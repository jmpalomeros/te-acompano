import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams} from "react-router-dom";
import {
  getReviewDetailsService,
  deleteReviewService,
} from "../service/review.services";
import ReviewEdit from "./ReviewEdit";
import Button from "react-bootstrap/Button";

function ReviewDetails() {
  const navigate = useNavigate();

  const { reviewId } = useParams();
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    getDetailsData();
  }, []);

  const getDetailsData = async () => {
    try {
      const response = await getReviewDetailsService(reviewId);
      setDetails(response.data);
      setFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h4>Loading</h4>;
  }

  const handleDelete = async () => {
    try {
      await deleteReviewService(reviewId);
      navigate("/reviews");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h4>Servicio valorado:{details.reviewedService.title}</h4>
      <p>
        Detalles de la valoración:{details.review} <br /> {details.rating}
      </p>
      <p>
        Voluntario valorado: {details.ratedVolunteer.firstName}{" "}
        {details.ratedVolunteer.lastName}
      </p>
      {details.ratedVolunteer._id !== user.user._id && (
        <div>
        <ReviewEdit />
        <br />
        <Button onClick={handleDelete} variant="primary" type="submit">
          Borrar reseña
        </Button>
      
      </div>)}
      
    </div>
  );
}

export default ReviewDetails;
