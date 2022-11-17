import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavBar() {
  const { authenticaUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
    console.log("after autenticate logout");
    navigate("/");
  };

  return (
    <div>
      <Navbar id="navbar" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="./images/logo te acompano.png"
              className="d-inline-block align-top"
              alt="Te acompaño - Proyecto de voluntariado"
            />
          </Navbar.Brand>

          <div>
            <Nav className="me-auto" defaultActiveKey="/signup" variant="pills">
              <div>
                {isLoggedIn === true ? (
                  <div className="navbar">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/service-list">Lista de Servicios</Nav.Link>
                    <Nav.Link href="/profile">Mi perfil</Nav.Link>
                    <Button variant="primary" onClick={handleLogout}>
                      Salir
                    </Button>
                  </div>
                ) : (
                  <div className="navbar">
                    <Nav.Item>
                      <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/login">Accede</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="signup-btn" href="/signup">
                        Regístrate
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                )}
              </div>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
