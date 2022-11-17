import { useState } from "react";
import { signupService } from "../service/auth.services";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../service/upload.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PuffLoader from "react-spinners/PuffLoader";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  const handleUpdateAvatar = async (event) => {
    setIsFetching(true);
    const sendObj = new FormData();
    sendObj.append("avatar", event.target.files[0]);

    try {
      const response = await uploadImageService(sendObj);
      //console.log("foto", response.data.avatar);
      setAvatar(response.data.avatar);
      setIsFetching(false);
    } catch (error) {
      console.log("error", error);
      navigate("/error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      city: city,
      avatar: avatar,
    };
    //console.log("usuario creado", newUser);
    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching === true) {
    return (
      <div id="spinner">
        <PuffLoader color={"blue"} size={50} />
      </div>
    );
  }

  return (
    <div>
      <h4>Registrate</h4>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="firstName">Nombre</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Escribe tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="lastName">Apellidos</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Escribe tus apellidos"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Escribe tu email"
          />
          <Form.Text className="text-muted">
            Formate: tucorreo@tucorreo.com
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="password">Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Crea tu contraseña"
          />
          <Form.Text className="text-muted">Formato: Tucontraseña1!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="avatar">Imagen</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            onChange={handleUpdateAvatar}
            placeholder="Selecciona una imagen"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="age">Edad</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={age}
            onChange={handleAgeChange}
            placeholder="Escribe tu edad"
            min="18"
            max="100"            
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="city">Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Escribe el nombre de tu ciudad"
          />
        </Form.Group>

        <Button onClick={handleSignup} variant="primary" type="submit">
          Enviar
        </Button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default SignUp;
