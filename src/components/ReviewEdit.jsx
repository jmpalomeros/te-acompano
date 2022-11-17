import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getReviewDetailsService,
  editReviewService,
} from "../service/review.services";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReviewEdit() {
  const { reviewId } = useParams();

  const navigate = useNavigate();
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getEditReview();
  }, []);

  const getEditReview = async () => {
    try {
      const response = await getReviewDetailsService(reviewId);
      setReviewInput(response.data.review);
      setRatingInput(response.data.rating);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const updateReview = (event) => setReviewInput(event.target.value);
  const updateRating = (event) => setRatingInput(event.target.value);

  const handleUpdateReview = async (event) => {
    event.preventDefault();

    try {
      const updatedReview = {
        review: reviewInput,
        rating: ratingInput,
      };

      await editReviewService(reviewId, updatedReview);
      setIsFetching(false);
      navigate("/reviews");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="review">Reseña</Form.Label>
          <Form.Control
            type="text"
            name="review"
            value={reviewInput}
            onChange={updateReview}
            placeholder="Danos tu oponión"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="rating">Puntuación</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={ratingInput}
            onChange={updateRating}
            placeholder="Puntua del 1 al 5"
            min="0"
            max="5"
          />
        </Form.Group>

        <Button onClick={handleUpdateReview} variant="primary" type="submit">
          Actualiza tu reseña
        </Button>
      </Form>
    </div>
  );
}

export default ReviewEdit;
