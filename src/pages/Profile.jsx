import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditPorfile from "../components/EditProfile"
import ReviewedService from "../components/ReviewedService"
import {getUserDetailsService} from "../service/user.services"
import {getAllServicesService} from "../service/service.services"
import {useNavigate} from "react-router-dom"


function Profile() {

  const { authenticaUser, user} = useContext(AuthContext);
  const navigate = useNavigate()

  const [serviceList, setServiceList] = useState([])
  const [ isFetching, setIsFetching ] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [userDetails, setUserDetails] = useState(null)
  
  useEffect(()=>{
    getDataService()
    getDataUser()
  }, [])

  const getDataUser = async() => {
    try{

      const response = await getUserDetailsService(user._id)
      console.log("USER",response)
      setUserDetails(response.data)
      setIsFetching(false)


    }catch(error){
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        
        navigate("/error");
    }
    }
  }

  const getDataService = async () => {
    try{
      
      const response = await getAllServicesService() //SACAR SOLO RUTAS DEL USUARIO
      console.log(response)
      setServiceList(response.data)
      setIsFetching(false)

    }catch(error){
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        
        navigate("/error");
    }
  }}

  

  if(isFetching === true) {
    return <h3>Loading</h3>
  }

  return (

    <div>
    <h4>Tu perfil</h4>

      <div>
      <h3>mis perfil</h3>
      {userDetails.firstName}
      <br />
      {userDetails.lastName}
      <br />
      {userDetails.email}
      <br />
      {userDetails.age}
      {userDetails.city}
      {userDetails.avatar}
      </div>

    <CreateService updateList={getDataService}/>

    <EditPorfile />

    <ReviewedService />
    
    </div>
  )
}

export default Profile