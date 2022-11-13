import {useState, useEffect} from 'react'
import{useNavigate, useParams} from "react-router-dom"
import {getServiceDetailsService} from "../service/service.services"

function ServiceDetails() {

  const navigate = useNavigate()

  const {serviceId} = useParams()

  const[details, setDetails] = useState(null)
  const[isFetching, setIsFetching] = useState(true)

  useEffect(()=>{
    getDetailsData()
  }, [])

  const getDetailsData = async()=>{

    try{

      const response = await getServiceDetailsService(serviceId)
      setDetails(response.data)
      setIsFetching(false)

    }catch(error){
      //navigate("/error")
      console.log(" error response",error);
    }
  }

  if (isFetching === true) {
    return <h3>Loading</h3>
  }


  return (

    <div>
    
    <h3>Detalles del servicio</h3>

    <p>{details.title}</p>
    <p>{details.description}</p>
    
    </div>
  )
}

export default ServiceDetails