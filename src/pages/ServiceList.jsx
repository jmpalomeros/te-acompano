import { useNavigate, Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getAllServicesService} from "../service/service.services"

function ServiceList() {

  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(()=>{
    getListData()
  }, [])

  const getListData = async () =>{

    try{

      const response = await getAllServicesService()

      setList(response.data)
      setIsFetching(false)

    }catch(error){
      navigate(error)
    }

  }

  if (isFetching === true) {
    return <h3>Loading</h3>
  }


  return (

    <div>
    <h3>Lista de servicios ofrecidos</h3>
    
    {list.map((eachElement)=>{
      return(
        
        <Link to={`/service/${eachElement._id}`}>
        <p key={eachElement._id}>{eachElement.title}</p>
        </Link>
      )
    })}
    
    </div>
  )
}

export default ServiceList