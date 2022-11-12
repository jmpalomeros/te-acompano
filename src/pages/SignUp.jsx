import { useState } from 'react'
import { signupService } from "../service/auth.services"
import { useNavigate } from "react-router-dom"

function SignUp() {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const[firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [city, setCity]= useState("")
  const [avatar, setAvatar] = useState("")


  const [ errorMessage, setErrorMessage ] = useState("")


const handleEmailChange = (e) => setEmail(e.target.value)
const handlePasswordChange = (e) => setPassword(e.target.value)
const handleFirstNameChange = (e) => setFirstName(e.target.value)
const handleLastNameChange = (e) => setLastName(e.target.value)
const handleAgeChange = (e) => setAge(e.target.value)
const handleCityChange = (e) => setCity(e.target.value)
const handleAvatarChange = (e) => setAvatar(e.target.value)





  const handleSignup = async (e) => {
    e.preventDefault()
    
    const newUser = { 
      email: email, 
      password: password, 
      firstName: firstName, 
      lastName: lastName, 
      age: age, 
      city: city, 
      avatar: avatar
    }

    try {
      
      await signupService(newUser)
      navigate("/login")
  
    } catch (error) {
      if(error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      else {
        navigate("/error")
      }
    }
  } 



  return (
    <div>
      <h2>SignUp</h2>

      <form onSubmit={handleSignup}>

      <label>Nombre: </label>
      <input type="text" name="firstName" value={firstName} onChange={handleFirstNameChange}/>
      <br />
      <label>Apellidos: </label>
      <input type="text" name="lastName" value={lastName} onChange={handleLastNameChange}/>
      <br />
      <label>Email: </label>
      <input type="email" name="email" value={email} onChange={handleEmailChange}/>
      <br />
      <label htmlFor="password">Contraseña: </label>
      <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
      <br />
      <label>Avatar: </label>
      <input type="text" name="avatar" value={avatar} onChange={handleAvatarChange}/>
      <br />
      <label>Edad: </label>
      <input type="number" name="age" value={age} onChange={handleAgeChange}/>
      <br />
      <label>Ciudad: </label>
      <input type="text" name="city" value={city} onChange={handleCityChange}/>
      <br />
      <button type="submit">Registrar</button>
      {errorMessage !== "" && <p>{errorMessage}</p> }
      </form>






    </div>
  )
}

export default SignUp