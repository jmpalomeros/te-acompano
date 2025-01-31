import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getAllServicesService } from "../service/service.services";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import PuffLoader from "react-spinners/PuffLoader";

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
    return (
      <h4>
        <PuffLoader color={"blue"} size={50} />
      </h4>
    );
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

  return (
    <div>
      <h4>Buscador de servicios disponibles</h4>

      <Search list={filterList} typeService={filterTypeServiceList} />

      <h4>Lista de servicios disponibles</h4>
      <div>
        <CardGroup className="cardgroups">
          {cloneList.map((eachElement) => {
            return (
              <div key={eachElement._id}>
                <div >
                  {eachElement.acceptedServices === undefined ? (
                    <Card className="cards">
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
        </CardGroup>
      </div>
    </div>
  );
}

export default ServiceList;
