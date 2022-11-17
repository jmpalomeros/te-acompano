import { useState } from "react";
import { loginService } from "../service/auth.services";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const { authenticaUser } = useContext(AuthContext);

  // configuramos el uso de navigate
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. recopilar las credenciales del usuario
    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      // 2. contactar con el backend para validarlo
      const response = await loginService(userCredentials);

      localStorage.setItem("authToken", response.data.authToken);

      authenticaUser();

      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div id="form-signup">
      <br />
      <h4>Acceder</h4>
      <br />
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <br />

        <Button type="submit" variant="primary">
          Acceder
        </Button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Login;
