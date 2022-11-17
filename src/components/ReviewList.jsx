import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";
import { AuthContext } from "../context/auth.context";

function ReviewList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  const [myReviews, setMyReviews] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    getReviewsData();
  }, []);

  const getReviewsData = async () => {
    try {
      const response = await getAllReviewsService();
      
      setMyReviews(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h4>Loading</h4>;
  }

  return (
    <div>
      <h4>Reseñas realizadas</h4>
      {myReviews.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.reviewAuthor._id === user.user._id ? (
              <div>
              <Link to={`/review/${eachElement._id}`}>
                <h4>{eachElement.reviewedService.title}</h4>
              </Link>
  
              <p>Voluntario valorado:  {" "}
                {eachElement.ratedVolunteer.firstName}{" "}
                {eachElement.ratedVolunteer.lastName}
              </p>
              <p>Reseña:{eachElement.review}</p>
              <p>Valoración:{eachElement.rating}</p>
              </div>
            ) :null }
          </div>
        );
      })}
<hr />
<h4>Reseñas recibidas</h4>
      {myReviews.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.ratedVolunteer._id === user.user._id ? (
              <div>
              <Link to={`/review/${eachElement._id}`}>
                <h4>{eachElement.reviewedService.title}</h4>
              </Link>
              <p>Reseña:{eachElement.review}</p>
              <p>Valoración:{eachElement.rating}</p>
              </div>
            ) :null }
          </div>
        );
      })}


    </div>
  );
}

export default ReviewList;
