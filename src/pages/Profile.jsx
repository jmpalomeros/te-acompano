import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditProfile from "../components/EditProfile";


import { getUserDetailsService } from "../service/user.services";
import { getAllServicesService } from "../service/service.services";
import { useNavigate } from "react-router-dom";
import EditService from "../components/EditService";

function Profile() {
  const { authenticaUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [serviceList, setServiceList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userDetailsResponse = await getUserDetailsService();
      setUserDetails(userDetailsResponse.data);

      const allServiceResponse = await getAllServicesService();
      setServiceList(allServiceResponse.data);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
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
      <EditProfile updateProfile={getData} />
      <br />
      <hr />
      <h3>Crear servicio </h3>
      <CreateService updateList={getData} />
      <br />
      <hr />
     <h3><Link to="/reviews">Ver Reseñas</Link></h3>
     

      
    </div>
  );
}

export default Profile;
