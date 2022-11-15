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
    return <h3>Loading</h3>;
  }

  return (
    <div>
      <h3>Reseñas realizadas</h3>
      {myReviews.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.reviewAuthor._id === user.user._id ? (
              <div>
              <Link to={`/review/${eachElement._id}`}>
                <h3>{eachElement.reviewedService.title}</h3>
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
<h3>Reseñas recibidas</h3>
      {myReviews.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.ratedVolunteer._id === user.user._id ? (
              <div>
              <Link to={`/review/${eachElement._id}`}>
                <h3>{eachElement.reviewedService.title}</h3>
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
