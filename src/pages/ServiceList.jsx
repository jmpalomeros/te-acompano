import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getAllServicesService } from "../service/service.services";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ServiceList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [typeServiceList, setTypeServiceList] = useState();
  const [cloneList, setCloneList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await getAllServicesService();
      setCloneList(response.data);
      setList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate(error);
    }
  };

  if (isFetching === true) {
    return <h4>Loading</h4>;
  }

  const filterList = (filterQuery) => {
    const listadoFiltrado = list.filter((eachElem) => {
      return eachElem.title.includes(filterQuery);
    });
    setCloneList(listadoFiltrado);
  };

  const filterTypeServiceList = (filterQuery) => {
    const listadoFiltrado = list.filter((eachElem) => {
      return eachElem.typeService.includes(filterQuery);
    });

    setTypeServiceList(listadoFiltrado);
    setCloneList(listadoFiltrado);
  };

  console.log(typeServiceList);

  return (
    <div>
      <h4>Buscador de servicios disponibles</h4>

      <Search list={filterList} typeService={filterTypeServiceList} />

      <h4>Lista de servicios disponibles</h4>
      <div className="cards-service-list">
      {cloneList.map((eachElement) => {
        return (
          <div>
            <div key={eachElement._id}>
              {eachElement.acceptedServices === undefined ? (
                <Card className="text-center"  style={{ width: "30vw" }}>
                  <Card.Header>
                    Servicio:{" "}
                    <Card.Title>
                      <Link to={`/service/${eachElement._id}`}>
                        <p key={eachElement._id}>{eachElement.title}</p>
                      </Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <p> Descripción: {eachElement.description}</p>
                    <p> Categoría: {eachElement.typeService}</p>
                  </Card.Body>
                </Card>
              ) : null}
              <br />
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default ServiceList;
