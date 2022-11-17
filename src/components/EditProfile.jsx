import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  editUserService,
  getUserDetailsService,
} from "../service/user.services";
import { uploadImageService } from "../service/upload.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditProfile(props) {
  const navigate = useNavigate();

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [cityInput, setCityInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserDetailsService();
      console.log("USER DETAILS", response.data);
      setFirstNameInput(response.data.firstName);
      setLastNameInput(response.data.lastName);
      setAvatarInput(response.data.avatar);
      setAgeInput(response.data.age);
      setCityInput(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  const firstNameChange = (event) => setFirstNameInput(event.target.value);
  const lastNameChange = (event) => setLastNameInput(event.target.value);
  const ageChange = (event) => setAgeInput(event.target.value);
  const cityChange = (event) => setCityInput(event.target.value);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const updateUser = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        avatar: avatarInput,
        age: ageInput,
        city: cityInput,
      };

      await editUserService(updateUser);
      props.updateProfile();
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleUpdateAvatar = async (event) => {
    setIsFetching(true);
    const sendObj = new FormData();
    sendObj.append("avatar", event.target.files[0]);

    try {
      const response = await uploadImageService(sendObj);
      setAvatarInput(response.data.avatar);
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstNameInput}
            onChange={firstNameChange}
            placeholder="Escribe tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastNameInput}
            onChange={lastNameChange}
            placeholder="Escribe tus apellidos"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            onChange={handleUpdateAvatar}
            placeholder="Selecciona una imagen"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={ageInput}
            onChange={ageChange}
            placeholder="Escribe tu edad"
            min="18"
            max="100"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={cityInput}
            onChange={cityChange}
            placeholder="Escribe el nombre de tu ciudad"
          />
        </Form.Group>

        <Button onClick={handleUpdate} variant="primary" type="submit">
          Actualizar Perfil
        </Button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default EditProfile;
