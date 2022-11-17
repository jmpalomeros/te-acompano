import { useState } from "react";
import Form from 'react-bootstrap/Form';

function Search(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTypeServiceInput, setSearchTypeServiceInput] = useState("");

  const handleServiceChange = (event) => {
    setSearchInput(event.target.value);
    props.list(event.target.value);
  };

  const handleTypeServiceChange = (event) => {
    setSearchTypeServiceInput(event.target.value);
    props.typeService(event.target.value);
  };

  return (
    <div className="input-search">
      <div >
      <label htmlFor="search">Buscar por título de servicio  </label>
      <Form.Control 
        value={searchInput}
        type="text"
        placeholder="Buscar servicios"
        onChange={handleServiceChange}
    >
      </Form.Control>
      </div>
      <br />
      <div>
      <label htmlFor="typeService">Buscar por tipo de servicio </label>
      <Form.Select aria-label="" name="typeService" onChange={handleTypeServiceChange}>
        <option value="">Elige una opción</option>
        <option value="Ocio">Ocio</option>
        <option value="Ayuda">Ayuda</option>
        <option value="Otros">Otros</option>
      </Form.Select>
      <br />
      </div>
    </div>
  );
}

export default Search;
