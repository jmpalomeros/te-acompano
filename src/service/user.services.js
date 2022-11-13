import service from "./config.services";

const getUserDetailsService = () => {
    return service.get ("/user")
}

const editUserService = (userEdited) => {
    return service.patch("/user/edit", userEdited)
}

export{
    getUserDetailsService,
    editUserService
}