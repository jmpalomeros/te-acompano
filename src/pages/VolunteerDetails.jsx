import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllReviewsService } from "../service/review.services";

function VolunteerDetails() {
  const navigate = useNavigate();
  const { volunteerId } = useParams();
  const [isFetching, setIsFetching] = useState(false);

  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {
    getAllDetailsData();
  }, []);

  const getAllDetailsData = async () => {
    try {
      const response = await getAllReviewsService(volunteerId);
      setAllDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate(error);
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      {allDetails.map((eachItem) => {
        return (
          <div>
            <h3>{eachItem.reviewedService.title}</h3>
            <p>{eachItem.review}</p>
            <p>{eachItem.rating}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default VolunteerDetails;
