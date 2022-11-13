import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {getAllReviewsService, deleteReviewService} from "../service/review.services"


function ReviewList() {

    const navigate = useNavigate()

    const [ myReviews, setMyReviews] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    
    useEffect(()=>{
        getReviewsData()
    }, [])

    const getReviewsData = async () =>{

        try{

            const response = await getAllReviewsService()
            setMyReviews(response.data)
            setIsFetching(false)

        }catch(error){
            console.log(error)
        }
    }

    if (isFetching === true) {
        return <h3>Loading</h3>
      }
 
      //!falta incluir id de la review y le onclick en el boton
    // const handleDelete = async() =>{
    //     try{

    //         await deleteReviewService()

    //     }catch(error){
    //         navigate(error)        
    //     }
    // }

    

  return (

    <div>
    
    {myReviews.map((eachElement)=>{
    

        return(
            <div>
            <h5>{eachElement.reviewedService.map((eachItem)=>{
                return eachItem.title
            })}</h5>
            <p>Reseña:{eachElement.review}</p>
            <p>Valoración:{eachElement.rating}</p>
            
            <button>Editar Reseña</button>
            <button>
            Borrar Reseña
            </button>
            <br />
                        
            </div>

        )

    })}

    </div>
  )
}

export default ReviewList