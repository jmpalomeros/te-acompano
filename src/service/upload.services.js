import service from "./config.services"

const uploadImageService = (avatarFile)=>{

   return service.post("/upload", avatarFile)
}

export {
    uploadImageService
}