import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import EditService from "../components/EditService";
import { getServiceDetailsService } from "../service/service.services";
import VolunteerDetails from "./VolunteerDetails";
import { acceptServiceService } from "../service/service.services";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function ServiceDetails() {
  const navigate = useNavigate();

  const { serviceId } = useParams();
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [acceptedServiceInput, setAcceptedServiceInput] = useState({});

  const [formIsShowing, setFormIsShowing] = useState(false);

  useEffect(() => {
    getDetailsData();
  }, []);

  const getDetailsData = async () => {
    try {
      const response = await getServiceDetailsService(serviceId);
      setDetails(response.data);
      setIsFetching(false);
      console.log("response", response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const serviceAccepted = {
        acceptedServices: acceptedServiceInput,
      };
      await acceptServiceService(serviceId, serviceAccepted);
      navigate("/profile");
    } catch (error) {
      navigate("/error");
    }
  };

  const toggleForm = () => {
    console.log("camiando el formulario");
    if (formIsShowing === true) {
      setFormIsShowing(false);
    } else {
      setFormIsShowing(true);
    }
  };


 
  return (
    <div>
      <h3>Detalles del servicio</h3>
      <p>Título: {details.title}</p>
      <p>Descripción:{details.description}</p>

      <EditService />

      {details.offeredServices._id !== user.user._id && (
        <button onClick={handleUpdate}>Aceptar Servicio</button>
      )}

      <hr />
      <h3>Reseñas del voluntario del servicio</h3>
      <Link to={`/volunteer/${details.offeredServices._id}/details`}>
        {details.offeredServices.firstName} {details.offeredServices.lastName}
      </Link>

      <VolunteerDetails />

      <hr />
      
      <Button variant="outline-info" onClick={toggleForm}>Ver formulario</Button>
      {details.offeredServices._id !== user.user._id && (
        <div>
          <h3>Crear Reseña de este servicio</h3>
          
          <Collapse in={formIsShowing}>
          <div>
          <CreateReview />
          </div>
          </Collapse>
        </div>
      )}
      
    </div>
  );
}

export default ServiceDetails;
