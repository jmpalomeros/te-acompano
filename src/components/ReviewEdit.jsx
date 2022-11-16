import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getReviewDetailsService,
  editReviewService,
} from "../service/review.services";

function ReviewEdit() {

  const { reviewId } = useParams()

  const navigate = useNavigate()
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [isFetching, setIsFetching] = useState(true);


  useEffect(() => {
    getEditReview()
  }, []);


  const getEditReview = async () => {
    try {
      const response = await getReviewDetailsService(reviewId);
      setReviewInput(response.data.review);
      setRatingInput(response.data.rating);
      setIsFetching(false)
      
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
      setIsFetching(false)
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
      <label htmlFor="review">Reseña</label>
      <input type="text" name="review" value={reviewInput} onChange={updateReview}></input>
      <label htmlFor="rating">Rating</label>
      <input type="number" name="rating" value={ratingInput} onChange={updateRating}></input>
        <button onClick={handleUpdateReview}>Editar Reseña</button>
    </div>
  );
}

export default ReviewEdit;
