import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import EditService from "../components/EditService";
import { getServiceDetailsService } from "../service/service.services";
import VolunteerDetails from "./VolunteerDetails";
import { acceptServiceService } from "../service/service.services";
import { AuthContext } from "../context/auth.context";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function ServiceDetails() {
  const navigate = useNavigate();

  const { serviceId } = useParams();
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [acceptedServiceInput, setAcceptedServiceInput] = useState({});

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
    return <h4>Loading</h4>;
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

  return (
    <div>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4>Detalles del servicio</h4>
          </Accordion.Header>
          <Accordion.Body>
          <CardGroup className="cardgroups">
          <Card className="cards">
          <Card.Body>
            <h4>Servicio: {details.title}</h4>
            <p>Descripción: {details.description}</p>
            <p>Servicio ofrecido por: {" "}
            {details.offeredServices.firstName}{" "}
              {details.offeredServices.lastName}</p>
            <EditService />
            {details.offeredServices._id !== user.user._id && (
              <Button onClick={handleUpdate}>Aceptar Servicio</Button>
            )}
             </Card.Body>
            </Card>
            </CardGroup>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h4>Reseñas sobre el voluntario de este servicio</h4>
          </Accordion.Header>
          <Accordion.Body>
          <VolunteerDetails />
            <h5>
            <Link to={`/volunteer/${details.offeredServices._id}/details`}>
              {details.offeredServices.firstName}{" "}
              {details.offeredServices.lastName}
            </Link>
            </h5>
            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          {details.offeredServices._id !== user.user._id && (
            <div>
              <Accordion.Header>
                <h4>Crear Reseña del voluntario sobre este servicio</h4>
              </Accordion.Header>
              <Accordion.Body>
                <CreateReview />
              </Accordion.Body>
            </div>
          )}
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ServiceDetails;
