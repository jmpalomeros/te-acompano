import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  getServiceDetailsService,
  editServiceService,
} from "../service/service.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { user } = useContext(AuthContext);

  const [titleInput, setTitleInput] = useState("");
  const [typeServiceInput, setTypeServiceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [offeredServices, setOfferedServices] = useState("");

  useEffect(() => {
    getDataService();
  }, []);

  const getDataService = async () => {
    try {
      const response = await getServiceDetailsService(serviceId);
      console.log("GETDATA RESPONSE", response);
      setTitleInput(response.data.title);
      setTypeServiceInput(response.data.typeService);
      setDescriptionInput(response.data.description);
      setCityInput(response.data.city);
      setOfferedServices(response.data.offeredServices);
    } catch (error) {
      navigate("/error");
    }
  };

  const titleChange = (event) => setTitleInput(event.target.value);
  const typeServiceChange = (event) => setTypeServiceInput(event.target.value);
  const descriptionChange = (event) => setDescriptionInput(event.target.value);
  const cityChange = (event) => setCityInput(event.target.value);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const updateService = {
        title: titleInput,
        typeService: typeServiceInput,
        description: descriptionInput,
        city: cityInput,
      };

      await editServiceService(serviceId, updateService);

      navigate("/service-list");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      {offeredServices._id === user.user._id && (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="title">Título</Form.Label>
              <Form.Control
                type="text"
                value={titleInput}
                name="title"
                onChange={titleChange}
                placeholder="Cambia el titulo"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="typeService">Tipo de servicio</Form.Label>
              <Form.Select name="typeService" onChange={typeServiceChange}>
                <option>Elige una opción</option>
                <option value="Ocio">Ocio</option>
                <option value="Ayuda">Ayuda</option>
                <option value="Otros">Otros</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="description">
                {" "}
                Descripción del servicio
              </Form.Label>
              <Form.Control
                type="text"
                value={descriptionInput}
                name="description"
                onChange={descriptionChange}
                placeholder="Cambia los detalles del servicio"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="city">Ciudad</Form.Label>
              <Form.Control
                type="text"
                value={cityInput}
                name="city"
                onChange={cityChange}
                placeholder="Cambia la ciudad"
              />
            </Form.Group>

            <Button onClick={handleUpdate} variant="primary" type="submit">
              Editar Servicio
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default EditService;
