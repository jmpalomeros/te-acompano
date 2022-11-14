
import service from "./config.services";


const getAllReviewsService = () => {
    return service.get("/review")
}
//!supongo que esta función será así ya que precisa el serviceId para crear la reseña
const createReviewService = (serviceId, newReview) =>{
    return service.post(`/review/${serviceId}`, newReview)
}

const getReviewDetailsService = (reviewId) => {
    return service.get(`/review/${reviewId}`)
}

const editReviewService = (reviewId, reviewEdited) => {
    return service.patch(`/review/${reviewId}`, reviewEdited )
}

const deleteReviewService = (reviewId) => {
    return service.delete(`/review/${reviewId}/delete`)
}

export{
    getAllReviewsService,
    createReviewService,
    getReviewDetailsService,
    editReviewService,
    deleteReviewService
}