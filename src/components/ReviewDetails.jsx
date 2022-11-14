import {useState, useEffect} from 'react'
import { useNavigate, useParams, Link} from "react-router-dom"
import {getReviewDetailsService} from "../service/review.services"
import ReviewEdit from './ReviewEdit'



function ReviewDetails() {

    const navigate = useNavigate()

    const {reviewId} = useParams()

    const [details, setDetails] = useState(null)
    const[isFetching, setFetching] = useState(true)

    useEffect(()=>{
        getDetailsData()
    }, [])

    const getDetailsData = async() =>{

        try{

            const response = await getReviewDetailsService (reviewId)
            setDetails(response.data)
            setFetching(false)

        }catch(error){
            navigate(error)
        }
    }

    if (isFetching === true) {
        return <h3>Loading</h3>;
      }

  return (

    <div>
    <h3>Servicio valorado:{details.reviewedService.title}</h3>
    <p>Detalles de la valoración:{details.review} <br /> {details.rating}</p>
    <p>Voluntario valorado:  {details.ratedVolunteer.firstName}  {details.ratedVolunteer.lastName}</p>
    <ReviewEdit />
   
      
   
    
    
    </div>
  )
}

export default ReviewDetails