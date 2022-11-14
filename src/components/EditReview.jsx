import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getReviewDetailsService,
  editReviewService,
} from "../service/review.services";

function EditReview() {

  const { reviewId } = useParams()

  const navigate = useNavigate()
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");


  useEffect(() => {
    getEditReview()
  }, []);


  const getEditReview = async () => {
    try {
      const response = await getReviewDetailsService();
      setReviewInput(response.data.review);
      setRatingInput(response.data.rating);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  const updateReview = (event) => setReviewInput(event.target.value);
  const updateRating = (event) => setRatingInput(event.target.rating);

  const handleUpdateReview = async (event) => {
    event.preventDefault();

    try {
      const updatedReview = {
        review: reviewInput,
        rating: ratingInput,
      };
      //!falta incluir id de la review
      await editReviewService(reviewId, updatedReview);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };



  return (
    <div>
      <label htmlFor="review">Reseña</label>
      <input type="text" name="review/" value={reviewInput} onChange={updateReview}></input>
      <label htmlFor="rating">Rating</label>
      <input type="text" name="rating/" value={ratingInput} onChange={updateRating}></input>
        <button onClick={handleUpdateReview}>Editar Reseña</button>
    </div>
  );
}

export default EditReview;
