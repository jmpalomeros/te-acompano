import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewServiceService } from "../service/service.services";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreateService(props) {
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState("");
  const [typeServiceInput, setTypeServiceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const handleTitle = (event) => setTitleInput(event.target.value);
  const handleTypeService = (event) => setTypeServiceInput(event.target.value);
  const handleDescription = (event) => setDescriptionInput(event.target.value);
  const handleCity = (event) => setCityInput(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newService = {
      title: titleInput,
      typeService: typeServiceInput,
      description: descriptionInput,
      city: cityInput,
    };

    try {
      await createNewServiceService(newService);
      props.updateList();
      console.log("new service", newService);
      navigate("/service-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="title">Título</Form.Label>
          <Form.Control
            type="text"
            value={titleInput}
            name="title"
            onChange={handleTitle}
            placeholder="Escribe un título"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="typeService">Tipo de Servicio</Form.Label>
        </Form.Group>
        <Form.Select name="typeService" onChange={handleTypeService}>
          <option>Elige una opción</option>
          <option value="Ocio">Ocio</option>
          <option value="Ayuda">Ayuda</option>
          <option value="Otros">Otros</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="description">
            Descripción del servicio
          </Form.Label>
          <Form.Control
            type="text"
            value={descriptionInput}
            name="description"
            onChange={handleDescription}
            placeholder="Danos alguos detalles de lo que quieres hacer"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="city">Ciudad</Form.Label>
          <Form.Control
            type="text"
            value={cityInput}
            name="city"
            onChange={handleCity}
            placeholder="Escribe el nombre de tu ciudad"
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Añadir
        </Button>
      </Form>
    </div>
  );
}

export default CreateService;
