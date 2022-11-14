import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {getAllReviewsService} from '../service/review.services'

function VolunteerDetails() {

  const navigate = useNavigate()
  const {volunteerId} = useParams()

  const[allDetails, setAllDetails] = useState([])

  useEffect(()=>{
    getAllDetailsData()
  }, [])

  const getAllDetailsData = async () =>{

    try{

      const response = await getAllReviewsService(volunteerId)
      setAllDetails(response.data)
      
    }catch(error){
      navigate(error)
    }
  }

  return (


    <div>

    {allDetails.map((eachItem)=>{
      return(
        <div>
        <h3>{eachItem.reviewedService.title}</h3>
        <p>{eachItem.review}</p>
        <p>{eachItem.rating}</p>
        <hr />

        </div>
      )
    })}
    
    
    
    </div>
  )
}

export default VolunteerDetails