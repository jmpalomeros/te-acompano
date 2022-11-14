import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import EditService from "../components/EditService";
import { getServiceDetailsService } from "../service/service.services";
import { getReviewDetailsService } from "../service/review.services"

function ServiceDetails() {
  const navigate = useNavigate();

  const { serviceId } = useParams();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [ renderReview, setRenderReview ] = useState("")

  useEffect(() => {
    getDetailsData();
  }, []);

  const getDetailsData = async () => {
    try {
      const response = await getServiceDetailsService(serviceId);
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

    const getRenderReview = async () => {

      try {
        
        await getReviewDetailsService()

      } catch (error) {
        navigate("/error")
      }
    }

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      <h3>Detalles del servicio</h3>
      <p>{details.title}</p>
      <p>{details.description}</p>
      <EditService />
      <button>Aceptar Servicio</button>
      <hr />
      <h3>Reseñas del voluntario del servicio</h3>
      <p></p>

      <hr />
      <h3>Crear Reseña de este servicio</h3>
      <CreateReview />

    </div>
  );
}

export default ServiceDetails;
