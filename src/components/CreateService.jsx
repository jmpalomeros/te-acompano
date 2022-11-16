import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewServiceService } from "../service/service.services";

function CreateService(props) {
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState("");
  const [typeServiceInput, setTypeServiceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [cityInput, setCityInput] = useState("");


  const handleTitle = (event) => setTitleInput(event.target.value);
  const handleTypeService = (event) => setTypeServiceInput(event.target.value);
  const handleDescription = (event) => setDescriptionInput(event.target.value);
  const handleCity = (event) => setCityInput(event.target.value);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newService = {
      title: titleInput,
      typeService: typeServiceInput,
      description: descriptionInput,
      city: cityInput,
   
    };

    try {
      await createNewServiceService(newService);
      props.updateList();
      console.log("new service", newService)
      navigate("/service-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          value={titleInput}
          name="title"
          onChange={handleTitle}
        />
        <br />
        <label htmlFor="typeService">
        
          Tipo de Servicio
          </label>
          {/* {typeServiceInput.map((eachElement)=>{
            return(
              <select name="typeService" onChange={handleTypeService}>
              <option value={eachElement.enum}></option>
              </select>
            )
                        
          })} */}
            <select name="typeService" onChange={handleTypeService}>
            <option value="">Elige una opción</option>
            <option value="Ocio">Ocio</option>
            <option value="Ayuda">Ayuda</option>
            <option value="Otros">Otros</option>
            </select>
        

        {/* <input type="text" name="typeService" value={typeServiceInput} onChange={handleTypeService} /> */}
        <br />
        <label htmlFor="description">Descripción del servicio</label>
        <input
          type="text"
          value={descriptionInput}
          name="description"
          onChange={handleDescription}
        />
        <br />
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          value={cityInput}
          name="city"
          onChange={handleCity}
        />
        <br />

        <button onClick={handleSubmit}>Añadir</button>
      </div>
    </div>
  );
}

export default CreateService;
