import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";

function ReviewList() {
  const navigate = useNavigate();

  const [myReviews, setMyReviews] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    getReviewsData();
  }, []);

  const getReviewsData = async () => {
    try {
      const response = await getAllReviewsService();
      console.log("response", response);
      setMyReviews(response.data);
      setIsFetching(false);
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
      {myReviews.map((eachElement) => {
        return (
          <div>
            <Link to={`/review/${eachElement._id}`}>
              <h3>{eachElement.reviewedService.title}</h3>
            </Link>

            <p>
              {eachElement.ratedVolunteer.firstName}{" "}
              {eachElement.ratedVolunteer.lastName}
            </p>
            <p>Reseña:{eachElement.review}</p>
            <p>Valoración:{eachElement.rating}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
