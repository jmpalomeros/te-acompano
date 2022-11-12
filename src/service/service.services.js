import service from "./config.services";

const getAllServicesService = () => {
    return service.get("/service")
}

const createNewServiceService = (newService)=> {
    return service.post("/service", newService)
}

const getServiceDetailsService = (serviceId) =>{
    return service.get(`/service/${serviceId}`)
}

const editServiceService = (serviceId, serviceEdited) =>{
    return service.patch(`/service/${serviceId}`, serviceEdited)
}

const acceptServiceService = (serviceId, serviceAccepted) =>{
    return service.patch(`/service/${serviceId}/accepted`, serviceAccepted)
}

export{
    getAllServicesService,
    createNewServiceService,
    getServiceDetailsService,
    editServiceService,
    acceptServiceService
}