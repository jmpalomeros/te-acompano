
import {useState} from 'react'
import {createNewServiceService} from "../service/service.services"

function CreateService(props) {

  const [titleInput, setTitleInput] = useState("")
  const [typeServiceInput, setTypeServiceInput] =useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [cityInput, setCityInput] = useState("")
  //const [offeredServicesInput, setOfferedServicesInput] = useState("")
  

  const handleTitle = (event) => setTitleInput(event.target.value)
  const handleTypeService = (event) => setTypeServiceInput(event.target.value)
  const handleDescription = (event) => setDescriptionInput(event.target.value)
  const handleCity = (event) => setCityInput (event.target.value)
  //const handleOfferedServices = (event) => setOfferedServicesInput(event.target.value)
  

  const handleSubmit = async (event) =>{
    event.preventDefault()
  
    const newService = {
      title:titleInput, 
      typeservice: typeServiceInput, 
      description: descriptionInput, 
      city: cityInput, 
      //offeredServices: offeredServicesInput, 
      // acceptedServices:acceptedServicesInput
    }

    try{

      await createNewServiceService(newService)
      props.updateList()

    }catch(error){
      console.log(error)
    }

  }

  return (

    <div>

    <div>

    <label htmlFor="title">Titulo</label>
    <input type="text" value={titleInput} name="title" onChange={handleTitle}/>
    <br />
    <label htmlFor="typeService">Tipo de Servicio</label>
    <input type="text" value={typeServiceInput} name="typeService" onChange={handleTypeService}/>
    <br />
    <label htmlFor="description">Descripción del servicio</label>
    <input type="text" value={descriptionInput} name="description" onChange={handleDescription} />
    <br />
    <label htmlFor="city">Ciudad</label>
    <input type="text" value={cityInput} name="city" onChange={handleCity}/>
    <br />
    {/* <label htmlFor="offeredServices">Servicio Ofrecido</label>
    <input type="text" value={offeredServicesInput} name="offeredServices" onChange={handleOfferedServices}/>
    <br /> */}
    
    <button onClick={handleSubmit}>Añadir</button>
    </div>
    
    </div>
  )
}

export default CreateService