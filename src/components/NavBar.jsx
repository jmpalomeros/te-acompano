import {NavLink} from "react-router-dom"


function NavBar() {
  return (
    <div>

      <NavLink to="/">
        Home
      </NavLink>

      <NavLink to="/signup">
        Sign Up
      </NavLink>

      <NavLink to="/login">
        Log In
      </NavLink>

      <NavLink to="/service-list">
        Lista de Servicios
      </NavLink>

      <NavLink to="/profile">
        Mi perfil
      </NavLink>

      <NavLink to="">
        Log Out
      </NavLink>
         
    
    </div>
  )
}

export default NavBar