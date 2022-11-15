import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";

function ReviewList() {
  const navigate = useNavigate();

  const [myReviews, setMyReviews] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  // const [reviewInput, setReviewInput] = useState("");
  // const [ratingInput, setRatingInput] = useState("");
  // const [showFormEditReview, setShowFormEditReview] = useState(false);

  useEffect(() => {
    getReviewsData();
    // getEditReview()
  }, []);

  const getReviewsData = async () => {
    try {
      const response = await getAllReviewsService();
      console.log("response", response);
      setMyReviews(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }
 

  return (
    <div>
      {myReviews.map((eachElement) => {
        return (
          <div>
            <Link to={`/review/${eachElement._id}`}><h3>{eachElement.reviewedService.title}</h3></Link>
            
            <p>
              {eachElement.ratedVolunteer.firstName}{" "}
              {eachElement.ratedVolunteer.lastName}
            </p>
            <p>Reseña:{eachElement.review}</p>
            <p>Valoración:{eachElement.rating}</p>

            {/* // form para editar reseña */}
            {/* {showFormEditReview === true ? 
                <div>
                  <label htmlFor="review">Reseña</label> 
                  <input type="text" name="review/"></input>
                  <label htmlFor="rating">Rating</label> 
                  <input type="text" name="rating/"></input>
                </div>
              : null } */}

            {/* //! incluir handleDelete y handleUpdateReview */}
            {/* <button onClick={handleUpdateReview}>Editar Reseña</button>
            <button>Borrar Reseña</button>
            <br /> */}
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
