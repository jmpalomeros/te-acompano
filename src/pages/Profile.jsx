import { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditPorfile from "../components/EditProfile"
import ReviewedService from "../components/ReviewedService"

import {getAllServicesService} from "../service/service.services"



function Profile() {

    //const { authenticaUser, isLoggedIn} = useContext(AuthContext);
    //const navigate = useNavigate()

  const [serviceList, setServiceList] = useState([])
  const [ isFetching, setIsFetching ] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  
  useEffect(()=>{
    getData()
  }, [])

  const getData = async () => {
    try{
      
      const response = await getAllServicesService()
      console.log(response)
      setServiceList(response.data)
      setIsFetching(false)

    }catch(error){
      console.log(error)
    //   if (error.response && error.response.status === 400) {
    //     // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
    //     setErrorMessage(error.response.data.errorMessage)
    //   } else {
    //     // si el error es otro (500) entonces si redirecciono a /error
    //     navigate("/error");
    // }
  }}

  if(isFetching === true) {
    return <h3>Loading</h3>
  }

  return (

    <div>
    <h4>Tu perfil</h4>

    <CreateService updateList={getData}/>

    <EditPorfile />

    <ReviewedService />
    
    </div>
  )
}

export default Profile