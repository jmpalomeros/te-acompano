import React from "react";
import Nav from "react-bootstrap/Nav";

function NotFound() {
  return (
    <div>
      <h3>Upps, lo sentimos</h3>
      <h4>la página que estás buscando no existe</h4>
      <br />
      Puedes visitar la <Nav.Link to="/">Home</Nav.Link>
    </div>
  );
}

export default NotFound;
