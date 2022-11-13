import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getServiceDetailsService , editServiceService } from "../service/service.services"

function EditService() {

    const navigate = useNavigate()
    const { serviceId } = useParams()

    const [ titleInput, setTitleInput ] = useState("")
    const [ typeServiceInput, setTypeServiceInput ] = useState("")
    const [ descriptionInput, setDescriptionInput ] = useState("")
    const [ cityInput, setCityInput ] = useState("")

    useEffect(() => {
        getDataService()
        }, [])

        const getDataService = async () => {
            try {

                const response = await getServiceDetailsService(serviceId)
                setTitleInput(response.data.title)
                setTypeServiceInput(response.data.typeService)
                setDescriptionInput(response.data.description)
                setCityInput(response.data.city)

                
            } catch (error) {
                navigate("/error")
                
            }
        }

        const titleChange = (event) => setTitleInput(event.target.value)
        const typeServiceChange = (event) => setTypeServiceInput(event.target.value)
        const descriptionChange = (event) => setDescriptionInput(event.target.value)
        const cityChange = (event) => setCityInput(event.target.value)

        const handleUpdate = async (event) => {
            event.preventDefault()

            try {
                const updateService = {
                    title: titleInput,
                    typeService: typeServiceInput,
                    description:descriptionInput,
                    city: cityInput
                }

                await editServiceService(serviceId, updateService )

            } catch (error) {
                navigate("/error")
                
            }
        }

  return (
    <div>
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          value={titleInput}
          name="title"
          onChange={titleChange}
        />
        <br />
        <label htmlFor="typeService">Tipo de Servicio</label>
        <input
          type="text"
          value={typeServiceInput}
          name="typeService"
          onChange={typeServiceChange}
        />
        <br />
        <label htmlFor="description">Descripción del servicio</label>
        <input
          type="text"
          value={descriptionInput}
          name="description"
          onChange={descriptionChange}
        />
        <br />
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          value={cityInput}
          name="city"
          onChange={cityChange}
        />
        <br />
        {/* <label htmlFor="offeredServices">Servicio Ofrecido</label>
<input type="text" value={offeredServicesInput} name="offeredServices" onChange={handleOfferedServices}/>
<br /> */}

        <button onClick={handleUpdate}>Editar Servicio</button>
      </div>
    </div>
  );
}

export default EditService;
