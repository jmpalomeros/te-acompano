import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { authenticaUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
    console.log("after autenticate logout")
    navigate("/");
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/service-list">Lista de Servicios</NavLink>

          <NavLink to="/profile">Mi perfil</NavLink>

          <NavLink onClick={handleLogout}>Log Out</NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
