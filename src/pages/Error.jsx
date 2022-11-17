import React from 'react'
import Nav from "react-bootstrap/Nav";

function Error() {
  return (
    <div>
      <h4>Ha habido un error con esta página</h4>
      <h5>Estamos trabajando en ello</h5>

      Puedes visitar la <Nav.Link to="/">Home</Nav.Link>


    </div>
  )
}

export default Error