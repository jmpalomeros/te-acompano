import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllReviewsService, getReviewDetailsService } from "../service/review.services";

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
      console.log("volunteerId", volunteerId)
      console.log("response.data", response.data);
      setAllDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      {allDetails.map((eachItem) => {
        return (
          <div key={eachItem._id}>
          {volunteerId === eachItem.ratedVolunteer._id ? (
          <div >
            <h3>{eachItem.reviewedService.title}</h3>
            <p>{eachItem.review}</p>
            <p>{eachItem.rating}</p>
            <hr />
          </div>
        ) : null } 
        </div>
        );
      })}

      <Link to={"/profile"}> <button>Volver al perfil</button> </Link>
    </div>
  );
}

export default VolunteerDetails;
