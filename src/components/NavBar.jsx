import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/service-list">Lista de Servicios</NavLink>

          <NavLink to="/profile">Mi perfil</NavLink>

          <NavLink ><button onClick={handleLogout}>Log Out</button></NavLink>
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
