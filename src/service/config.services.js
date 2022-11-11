import axios from "axios"

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

//en todas las llamadas de este servicio, buscamos el token y lo incluimos

service.interceptors.request.use((config)=>{

    //buscar el token el localStorage

    const authToken = localStorage.getItem("authToken")
    const tokenFull = `Bearer ${authToken}`
    
    //anexamos el Token a la solicitud

    if(authToken){
        config.headers.authorization = tokenFull
    }

    return config
})


export default service