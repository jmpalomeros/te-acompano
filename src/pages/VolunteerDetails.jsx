import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";
import { CardGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function VolunteerDetails() {
  const navigate = useNavigate();
  const { volunteerId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {
    getAllDetailsData();
  }, []);

  const getAllDetailsData = async () => {
    try {
      const response = await getAllReviewsService();
      console.log("volunteerId", volunteerId);
      console.log("response.data", response.data);
      setAllDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h4>Loading</h4>;
  }

  return (
    <div>
      <br />
      <h4>Reseñas que ha recibido el voluntario</h4>
      <br />
      <CardGroup className="cardgroups">
        {allDetails.map((eachItem) => {
          return (
            <div key={eachItem._id}>
              {volunteerId === eachItem.ratedVolunteer._id ? (
                <Card className="cards">
                  <Card.Header>
                    <Card.Title>
                      <h4>Servicio: {eachItem.reviewedService.title}</h4>
                      <p>Voluntario: {eachItem.ratedVolunteer.firstName} {eachItem.ratedVolunteer.lastName}</p>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <p>Reseña: {eachItem.review}</p>
                    <p>Puntuación: {eachItem.rating}</p>
                  </Card.Body>
                </Card>
              ) : null}
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
}

export default VolunteerDetails;
