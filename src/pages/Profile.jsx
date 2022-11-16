import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditProfile from "../components/EditProfile";

import { getUserDetailsService } from "../service/user.services";
import { getAllServicesService } from "../service/service.services";
import { useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";

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

      console.log("service list", serviceList);

      console.log("img", userDetailsResponse.data.avatar);
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
        <br />
        {userDetails.city}
        <br />
        <img src={userDetails.avatar} alt="avatar" width={150} />
      </div>
      <br />
      <hr />

      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3>Editar Perfil</h3>
          </Accordion.Header>
          <Accordion.Body>
            <EditProfile updateProfile={getData} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h3>Crear servicio </h3>
          </Accordion.Header>
          <Accordion.Body>
            <CreateService updateList={getData} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h3>Servicios que he aceptado</h3>
      {serviceList.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.acceptedServices === user.user._id ? (
              <div>
                <Link to={`/service/${eachElement._id}`}>
                  <h3>{eachElement.title}</h3>
                </Link>

                <p>Tipo de servicio:{eachElement.typeService}</p>
                <p>Descripción:{eachElement.description}</p>
                <p>Ciudad:{eachElement.city}</p>
                {/* <p>Voluntario:{eachElement.acceptedServices._id.firstName}</p> */}
              </div>
            ) : null}
          </div>
        );
      })}
      <hr />
      <h3>Servicios ofrecidos</h3>
      {serviceList.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.offeredServices === user.user._id ? (
              <div>
                <Link to={`/service/${eachElement._id}`}>
                  <h3>{eachElement.title}</h3>
                </Link>
                <p>Tipo de servicio:{eachElement.typeService}</p>
                <p>Descripción:{eachElement.description}</p>
                <p>Ciudad:{eachElement.city}</p>
              </div>
            ) : null}
          </div>
        );
      })}

      <hr />

      <h3>
        <Link to="/reviews">Ver Reseñas</Link>
      </h3>
    </div>
  );
}

export default Profile;
