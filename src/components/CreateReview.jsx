import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReviewService } from "../service/review.services";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateReview() {
  const { serviceId } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const handleReviewChange = (event) => setReviewInput(event.target.value);
  const handleRatingChange = (event) => setRatingInput(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newReview = {
      reviewedService: serviceId,
      review: reviewInput,
      rating: ratingInput,
    };

    try {
      await createReviewService(serviceId, newReview);
      console.log("serviceId", serviceId);
      console.log("newReview", newReview);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="review">Reseña</Form.Label>
          <Form.Control
            type="text"
            name="review"
            value={reviewInput}
            onChange={handleReviewChange}
            placeholder="Danos tu oponión"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="rating">Puntuación</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={ratingInput}
            onChange={handleRatingChange}
            placeholder="Puntua del 1 al 5"
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Envía tu reseña
        </Button>
      </Form>
    </div>
  );
}

export default CreateReview;
