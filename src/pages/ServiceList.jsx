import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getAllServicesService } from "../service/service.services";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";

function ServiceList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await getAllServicesService();

      setList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate(error);
    }
  };

  if (isFetching === true) {
    return <h3>Loading</h3>;
  }

  const filterList = (filterQuery) => {
    const listadoFiltrado = list.filter((eachElem) => {
      return eachElem.title.includes(filterQuery);
    });
    setList(listadoFiltrado);
   
  };

  return (
    <div>
      <h3>Lista de servicios ofrecidos</h3>

      <Search list={filterList} />

      {list.map((eachElement) => {
        return (
          <div >
            {eachElement.acceptedServices === undefined ? (
              <Link to={`/service/${eachElement._id}`}>
                <p key={eachElement._id}>{eachElement.title}</p>
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default ServiceList;
