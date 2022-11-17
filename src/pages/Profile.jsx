import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CreateService from "../components/CreateService";
import EditProfile from "../components/EditProfile";

import { getUserDetailsService } from "../service/user.services";
import { getAllServicesService } from "../service/service.services";
import { useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
//import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
    return <h4>Loading</h4>;
  }

  return (
    <div>

    {/* <Figure>
      <Figure.Image
        width={150}
        height={180}
        src={userDetails.avatar} 
        alt="avatar"
      />
      <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption>
    </Figure> */}
  
      
      <Card style={{ width: "100%" }}>
      <Card.Img variant="top" src={userDetails.avatar} alt="avatar" style={{ width: 300 }} />
      
      <Card.Body>
        <Card.Title>Mi perfil</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Nombre: {userDetails.firstName}</ListGroup.Item>
        <ListGroup.Item>Apellidos: {userDetails.lastName}</ListGroup.Item>
        <ListGroup.Item>Email: {userDetails.email}</ListGroup.Item>
        <ListGroup.Item>Edad: {userDetails.age}</ListGroup.Item>
        <ListGroup.Item>Ciudad: {userDetails.city}</ListGroup.Item>
      </ListGroup>
      
      </Card>

      {/* <div>
        <h4>Mi perfil</h4>
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
      <hr /> */}

      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4>Editar Perfil</h4>
          </Accordion.Header>
          <Accordion.Body>
            <EditProfile updateProfile={getData} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h4>Crear servicio </h4>
          </Accordion.Header>
          <Accordion.Body>
            <CreateService updateList={getData} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4>Servicios que he aceptado</h4>
      {serviceList.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.acceptedServices === user.user._id ? (
              <div>
                <Link to={`/service/${eachElement._id}`}>
                  <h4>{eachElement.title}</h4>
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
      <h4>Servicios ofrecidos</h4>
      {serviceList.map((eachElement) => {
        return (
          <div key={eachElement._id}>
            {eachElement.offeredServices === user.user._id ? (
              <div>
                <Link to={`/service/${eachElement._id}`}>
                  <h4>{eachElement.title}</h4>
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

      <h4>
        <Link to="/reviews">Ver Reseñas</Link>
      </h4>
    </div>
  );
}

export default Profile;
