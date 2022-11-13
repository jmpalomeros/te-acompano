import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditProfile from "../components/EditProfile"
import CreateReview from "../components/CreateReview"
import ReviewList from "../components/ReviewList"
import EditReview from "../components/EditReview";

import {getUserDetailsService} from "../service/user.services"
import {getAllServicesService} from "../service/service.services"
import {useNavigate} from "react-router-dom"
import EditService from "../components/EditService";


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
      <h3>Mi perfil</h3>
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
    <br />
    <hr />
    <h3>Editar Perfil</h3>
    <EditProfile />
    <br />
    <hr />
    <h3>Crear servicio </h3>
    <CreateService updateList={getDataService}/>
    <br />
    <hr />
    {/* <EditService /> */}
    <br />
    <hr />
    <h3>Mis reseñas realizadas</h3>
    <p>aqui irán mis reseñas</p>
    <ReviewList />
    <button>Borrar Reseña</button>
    <EditReview />
    <button >Editar Reseña</button>
    
    
    
    
    
    <h4>Crear reseña</h4>
    <CreateReview />
    <br />
    <hr />
    <h3>Mis reseñas recibidas</h3>
    {/* <ReviewedService /> */}
    <br />
    </div>
  )
}

export default Profile