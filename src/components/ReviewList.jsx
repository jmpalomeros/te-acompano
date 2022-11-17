import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";
import { AuthContext } from "../context/auth.context";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function ReviewList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
      <br />
      <div>
        <h4>Reseñas que he realizado como usuario</h4>
      </div>
      <br />
      <CardGroup class="cardgroups">
        {myReviews.map((eachElement) => {
          return (
            <div key={eachElement._id}>
              {eachElement.reviewAuthor._id === user.user._id ? (
                <div>
                  <Card className="cards" >
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/review/${eachElement._id}`}>
                          <h4>{eachElement.reviewedService.title}</h4>
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        <p>
                          Voluntario valorado:{" "}
                          {eachElement.ratedVolunteer.firstName}{" "}
                          {eachElement.ratedVolunteer.lastName}
                        </p>
                        <p>Reseña: {eachElement.review}</p>
                        <p>Valoración: {eachElement.rating}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
            </div>
          );
        })}
      </CardGroup>
      <hr />
      <h4>Reseñas que he recibido como voluntario</h4>
      <CardGroup>
        {myReviews.map((eachElement) => {
          return (
            <div key={eachElement._id}>
              {eachElement.ratedVolunteer._id === user.user._id ? (
                <div>
                  <Card className="cards">
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/review/${eachElement._id}`}>
                          <h4>{eachElement.reviewedService.title}</h4>
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        <p>Reseña: {eachElement.review}</p>
                        <p>Valoración: {eachElement.rating}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
}

export default ReviewList;
